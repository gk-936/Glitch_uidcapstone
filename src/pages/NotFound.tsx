import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Gamepad2 } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="neu-card p-10 rounded-3xl shadow-neu flex flex-col items-center max-w-md w-full">
        <div className="text-7xl mb-6 animate-float">🎮</div>
        <h1 className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! This page is lost in the game world.</p>
        <p className="text-base text-muted-foreground mb-6">The page <span className="font-mono text-primary">{location.pathname}</span> does not exist.</p>
        <button 
          onClick={() => navigate("/")}
          className="neu-button gradient-primary text-white px-6 py-3 rounded-xl font-medium hover:shadow-neu transition-all duration-300"
        >
          <Gamepad2 className="inline-block mr-2 h-5 w-5" /> Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
