import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageToggle from "@/components/LanguageToggle";
import FeatureCard from "@/components/FeatureCard";
import UpsellModal from "@/components/UpsellModal";
import ComparisonTable from "@/components/ComparisonTable";

const Demo = () => {
  const { t } = useLanguage();
  const [plan, setPlan] = useState<'free' | 'premium'>('free');
  const [showUpsell, setShowUpsell] = useState(false);

  const handleUpgrade = () => {
    setPlan('premium');
    setShowUpsell(false);
  };

  const handlePremiumClick = () => {
    setShowUpsell(true);
  };

  const features = [
    {
      title: "✍️ Rewrite",
      description: "Improve clarity and tone of any text",
      type: 'rewrite' as const,
      isPremium: false,
      demoContent: t('demo.demoText')
    },
    {
      title: "📝 Summarize", 
      description: "Extract key points and main ideas",
      type: 'summarize' as const,
      isPremium: false,
      demoContent: t('demo.demoTextSummary')
    },
    {
      title: "🌐 Translate",
      description: "Convert to different languages",
      type: 'translate' as const,
      isPremium: false,
      demoContent: t('demo.demoTextTranslate')
    },
    {
      title: "📋 Explain Step-by-Step",
      description: "Break down complex tasks step-by-step",
      type: 'explain' as const,
      isPremium: false,
      demoContent: t('demo.demoTextExplain')
    },
    {
      title: "🎯 Interactive Task Generator",
      description: "Full page HTML → step-by-step task generator",
      type: 'interactive' as const,
      isPremium: true,
      demoContent: t('demo.demoHTML')
    },
    {
      title: "🎧 Convert to Podcast Audio",
      description: "Convert any page to audio podcast",
      type: 'podcast' as const,
      isPremium: true,
      demoContent: t('demo.demoTextSummary')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <LanguageToggle />
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('demo.title')}
              </h1>
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('demo.subtitle')}
          </p>
          
          {/* Plan Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className={`text-sm ${plan === 'free' ? 'font-medium' : 'text-muted-foreground'}`}>
              Free
            </span>
            <Switch
              checked={plan === 'premium'}
              onCheckedChange={(checked) => setPlan(checked ? 'premium' : 'free')}
            />
            <span className={`text-sm ${plan === 'premium' ? 'font-medium' : 'text-muted-foreground'}`}>
              Premium
            </span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Button disabled variant="outline">
              {t('hero.installFree')}
            </Button>
            {plan === 'free' && (
              <Button onClick={() => setPlan('premium')}>
                {t('comparison.upgradeToPremium')}
              </Button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              type={feature.type}
              isPremium={feature.isPremium}
              isBlocked={feature.isPremium && plan === 'free'}
              onPremiumClick={handlePremiumClick}
              demoContent={feature.demoContent}
            />
          ))}
        </div>

        {/* Comparison Table Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {t('comparison.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonTable compact={true} />
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {t('faq.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{t('faq.safe.q')}</h3>
                <p className="text-muted-foreground">{t('faq.safe.a')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('faq.apiKey.q')}</h3>
                <p className="text-muted-foreground">{t('faq.apiKey.a')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('faq.websites.q')}</h3>
                <p className="text-muted-foreground">{t('faq.websites.a')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            {t('footer.tagline')}
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" disabled>
              Chrome Web Store
            </Button>
            <Button variant="outline" disabled>
              {t('footer.github')}
            </Button>
          </div>
        </div>

        {/* Upsell Modal */}
        <UpsellModal 
          isOpen={showUpsell}
          onClose={() => setShowUpsell(false)}
          onUpgrade={handleUpgrade}
        />
      </div>
    </div>
  );
};

export default Demo;