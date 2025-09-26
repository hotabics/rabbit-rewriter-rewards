// White Rabbit Content Script - Handles text selection and AI processing

// Import utilities (using dynamic imports for MV3 compatibility)
let aiClient, storage;

// Load modules dynamically
async function loadModules() {
  try {
    aiClient = await import(chrome.runtime.getURL('lib/aiClient.js'));
    storage = await import(chrome.runtime.getURL('lib/storage.js'));
  } catch (error) {
    console.error('Failed to load modules:', error);
  }
}

// Initialize content script
loadModules();

// Global state
let currentOverlay = null;
let currentSelection = null;
let abortController = null;

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'WR_PROCESS') {
    handleProcess(request.mode, request.text);
  } else if (request.type === 'WR_HOTKEY') {
    handleHotkey();
  }
});

// Handle hotkey activation
function handleHotkey() {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  if (!selectedText) {
    showNotification('Iezīmē tekstu un mēģini vēlreiz.', 'error');
    return;
  }
  
  // Store selection for replacement
  currentSelection = {
    text: selectedText,
    range: selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null
  };
  
  // Use default mode (rewrite) or get from storage
  handleProcess('rewrite', selectedText);
}

// Handle AI processing
async function handleProcess(mode, text) {
  if (!text || !text.trim()) {
    showNotification('No text selected', 'error');
    return;
  }

  try {
    // Remove existing overlay
    removeOverlay();
    
    // Get settings
    const settings = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
    
    if (!settings.apiKey) {
      showNotification('Please configure API key in extension options', 'error');
      return;
    }
    
    // Create overlay
    currentOverlay = createOverlay(mode, text);
    document.body.appendChild(currentOverlay);
    
    // Show loading state
    showLoading();
    
    // Prepare AI request
    const userPayload = {
      mode: mode,
      tone: settings.defaultTone || 'neutral',
      language: settings.defaultLanguage || 'original',
      text: text
    };
    
    // Create abort controller for cancellation
    abortController = new AbortController();
    
    // Call AI
    const result = await aiClient.createChatCompletion({
      baseUrl: settings.baseUrl,
      apiKey: settings.apiKey,
      model: settings.model,
      temperature: settings.temperature,
      systemPrompt: settings.systemPrompt,
      userPayload: userPayload,
      signal: abortController.signal,
      onStream: (chunk, fullContent) => {
        updateResult(fullContent);
      }
    });
    
    // Show final result
    updateResult(result);
    showActions(mode, result);
    
  } catch (error) {
    console.error('AI processing error:', error);
    showNotification(`White Rabbit error: ${error.message}`, 'error');
    removeOverlay();
  }
}

// Create overlay UI
function createOverlay(mode, originalText) {
  const overlay = document.createElement('div');
  overlay.className = 'wr-overlay';
  
  overlay.innerHTML = `
    <div class="wr-header">
      <div class="wr-title">
        🐰 White Rabbit
      </div>
      <button class="wr-close" onclick="this.closest('.wr-overlay').remove()">×</button>
    </div>
    <div class="wr-content">
      <div class="wr-result"></div>
    </div>
    <div class="wr-actions" style="display: none;"></div>
  `;
  
  // Add close functionality
  overlay.querySelector('.wr-close').addEventListener('click', () => {
    removeOverlay();
  });
  
  return overlay;
}

// Show loading state
function showLoading() {
  if (!currentOverlay) return;
  
  const resultDiv = currentOverlay.querySelector('.wr-result');
  resultDiv.innerHTML = `
    <div class="wr-loading">
      <div class="wr-spinner"></div>
      Processing with White Rabbit...
    </div>
  `;
}

// Update result content
function updateResult(content) {
  if (!currentOverlay) return;
  
  const resultDiv = currentOverlay.querySelector('.wr-result');
  resultDiv.textContent = content;
}

// Show action buttons
function showActions(mode, result) {
  if (!currentOverlay) return;
  
  const actionsDiv = currentOverlay.querySelector('.wr-actions');
  
  actionsDiv.innerHTML = `
    <button class="wr-button wr-button-primary" data-action="replace">Replace</button>
    <button class="wr-button wr-button-secondary" data-action="copy">Copy</button>
    <button class="wr-button wr-button-ghost" data-action="undo">Undo</button>
    <button class="wr-button wr-button-success" data-action="claim">Mark as Done</button>
  `;
  
  actionsDiv.style.display = 'flex';
  
  // Add event listeners
  actionsDiv.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    if (action) {
      handleAction(action, mode, result);
    }
  });
}

// Handle action button clicks
async function handleAction(action, mode, result) {
  switch (action) {
    case 'replace':
      replaceText(result);
      break;
    case 'copy':
      copyToClipboard(result);
      showNotification('Copied to clipboard!', 'success');
      break;
    case 'undo':
      if (currentSelection) {
        replaceText(currentSelection.text);
      }
      break;
    case 'claim':
      await claimRewards(mode);
      removeOverlay();
      break;
  }
}

// Replace selected text
function replaceText(newText) {
  if (currentSelection && currentSelection.range) {
    try {
      // Clear selection and replace with new text
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(currentSelection.range);
      
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(newText));
        
        // Clear selection
        selection.removeAllRanges();
      }
    } catch (error) {
      console.error('Text replacement failed:', error);
      copyToClipboard(newText);
      showNotification('Replacement failed. Text copied to clipboard.', 'error');
    }
  }
}

// Copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

// Claim rewards and update profile
async function claimRewards(mode) {
  try {
    // Get current profile and rewards
    const data = await chrome.storage.sync.get(['profile', 'rewards']);
    const profile = data.profile || {};
    const rewards = data.rewards || {};
    
    const rewardDelta = rewards[mode] || {};
    
    // Apply rewards using storage utility
    const { profile: newProfile, leveledUp } = storage.applyRewards(profile, rewardDelta);
    
    // Update storage
    await chrome.runtime.sendMessage({ type: 'UPDATE_PROFILE', profile: newProfile });
    
    // Show reward notification
    const rewardText = Object.entries(rewardDelta)
      .filter(([key, value]) => value > 0)
      .map(([key, value]) => {
        const icons = { xp: '⭐', coins: '⦿', health: '❤️', food: '🍖' };
        return `+${value} ${icons[key] || key}`;
      })
      .join(' ');
    
    let message = `Earned: ${rewardText}`;
    if (leveledUp) {
      message += ` 🎉 Level Up! Now Level ${newProfile.level}`;
    }
    
    showNotification(message, 'success');
    
  } catch (error) {
    console.error('Failed to claim rewards:', error);
    showNotification('Failed to claim rewards', 'error');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelectorAll('.wr-reward-notification, .wr-error-notification');
  existing.forEach(el => el.remove());
  
  const notification = document.createElement('div');
  notification.className = type === 'error' ? 'wr-error-notification' : 'wr-reward-notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Remove overlay
function removeOverlay() {
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
  
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
}

// Handle page unload
window.addEventListener('beforeunload', () => {
  removeOverlay();
});