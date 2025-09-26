import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Copy, Check, ArrowRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Demo = () => {
  const [selectedText, setSelectedText] = useState("");
  const [transformedText, setTransformed] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Qwasar-specific states
  const [qwasarTransformed, setQwasarTransformed] = useState(false);
  const [qwasarProcessing, setQwasarProcessing] = useState(false);
  const [qwasarShowFeedback, setQwasarShowFeedback] = useState(false);
  const [qwasarRetransforming, setQwasarRetransforming] = useState(false);
  const [qwasarAlternativeTransform, setQwasarAlternativeTransform] = useState(false);
  
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
  
  // Qwasar content
  const qwasarOriginalContent = `Complete an index.html file with the missing javascript code in order to replicate the famous Windows Screensaver - Bounce

You need to replace the content of the "div" my_bouncing_box with your Qwasar's login in downcase.

You need to move the "div" with the id my_bouncing_box diagonally.

We defined the (0, 0) coordinate (x, y) at the very top left of your screen. The box must move diagonally and each time it reaches a border it will change direction of the border it touched. If the box is moving bottom-right: -- when it reaches the bottom border it will go top. -- when it reaches the right border it will go left.

We let you choose the speed rate for the movement of the box. Between 0.3 and 1 second seems to be good values.

You cannot change the value of the html, moving the box needs to be done using javascript. (Yes, JQuery is not allowed yet.)`;

  const qwasarTransformedContent = `🎮 Lēkājošā kastīte kā spēle!

📝 **1. solis: Saproti, kas jādara**
• Tev ir kastīte ekrānā
• Tai jāpārvietojas kā vecajā Windows ekrānsaudzētājā
• Kad kastīte saduras ar malu, tā "atlec" otrā virzienā

🔧 **2. solis: Sagatavo kastīti**
• Kastītē ieraksti savu lietotājvārdu (mazajiem burtiem)
• Piemēram, ja tavs vārds ir "Anna", tad kastītē būs "anna"

🚀 **3. solis: Liec kastītei kustēties**
• Izmaino kastītes vietu pa nedaudz katru reizi
• Izmanto JavaScript, lai mainītu "left" un "top" vērtības
• Piemēram: left = left + 2 (pārvieto pa labi)

↗️ **4. solis: Diagonāla kustība**
• Kastīte iet vienlaikus pa labi UN uz leju
• Kā bumba, kas ripoja pa laukumu

🎯 **5. solis: Atlece no malām**
• Ja kastīte sasit labo malu → sāc iet pa kreisi
• Ja kastīte sasit apakšējo malu → sāc iet uz augšu
• Tā kā basketbola bumba, kas atlec no grīdas!

⏰ **6. solis: Izveido animāciju**
• Izmanto "setInterval" lai kartotu darbību
• Piemēram, ik pēc 0.5 sekundēm pārvieto kastīti
• Jo mazāks laiks, jo ātrāk kustēsies kastīte

🎨 **Galīgais rezultāts:**
Kastīte lēkās pa ekrānu kā vecajā Windows! 🏃‍♂️💨`;

  const qwasarAlternativeTransformedContent = `🎯 Vienkārši: Izveidojam animāciju!

🧩 **Ko mēs darām?**
Mēs veidojam mājas lapā kastīti, kas kustas!

📋 **Tavs darbs pa punktiem:**

1️⃣ **Sāc ar kastīti**
   • HTML failā jau ir kastīte ar ID "my_bouncing_box"
   • Nedrīkst mainīt HTML daļu!

2️⃣ **Raksti JavaScript kodu**
   • Izmanto: document.getElementById("my_bouncing_box")
   • Tas atrod mūsu kastīti

3️⃣ **Liec kastītei kustēties**
   • Mainām .style.left (kustas pa kreisi/labi)
   • Mainām .style.top (kustas uz augšu/leju)

4️⃣ **Izveidojam "atleci"**
   • Kad kastīte sasniedz malu, mainām virzienu
   • Izmantojam if/else (ja/citādi)

5️⃣ **Uztaisām atkārtojumu**
   • setInterval(function, 500) - atkārto ik pēc 0.5 sekundēm
   • Funkcijā rakstām kustības kodu

💡 **Padoms:** Sāc ar to, ka kastīte kustas tikai pa labi!`;

  const handleQwasarTransform = () => {
    setQwasarProcessing(true);
    
    setTimeout(() => {
      setQwasarTransformed(true);
      setQwasarProcessing(false);
      setQwasarShowFeedback(true);
      toast({
        title: "Teksts pārveidots!",
        description: "Uzdevums tagad ir piemērots 5. klases skolēnam.",
      });
    }, 2000);
  };

  const handleQwasarThumbsUp = () => {
    toast({
      title: "Paldies par atsauksmēm! 👍",
      description: "Priecājamies, ka teksts ir saprotams!",
    });
    setQwasarShowFeedback(false);
  };

  const handleQwasarThumbsDown = () => {
    setQwasarRetransforming(true);
    setQwasarShowFeedback(false);
    
    setTimeout(() => {
      setQwasarAlternativeTransform(true);
      setQwasarRetransforming(false);
      toast({
        title: "Teksts pārveidots citādi!",
        description: "Mēģinājām padarīt to vēl vienkāršāku.",
      });
    }, 2000);
  };

  const copyQwasarToClipboard = async () => {
    try {
      const contentToCopy = qwasarAlternativeTransform ? qwasarAlternativeTransformedContent : qwasarTransformedContent;
      await navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      toast({
        title: "Nokopēts!",
        description: "Pārveidotais teksts ir nokopēts starpliktuvē.",
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

        {/* Qwasar Live Demo Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl text-white">Qwasar uzdevuma demonstrācija</CardTitle>
                </div>
                <Badge variant="secondary">Reāls piemērs</Badge>
              </div>
              <CardDescription className="text-muted-foreground">
                Noklikšķiniet uz "Pārveidot tekstu", lai redzētu, kā White Rabbit pārveido šo uzdevumu 5. klases skolēnam
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transform Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={handleQwasarTransform} 
                  disabled={qwasarProcessing}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <Wand2 className="h-4 w-4" />
                  {qwasarProcessing ? "Pārveido..." : "Pārveidot tekstu"}
                </Button>
              </div>

              {/* Original Content */}
              {!qwasarTransformed && !qwasarProcessing && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <h4 className="text-lg font-semibold text-gray-200 mb-3">Oriģinālais uzdevums:</h4>
                    <div className="text-gray-300 whitespace-pre-line">
                      {qwasarOriginalContent}
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-600">
                    <div className="text-xs text-neutral-200">
                      <pre><code>{`$>cat index.html
<html style="background-color: black">
    <div
        id="my_bouncing_box"
        style="background-color: blue; border-radius: 3px; position: absolute; left: 0px; top: 0px; min-width: 100px; min-height: 100px; text-align: center; font-weight: bold; color: #999;"
    >
        Not loaded
    </div>
    <script type="text/javascript">
        // YOUR CODE
    </script>
</html>`}</code></pre>
                    </div>
                  </div>

                  <div className="text-gray-300">
                    <p className="mb-2">You don't have to handle any screen resizing. Do NOT use <code className="bg-gray-700 px-1 rounded">canvas</code> tag.</p>
                    <p className="mb-4">Gandalf is expecting 2 to 3 bounces in less than 40 secs.</p>
                    
                    <div className="italic text-gray-400">
                      <p>TIPS:</p>
                      <ul className="list-disc ml-6">
                        <li>Google Javascript document getElementById</li>
                        <li>Google Javascript setInterval</li>
                        <li>Google Javascript change style left</li>
                        <li>Google Javascript change style top</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Processing State */}
              {qwasarProcessing && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-primary">White Rabbit apstrādā uzdevumu...</div>
                  </div>
                </div>
              )}

              {/* Retransforming State */}
              {qwasarRetransforming && (
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-blue-300">White Rabbit mēģina citādi...</div>
                  </div>
                </div>
              )}

              {/* Transformed Content */}
              {qwasarTransformed && !qwasarRetransforming && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-green-300">
                        {qwasarAlternativeTransform ? "Pārveidots vēl vienkāršāk:" : "Pārveidots 5. klases skolēnam:"}
                      </h4>
                      <Badge variant="outline" className="text-green-300 border-green-500/50">
                        White Rabbit rezultāts
                      </Badge>
                    </div>
                    <div className="text-gray-200 whitespace-pre-line mb-4">
                      {qwasarAlternativeTransform ? qwasarAlternativeTransformedContent : qwasarTransformedContent}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyQwasarToClipboard}
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
                    </div>
                  </div>

                  {/* Feedback Section */}
                  {qwasarShowFeedback && (
                    <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-600">
                      <h5 className="text-neutral-200 font-medium mb-3">Is it clear now what to do?</h5>
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleQwasarThumbsUp}
                          className="flex items-center gap-2 text-green-300 border-green-500/50 hover:bg-green-500/10"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Jā, saprotu!
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleQwasarThumbsDown}
                          className="flex items-center gap-2 text-red-300 border-red-500/50 hover:bg-red-500/10"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          Vēl nesaprotu
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
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