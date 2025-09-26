// White Rabbit Options Page Script

// DOM elements
const elements = {
  // AI Configuration
  apiKey: document.getElementById('apiKey'),
  baseUrl: document.getElementById('baseUrl'),
  model: document.getElementById('model'),
  temperature: document.getElementById('temperature'),
  
  // Default Settings
  defaultTone: document.getElementById('defaultTone'),
  defaultLanguage: document.getElementById('defaultLanguage'),
  systemPrompt: document.getElementById('systemPrompt'),
  
  // Gamification
  rewards: document.getElementById('rewards'),
  dailyBonusBtn: document.getElementById('dailyBonusBtn'),
  
  // Actions
  saveBtn: document.getElementById('saveBtn'),
  resetBtn: document.getElementById('resetBtn'),
  testBtn: document.getElementById('testBtn'),
  
  // Status
  status: document.getElementById('status')
};

// Default values
const defaults = {
  settings: {
    apiKey: "",
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    temperature: 0.3,
    defaultTone: "neutral",
    defaultLanguage: "original",
    systemPrompt: "You rewrite, summarize, translate, or produce clear, numbered step-by-step instructions. Preserve factual meaning; leave names and code blocks unchanged; keep formatting when useful."
  },
  rewards: {
    rewrite: { xp: 8, coins: 3, health: 1, food: 1 },
    summarize: { xp: 6, coins: 2, health: 1, food: 1 },
    translate: { xp: 5, coins: 2, health: 0, food: 1 },
    "explain-step-by-step": { xp: 12, coins: 4, health: 2, food: 2 },
    daily: { xp: 10, coins: 5, health: 2, food: 2 }
  }
};

// Initialize options page
async function initialize() {
  await loadSettings();
  setupEventListeners();
  checkDailyBonus();
}

// Load settings from storage
async function loadSettings() {
  try {
    const data = await chrome.storage.sync.get(['settings', 'rewards']);
    
    const settings = { ...defaults.settings, ...data.settings };
    const rewards = { ...defaults.rewards, ...data.rewards };
    
    // Populate AI configuration
    elements.apiKey.value = settings.apiKey;
    elements.baseUrl.value = settings.baseUrl;
    elements.model.value = settings.model;
    elements.temperature.value = settings.temperature;
    
    // Populate default settings
    elements.defaultTone.value = settings.defaultTone;
    elements.defaultLanguage.value = settings.defaultLanguage;
    elements.systemPrompt.value = settings.systemPrompt;
    
    // Populate rewards
    elements.rewards.value = JSON.stringify(rewards, null, 2);
    
  } catch (error) {
    console.error('Failed to load settings:', error);
    showStatus('Failed to load settings', 'error');
  }
}

// Setup event listeners
function setupEventListeners() {
  elements.saveBtn.addEventListener('click', saveSettings);
  elements.resetBtn.addEventListener('click', resetSettings);
  elements.testBtn.addEventListener('click', testConnection);
  elements.dailyBonusBtn.addEventListener('click', claimDailyBonus);
}

// Save settings to storage
async function saveSettings() {
  try {
    elements.saveBtn.disabled = true;
    elements.saveBtn.textContent = 'Saving...';
    
    // Validate required fields
    if (!elements.apiKey.value.trim()) {
      throw new Error('API key is required');
    }
    
    if (!elements.baseUrl.value.trim()) {
      throw new Error('Base URL is required');
    }
    
    if (!elements.model.value.trim()) {
      throw new Error('Model is required');
    }
    
    // Validate temperature
    const temp = parseFloat(elements.temperature.value);
    if (isNaN(temp) || temp < 0 || temp > 1) {
      throw new Error('Temperature must be between 0 and 1');
    }
    
    // Validate rewards JSON
    let rewardsObj;
    try {
      rewardsObj = JSON.parse(elements.rewards.value);
    } catch (e) {
      throw new Error('Invalid rewards JSON format');
    }
    
    // Prepare settings object
    const settings = {
      apiKey: elements.apiKey.value.trim(),
      baseUrl: elements.baseUrl.value.trim(),
      model: elements.model.value.trim(),
      temperature: temp,
      defaultTone: elements.defaultTone.value,
      defaultLanguage: elements.defaultLanguage.value,
      systemPrompt: elements.systemPrompt.value.trim()
    };
    
    // Save to storage
    await chrome.storage.sync.set({
      settings: settings,
      rewards: rewardsObj
    });
    
    showStatus('Settings saved successfully!', 'success');
    
  } catch (error) {
    console.error('Failed to save settings:', error);
    showStatus(`Failed to save: ${error.message}`, 'error');
  } finally {
    elements.saveBtn.disabled = false;
    elements.saveBtn.textContent = 'Save Settings';
  }
}

// Reset settings to defaults
async function resetSettings() {
  if (!confirm('Are you sure you want to reset all settings to defaults?')) {
    return;
  }
  
  try {
    // Reset to defaults
    await chrome.storage.sync.set({
      settings: defaults.settings,
      rewards: defaults.rewards
    });
    
    // Reload page to show defaults
    await loadSettings();
    
    showStatus('Settings reset to defaults', 'success');
    
  } catch (error) {
    console.error('Failed to reset settings:', error);
    showStatus('Failed to reset settings', 'error');
  }
}

// Test API connection
async function testConnection() {
  try {
    elements.testBtn.disabled = true;
    elements.testBtn.textContent = 'Testing...';
    
    const apiKey = elements.apiKey.value.trim();
    const baseUrl = elements.baseUrl.value.trim();
    const model = elements.model.value.trim();
    
    if (!apiKey || !baseUrl || !model) {
      throw new Error('Please fill in API key, base URL, and model');
    }
    
    // Test with a simple request
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: 'Test connection' }],
        max_tokens: 10
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }
    
    showStatus('API connection successful!', 'success');
    
  } catch (error) {
    console.error('API test failed:', error);
    showStatus(`Connection test failed: ${error.message}`, 'error');
  } finally {
    elements.testBtn.disabled = false;
    elements.testBtn.textContent = 'Test API Connection';
  }
}

// Check and update daily bonus status
async function checkDailyBonus() {
  try {
    const data = await chrome.storage.sync.get(['profile']);
    const profile = data.profile || {};
    
    if (canClaimDaily(profile)) {
      elements.dailyBonusBtn.textContent = 'Claim Daily Bonus (Available!)';
      elements.dailyBonusBtn.disabled = false;
      elements.dailyBonusBtn.classList.add('button-success');
    } else {
      const lastClaim = new Date(profile.lastClaimISO);
      const nextClaim = new Date(lastClaim.getTime() + (20 * 60 * 60 * 1000));
      const now = new Date();
      
      if (nextClaim > now) {
        const hoursLeft = Math.ceil((nextClaim - now) / (1000 * 60 * 60));
        elements.dailyBonusBtn.textContent = `Daily Bonus (${hoursLeft}h left)`;
      } else {
        elements.dailyBonusBtn.textContent = 'Daily Bonus';
      }
      
      elements.dailyBonusBtn.disabled = true;
      elements.dailyBonusBtn.classList.remove('button-success');
    }
  } catch (error) {
    console.error('Failed to check daily bonus:', error);
  }
}

// Claim daily bonus
async function claimDailyBonus() {
  try {
    const data = await chrome.storage.sync.get(['profile', 'rewards']);
    const profile = data.profile || {};
    const rewards = data.rewards || {};
    
    if (!canClaimDaily(profile)) {
      showStatus('Daily bonus not available yet', 'error');
      return;
    }
    
    // Apply daily bonus
    const dailyReward = rewards.daily || defaults.rewards.daily;
    const newProfile = { ...profile };
    
    // Update last claim time and streak
    newProfile.lastClaimISO = new Date().toISOString();
    newProfile.streak = (newProfile.streak || 0) + 1;
    
    // Apply rewards
    newProfile.xp = (newProfile.xp || 0) + dailyReward.xp;
    newProfile.coins = (newProfile.coins || 0) + dailyReward.coins;
    newProfile.health = Math.min(10, (newProfile.health || 5) + dailyReward.health);
    newProfile.food = Math.min(10, (newProfile.food || 5) + dailyReward.food);
    newProfile.level = newProfile.level || 1;
    
    // Handle level-ups
    while (newProfile.xp >= (100 * newProfile.level)) {
      newProfile.xp -= (100 * newProfile.level);
      newProfile.level += 1;
    }
    
    // Save to storage
    await chrome.storage.sync.set({ profile: newProfile });
    
    // Update UI
    checkDailyBonus();
    
    showStatus(`Daily bonus claimed! +${dailyReward.xp} XP, +${dailyReward.coins} Coins, +${dailyReward.health} Health, +${dailyReward.food} Food`, 'success');
    
  } catch (error) {
    console.error('Failed to claim daily bonus:', error);
    showStatus('Failed to claim daily bonus', 'error');
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

// Show status message
function showStatus(message, type = 'info') {
  elements.status.className = `status ${type}`;
  elements.status.textContent = message;
  elements.status.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    elements.status.style.display = 'none';
  }, 5000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}