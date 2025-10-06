import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Gamepad2, Palette, Volume2, Zap, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTheme, Theme } from "@/hooks/useTheme";

type Settings = {
  soundEnabled: boolean;
  notifications: boolean;
  autoSave: boolean;
  quality: "fast" | "balanced" | "high";
  privacy: "private" | "public";
};

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useTheme();
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : {
      soundEnabled: true,
      notifications: true,
      autoSave: true,
      quality: "high",
      privacy: "public"
    };
  });

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key} has been updated successfully.`,
    });
  };

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
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Appearance */}
        <Card className="neu-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how Glitch looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={theme}
                onValueChange={(value: Theme) => setTheme(value)}
              >
                <SelectTrigger className="w-32 neu-card-inset border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="neu-card border-0">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audio */}
        <Card className="neu-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              Audio
            </CardTitle>
            <CardDescription>
              Control sound and music settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound">Sound Effects</Label>
              <Switch
                id="sound"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => handleSettingChange("soundEnabled", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Game Creation */}
        <Card className="neu-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Game Creation
            </CardTitle>
            <CardDescription>
              Settings for game generation and editing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autosave">Auto-save</Label>
              <Switch
                id="autosave"
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="quality">Generation Quality</Label>
              <Select
                value={settings.quality}
                onValueChange={(value) => handleSettingChange("quality", value)}
              >
                <SelectTrigger className="w-32 neu-card-inset border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="neu-card border-0">
                  <SelectItem value="fast">Fast</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="high">High Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="neu-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy
            </CardTitle>
            <CardDescription>
              Control your privacy and sharing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications</Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="privacy">Default Game Privacy</Label>
              <Select
                value={settings.privacy}
                onValueChange={(value) => handleSettingChange("privacy", value)}
              >
                <SelectTrigger className="w-32 neu-card-inset border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="neu-card border-0">
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          className="w-full neu-button border-0 gradient-primary text-white hover:shadow-neu"
          onClick={() => {
            toast({
              title: "Settings Saved",
              description: "All your preferences have been saved successfully.",
            });
          }}
        >
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;