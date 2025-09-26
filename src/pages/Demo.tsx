import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Demo = () => {
  const [selectedText, setSelectedText] = useState("");
  const [transformedText, setTransformed] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const textRef = useRef<HTMLDivElement>(null);

  const demoTexts = [
    {
      original: "Šis ir ļoti sarežģīts teikums ar daudz nevajadzīgiem vārdiem un liekiem apzīmējumiem.",
      transformed: "Šis ir vienkāršs teikums.",
      mode: "Vienkāršot"
    },
    {
      original: "hello world how are you",
      transformed: "Sveika pasaule, kā tev iet?",
      mode: "Tulkot"
    },
    {
      original: "Šis teksts ir rakstīts neformālā stilā ar daudz sarunvalodas.",
      transformed: "Šis dokuments ir sastādīts profesionālā stilā, ievērojot akadēmiskās rakstības prasības.",
      mode: "Profesionalizēt"
    }
  ];

  const handleTextSelection = (text: string, transformed: string, mode: string) => {
    setSelectedText(text);
    setIsProcessing(true);
    setShowResult(false);
    setCopied(false);

    // Simulate AI processing with loading animation
    setTimeout(() => {
      setTransformed(transformed);
      setIsProcessing(false);
      setShowResult(true);
      toast({
        title: `${mode} pabeigts!`,
        description: "Teksts ir veiksmīgi pārveidots.",
      });
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transformedText);
      setCopied(true);
      toast({
        title: "Nokopēts!",
        description: "Teksts ir nokopēts starpliktuvē.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Kļūda",
        description: "Neizdevās nokopēt tekstu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              White Rabbit Demo
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Iezīmējiet jebkuru tekstu un redziet, kā White Rabbit extension to pārveido ar AI palīdzību
          </p>
          <Badge variant="secondary" className="mt-4">
            Interaktīva demonstrācija
          </Badge>
        </div>

        {/* Demo Cards */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {demoTexts.map((demo, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-2 hover:border-primary/20"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    Režīms: {demo.mode}
                  </CardTitle>
                  <Badge variant="outline">{demo.mode}</Badge>
                </div>
                <CardDescription>
                  Noklikšķiniet uz teksta, lai redzētu pārveidošanas procesu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Original Text */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Oriģinālais teksts:
                  </label>
                  <div 
                    ref={textRef}
                    className="p-4 bg-muted/50 rounded-lg cursor-pointer border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors group-hover:bg-muted/70"
                    onClick={() => handleTextSelection(demo.original, demo.transformed, demo.mode)}
                  >
                    <p className="text-foreground select-none">
                      {demo.original}
                    </p>
                    <div className="mt-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      📝 Noklikšķiniet, lai sāktu pārveidošanu
                    </div>
                  </div>
                </div>

                {/* Transformation Arrow */}
                {(selectedText === demo.original) && (
                  <div className="flex justify-center animate-scale-in">
                    <div className="flex items-center gap-2 text-primary">
                      <ArrowRight className={`h-6 w-6 transition-transform duration-500 ${isProcessing ? 'animate-pulse' : ''}`} />
                      <span className="text-sm font-medium">
                        {isProcessing ? 'Apstrādā...' : 'Pārveidots!'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Result */}
                {selectedText === demo.original && (
                  <div className="space-y-4">
                    {isProcessing && (
                      <div className="animate-fade-in">
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          AI apstrādā tekstu...
                        </label>
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <div className="flex-1">
                              <div className="h-4 bg-primary/20 rounded animate-pulse mb-2"></div>
                              <div className="h-4 bg-primary/10 rounded animate-pulse w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {showResult && (
                      <div className="animate-scale-in">
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Pārveidotais teksts:
                        </label>
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 relative group">
                          <p className="text-foreground mb-3">
                            {transformedText}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={copyToClipboard}
                              className="flex items-center gap-2"
                            >
                              {copied ? (
                                <>
                                  <Check className="h-4 w-4" />
                                  Nokopēts
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4" />
                                  Kopēt
                                </>
                              )}
                            </Button>
                            <Button size="sm" variant="default">
                              Aizstāt tekstu
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Gatavs sākt?</h3>
              <p className="text-muted-foreground mb-6">
                Instalējiet White Rabbit extension un sāciet pārveidot jebkuru tekstu internetā
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Instalēt Extension
                </Button>
                <Button size="lg" variant="outline">
                  Uzzināt vairāk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Demo;