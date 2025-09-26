import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, Copy, Check, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QwasarProject = () => {
  const [isTransformed, setIsTransformed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const originalContent = `Complete an index.html file with the missing javascript code in order to replicate the famous Windows Screensaver - Bounce

You need to replace the content of the "div" my_bouncing_box with your Qwasar's login in downcase.

You need to move the "div" with the id my_bouncing_box diagonally.

We defined the (0, 0) coordinate (x, y) at the very top left of your screen. The box must move diagonally and each time it reaches a border it will change direction of the border it touched. If the box is moving bottom-right: -- when it reaches the bottom border it will go top. -- when it reaches the right border it will go left.

We let you choose the speed rate for the movement of the box. Between 0.3 and 1 second seems to be good values.

You cannot change the value of the html, moving the box needs to be done using javascript. (Yes, JQuery is not allowed yet.)`;

  const transformedContent = `🎮 Lēkājošā kastīte kā spēle!

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

  const handleTransform = () => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsTransformed(true);
      setIsProcessing(false);
      toast({
        title: "Teksts pārveidots!",
        description: "Uzdevums tagad ir piemērots 5. klases skolēnam.",
      });
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transformedContent);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with White Rabbit Integration */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold text-white">White Rabbit integrācija</h2>
                </div>
                <Badge variant="secondary">AI palīgs</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Noklikšķiniet uz "Pārveidot tekstu", lai redzētu, kā White Rabbit pārveido šo uzdevumu 5. klases skolēnam
              </p>
              <Button 
                onClick={handleTransform} 
                disabled={isProcessing}
                className="flex items-center gap-2"
              >
                <Wand2 className="h-4 w-4" />
                {isProcessing ? "Pārveido..." : "Pārveidot tekstu"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-6 gap-x-6 gap-y-3">
          <div className="col-span-4 space-y-3">
            <div className="col-span-full space-y-3 px-2 lg:col-span-3">
              <header className="space-y-3">
                <h1 className="max-w-md text-4xl font-medium capitalize text-gray-200">
                  My Bouncing Box
                </h1>
                
                <div className="flex flex-wrap -mb-px text-sm font-medium text-center">
                  <div className="me-2">
                    <button className="inline-block p-4 text-blue-500 border-b-2 border-blue-500">
                      Subject
                    </button>
                  </div>
                  <div className="me-2">
                    <button className="inline-block p-4 text-gray-400 hover:text-gray-300">
                      1 Solution
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <table className="w-full border border-gray-600 text-gray-200">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="p-2 text-left">My Bouncing Box</th>
                        <th className="p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-600">
                        <td className="p-2">Submit directory</td>
                        <td className="p-2">.</td>
                      </tr>
                      <tr className="border-t border-gray-600">
                        <td className="p-2">Submit file</td>
                        <td className="p-2">index.html</td>
                      </tr>
                    </tbody>
                  </table>

                  <div>
                    <h3 className="text-xl font-bold text-gray-200 mb-4">Description</h3>
                    
                    {/* Original Content */}
                    {!isTransformed && (
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
                          <h4 className="text-lg font-semibold text-gray-200 mb-3">Oriģinālais uzdevums:</h4>
                          <div className="text-gray-300 whitespace-pre-line">
                            {originalContent}
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
                    {isProcessing && (
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <div className="text-primary">White Rabbit apstrādā uzdevumu...</div>
                        </div>
                      </div>
                    )}

                    {/* Transformed Content */}
                    {isTransformed && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-semibold text-green-300">
                              Pārveidots 5. klases skolēnam:
                            </h4>
                            <Badge variant="outline" className="text-green-300 border-green-500/50">
                              White Rabbit rezultāts
                            </Badge>
                          </div>
                          <div className="text-gray-200 whitespace-pre-line mb-4">
                            {transformedContent}
                          </div>
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
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="col-span-2 flex flex-col gap-3 pt-20">
            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
              <header className="flex items-center gap-4 px-3 py-4">
                <div className="h-20 w-20 shrink-0">
                  <img 
                    height="80" 
                    width="80" 
                    alt="Preseason Web" 
                    className="rounded-lg"
                    src="https://via.placeholder.com/80x80/3b82f6/ffffff?text=PW"
                  />
                </div>
                <div>
                  <h2 className="text-md line-clamp-2 uppercase leading-tight text-slate-200">
                    Preseason Web
                  </h2>
                </div>
              </header>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
              <div className="border-b border-slate-800">
                <div className="grid grid-cols-12 items-center gap-1 px-3 py-2 text-sm">
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="rounded-lg bg-slate-900 text-slate-500 p-1.5">
                      <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 3h12l4 6-10 13L2 9Z"/>
                      </svg>
                    </div>
                    <div className="truncate text-sm capitalize text-slate-400">Reward</div>
                  </div>
                  <div className="col-span-7 flex items-center gap-1">
                    <div className="text-sm font-bold text-yellow-400">75</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
              <header className="flex items-center border-b border-slate-800 bg-slate-900 px-3 py-2">
                <h2 className="truncate text-sm text-slate-200">Group Member(s)</h2>
              </header>
              <div className="px-3 py-2">
                <div className="flex items-center gap-3">
                  <img 
                    className="rounded size-8" 
                    src="https://via.placeholder.com/32x32/6366f1/ffffff?text=IC"
                    alt="Profile"
                  />
                  <div className="truncate text-sm text-slate-200">
                    Ivo Capins
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default QwasarProject;