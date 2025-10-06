import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && currentUser) {
      navigate('/home');
    }
  }, [currentUser, loading, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="text-6xl animate-float">🎮</div>
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Glitch
          </h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Transform your imagination into playable games with the power of AI. 
          Create, customize, and share 2D games in minutes, not months.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="neu-button border-0 gradient-primary text-white hover:shadow-neu px-8 py-6 text-lg"
            onClick={() => navigate("/signup")}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Get Started Free
          </Button>
          
          <Button 
            size="lg"
            variant="ghost"
            className="neu-button px-8 py-6 text-lg"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neu-card p-6 text-center">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold mb-2">AI-Powered Creation</h3>
            <p className="text-sm text-muted-foreground">
              Describe your game and watch AI generate sprites, mechanics, and environments
            </p>
          </div>
          
          <div className="neu-card p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Instant Playability</h3>
            <p className="text-sm text-muted-foreground">
              Test your games immediately with our built-in player and share with the world
            </p>
          </div>
          
          <div className="neu-card p-6 text-center">
            <div className="text-3xl mb-3">🌟</div>
            <h3 className="font-semibold mb-2">No Code Required</h3>
            <p className="text-sm text-muted-foreground">
              Create professional games using simple prompts and visual editing tools
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;