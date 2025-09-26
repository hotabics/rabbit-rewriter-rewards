import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Heart, 
  Apple, 
  Coins, 
  Settings, 
  Gift,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import icon512 from "@/assets/icon512.png";

const WhiteRabbitWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [stats, setStats] = useState({
    level: 15,
    xp: 2847,
    xpToNext: 3000,
    health: 85,
    food: 42,
    coins: 156
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAction, setLastAction] = useState("");

  const simulateAction = (action: string, xpGain: number) => {
    setIsProcessing(true);
    setLastAction(action);
    
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        xp: Math.min(prev.xp + xpGain, prev.xpToNext),
        health: Math.min(prev.health + 2, 100),
        food: Math.min(prev.food + 1, 100),
        coins: prev.coins + Math.floor(xpGain / 2)
      }));
      setIsProcessing(false);
    }, 1500);
  };

  const xpProgress = (stats.xp / stats.xpToNext) * 100;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Widget */}
      <div className={`transition-all duration-300 ${isExpanded ? 'mb-4' : ''}`}>
        <Card className={`bg-background/95 backdrop-blur-sm border-2 border-primary/20 shadow-xl transition-all duration-300 ${
          isExpanded ? 'w-80' : 'w-auto'
        }`}>
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={icon512} 
                    alt="White Rabbit" 
                    className={`w-12 h-12 rounded-full border-2 border-primary/30 transition-transform duration-300 ${
                      isProcessing ? 'animate-pulse scale-110' : 'hover:scale-105'
                    }`}
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-spin border-t-transparent"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm">White Rabbit</h3>
                  <p className="text-xs text-muted-foreground">Level {stats.level}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>

            {isExpanded && (
              <div className="space-y-4 animate-fade-in">
                {/* XP Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="text-primary font-medium">{stats.xp}/{stats.xpToNext} XP</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                    <Heart className="h-4 w-4 mx-auto mb-1 text-red-500" />
                    <div className="text-xs font-medium">{stats.health}</div>
                    <div className="text-xs text-muted-foreground">Health</div>
                  </div>
                  <div className="text-center p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <Apple className="h-4 w-4 mx-auto mb-1 text-green-500" />
                    <div className="text-xs font-medium">{stats.food}</div>
                    <div className="text-xs text-muted-foreground">Food</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <Coins className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
                    <div className="text-xs font-medium">{stats.coins}</div>
                    <div className="text-xs text-muted-foreground">Coins</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground mb-2">Quick Actions:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => simulateAction("Rewrite", 8)}
                      disabled={isProcessing}
                      className="text-xs h-8"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Rewrite
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => simulateAction("Summarize", 6)}
                      disabled={isProcessing}
                      className="text-xs h-8"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Summary
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => simulateAction("Translate", 5)}
                      disabled={isProcessing}
                      className="text-xs h-8"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Translate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => simulateAction("Explain", 12)}
                      disabled={isProcessing}
                      className="text-xs h-8"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Explain
                    </Button>
                  </div>
                </div>

                {/* Processing Status */}
                {isProcessing && (
                  <div className="text-center p-2 bg-primary/5 rounded-lg border border-primary/20 animate-pulse">
                    <div className="text-xs text-primary font-medium">
                      Processing {lastAction}...
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="flex-1 text-xs h-8">
                    <Gift className="h-3 w-3 mr-1" />
                    Daily Bonus
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button (when collapsed) */}
      {!isExpanded && (
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-primary to-secondary hover:scale-105"
          onClick={() => setIsExpanded(true)}
        >
          <img src={icon512} alt="White Rabbit" className="w-8 h-8 rounded-full" />
        </Button>
      )}

      {/* Floating Notifications */}
      {lastAction && !isProcessing && (
        <div className="absolute bottom-full right-0 mb-2 animate-fade-in">
          <Badge className="bg-green-500/90 text-white shadow-lg">
            +XP from {lastAction}!
          </Badge>
        </div>
      )}
    </div>
  );
};

export default WhiteRabbitWidget;