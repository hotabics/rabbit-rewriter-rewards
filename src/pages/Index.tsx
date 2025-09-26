import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import ComparisonTable from "@/components/ComparisonTable";
import LanguageToggle from "@/components/LanguageToggle";
import logo from "@/assets/logo.png";

const Index = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          
          {/* Language Toggle */}
          <div className="absolute top-4 right-4">
            <LanguageToggle />
          </div>
          <div className="mb-8">
            <img src={logo} alt="White Rabbit Icon" className="w-24 h-24 mx-auto mb-6 rounded-2xl shadow-xl wr-gradient-primary p-4" />
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
            {t('hero.tagline')}
          </p>
          
          <p className="text-lg md:text-xl text-primary font-semibold mb-4 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtext')}
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
              {t('hero.installFree')}
            </Button>
            <Link to="/demo">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                {t('hero.tryDemo')}
              </Button>
            </Link>
            <Link to="/documentation">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                {t('hero.viewDocs')}
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
                {t('hero.supportCoffee')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('features.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Core Features Row */}
            <Card className="wr-glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {t('features.rewrite.title')}
                </CardTitle>
                <CardDescription>
                  {t('features.rewrite.desc')}
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
                  {t('features.summarize.title')}
                </CardTitle>
                <CardDescription>
                  {t('features.summarize.desc')}
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
                  {t('features.translate.title')}
                </CardTitle>
                <CardDescription>
                  {t('features.translate.desc')}
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
                  {t('features.explain.title')}
                </CardTitle>
                <CardDescription>
                  {t('features.explain.desc')}
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
          
          {/* Premium Features Row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="wr-glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {t('features.interactive.title')}
                  <Badge className="text-xs wr-gradient-primary text-primary-foreground">Premium</Badge>
                </CardTitle>
                <CardDescription>
                  {t('features.interactive.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Earn <span className="text-success font-medium">+15 XP</span> • 
                  <span className="text-warning font-medium"> +6 ⦿</span>
                </div>
              </CardContent>
            </Card>

            <Card className="wr-glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {t('features.podcast.title')}
                  <Badge className="text-xs wr-gradient-primary text-primary-foreground">Premium</Badge>
                </CardTitle>
                <CardDescription>
                  {t('features.podcast.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Earn <span className="text-success font-medium">+10 XP</span> • 
                  <span className="text-warning font-medium"> +4 ⦿</span>
                </div>
              </CardContent>
            </Card>

            <Card className="wr-glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {t('features.gamification.title')}
                </CardTitle>
                <CardDescription>
                  {t('features.gamification.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Levels • Streaks • Daily bonuses
                </div>
              </CardContent>
            </Card>

            <Card className="wr-glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {t('features.personalization.title')}
                  <Badge className="text-xs wr-gradient-primary text-primary-foreground">Premium</Badge>
                </CardTitle>
                <CardDescription>
                  {t('features.personalization.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Smart • Adaptive • Tailored
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <ComparisonTable />

      {/* Installation Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t('install.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. {t('install.step1')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('install.step1.desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. {t('install.step2')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('install.step2.desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3. {t('install.step3')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('install.step3.desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-4">{t('install.apiCompat')}</h3>
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

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('faq.title')}
          </h2>
          
          <div className="grid md:grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('faq.safe.q')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('faq.safe.a')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('faq.apiKey.q')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('faq.apiKey.a')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('faq.websites.q')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('faq.websites.a')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <img src={logo} alt="White Rabbit" className="w-12 h-12 mx-auto rounded-lg wr-gradient-primary p-2" />
          </div>
          <p className="text-muted-foreground mb-6">
            {t('footer.tagline')}
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
                {t('footer.support')}
              </Button>
            </a>
          </div>
          
          <div className="flex justify-center gap-6">
            <Link to="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.documentation')}
            </Link>
            <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.support_page')}
            </Link>
            <a href="https://github.com/hotabics/rabbit-rewriter-rewards" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.github')}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
