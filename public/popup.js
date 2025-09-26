// White Rabbit Popup Script

// DOM elements
const elements = {
  stats: {
    level: document.getElementById('level'),
    xp: document.getElementById('xp'),
    health: document.getElementById('health'),
    food: document.getElementById('food'),
    coins: document.getElementById('coins'),
    streak: document.getElementById('streak')
  },
  controls: {
    mode: document.getElementById('mode'),
    tone: document.getElementById('tone'),
    language: document.getElementById('language'),
    processButton: document.getElementById('processButton')
  },
  footer: {
    optionsLink: document.getElementById('optionsLink'),
    dailyBonus: document.getElementById('dailyBonus')
  }
};

// Initialize popup
async function initialize() {
  await loadStats();
  await loadSettings();
  setupEventListeners();
  checkDailyBonus();
}

// Load and display stats
async function loadStats() {
  try {
    const data = await chrome.storage.sync.get(['profile']);
    const profile = data.profile || {
      level: 1,
      xp: 0,
      coins: 10,
      health: 5,
      food: 5,
      streak: 0
    };

    elements.stats.level.textContent = profile.level;
    elements.stats.xp.textContent = profile.xp;
    elements.stats.health.textContent = `❤️ ${profile.health}`;
    elements.stats.food.textContent = `🍖 ${profile.food}`;
    elements.stats.coins.textContent = `⦿ ${profile.coins}`;
    elements.stats.streak.textContent = `🔥 ${profile.streak}`;
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Load settings and set default values
async function loadSettings() {
  try {
    const data = await chrome.storage.sync.get(['settings']);
    const settings = data.settings || {};

    if (settings.defaultTone) {
      elements.controls.tone.value = settings.defaultTone;
    }
    if (settings.defaultLanguage) {
      elements.controls.language.value = settings.defaultLanguage;
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Process button
  elements.controls.processButton.addEventListener('click', handleProcessClick);

  // Settings persistence
  elements.controls.tone.addEventListener('change', saveTonePreference);
  elements.controls.language.addEventListener('change', saveLanguagePreference);

  // Options link
  elements.footer.optionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });

  // Daily bonus
  elements.footer.dailyBonus.addEventListener('click', handleDailyBonus);

  // Listen for storage changes to update stats
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.profile) {
      updateStatsDisplay(changes.profile.newValue);
    }
  });
}

// Handle process button click
async function handleProcessClick() {
  try {
    // Get current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      showError('No active tab found');
      return;
    }

    // Update button state
    elements.controls.processButton.disabled = true;
    elements.controls.processButton.textContent = 'Processing...';
    document.body.classList.add('loading');

    // Send message to content script to process current selection
    chrome.tabs.sendMessage(tab.id, {
      type: 'WR_HOTKEY'
    });

    // Reset button after short delay
    setTimeout(() => {
      elements.controls.processButton.disabled = false;
      elements.controls.processButton.textContent = 'Ask White Rabbit (Selection)';
      document.body.classList.remove('loading');
      window.close(); // Close popup
    }, 500);

  } catch (error) {
    console.error('Failed to process:', error);
    showError('Failed to process. Make sure you have text selected.');
    
    elements.controls.processButton.disabled = false;
    elements.controls.processButton.textContent = 'Ask White Rabbit (Selection)';
    document.body.classList.remove('loading');
  }
}

// Save tone preference
async function saveTonePreference() {
  try {
    const data = await chrome.storage.sync.get(['settings']);
    const settings = data.settings || {};
    settings.defaultTone = elements.controls.tone.value;
    await chrome.storage.sync.set({ settings });
  } catch (error) {
    console.error('Failed to save tone preference:', error);
  }
}

// Save language preference
async function saveLanguagePreference() {
  try {
    const data = await chrome.storage.sync.get(['settings']);
    const settings = data.settings || {};
    settings.defaultLanguage = elements.controls.language.value;
    await chrome.storage.sync.set({ settings });
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
}

// Update stats display
function updateStatsDisplay(profile) {
  if (!profile) return;

  elements.stats.level.textContent = profile.level;
  elements.stats.xp.textContent = profile.xp;
  elements.stats.health.textContent = `❤️ ${profile.health}`;
  elements.stats.food.textContent = `🍖 ${profile.food}`;
  elements.stats.coins.textContent = `⦿ ${profile.coins}`;
  elements.stats.streak.textContent = `🔥 ${profile.streak}`;
}

// Check and handle daily bonus
async function checkDailyBonus() {
  try {
    const data = await chrome.storage.sync.get(['profile']);
    const profile = data.profile || {};
    
    if (canClaimDaily(profile)) {
      elements.footer.dailyBonus.textContent = 'Claim Daily Bonus!';
      elements.footer.dailyBonus.style.color = '#22c55e';
      elements.footer.dailyBonus.style.fontWeight = '600';
    } else {
      elements.footer.dailyBonus.textContent = 'Daily Bonus';
    }
  } catch (error) {
    console.error('Failed to check daily bonus:', error);
  }
}

// Handle daily bonus claim
async function handleDailyBonus(e) {
  e.preventDefault();
  
  try {
    const data = await chrome.storage.sync.get(['profile', 'rewards']);
    const profile = data.profile || {};
    const rewards = data.rewards || {};
    
    if (!canClaimDaily(profile)) {
      showError('Daily bonus not available yet');
      return;
    }

    // Apply daily bonus
    const dailyReward = rewards.daily || { xp: 10, coins: 5, health: 2, food: 2 };
    const newProfile = { ...profile };
    
    // Update last claim time and streak
    newProfile.lastClaimISO = new Date().toISOString();
    newProfile.streak += 1;
    
    // Apply rewards
    newProfile.xp += dailyReward.xp;
    newProfile.coins += dailyReward.coins;
    newProfile.health = Math.min(10, newProfile.health + dailyReward.health);
    newProfile.food = Math.min(10, newProfile.food + dailyReward.food);
    
    // Handle level-ups
    while (newProfile.xp >= (100 * newProfile.level)) {
      newProfile.xp -= (100 * newProfile.level);
      newProfile.level += 1;
    }
    
    // Save to storage
    await chrome.storage.sync.set({ profile: newProfile });
    
    // Update display
    updateStatsDisplay(newProfile);
    checkDailyBonus();
    
    showSuccess('Daily bonus claimed! 🎉');
    
  } catch (error) {
    console.error('Failed to claim daily bonus:', error);
    showError('Failed to claim daily bonus');
  }
}

// Check if daily bonus can be claimed
function canClaimDaily(profile) {
  if (!profile.lastClaimISO) return true;
  
  const lastClaim = new Date(profile.lastClaimISO);
  const now = new Date();
  const hoursSince = (now - lastClaim) / (1000 * 60 * 60);
  
  return hoursSince >= 20;
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    background: #ef4444;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
  `;
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  
  setTimeout(() => errorDiv.remove(), 3000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    background: #22c55e;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
  `;
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => successDiv.remove(), 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}