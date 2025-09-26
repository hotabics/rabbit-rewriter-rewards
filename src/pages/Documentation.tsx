import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Settings, MousePointer2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import icon512 from "@/assets/icon512.png";

const Documentation = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="py-8 px-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <img src={icon512} alt="White Rabbit" className="w-8 h-8 rounded-lg" />
                <h1 className="text-2xl font-bold">White Rabbit Documentation</h1>
              </div>
            </div>
            <Badge variant="secondary">v1.0.0</Badge>
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📖 Table of Contents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2">
                    <li><a href="#installation" className="text-primary hover:underline">1. Installation Guide</a></li>
                    <li><a href="#configuration" className="text-primary hover:underline">2. Configuration</a></li>
                    <li><a href="#usage" className="text-primary hover:underline">3. How to Use</a></li>
                    <li><a href="#features" className="text-primary hover:underline">4. Features Overview</a></li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li><a href="#gamification" className="text-primary hover:underline">5. Gamification System</a></li>
                    <li><a href="#troubleshooting" className="text-primary hover:underline">6. Troubleshooting</a></li>
                    <li><a href="#api-support" className="text-primary hover:underline">7. API Support</a></li>
                    <li><a href="#faq" className="text-primary hover:underline">8. FAQ</a></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Installation Guide */}
      <section id="installation" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Download className="w-8 h-8 text-primary" />
            Installation Guide
          </h2>
          
          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Step 1: Download Extension</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Download the White Rabbit extension files from the <a href="https://github.com/hotabics/rabbit-rewriter-rewards" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a> or use the provided download link.
                </p>
                <div className="bg-primary/10 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold mb-2">📁 GitHub Repository</h4>
                  <a href="https://github.com/hotabics/rabbit-rewriter-rewards" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono text-sm">
                    https://github.com/hotabics/rabbit-rewriter-rewards
                  </a>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <img src="/api/placeholder/600/200" alt="Download extension files screenshot" className="w-full rounded border" />
                  <p className="text-sm text-muted-foreground mt-2">Screenshot: Download extension files from GitHub</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Step 2: Enable Developer Mode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Open Chrome and navigate to <code className="bg-muted px-2 py-1 rounded">chrome://extensions/</code>
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Click on the toggle switch for "Developer mode" in the top right</li>
                  <li>The page will refresh and show additional options</li>
                </ol>
                <div className="bg-muted rounded-lg p-4">
                  <img src="/api/placeholder/600/300" alt="Chrome extensions page with developer mode enabled" className="w-full rounded border" />
                  <p className="text-sm text-muted-foreground mt-2">Screenshot: Chrome extensions page with Developer mode enabled</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Step 3: Load Unpacked Extension</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Click "Load unpacked" button and select the White Rabbit extension folder.
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <img src="/api/placeholder/600/300" alt="Load unpacked extension dialog" className="w-full rounded border" />
                  <p className="text-sm text-muted-foreground mt-2">Screenshot: Load unpacked extension dialog</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section id="configuration" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Configuration
          </h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>API Key Setup</CardTitle>
              <CardDescription>Configure your AI provider to start using White Rabbit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Right-click on the White Rabbit extension icon and select "Options" to open the configuration page.
              </p>
              <div className="bg-muted rounded-lg p-4">
                <img src="/api/placeholder/600/400" alt="White Rabbit options page" className="w-full rounded border" />
                <p className="text-sm text-muted-foreground mt-2">Screenshot: White Rabbit options/settings page</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Supported Providers:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>OpenAI</Badge>
                    <Badge>Azure OpenAI</Badge>
                    <Badge>Anthropic Claude</Badge>
                    <Badge>Local LLMs</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Required Fields:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• API Key or Token</li>
                    <li>• Model Selection</li>
                    <li>• Custom Endpoint (optional)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Guide */}
      <section id="usage" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <MousePointer2 className="w-8 h-8 text-primary" />
            How to Use White Rabbit
          </h2>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Usage Flow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">1. Select Text</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Highlight any text on any webpage that you want to process.
                    </p>
                    <div className="bg-muted rounded-lg p-3">
                      <img src="/api/placeholder/400/200" alt="Text selection example" className="w-full rounded border" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">2. Right-Click Menu</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Right-click on selected text to see White Rabbit options.
                    </p>
                    <div className="bg-muted rounded-lg p-3">
                      <img src="/api/placeholder/400/200" alt="Context menu with White Rabbit options" className="w-full rounded border" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">3. Choose Action</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select from Rewrite, Summarize, Translate, or Explain options.
                    </p>
                    <div className="bg-muted rounded-lg p-3">
                      <img src="/api/placeholder/400/200" alt="Action selection menu" className="w-full rounded border" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">4. View Results</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI-processed text appears in a popup with gamification rewards.
                    </p>
                    <div className="bg-muted rounded-lg p-3">
                      <img src="/api/placeholder/400/200" alt="Results popup with XP rewards" className="w-full rounded border" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            Features Overview
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ✍️ Rewrite Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Improve clarity, tone, and style of any text. Perfect for emails, documents, and social media posts.
                </p>
                <div className="bg-success/10 rounded-lg p-3 text-sm">
                  <strong>Rewards:</strong> +8 XP • +3 Food
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📝 Summarize
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Extract key points and main ideas from long texts, articles, or documents.
                </p>
                <div className="bg-success/10 rounded-lg p-3 text-sm">
                  <strong>Rewards:</strong> +6 XP • +2 Food
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌐 Translate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Convert text to different languages with context-aware translations.
                </p>
                <div className="bg-success/10 rounded-lg p-3 text-sm">
                  <strong>Rewards:</strong> +5 XP • +2 Food
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📋 Explain Step-by-Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Break down complex instructions, code, or concepts into simple steps.
                </p>
                <div className="bg-success/10 rounded-lg p-3 text-sm">
                  <strong>Rewards:</strong> +12 XP • +4 Food
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gamification System */}
      <section id="gamification" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">🎮 Gamification System</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Earn Rewards for Every Action</CardTitle>
              <CardDescription>Track your progress and build productive habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Reward Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                        ⭐
                      </div>
                      <div>
                        <p className="font-medium">Experience Points (XP)</p>
                        <p className="text-sm text-muted-foreground">Track your overall progress</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-health/20 flex items-center justify-center">
                        ❤️
                      </div>
                      <div>
                        <p className="font-medium">Health Points</p>
                        <p className="text-sm text-muted-foreground">Maintain your productivity streak</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-food/20 flex items-center justify-center">
                        🍕
                      </div>
                      <div>
                        <p className="font-medium">Food Energy</p>
                        <p className="text-sm text-muted-foreground">Fuel for continued learning</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-coins/20 flex items-center justify-center">
                        🪙
                      </div>
                      <div>
                        <p className="font-medium">Coins</p>
                        <p className="text-sm text-muted-foreground">Currency for future features</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Progress Screenshot</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <img src="/api/placeholder/300/200" alt="Gamification progress display" className="w-full rounded border" />
                    <p className="text-sm text-muted-foreground mt-2">Your progress and rewards dashboard</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">🔧 Troubleshooting</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Extension not appearing in context menu</h4>
                    <p className="text-sm text-muted-foreground">
                      • Ensure the extension is enabled in chrome://extensions/ <br/>
                      • Refresh the webpage after installing <br/>
                      • Check that text is properly selected
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">API errors or no responses</h4>
                    <p className="text-sm text-muted-foreground">
                      • Verify your API key is correct in extension options <br/>
                      • Check your API provider's usage limits <br/>
                      • Ensure stable internet connection
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Gamification not tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      • Enable local storage permissions <br/>
                      • Clear extension data and restart <br/>
                      • Check browser console for errors
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Support */}
      <section id="api-support" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">🔌 API Support</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Supported AI Providers</CardTitle>
              <CardDescription>White Rabbit works with multiple AI services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Official Providers</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">OpenAI</Badge>
                      GPT-3.5, GPT-4, GPT-4 Turbo
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Anthropic</Badge>
                      Claude 3 Haiku, Sonnet, Opus
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Azure</Badge>
                      Azure OpenAI Service
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Custom Endpoints</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Local LLMs (Ollama, LM Studio)</li>
                    <li>• Custom API endpoints</li>
                    <li>• Self-hosted models</li>
                    <li>• Compatible REST APIs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">❓ Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is White Rabbit free to use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The extension itself is free, but you'll need an API key from your chosen AI provider. Most providers offer free tiers or credits for new users.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Does it work on all websites?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! White Rabbit works on any website where you can select text. This includes articles, emails, social media, documentation, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your selected text is sent directly to your chosen AI provider. White Rabbit doesn't store or log your text. Your API keys are stored locally in your browser.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I customize the context menu options?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Currently, the four main actions (Rewrite, Summarize, Translate, Explain) are fixed. Customization options may be added in future versions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-background/80">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={icon512} alt="White Rabbit" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold">White Rabbit Documentation</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Need more help? Check our GitHub repository or contact support.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              GitHub
            </Button>
            <Button variant="outline" size="sm">
              Support
            </Button>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Documentation;