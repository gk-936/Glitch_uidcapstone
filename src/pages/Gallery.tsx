import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Gamepad2, Search, Play, Heart, Eye, Filter, Trash2, Edit, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useGames } from "@/hooks/useGames";
import { useAuth } from "@/contexts/AuthContext";


const Gallery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useAuth();
  const { getPublishedGames, getUserGames, searchGames, incrementPlays, loading } = useGames();
  
  const publishedGames = getPublishedGames(50);
  const userGames = getUserGames();
  const searchResults = searchGames(searchTerm);

  const displayGames = searchTerm ? searchResults : publishedGames;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="neu-card m-4 rounded-2xl">
        <div className="flex items-center gap-4 p-4">
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
            <h1 className="text-xl font-bold">Gallery</h1>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto p-4">
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neu-card-inset border-0 pl-10"
            />
          </div>
          <Button variant="ghost" className="neu-button">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="public" className="space-y-6">
          <TabsList className="neu-card grid w-full grid-cols-2 border-0">
            <TabsTrigger value="public" className="neu-button data-[state=active]:gradient-primary data-[state=active]:text-white">
              Public Games
            </TabsTrigger>
            <TabsTrigger value="my-games" className="neu-button data-[state=active]:gradient-primary data-[state=active]:text-white">
              My Games
            </TabsTrigger>
          </TabsList>

          <TabsContent value="public">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading games...</p>
              </div>
            ) : !displayGames || displayGames.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="neu-card p-8 rounded-2xl mb-4 animate-float text-5xl">🎮</div>
                <p className="text-lg text-muted-foreground mb-2">No games found!</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "No games match your search." : "Be the first to create and publish a game."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayGames.map((game) => (
                  <Card key={game.id} className="neu-card border-0 overflow-hidden group cursor-pointer hover:shadow-neu transition-all">
                    <div className="aspect-square neu-card-inset m-4 rounded-lg flex items-center justify-center text-4xl">
                      {game.sprites?.character || "🎮"}
                    </div>
                    <CardContent className="p-4 pt-0">
                      <h3 className="font-semibold mb-1 truncate">{game.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{game.description}</p>
                      <p className="text-xs text-muted-foreground mb-3">by {game.authorName}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {game.plays || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {game.likes || 0}
                          </span>
                        </div>
                        <span>{new Date(game.createdAt).toLocaleDateString()}</span>
                      </div>

                      <Button 
                        size="sm" 
                        className="w-full neu-button border-0 gradient-primary text-white hover:shadow-neu"
                        onClick={() => {
                          incrementPlays(game.id!);
                          navigate(`/play/${game.id}`);
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Play Game
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-games">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading your games...</p>
              </div>
            ) : !userGames || userGames.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="neu-card p-8 rounded-2xl mb-4 animate-float text-5xl">🕹️</div>
                <p className="text-lg text-muted-foreground mb-2">No games yet!</p>
                <p className="text-sm text-muted-foreground">Start creating your first game and see it here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {userGames.map((game) => (
                  <Card key={game.id} className="neu-card border-0 overflow-hidden group">
                    <div className="aspect-square neu-card-inset m-4 rounded-lg flex items-center justify-center text-4xl">
                      {game.sprites?.character || "🎮"}
                    </div>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{game.title}</h3>
                        <Badge 
                          variant={game.isPublished ? "default" : "outline"}
                          className={game.isPublished ? "gradient-primary text-white border-0" : "neu-card border-0"}
                        >
                          {game.isPublished ? "Public" : "Private"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{game.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {game.plays || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {game.likes || 0}
                          </span>
                        </div>
                        <span>{new Date(game.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="flex-1 neu-button text-xs"
                          onClick={() => navigate(`/create`, { state: { gameId: game.id } })}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 neu-button border-0 gradient-primary text-white hover:shadow-neu text-xs"
                          onClick={() => navigate(`/play/${game.id}`)}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Play
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="neu-button text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Gallery;