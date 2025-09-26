import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import icon512 from "@/assets/icon512.png";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <img src={icon512} alt="White Rabbit Icon" className="w-24 h-24 mx-auto mb-6 rounded-2xl shadow-xl wr-gradient-primary p-4" />
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              White Rabbit
            </h1>
            <Badge className="bg-green-500 text-white text-lg px-4 py-2 font-bold animate-pulse">
              FREE
            </Badge>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            Feed & Follow
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered Chrome extension with gamification. Select text and ask White Rabbit to 
            <strong className="text-primary"> rewrite</strong>, 
            <strong className="text-primary"> summarize</strong>, 
            <strong className="text-primary"> translate</strong>, or 
            <strong className="text-primary"> explain step-by-step</strong>. 
            Earn XP, Health, Food, and Coins!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              🐰 Chrome MV3
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              🤖 AI-Powered
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              🎮 Gamification
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              ⚡ Lightning Fast
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="wr-button-primary text-lg px-8 py-6">
              📁 Load Extension
            </Button>
            <Link to="/demo">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                🎬 Try Demo
              </Button>
            </Link>
            <Link to="/documentation">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                📖 View Documentation
              </Button>
            </Link>
          </div>

          <div className="flex justify-center">
            <a 
              href="https://buymeacoffee.com/whiterabbit.app" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                className="bg-yellow-400/10 border-yellow-400 text-yellow-600 hover:bg-yellow-400/20 px-6 py-3"
              >
                ☕ If you like White Rabbit - Buy Me a Coffee
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ✨ Powerful Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="wr-glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  ✍️ Rewrite
                </CardTitle>
                <CardDescription>
                  Improve clarity and tone of any text
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Earn <span className="text-success font-medium">+8 XP</span> • 
                  <span className="text-warning font-medium"> +3 ⦿</span>
                </div>
              </CardContent>
            </Card>

            <Card className="wr-glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  📝 Summarize
                </CardTitle>
                <CardDescription>
                  Extract key points and main ideas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Earn <span className="text-success font-medium">+6 XP</span> • 
                  <span className="text-warning font-medium"> +2 ⦿</span>
                </div>
              </CardContent>
            </Card>

            <Card className="wr-glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  🌐 Translate
                </CardTitle>
                <CardDescription>
                  Convert to different languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Earn <span className="text-success font-medium">+5 XP</span> • 
                  <span className="text-warning font-medium"> +2 ⦿</span>
                </div>
              </CardContent>
            </Card>

            <Card className="wr-glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  📋 Explain
                </CardTitle>
                <CardDescription>
                  Break down complex tasks step-by-step
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Earn <span className="text-success font-medium">+12 XP</span> • 
                  <span className="text-warning font-medium"> +4 ⦿</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            🚀 Quick Installation
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. Developer Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Open <code className="bg-muted px-2 py-1 rounded">chrome://extensions/</code> and enable Developer mode
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. Load Extension</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Click "Load unpacked" and select the extension folder
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3. Configure API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Add your OpenAI API key in the extension options
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-4">🔑 API Compatibility</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge>OpenAI</Badge>
              <Badge>Azure OpenAI</Badge>
              <Badge>Anthropic Claude</Badge>
              <Badge>Local LLMs</Badge>
              <Badge>Custom Endpoints</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <img src={icon512} alt="White Rabbit" className="w-12 h-12 mx-auto rounded-lg wr-gradient-primary p-2" />
          </div>
          <p className="text-muted-foreground mb-6">
            Follow the White Rabbit down the productivity hole! 🐰⚡
          </p>
          
          <div className="flex justify-center mb-6">
            <a 
              href="https://buymeacoffee.com/whiterabbit.app" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="sm"
                className="bg-yellow-400/10 border-yellow-400 text-yellow-600 hover:bg-yellow-400/20"
              >
                ☕ Support White Rabbit
              </Button>
            </a>
          </div>
          
          <div className="flex justify-center gap-6">
            <Link to="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </Link>
            <a href="https://github.com/hotabics/rabbit-rewriter-rewards" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
