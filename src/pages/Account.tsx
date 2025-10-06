import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gamepad2, Edit, Trophy, Calendar, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { mockUser } from "@/lib/mockData";

interface UserProfile {
  id: string;
  email: string;
  username: string;
  bio: string;
  createdAt: string;
  gamesCreated: number;
  gamesPublished: number;
  totalPlays: number;
}

const achievements = [
  { name: "First Game", description: "Created your first game", earned: true },
  { name: "Popular Creator", description: "Game played 100+ times", earned: true },
  { name: "Prolific Creator", description: "Created 10+ games", earned: true },
  { name: "Community Favorite", description: "Game featured in gallery", earned: false },
];

const Account = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (currentUser) {
      setProfile({
        id: currentUser.id,
        email: currentUser.email,
        username: currentUser.username,
        bio: 'Game developer and creator',
        createdAt: new Date().toISOString(),
        gamesCreated: 5,
        gamesPublished: 3,
        totalPlays: 150
      });
    }
    setIsLoading(false);
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser || !profile) return;

    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-muted-foreground">Unable to load your profile data.</p>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-xl font-bold">Account</h1>
          </div>
        </div>
      </header>

      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Profile Card */}
        <Card className="neu-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="neu-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 neu-card rounded-full flex items-center justify-center text-xl font-bold bg-gradient-primary text-white">
                {profile.username?.charAt(0) || '?'}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      className="neu-card-inset border-0"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold">{profile.username}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{profile.email}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label>Bio</Label>
              {isEditing ? (
                <Input
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="neu-card-inset border-0"
                />
              ) : (
                <p className="text-muted-foreground">{profile.bio}</p>
              )}
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>

            {isEditing && (
              <Button 
                onClick={handleSave}
                className="neu-button border-0 gradient-primary text-white hover:shadow-neu"
              >
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="neu-card border-0">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center neu-card-inset p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">{profile.gamesCreated}</div>
                <div className="text-sm text-muted-foreground">Games Created</div>
              </div>
              <div className="text-center neu-card-inset p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">{profile.gamesPublished}</div>
                <div className="text-sm text-muted-foreground">Published</div>
              </div>
              <div className="text-center neu-card-inset p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary">{profile.totalPlays}</div>
                <div className="text-sm text-muted-foreground">Total Plays</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="neu-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className={`neu-card-inset p-4 rounded-lg flex items-center justify-between ${
                    achievement.earned ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div>
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.earned ? (
                    <Badge className="gradient-primary text-white border-0">
                      Earned
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="neu-card border-0">
                      Locked
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="neu-card border-0 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              className="neu-button border-0"
              onClick={() => {
                toast({
                  title: "Account Deletion",
                  description: "This feature will be available soon.",
                });
              }}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;