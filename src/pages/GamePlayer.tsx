import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gamepad2, Heart, Eye, Edit, Share, MoreVertical, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { GameCanvas } from "@/components/GameCanvas";
import { useGames } from "@/hooks/useGames";

const GamePlayer = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { getGame, loading } = useGames();
  const gameData = getGame(gameId!);
  const isLoading = loading;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading game...</p>
        </div>
      </div>
    );
  }
  
  if (!gameData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-4">The game you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/gallery')} className="neu-button gradient-primary text-white px-6 py-3 rounded-xl">
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    toast({
      title: "Game Liked!",
      description: "Added to your favorites.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Game link copied to clipboard.",
    });
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
              onClick={() => navigate('/gallery')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold">{gameData.title}</h1>
                <p className="text-sm text-muted-foreground">by {gameData.author}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {gameData.author === "You" && (
              <Button 
                variant="ghost" 
                className="neu-button"
                onClick={() => navigate("/create", { state: { gameId } })}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            <Button 
              variant="ghost" 
              className="neu-button"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="neu-button rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto p-4 space-y-6">
        {/* Game Player */}
        <Card className="neu-card border-0">
          <CardContent className="p-0">
            <div className="neu-card-inset m-6 rounded-lg overflow-hidden">
              <GameCanvas gameCode={gameData.gameCode} />
            </div>
          </CardContent>
        </Card>

        {/* Game Info and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="neu-card border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{gameData.title}</CardTitle>
                    <p className="text-muted-foreground">{gameData.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className="neu-card border-0">
                      <Eye className="h-3 w-3 mr-1" />
                      {gameData.plays}
                    </Badge>
                    <Badge className="neu-card border-0">
                      <Heart className="h-3 w-3 mr-1" />
                      {gameData.likes}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Created {gameData.createdAt}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className={`neu-button ${gameData.isLiked ? "text-red-500" : ""}`}
                    onClick={handleLike}
                  >
                    <Heart className="h-4 w-4 mr-2" fill={gameData.isLiked ? "currentColor" : "none"} />
                    Like Game
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Game Sprites */}
            <Card className="neu-card border-0">
              <CardHeader>
                <CardTitle>Game Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(gameData.sprites).map(([type, sprite]) => (
                    <div key={type} className="neu-card-inset p-4 text-center">
                      <div className="text-3xl mb-2">{sprite}</div>
                      <p className="text-sm font-medium capitalize">{type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            <Card className="neu-card border-0">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full neu-button border-0 gradient-primary text-white hover:shadow-neu"
                  onClick={handleLike}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Like This Game
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full neu-button"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share Game
                </Button>

                {gameData.author === "You" && (
                  <Button 
                    variant="ghost" 
                    className="w-full neu-button"
                    onClick={() => navigate("/create", { state: { gameId } })}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Game
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Game Stats */}
            <Card className="neu-card border-0">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Plays</span>
                    <span className="font-medium">{gameData.plays.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Likes</span>
                    <span className="font-medium">{gameData.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="font-medium">{gameData.createdAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;