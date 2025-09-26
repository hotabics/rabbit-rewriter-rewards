# White Rabbit — Feed & Follow — Free vs Premium Guide

This document explains how to configure and manage the Free vs Premium features in the White Rabbit extension.

## Overview

White Rabbit offers a **freemium model**:

- **Free**: Core AI features (Rewrite, Summarize, Translate, Explain Step-by-Step) + basic gamification
- **Premium**: Advanced features (Interactive Tasks, Podcast Audio, Personalization, Bonus Rewards)

## Configuration

### Setting Subscription Status

The subscription status is stored in Chrome's sync storage. To manually set the subscription level:

1. Open the extension popup
2. Open Chrome DevTools (F12)
3. Go to Console tab
4. Run one of these commands:

```javascript
// Set to Premium
chrome.storage.sync.set({ subscription: "premium" });

// Set to Free
chrome.storage.sync.set({ subscription: "free" });

// Check current status
chrome.storage.sync.get(['subscription'], (result) => {
  console.log('Current subscription:', result.subscription);
});
```

### Default Storage Schema

The extension uses this storage structure:

```javascript
{
  "profile": {
    "level": 1,
    "xp": 0,
    "coins": 10,
    "health": 5,
    "food": 5,
    "streak": 0,
    "lastClaimISO": "",
    "knowledgeLevel": "beginner", // beginner, intermediate, advanced
    "skills": ["programming"],     // programming, design, languages, business, etc.
    "learningStyle": "visual"      // visual, audio, practical
  },
  "subscription": "free", // "free" or "premium"
  "settings": {
    "apiKey": "",
    "baseUrl": "https://api.openai.com/v1",
    "model": "gpt-4o-mini",
    "temperature": 0.3,
    "defaultTone": "neutral",
    "defaultLanguage": "original",
    "systemPrompt": "..."
  }
}
```

## Feature Comparison

| Feature | Free | Premium |
|---------|------|---------|
| Rewrite text with AI | ✅ | ✅ |
| Summarize text | ✅ | ✅ |
| Translate text | ✅ | ✅ |
| Explain Step-by-Step (selection) | ✅ | ✅ |
| Interactive Task Generator (full page HTML → step-by-step tasks) | ❌ | ✅ |
| Convert page to Podcast audio (TTS API) | ❌ | ✅ |
| Personalized explanations (adapted to skills & knowledge level) | ❌ | ✅ |
| Bonus rewards (extra XP, Coins, Health, Food) | ❌ | ✅ |
| Daily quests & streak boosters | ❌ | ✅ |
| Priority support & early access to new features | ❌ | ✅ |

## Upsell Flow

### Website Upsell

The landing page includes a comparison table that shows Free vs Premium features. Users can:

1. View the detailed feature comparison
2. Click "Upgrade to Premium" (currently a dummy action)
3. Use the language toggle (EN/LV) to view content in their preferred language

### Extension Upsell

When free users try to access premium features:

1. **Interactive Task Generator**: Click triggers upsell modal
2. **Podcast Audio**: Click triggers upsell modal
3. **Personalization Settings**: Locked for free users

The upsell modal shows:
- Feature comparison table
- "Upgrade to Premium" button (dummy action - sets subscription to "premium")
- "Keep using Free" button (closes modal)

### Success Flow

After "upgrading":
1. Success message: "You are now Premium! 🎉"
2. Premium badge appears in the widget
3. All premium features become unlocked
4. Premium-only buttons become functional

## Customizing the Comparison Table

To modify the feature comparison:

1. **Website version**: Edit `src/components/ComparisonTable.tsx`
2. **Extension modal**: Same component is used, controlled by `compact` prop
3. **Translations**: Update `src/hooks/useLanguage.tsx` for multi-language support

### Adding New Features

To add a new feature to the comparison:

1. Add to the `features` array in `ComparisonTable.tsx`:
```javascript
{ key: 'newFeature', free: false, premium: true }
```

2. Add translations in `useLanguage.tsx`:
```javascript
'comparison.newFeature': 'Your New Feature Description'
```

3. Update the gating logic in relevant components to check subscription status

## Testing

### Testing Free Mode
1. Set subscription to "free"
2. Try clicking premium features → should show upsell modal
3. Verify only basic features work

### Testing Premium Mode  
1. Set subscription to "premium"
2. All features should be unlocked
3. Premium badge should be visible
4. No upsell modals should appear

### Testing Upgrade Flow
1. Start in free mode
2. Click premium feature → upsell modal appears
3. Click "Upgrade to Premium" → success message
4. Verify premium status persists across browser sessions

## Future Integration

Currently uses dummy premium toggles. For real subscription integration:

1. Replace dummy upgrade logic with actual payment flow (Stripe, Paddle, etc.)
2. Add server-side subscription validation
3. Implement subscription management (cancel, change plans, etc.)
4. Add trial periods and grace periods
5. Sync subscription status across devices

## Support

For subscription-related issues:
- Check storage values in DevTools
- Verify API responses (when real backend is integrated)
- Clear extension storage and reinitialize if needed

```javascript
// Reset extension storage
chrome.storage.sync.clear();
```