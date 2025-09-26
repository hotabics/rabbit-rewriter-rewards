import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface ComparisonTableProps {
  showUpgrade?: boolean;
  onUpgrade?: () => void;
  onStayFree?: () => void;
  compact?: boolean;
}

const ComparisonTable = ({ showUpgrade = false, onUpgrade, onStayFree, compact = false }: ComparisonTableProps) => {
  const { t } = useLanguage();

  const features = [
    { key: 'rewrite', free: true, premium: true },
    { key: 'summarize', free: true, premium: true },
    { key: 'translate', free: true, premium: true },
    { key: 'explain', free: true, premium: true },
    { key: 'interactive', free: false, premium: true },
    { key: 'podcast', free: false, premium: true },
    { key: 'personalized', free: false, premium: true },
    { key: 'bonusRewards', free: false, premium: true },
    { key: 'dailyQuests', free: false, premium: true },
    { key: 'prioritySupport', free: false, premium: true },
  ];

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm font-medium border-b pb-2">
          <div>{t('comparison.feature')}</div>
          <div className="text-center">{t('comparison.free')}</div>
          <div className="text-center">{t('comparison.premium')}</div>
        </div>
        
        {features.slice(0, 6).map((feature) => (
          <div key={feature.key} className="grid grid-cols-3 gap-4 items-center text-sm py-2">
            <div className="font-medium">{t(`comparison.${feature.key}`)}</div>
            <div className="text-center">
              {feature.free ? (
                <Check className="w-4 h-4 text-success mx-auto" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground mx-auto" />
              )}
            </div>
            <div className="text-center">
              {feature.premium ? (
                <Check className="w-4 h-4 text-success mx-auto" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground mx-auto" />
              )}
            </div>
          </div>
        ))}
        
        {showUpgrade && (
          <div className="flex gap-2 pt-4">
            <Button onClick={onUpgrade} className="flex-1 wr-button-primary">
              {t('comparison.upgradeToPremium')}
            </Button>
            <Button onClick={onStayFree} variant="outline" className="flex-1">
              {t('comparison.stayFree')}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t('comparison.title')}
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{t('comparison.feature')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.key} className="text-sm font-medium py-2 border-b border-border/50 last:border-0">
                    {t(`comparison.${feature.key}`)}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Free Column */}
          <div className="lg:col-span-1">
            <Card className="h-full border-2">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-2 bg-muted text-muted-foreground">
                  {t('comparison.free')}
                </Badge>
                <CardTitle className="text-xl">{t('comparison.free')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.key} className="flex justify-center py-2 border-b border-border/50 last:border-0">
                    {feature.free ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Premium Column */}
          <div className="lg:col-span-1">
            <Card className="h-full border-2 border-primary wr-glass-card">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-2 wr-gradient-primary text-primary-foreground">
                  ⭐ {t('comparison.premium')}
                </Badge>
                <CardTitle className="text-xl">{t('comparison.premium')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.key} className="flex justify-center py-2 border-b border-border/50 last:border-0">
                    {feature.premium ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
                {showUpgrade && (
                  <div className="pt-4 space-y-2">
                    <Button onClick={onUpgrade} className="w-full wr-button-primary">
                      {t('comparison.upgradeToPremium')}
                    </Button>
                    <Button onClick={onStayFree} variant="outline" className="w-full">
                      {t('comparison.stayFree')}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;