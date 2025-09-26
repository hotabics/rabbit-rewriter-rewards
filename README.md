# White Rabbit — Feed & Follow

**Chrome Extension (Manifest V3)** that supercharges your text with AI and gamification! 🐰✨

Select any text on any webpage and ask White Rabbit to **rewrite**, **summarize**, **translate**, or create **step-by-step explanations**. Earn XP, Health, Food, and Coins with every successful AI interaction!

## 🚀 Features

### 🤖 AI-Powered Text Processing
- **Rewrite** - Improve clarity and tone
- **Summarize** - Extract key points
- **Translate** - Convert to different languages  
- **Explain Step-by-Step** - Break down complex tasks

### 🎮 Gamification System
- **Level up** by earning XP
- **Collect rewards**: Health ❤️, Food 🍖, Coins ⦿
- **Daily streaks** with bonus rewards
- **Beautiful progress tracking**

### ⚡ Lightning Fast UX
- Right-click context menu
- Keyboard shortcut (`Ctrl+Shift+R`)
- Non-blocking overlay with streaming results
- Replace, Copy, Undo, and Claim actions

### 🔧 Fully Configurable
- OpenAI-compatible API support
- Custom base URLs and models
- Adjustable tone and language preferences
- Editable reward system

## 📦 Installation

### Quick Setup (Load Unpacked)
1. Open `chrome://extensions/`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the extension folder
5. 🎉 White Rabbit is ready!

### First-Time Configuration
1. Click the White Rabbit icon in your toolbar
2. Click **Options** at the bottom
3. Add your **API Key** (OpenAI or compatible provider)
4. Configure **Base URL** and **Model** if needed
5. Save settings and start using!

## 🎯 How to Use

### Method 1: Right-Click Menu
1. **Select any text** on any webpage
2. **Right-click** → **White Rabbit** → Choose your action
3. **Watch the magic happen** in the floating overlay
4. **Click "Mark as Done"** to claim your rewards!

### Method 2: Keyboard Shortcut
1. **Select text** you want to process
2. Press **`Ctrl+Shift+R`** (default: rewrite mode)
3. **Enjoy the results** and claim rewards

### Method 3: Extension Popup
1. **Select text** first
2. **Click the White Rabbit icon**
3. **Choose mode and settings**
4. **Click "Ask White Rabbit"**

## ⚙️ Configuration

### API Settings
- **API Key**: Your OpenAI or compatible API key
- **Base URL**: API endpoint (default: OpenAI)
- **Model**: AI model to use (default: gpt-4o-mini)
- **Temperature**: Creativity level (0-1)

### Gamification
- **Rewards**: Customize XP/coins for each action
- **Daily Bonus**: Claim every 20 hours
- **Progress**: Track level, health, food, coins, streaks

### Privacy & Security
- ✅ **API keys stored locally** (never sent to White Rabbit servers)
- ✅ **Configurable AI providers** (bring your own API)
- ✅ **Selection-only processing** (no page scraping)
- ✅ **Transparent data handling**

## 🛠️ Technical Details

### Architecture
```
├── manifest.json          # Extension configuration
├── background.js          # Service worker (context menu, shortcuts)  
├── contentScript.js       # Text processing & overlay UI
├── popup.html/js          # Extension popup interface
├── options.html/js        # Settings configuration
├── lib/
│   ├── aiClient.js        # OpenAI-compatible API client
│   └── storage.js         # Storage utilities & gamification
└── assets/               # Icons and images
```

### Manifest V3 Compliance
- ✅ Service worker background script
- ✅ Declarative permissions
- ✅ Content security policy compliant
- ✅ Modern Chrome APIs

### API Compatibility
- **OpenAI** (GPT-3.5, GPT-4, GPT-4o series)
- **Azure OpenAI** (with custom base URL)
- **Anthropic Claude** (via compatible proxy)
- **Local LLMs** (Ollama, LocalAI, etc.)
- **Custom endpoints** (any OpenAI-compatible API)

## 🎨 Customization

### Reward System
Edit the rewards JSON in Options to customize XP, coins, health, and food gained from each action:

```json
{
  "rewrite": {"xp": 8, "coins": 3, "health": 1, "food": 1},
  "summarize": {"xp": 6, "coins": 2, "health": 1, "food": 1},
  "translate": {"xp": 5, "coins": 2, "health": 0, "food": 1},
  "explain-step-by-step": {"xp": 12, "coins": 4, "health": 2, "food": 2},
  "daily": {"xp": 10, "coins": 5, "health": 2, "food": 2}
}
```

### System Prompts
Customize how the AI behaves by editing the system prompt in Options.

## 🐛 Troubleshooting

### Common Issues

**"API key is required" error**
- Go to Options and add your API key
- Make sure it's valid and has sufficient credits

**Text replacement not working**
- Try using Copy instead of Replace for complex websites
- Some sites block content modification

**Extension not loading**
- Check Developer mode is enabled
- Reload the extension in chrome://extensions/

### Debug Mode
1. Open Chrome DevTools (F12)
2. Check Console for error messages
3. Look for "White Rabbit" logs

### Rate Limits
- The extension includes automatic retry logic
- Consider using a different model if hitting limits
- Check your API provider's rate limit settings

## 🔒 Privacy Policy

**Data Processing**: Selected text is sent to your configured AI provider for processing. No data is stored or transmitted to White Rabbit servers.

**Storage**: Settings and gamification data are stored locally in Chrome's sync storage.

**API Keys**: Stored securely in Chrome's encrypted storage and never transmitted to third parties.

## 📄 License

MIT License - See LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Issues**: Report bugs on GitHub
- **Feature Requests**: Submit enhancement ideas
- **Documentation**: Check the wiki for advanced usage

---

**Made with ❤️ by the White Rabbit team**

*Follow the White Rabbit down the productivity hole!* 🐰⚡