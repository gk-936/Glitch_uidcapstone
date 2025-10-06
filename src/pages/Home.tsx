import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Gamepad2, Sparkles, Wand2, History, Menu } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AIService } from "@/services/aiService";

const recentGames = [
  { id: 1, title: "Space Adventure", prompt: "A retro space shooter with aliens", createdAt: "2 hours ago" },
  { id: 2, title: "Platformer Quest", prompt: "A side-scrolling platformer with power-ups", createdAt: "1 day ago" },
  { id: 3, title: "Puzzle Master", prompt: "A block-matching puzzle game", createdAt: "3 days ago" },
];

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the game you want to create.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const selectedSprites = {
        character: 'ð',
        enemy: 'ð',
        item: 'ð',
        background: 'ð'
      };

      const result = await AIService.generateGame({ prompt, selectedSprites });
      
      setIsGenerating(false);
      toast({
        title: "Game Generation Started!",
        description: "Analyzing your prompt and generating sprites...",
      });
      navigate("/create", { state: { game: result } });
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate game. Please try again.",
        variant: "destructive"
      });
    }
  };



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="neu-card mx-4 mt-4 mb-6 rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="neu-button p-2.5 rounded-xl hover:shadow-neu transition-all duration-300 hover:scale-105 group">
              <Menu className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
            </SidebarTrigger>
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Glitch
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="neu-button rounded-full p-2.5"
              onClick={() => navigate("/gallery")}
            >
              <History className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-6 space-y-8">
        {/* Main Creation Area */}
        <Card className="neu-card border-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wand2 className="h-6 w-6 text-primary animate-pulse-soft" />
              <CardTitle className="text-3xl bg-gradient-primary bg-clip-text text-transparent">
                Create Your Dream Game
              </CardTitle>
            </div>
            <CardDescription className="text-lg">
              Describe your game idea and watch it come to life with AI-powered generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium">
                Game Description
              </label>
              <Textarea
                id="prompt"
                placeholder="Describe your game... For example: 'A side-scrolling platformer where a cat hero collects fish while avoiding obstacles in a colorful underwater world.'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="neu-card-inset border-0 min-h-[120px] resize-none text-base"
              />
            </div>
            
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full neu-button border-0 gradient-primary text-white hover:shadow-neu text-lg py-6"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Game...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Game
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Games */}
        <Card className="neu-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Recent Creations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentGames.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="neu-card p-6 rounded-2xl mb-4 animate-float text-4xl">🕹️</div>
                <p className="text-lg text-muted-foreground mb-2">No recent games yet!</p>
                <p className="text-sm text-muted-foreground">Create your first game to see it here.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {recentGames.map((game) => (
                  <div
                    key={game.id}
                    className="neu-card-inset p-4 cursor-pointer hover:shadow-neu transition-all"
                    onClick={() => navigate(`/play/${game.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{game.title}</h3>
                        <p className="text-sm text-muted-foreground">{game.prompt}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{game.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button 
              variant="ghost" 
              className="w-full mt-4 neu-button"
              onClick={() => navigate("/gallery")}
            >
              View All Games
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;