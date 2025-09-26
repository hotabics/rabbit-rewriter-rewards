// White Rabbit Background Service Worker (MV3)

// Initialize extension on install
chrome.runtime.onInstalled.addListener(async () => {
  console.log('White Rabbit extension installed');
  
  // Initialize storage with defaults
  await initializeStorage();
  
  // Create context menu
  createContextMenus();
});

// Initialize default storage values
async function initializeStorage() {
  const defaults = {
    profile: {
      level: 1,
      xp: 0,
      coins: 10,
      health: 5,
      food: 5,
      streak: 0,
      lastClaimISO: "",
      knowledgeLevel: "beginner", // beginner, intermediate, advanced
      skills: ["programming"], // programming, design, languages, business, etc.
      learningStyle: "visual" // visual, audio, practical
    },
    subscription: "free", // free, premium
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
      "interactive-task": { xp: 15, coins: 6, health: 3, food: 3 },
      "complete-step": { xp: 3, coins: 1, health: 0, food: 0 },
      daily: { xp: 10, coins: 5, health: 2, food: 2 }
    }
  };

  // Only set defaults if keys don't exist
  const existing = await chrome.storage.sync.get(Object.keys(defaults));
  const toSet = {};
  
  for (const [key, value] of Object.entries(defaults)) {
    if (!existing[key]) {
      toSet[key] = value;
    }
  }
  
  if (Object.keys(toSet).length > 0) {
    await chrome.storage.sync.set(toSet);
  }
}

// Create context menu structure
function createContextMenus() {
  // Remove existing menus
  chrome.contextMenus.removeAll(() => {
    // Create main menu
    chrome.contextMenus.create({
      id: "white-rabbit-main",
      title: "White Rabbit",
      contexts: ["selection"]
    });

    // Create submenu items
    const modes = [
      { id: "rewrite", title: "Rewrite selection" },
      { id: "summarize", title: "Summarize selection" },
      { id: "translate", title: "Translate selection" },
      { id: "explain-step-by-step", title: "Explain Step-by-Step" }
    ];

    modes.forEach(mode => {
      chrome.contextMenus.create({
        id: `white-rabbit-${mode.id}`,
        parentId: "white-rabbit-main",
        title: mode.title,
        contexts: ["selection"]
      });
    });
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('white-rabbit-')) {
    const mode = info.menuItemId.replace('white-rabbit-', '');
    
    if (mode !== 'main') {
      // Send message to content script
      chrome.tabs.sendMessage(tab.id, {
        type: 'WR_PROCESS',
        mode: mode,
        text: info.selectionText
      });
    }
  }
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'rewrite-selection') {
    chrome.tabs.sendMessage(tab.id, {
      type: 'WR_HOTKEY'
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_SETTINGS') {
    chrome.storage.sync.get(['settings', 'profile']).then(result => {
      sendResponse({ 
        ...result.settings,
        profile: result.profile || {} 
      });
    });
    return true; // Will respond asynchronously
  }
  
  if (request.type === 'UPDATE_PROFILE') {
    chrome.storage.sync.set({ profile: request.profile }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});