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
  } else if (request.type === 'WR_INTERACTIVE_TASK') {
    handleInteractiveTask();
  } else if (request.type === 'WR_PODCAST') {
    handlePodcast();
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

// Handle interactive task generation
async function handleInteractiveTask() {
  try {
    // Remove any existing overlays
    removeOverlay();
    
    // Get page HTML content
    const htmlContent = document.documentElement.outerHTML;
    
    // Import and use task generator
    const taskGenerator = await import(chrome.runtime.getURL('lib/taskGenerator.js'));
    
    // Extract main content
    const content = taskGenerator.extractMainContent(htmlContent);
    if (!content) {
      showNotification('Could not extract meaningful content from this page', 'error');
      return;
    }
    
    // Get user profile and settings
    const settings = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });
    const data = await chrome.storage.sync.get(['profile']);
    const profile = data.profile || {};
    
    if (!settings.apiKey) {
      showNotification('Please configure your API key in options', 'error');
      return;
    }
    
    // Create overlay and show loading
    const overlay = createInteractiveTaskOverlay();
    showTaskLoading(overlay);
    
    // Generate interactive task
    const task = await taskGenerator.generateInteractiveTask(content, profile, {
      createChatCompletion: async ({ systemPrompt, userPayload }) => {
        return await aiClient.createChatCompletion({
          baseUrl: settings.baseUrl,
          apiKey: settings.apiKey,
          model: settings.model,
          temperature: settings.temperature,
          systemPrompt,
          userPayload
        });
      }
    });
    
    // Display the task
    displayInteractiveTask(overlay, task);
    
    // Award rewards
    await claimRewards('interactive-task');
    
  } catch (error) {
    console.error('Failed to generate interactive task:', error);
    showNotification('Failed to generate interactive task: ' + error.message, 'error');
    removeOverlay();
  }
}

// Handle podcast generation (placeholder)
async function handlePodcast() {
  try {
    removeOverlay();
    
    const htmlContent = document.documentElement.outerHTML;
    const taskGenerator = await import(chrome.runtime.getURL('lib/taskGenerator.js'));
    
    const content = taskGenerator.extractMainContent(htmlContent);
    if (!content) {
      showNotification('Could not extract meaningful content from this page', 'error');
      return;
    }
    
    const overlay = createPodcastOverlay();
    showPodcastLoading(overlay);
    
    // This would integrate with audio generation API
    showNotification('Podcast generation coming soon!', 'info');
    removeOverlay();
    
  } catch (error) {
    console.error('Failed to generate podcast:', error);
    showNotification('Failed to generate podcast: ' + error.message, 'error');
    removeOverlay();
  }
}

// Create interactive task overlay
function createInteractiveTaskOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'wr-task-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 400px;
    max-height: 80vh;
    background: white;
    border: 2px solid #3b82f6;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1f2937;
    overflow: hidden;
  `;
  
  document.body.appendChild(overlay);
  return overlay;
}

// Show loading state for task generation
function showTaskLoading(overlay) {
  overlay.innerHTML = `
    <div style="padding: 24px; text-align: center;">
      <div style="width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top: 3px solid #3b82f6; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
      <h3 style="margin: 0 0 8px 0; color: #3b82f6; font-size: 18px;">🧠 Analyzing Content</h3>
      <p style="margin: 0; color: #6b7280; font-size: 14px;">Generating your personalized interactive task...</p>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
}

// Display interactive task
function displayInteractiveTask(overlay, task) {
  const completedSteps = 0;
  const totalSteps = task.steps.length;
  const progressPercent = (completedSteps / totalSteps) * 100;
  
  overlay.innerHTML = `
    <div style="background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
        <h3 style="margin: 0; font-size: 16px; line-height: 1.2;">📋 ${task.title}</h3>
        <button onclick="document.getElementById('wr-task-overlay').remove()" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-size: 16px;">×</button>
      </div>
      <p style="margin: 0 0 12px 0; font-size: 13px; opacity: 0.9;">${task.description}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
        <span>⏱️ ${task.estimatedTime || '10-15 min'}</span>
        <span>📊 ${completedSteps}/${totalSteps} completed</span>
      </div>
      <div style="background: rgba(255,255,255,0.2); height: 4px; border-radius: 2px; margin-top: 8px;">
        <div style="background: rgba(255,255,255,0.8); height: 100%; width: ${progressPercent}%; border-radius: 2px; transition: width 0.3s;"></div>
      </div>
    </div>
    
    <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
      <div id="task-steps">
        ${task.steps.map((step, index) => `
          <div class="task-step" data-step-id="${step.id}" style="margin-bottom: 16px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; transition: all 0.2s;">
            <div style="display: flex; align-items: start; gap: 12px;">
              <input type="checkbox" id="step-${step.id}" onchange="toggleStep(${step.id})" style="margin-top: 2px; width: 16px; height: 16px;">
              <div style="flex: 1;">
                <label for="step-${step.id}" style="display: block; font-weight: 500; margin-bottom: 4px; cursor: pointer; font-size: 14px;">${step.title}</label>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; line-height: 1.4;">${step.description}</p>
                
                ${step.searchQuery ? `
                  <button onclick="searchExternal('${step.searchQuery}')" style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 4px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px; cursor: pointer; color: #374151;">
                    🔍 Search: ${step.searchQuery}
                  </button>
                ` : ''}
                
                ${step.externalLink ? `
                  <button onclick="window.open('${step.externalLink}', '_blank')" style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer; color: #374151;">
                    🔗 Open Resource
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${task.resources && task.resources.length > 0 ? `
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">📚 Additional Resources</h4>
          ${task.resources.map(resource => `
            <div style="margin-bottom: 8px;">
              <a href="${resource.url}" target="_blank" style="color: #3b82f6; text-decoration: none; font-size: 13px;">
                ${resource.type === 'video' ? '🎥' : resource.type === 'tool' ? '🛠️' : '📄'} ${resource.title}
              </a>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
  
  // Add global functions for interaction
  window.toggleStep = async function(stepId) {
    const checkbox = document.getElementById(`step-${stepId}`);
    const stepElement = document.querySelector(`[data-step-id="${stepId}"]`);
    
    if (checkbox.checked) {
      stepElement.style.background = '#f0f9ff';
      stepElement.style.borderColor = '#3b82f6';
      await claimRewards('complete-step');
    } else {
      stepElement.style.background = '';
      stepElement.style.borderColor = '#e5e7eb';
    }
    
    updateProgress();
  };
  
  window.searchExternal = function(query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };
  
  window.updateProgress = function() {
    const completed = document.querySelectorAll('#task-steps input[type="checkbox"]:checked').length;
    const total = document.querySelectorAll('#task-steps input[type="checkbox"]').length;
    const percent = (completed / total) * 100;
    
    const progressBar = overlay.querySelector('[style*="width: "]');
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }
    
    const progressText = overlay.querySelector('[style*="📊"]');
    if (progressText) {
      progressText.textContent = `📊 ${completed}/${total} completed`;
    }
  };
}

// Create podcast overlay (placeholder)
function createPodcastOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'wr-podcast-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;
    background: white;
    border: 2px solid #10b981;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  document.body.appendChild(overlay);
  return overlay;
}

// Show loading state for podcast
function showPodcastLoading(overlay) {
  overlay.innerHTML = `
    <div style="padding: 24px; text-align: center;">
      <div style="width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top: 3px solid #10b981; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
      <h3 style="margin: 0 0 8px 0; color: #10b981; font-size: 18px;">🎧 Converting to Audio</h3>
      <p style="margin: 0; color: #6b7280; font-size: 14px;">Creating your personal podcast...</p>
    </div>
  `;
}

// Remove overlay (updated to handle new overlays)
function removeOverlay() {
  // Remove original overlay
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
  
  // Remove task overlay
  const taskOverlay = document.getElementById('wr-task-overlay');
  if (taskOverlay) {
    taskOverlay.remove();
  }
  
  // Remove podcast overlay
  const podcastOverlay = document.getElementById('wr-podcast-overlay');
  if (podcastOverlay) {
    podcastOverlay.remove();
  }
  
  // Clean up global functions
  if (window.toggleStep) delete window.toggleStep;
  if (window.searchExternal) delete window.searchExternal;
  if (window.updateProgress) delete window.updateProgress;
  
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
}

// Handle page unload
window.addEventListener('beforeunload', () => {
  removeOverlay();
});