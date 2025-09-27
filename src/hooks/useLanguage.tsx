import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'lv';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Hero section
    'hero.tagline': 'Feed & Follow',
    'hero.description': 'AI transforms text into tasks and games. Earn XP, Health, Food and Coins.',
    'hero.subtext': 'AI-powered Chrome extension with gamification. Select text and ask White Rabbit to rewrite, summarize, translate, or explain step-by-step.',
    'hero.installFree': '📁 Install Free',
    'hero.tryDemo': '🎬 Try Demo',
    'hero.viewDocs': '📖 View Documentation',
    'hero.supportCoffee': '☕ If you like White Rabbit - Buy Me a Coffee',
    
    // Demo page
    'demo.title': 'White Rabbit Interactive Demo',
    'demo.subtitle': 'Experience all features with real-time AI demonstrations',
    'demo.planToggle': 'Plan',
    'demo.askRabbit': 'Ask White Rabbit',
    'demo.loading': 'Processing...',
    'demo.copy': 'Copy',
    'demo.copied': 'Copied!',
    'demo.markDone': 'Mark as Done',
    'demo.gainedXP': '+15 XP',
    'demo.gainedCoins': '+5 Coins',
    'demo.playAudio': 'Play',
    'demo.downloadAudio': 'Download',
    'demo.demoText': 'This complex sentence has many unnecessary words and redundant descriptions that make it difficult to understand.',
    'demo.demoTextSummary': 'Complete guide to CSS Grid layout system with responsive design patterns.',
    'demo.demoTextTranslate': 'Good morning! How are you today?',
    'demo.demoTextExplain': 'Create a simple Express.js server with basic routing',
    'demo.demoHTML': '<article><h2>Getting Started with CSS Grid</h2><p>CSS Grid helps you build complex, responsive layouts.</p><h3>Basic Concepts</h3><p>Grid container, grid items, tracks, gaps.</p></article>',
    
    // Features
    'features.title': '✨ Powerful Features',
    'features.rewrite.title': '✍️ Rewrite',
    'features.rewrite.desc': 'Improve clarity and tone of any text',
    'features.summarize.title': '📝 Summarize', 
    'features.summarize.desc': 'Extract key points and main ideas',
    'features.translate.title': '🌐 Translate',
    'features.translate.desc': 'Convert to different languages',
    'features.explain.title': '📋 Explain',
    'features.explain.desc': 'Break down complex tasks step-by-step',
    'features.interactive.title': '🎯 Interactive Tasks',
    'features.interactive.desc': 'Full page HTML → step-by-step task generator',
    'features.podcast.title': '🎧 Podcast Audio',
    'features.podcast.desc': 'Convert any page to audio podcast',
    'features.gamification.title': '🎮 Gamification',
    'features.gamification.desc': 'Earn XP, coins, health & food rewards',
    'features.personalization.title': '👤 Personalization',
    'features.personalization.desc': 'Adapted to your skills & knowledge level',
    
    // Installation
    'install.title': '🚀 Quick Installation',
    'install.step1': 'Developer Mode',
    'install.step1.desc': 'Open chrome://extensions/ and enable Developer mode',
    'install.step2': 'Load Extension',
    'install.step2.desc': 'Click "Load unpacked" and select the extension folder',
    'install.step3': 'Configure API',
    'install.step3.desc': 'Add your OpenAI API key in the extension options',
    'install.apiCompat': '🔑 API Compatibility',
    
    // Comparison table
    'comparison.title': '💎 Free vs Premium',
    'comparison.feature': 'Feature',
    'comparison.free': 'Free',
    'comparison.premium': 'Premium',
    'comparison.rewrite': 'Rewrite text with AI',
    'comparison.summarize': 'Summarize text', 
    'comparison.translate': 'Translate text',
    'comparison.explain': 'Explain Step-by-Step (selection)',
    'comparison.interactive': 'Interactive Task Generator (full page HTML → step-by-step tasks)',
    'comparison.podcast': 'Convert page to Podcast audio (NotebookLM / TTS API)',
    'comparison.personalized': 'Personalized explanations (adapted to your skills & knowledge level)',
    'comparison.bonusRewards': 'Bonus rewards (extra XP, Coins, Health, Food)',
    'comparison.dailyQuests': 'Daily quests & streak boosters',
    'comparison.prioritySupport': 'Priority support & early access to new features',
    'comparison.upgradeToPremium': 'Upgrade to Premium',
    'comparison.stayFree': 'Keep using Free',
    
    // FAQ
    'faq.title': '❓ Frequently Asked Questions',
    'faq.safe.q': 'Are my data safe?',
    'faq.safe.a': 'Yes! White Rabbit processes text locally in your browser. Only the text you select is sent to AI APIs (OpenAI, etc.) for processing. No browsing history or personal data is collected.',
    'faq.apiKey.q': 'Do I need an API key?',
    'faq.apiKey.a': 'Yes, you need your own OpenAI API key. This ensures your privacy and gives you control over AI processing costs. The extension is compatible with OpenAI, Azure OpenAI, Anthropic Claude, and local LLMs.',
    'faq.websites.q': 'Does it work on all websites?',
    'faq.websites.a': 'White Rabbit works on most websites where you can select text. Premium features like Interactive Task Generator work best on article pages, tutorials, and educational content.',
    
    // Footer
    'footer.tagline': 'Follow the White Rabbit down the productivity hole! 🐰⚡',
    'footer.support': '☕ Support White Rabbit',
    'footer.documentation': 'Documentation',
    'footer.support_page': 'Support',
    'footer.github': 'GitHub',
    
    // Upsell modal
    'upsell.title': 'Unlock White Rabbit Premium 🐇✨',
    'upsell.freeFeatures': 'Free version: Rewrite, Summarize, Translate, Explain Step-by-Step',
    'upsell.premiumFeatures': 'Premium: Interactive Tasks (HTML) • Personalized Explanations • Podcast Audio • Bonus Rewards',
    'upsell.upgradeSuccess': 'You are now Premium! 🎉'
  },
  lv: {
    // Hero section
    'hero.tagline': 'Baro & Seko',
    'hero.description': 'AI pārvērš tekstu par uzdevumiem un spēli. Pelni XP, Veselību, Ēdienu un Monētas.',
    'hero.subtext': 'AI-darbināts Chrome paplašinājums ar gamifikāciju. Iezīmē tekstu un liec White Rabbit to pārrakstīt, apkopot, tulkot vai izskaidrot soli-pa-solim.',
    'hero.installFree': '📁 Instalēt Bezmaksas',
    'hero.tryDemo': '🎬 Izmēģināt Demo',
    'hero.viewDocs': '📖 Skatīt Dokumentāciju',
    'hero.supportCoffee': '☕ Ja patīk White Rabbit - Nopērc kafiju',
    
    // Demo page
    'demo.title': 'White Rabbit Interaktīvais Demo',
    'demo.subtitle': 'Piedzīvo visas funkcijas ar reāllaika AI demonstrācijām',
    'demo.planToggle': 'Plāns',
    'demo.askRabbit': 'Jautāt White Rabbit',
    'demo.loading': 'Apstrādā...',
    'demo.copy': 'Kopēt',
    'demo.copied': 'Nokopēts!',
    'demo.markDone': 'Atzīmēt kā Pabeigtu',
    'demo.gainedXP': '+15 XP',
    'demo.gainedCoins': '+5 Monētas',
    'demo.playAudio': 'Atskaņot',
    'demo.downloadAudio': 'Lejupielādēt',
    'demo.demoText': 'Šis sarežģītais teikums satur daudz nevajadzīgu vārdu un liekas aprakstus, kas to padara grūti saprotamu.',
    'demo.demoTextSummary': 'Pilnīgs ceļvedis CSS Grid izkārtojuma sistēmai ar responsīviem dizaina modeļiem.',
    'demo.demoTextTranslate': 'Labrīt! Kā tev šodien iet?',
    'demo.demoTextExplain': 'Izveido vienkāršu Express.js serveri ar pamata maršrutēšanu',
    'demo.demoHTML': '<article><h2>Darba sākšana ar CSS Grid</h2><p>CSS Grid palīdz veidot sarežģītus, responsīvus izkārtojumus.</p><h3>Pamata koncepti</h3><p>Grid konteiners, grid elementi, tracks, gaps.</p></article>',
    
    // Features
    'features.title': '✨ Spēcīgas Funkcijas',
    'features.rewrite.title': '✍️ Pārrakstīt',
    'features.rewrite.desc': 'Uzlabo teksta skaidrību un toni',
    'features.summarize.title': '📝 Apkopot',
    'features.summarize.desc': 'Izcel galvenās domas un idejas',
    'features.translate.title': '🌐 Tulkot',
    'features.translate.desc': 'Pārvērst citās valodās',
    'features.explain.title': '📋 Izskaidrot',
    'features.explain.desc': 'Sadalīt sarežģītus uzdevumus soļos',
    'features.interactive.title': '🎯 Interaktīvi Uzdevumi',
    'features.interactive.desc': 'Visa lapa HTML → soli-pa-solim uzdevumu ģenerators',
    'features.podcast.title': '🎧 Podkāsta Audio',
    'features.podcast.desc': 'Pārvērst jebkuru lapu par audio podkāstu',
    'features.gamification.title': '🎮 Gamifikācija',
    'features.gamification.desc': 'Pelni XP, monētas, veselības un ēdiena balvas',
    'features.personalization.title': '👤 Personalizācija',
    'features.personalization.desc': 'Pielāgots tavām prasmēm un zināšanu līmenim',
    
    // Installation
    'install.title': '🚀 Ātra Instalācija',
    'install.step1': 'Izstrādātāja Režīms',
    'install.step1.desc': 'Atver chrome://extensions/ un ieslēdz Izstrādātāja režīmu',
    'install.step2': 'Ielādēt Paplašinājumu',
    'install.step2.desc': 'Klikšķini "Load unpacked" un izvēlies paplašinājuma mapi',
    'install.step3': 'Konfigurēt API',
    'install.step3.desc': 'Pievieno savu OpenAI API atslēgu paplašinājuma iestatījumos',
    'install.apiCompat': '🔑 API Saderība',
    
    // Comparison table
    'comparison.title': '💎 Bezmaksas vs Premium',
    'comparison.feature': 'Funkcija',
    'comparison.free': 'Bezmaksas',
    'comparison.premium': 'Premium',
    'comparison.rewrite': 'Pārrakstīt tekstu ar AI',
    'comparison.summarize': 'Apkopot tekstu',
    'comparison.translate': 'Tulkot tekstu',
    'comparison.explain': 'Izskaidrot Soli-pa-Solim (izvēle)',
    'comparison.interactive': 'Interaktīvo Uzdevumu Ģenerators (visa lapa HTML → soli-pa-solim uzdevumi)',
    'comparison.podcast': 'Pārvērst lapu par Podkāsta audio (NotebookLM / TTS API)',
    'comparison.personalized': 'Personalizēti skaidrojumi (pielāgoti tavām prasmēm un zināšanu līmenim)',
    'comparison.bonusRewards': 'Bonusa balvas (papildu XP, Monētas, Veselība, Ēdiens)',
    'comparison.dailyQuests': 'Ikdienas uzdevumi un sēriju pastiprinātāji',
    'comparison.prioritySupport': 'Prioritārs atbalsts un agrīna piekļuve jaunām funkcijām',
    'comparison.upgradeToPremium': 'Uzlabot uz Premium',
    'comparison.stayFree': 'Turpināt ar Bezmaksas',
    
    // FAQ
    'faq.title': '❓ Bieži Uzdotie Jautājumi',
    'faq.safe.q': 'Vai mani dati ir droši?',
    'faq.safe.a': 'Jā! White Rabbit apstrādā tekstu lokāli tavā pārlūkā. Tikai teksts, ko tu izvēlies, tiek nosūtīts AI API (OpenAI, utt.) apstrādei. Pārlūkošanas vēsture vai personīgie dati netiek savākti.',
    'faq.apiKey.q': 'Vai man vajag API atslēgu?',
    'faq.apiKey.a': 'Jā, tev vajag savu OpenAI API atslēgu. Tas nodrošina tavu privātumu un dod kontroli pār AI apstrādes izmaksām. Paplašinājums ir saderīgs ar OpenAI, Azure OpenAI, Anthropic Claude un vietējiem LLM.',
    'faq.websites.q': 'Vai tas strādā visās lapās?',
    'faq.websites.a': 'White Rabbit strādā lielākajā daļā lapu, kur vari izvēlēties tekstu. Premium funkcijas kā Interaktīvo Uzdevumu Ģenerators vislabāk strādā ar rakstiem, apmācībām un izglītojošu saturu.',
    
    // Footer
    'footer.tagline': 'Seko White Rabbit produktivitātes bedrē! 🐰⚡',
    'footer.support': '☕ Atbalstīt White Rabbit',
    'footer.documentation': 'Dokumentācija',
    'footer.support_page': 'Atbalsts',
    'footer.github': 'GitHub',
    
    // Upsell modal
    'upsell.title': 'Atbloķēt White Rabbit Premium 🐇✨',
    'upsell.freeFeatures': 'Bezmaksas versija: Pārrakstīt, Apkopot, Tulkot, Izskaidrot Soli-pa-Solim',
    'upsell.premiumFeatures': 'Premium: Interaktīvi Uzdevumi (HTML) • Personalizēti Skaidrojumi • Podkāsta Audio • Bonusa Balvas',
    'upsell.upgradeSuccess': 'Tu tagad esi Premium! 🎉'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}