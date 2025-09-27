import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, CheckCircle2 } from 'lucide-react';
import RabbitButton from './RabbitButton';
import AudioPlayer from './AudioPlayer';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

interface FeatureCardProps {
  title: string;
  description: string;
  type: 'rewrite' | 'summarize' | 'translate' | 'explain' | 'interactive' | 'podcast';
  isPremium: boolean;
  isBlocked: boolean;
  onPremiumClick: () => void;
  demoContent: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  type, 
  isPremium, 
  isBlocked, 
  onPremiumClick,
  demoContent 
}: FeatureCardProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [input, setInput] = useState(demoContent);
  const [copied, setCopied] = useState(false);
  const [steps, setSteps] = useState<{ text: string; completed: boolean }[]>([]);
  const [showXP, setShowXP] = useState(false);

  const mockServices = {
    rewrite: async (text: string) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return text.length > 50 
        ? "This sentence is clear and easy to understand."
        : "Improved and cleaner version.";
    },
    
    summarize: async (text: string) => {
      await new Promise(resolve => setTimeout(resolve, 700));
      return [
        "• CSS Grid creates flexible layouts",
        "• Works with responsive design patterns", 
        "• Includes container and item concepts",
        "• Supports gap and track sizing"
      ];
    },
    
    translate: async (text: string, targetLang: string) => {
      await new Promise(resolve => setTimeout(resolve, 600));
      const translations: Record<string, string> = {
        'lv': 'Labrīt! Kā jums šodien klājas?',
        'es': '¡Buenos días! ¿Cómo estás hoy?',
        'fr': 'Bonjour! Comment allez-vous aujourd\'hui?',
        'de': 'Guten Morgen! Wie geht es dir heute?'
      };
      return translations[targetLang] || text;
    },
    
    explain: async (text: string) => {
      await new Promise(resolve => setTimeout(resolve, 900));
      return [
        "Install Node.js and npm on your system",
        "Create a new project folder and run 'npm init'", 
        "Install Express with 'npm install express'",
        "Create app.js and set up basic routing",
        "Add middleware and error handling",
        "Test your server with 'node app.js'"
      ];
    },
    
    interactive: async (html: string) => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      return [
        "Read the CSS Grid introduction and basic concepts",
        "Set up a basic HTML structure with container div",
        "Apply 'display: grid' to create grid container", 
        "Define grid columns using 'grid-template-columns'",
        "Add grid items and observe the layout",
        "Test responsive behavior with media queries"
      ];
    },
    
    podcast: async (text: string) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Create a fake audio blob URL for demo
      const audioBlob = new Blob(['fake audio data'], { type: 'audio/mpeg' });
      return URL.createObjectURL(audioBlob);
    }
  };

  const handleRabbitClick = async () => {
    if (isBlocked) {
      onPremiumClick();
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let response;
      
      switch (type) {
        case 'rewrite':
          response = await mockServices.rewrite(input);
          setResult(response);
          break;
          
        case 'summarize':
          response = await mockServices.summarize(input);
          setResult(response);
          break;
          
        case 'translate':
          response = await mockServices.translate(input, 'lv');
          setResult(response);
          break;
          
        case 'explain':
          response = await mockServices.explain(input);
          const explainSteps = response.map((text: string) => ({ text, completed: false }));
          setSteps(explainSteps);
          setResult(response);
          break;
          
        case 'interactive':
          response = await mockServices.interactive(input);
          const interactiveSteps = response.map((text: string) => ({ text, completed: false }));
          setSteps(interactiveSteps);
          setResult(response);
          break;
          
        case 'podcast':
          response = await mockServices.podcast(input);
          setResult(response);
          break;
      }

      toast({
        title: "Success!",
        description: "White Rabbit has processed your request.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: t('demo.copied'),
        description: "Text copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text.",
        variant: "destructive",
      });
    }
  };

  const toggleStep = (index: number) => {
    const newSteps = [...steps];
    newSteps[index].completed = !newSteps[index].completed;
    setSteps(newSteps);
    
    if (newSteps[index].completed) {
      setShowXP(true);
      setTimeout(() => setShowXP(false), 2000);
      toast({
        title: "Step completed!",
        description: `${t('demo.gainedXP')} • ${t('demo.gainedCoins')}`,
      });
    }
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = steps.length > 0 ? (completedSteps / steps.length) * 100 : 0;

  return (
    <Card className="relative group hover:shadow-lg transition-all duration-300 min-h-[400px]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              {isPremium && (
                <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  Premium
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {showXP && (
            <div className="animate-bounce">
              <Badge className="bg-green-500">
                {t('demo.gainedXP')} • {t('demo.gainedCoins')}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-20">
        {/* Input Section */}
        <div className="space-y-2">
          {type === 'translate' ? (
            <div className="space-y-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to translate..."
                className="min-h-[100px]"
              />
              <Select defaultValue="lv">
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lv">Latvian</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : type === 'interactive' ? (
            <div className="p-3 bg-muted rounded-lg border">
              <div className="text-xs text-muted-foreground mb-2">Demo HTML Content:</div>
              <div className="font-mono text-xs whitespace-pre-wrap">{input}</div>
            </div>
          ) : (
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter text for ${type}...`}
              className="min-h-[100px]"
            />
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-4">
            {type === 'podcast' ? (
              <AudioPlayer audioUrl={result} title="Generated Podcast" />
            ) : (type === 'explain' || type === 'interactive') ? (
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{completedSteps}/{steps.length}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        step.completed ? 'bg-primary/5 border-primary/20' : 'bg-muted/50 hover:bg-muted'
                      }`}
                      onClick={() => toggleStep(index)}
                    >
                      <div className="mt-0.5">
                        {step.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                        )}
                      </div>
                      <span className={`flex-1 ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : Array.isArray(result) ? (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="space-y-2">
                  {result.map((item, index) => (
                    <div key={index} className="text-sm">{item}</div>
                  ))}
                </div>
                <Button
                  onClick={() => copyToClipboard(result.join('\n'))}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? t('demo.copied') : t('demo.copy')}
                </Button>
              </Card>
            ) : (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm mb-3">{result}</p>
                <Button
                  onClick={() => copyToClipboard(result)}
                  variant="outline"
                  size="sm"
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? t('demo.copied') : t('demo.copy')}
                </Button>
              </Card>
            )}
          </div>
        )}
      </CardContent>

      {/* Rabbit Button */}
      <RabbitButton 
        onClick={handleRabbitClick}
        loading={loading}
        disabled={isBlocked && !loading}
      />
      
      {/* Overlay for blocked features */}
      {isBlocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="text-center space-y-2">
            <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              Premium Feature
            </Badge>
            <p className="text-sm text-muted-foreground">Click the rabbit to upgrade</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FeatureCard;