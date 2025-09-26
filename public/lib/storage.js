// White Rabbit Storage Utilities

// Get values from storage
export async function get(keys) {
  return await chrome.storage.sync.get(keys);
}

// Set values to storage
export async function set(obj) {
  return await chrome.storage.sync.set(obj);
}

// Initialize defaults if they don't exist
export async function initDefaults() {
  const defaults = {
    profile: {
      level: 1,
      xp: 0,
      coins: 10,
      health: 5,
      food: 5,
      streak: 0,
      lastClaimISO: ""
    },
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

  const existing = await get(Object.keys(defaults));
  const toSet = {};
  
  for (const [key, value] of Object.entries(defaults)) {
    if (!existing[key]) {
      toSet[key] = value;
    }
  }
  
  if (Object.keys(toSet).length > 0) {
    await set(toSet);
  }
}

// Apply rewards and handle level-ups
export function applyRewards(profile, rewardDelta) {
  const newProfile = { ...profile };
  
  // Apply rewards
  newProfile.xp += rewardDelta.xp || 0;
  newProfile.coins += rewardDelta.coins || 0;
  newProfile.health = Math.min(10, newProfile.health + (rewardDelta.health || 0));
  newProfile.food = Math.min(10, newProfile.food + (rewardDelta.food || 0));
  
  // Handle level-ups
  let leveledUp = false;
  while (newProfile.xp >= (100 * newProfile.level)) {
    newProfile.xp -= (100 * newProfile.level);
    newProfile.level += 1;
    leveledUp = true;
  }
  
  return { profile: newProfile, leveledUp };
}

// Check if daily bonus is available
export function canClaimDaily(profile) {
  if (!profile.lastClaimISO) return true;
  
  const lastClaim = new Date(profile.lastClaimISO);
  const now = new Date();
  const hoursSince = (now - lastClaim) / (1000 * 60 * 60);
  
  return hoursSince >= 20;
}

// Claim daily bonus
export function claimDaily(profile) {
  const newProfile = { ...profile };
  newProfile.lastClaimISO = new Date().toISOString();
  newProfile.streak += 1;
  
  return newProfile;
}