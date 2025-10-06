import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Gamepad2, Wand2, Play, Save, Share, Palette, Users, TreePine, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AIService } from "@/services/aiService";
import { useAuth } from "@/contexts/AuthContext";
import { ElementType } from "react";

interface Sprite {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

interface SpriteCategory {
  name: string;
  icon: ElementType;
  sprites: Sprite[];
}

const spriteCategories: SpriteCategory[] = [
  {
    name: "Characters",
    icon: Users,
    sprites: [
      { id: "hero1", name: "Space Hero", emoji: "🚀", description: "Brave astronaut explorer" },
      { id: "hero2", name: "Knight", emoji: "⚔️", description: "Medieval warrior" },
      { id: "hero3", name: "Wizard", emoji: "🧙♂️", description: "Magical spellcaster" },
      { id: "enemy1", name: "Alien", emoji: "👽", description: "Hostile alien creature" },
      { id: "enemy2", name: "Dragon", emoji: "🐉", description: "Fire-breathing dragon" },
      { id: "enemy3", name: "Robot", emoji: "🤖", description: "Mechanical enemy" }
    ]
  },
  {
    name: "Environments",
    icon: TreePine,
    sprites: [
      { id: "bg1", name: "Space Station", emoji: "🛰️", description: "Futuristic space setting" },
      { id: "bg2", name: "Forest", emoji: "🌲", description: "Mystical forest landscape" },
      { id: "bg3", name: "Castle", emoji: "🏰", description: "Medieval castle grounds" },
      { id: "bg4", name: "Ocean", emoji: "🌊", description: "Underwater adventure" }
    ]
  },
  {
    name: "Items",
    icon: Palette,
    sprites: [
      { id: "item1", name: "Energy Crystal", emoji: "💎", description: "Power-up crystal" },
      { id: "item2", name: "Golden Coin", emoji: "🪙", description: "Collectible treasure" },
      { id: "item3", name: "Magic Potion", emoji: "🧪", description: "Health restoration" },
      { id: "item4", name: "Lightning Bolt", emoji: "⚡", description: "Speed boost power-up" }
    ]
  }
];

const GameCreator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState("sprites");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameData, setGameData] = useState({
    prompt: "",
    selectedSprites: {},
    gameCode: "",
    isPublished: false,
    title: "",
    description: "",
    tags: []
  });

  const [editPrompt, setEditPrompt] = useState("");

  useEffect(() => {
    if (location.state?.prompt) {
      setGameData(prev => ({ ...prev, prompt: location.state.prompt }));
    }
  }, [location.state]);

  const handleSpriteSelection = (categoryName: string, sprite: Sprite) => {
    setGameData(prev => ({
      ...prev,
      selectedSprites: {
        ...prev.selectedSprites,
        [categoryName]: sprite
      }
    }));
  };

  const handleGenerateGame = async () => {
    if (Object.keys(gameData.selectedSprites).length === 0) {
      toast({
        title: "Select Sprites",
        description: "Please select sprites before generating your game.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Generating Game",
      description: "AI is creating your game with selected sprites...",
    });
    
    try {
      const generatedGame = await AIService.generateGame({
        prompt: gameData.prompt,
        selectedSprites: gameData.selectedSprites
      });
      
      setGameData(prev => ({
        ...prev,
        gameCode: generatedGame.gameCode,
        title: generatedGame.title,
        description: generatedGame.description,
        tags: generatedGame.tags
      }));
      
      setCurrentStep("play");
      toast({
        title: "Game Generated!",
        description: "Your game is ready to play and customize.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate game. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveGame = async () => {
    if (!currentUser || !gameData.gameCode) return;
    
    // Mock save functionality
    toast({
      title: "Game Saved",
      description: "Your game has been saved successfully.",
    });
  };

  const handlePublishGame = () => {
    setGameData(prev => ({ ...prev, isPublished: true }));
    toast({
      title: "Game Published",
      description: "Your game is now live in the public gallery!",
    });
  };

  const handleEditWithPrompt = async () => {
    if (!editPrompt.trim() || !gameData.gameCode) return;
    
    toast({
      title: "Applying Changes",
      description: "AI is modifying your game based on your instructions...",
    });
    
    try {
      const enhancedCode = await AIService.enhanceGame(gameData.gameCode, editPrompt);
      setGameData(prev => ({ ...prev, gameCode: enhancedCode }));
      
      toast({
        title: "Game Updated",
        description: "Your changes have been applied successfully!",
      });
      setEditPrompt("");
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "Failed to apply changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="neu-card m-4 rounded-2xl">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="neu-button rounded-full"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Game Creator</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              className="neu-button"
              onClick={handleSaveGame}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button 
              className="neu-button border-0 gradient-primary text-white hover:shadow-neu"
              onClick={handlePublishGame}
            >
              <Share className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto p-4">
        {/* Game Prompt */}
        <Card className="neu-card border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Game Concept</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{gameData.prompt || "Loading game concept..."}</p>
          </CardContent>
        </Card>

        <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-6">
          <TabsList className="neu-card grid w-full grid-cols-3 border-0">
            <TabsTrigger value="sprites" className="neu-button data-[state=active]:gradient-primary data-[state=active]:text-white">
              Select Sprites
            </TabsTrigger>
            <TabsTrigger value="generate" className="neu-button data-[state=active]:gradient-primary data-[state=active]:text-white" disabled={Object.keys(gameData.selectedSprites).length === 0}>
              Generate Game
            </TabsTrigger>
            <TabsTrigger value="play" className="neu-button data-[state=active]:gradient-primary data-[state=active]:text-white" disabled={!gameData.gameCode}>
              Play & Edit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sprites" className="space-y-6">
            {spriteCategories.map((category) => (
              <Card key={category.name} className="neu-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    Choose {category.name.toLowerCase()} for your game
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {category.sprites.map((sprite) => {
                      const isSelected = gameData.selectedSprites[category.name]?.id === sprite.id;
                      return (
                        <div
                          key={sprite.id}
                          className={`neu-card-inset p-4 cursor-pointer transition-all text-center ${
                            isSelected ? "shadow-neu-inset" : "hover:shadow-neu"
                          }`}
                          onClick={() => handleSpriteSelection(category.name, sprite)}
                        >
                          <div className="text-3xl mb-2">{sprite.emoji}</div>
                          <h4 className="font-medium text-sm mb-1">{sprite.name}</h4>
                          <p className="text-xs text-muted-foreground">{sprite.description}</p>
                          {isSelected && (
                            <Badge className="mt-2 gradient-primary text-white border-0">
                              Selected
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="generate">
            <Card className="neu-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Wand2 className="h-6 w-6 text-primary" />
                  Ready to Generate
                </CardTitle>
                <CardDescription>
                  Review your selections and generate your game
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selected Sprites Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(gameData.selectedSprites).map(([category, sprite]) => (
                    <div key={category} className="neu-card-inset p-4 text-center">
                      <div className="text-2xl mb-2">{sprite.emoji}</div>
                      <p className="font-medium">{category}</p>
                      <p className="text-sm text-muted-foreground">{sprite.name}</p>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleGenerateGame}
                  disabled={isGenerating}
                  className="w-full neu-button border-0 gradient-primary text-white hover:shadow-neu text-lg py-6"
                >
                  <Zap className={`mr-2 h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Generating Game...' : 'Generate Game'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="play" className="space-y-6">
            {/* Game Preview */}
            <Card className="neu-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Game Preview</CardTitle>
                  <Button 
                    className="neu-button border-0 gradient-secondary hover:shadow-neu"
                    onClick={() => navigate(`/play/new`)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play Fullscreen
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video neu-card-inset rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {Object.values(gameData.selectedSprites).map((sprite) => sprite.emoji).join(" ")}
                    </div>
                    <p className="text-lg font-medium">Your Game is Ready!</p>
                    <p className="text-muted-foreground">Click Play Fullscreen to test it out</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit with Prompt */}
            <Card className="neu-card border-0">
              <CardHeader>
                <CardTitle>Edit with AI</CardTitle>
                <CardDescription>
                  Describe changes you want to make to your game
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="For example: 'Make the character jump higher' or 'Add more enemies' or 'Change the background color to blue'"
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  className="neu-card-inset border-0 min-h-[100px]"
                />
                <Button 
                  onClick={handleEditWithPrompt}
                  disabled={!editPrompt.trim()}
                  className="neu-button border-0 gradient-accent text-white hover:shadow-neu"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Apply Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameCreator;