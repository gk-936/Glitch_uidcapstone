import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Gamepad2, Images, PlusCircle, LogOut, Settings, User, Sparkles } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { title: "Dashboard", url: "/home", icon: Home },
  { title: "Create Game", url: "/create", icon: PlusCircle },
  { title: "Gallery", url: "/gallery", icon: Images },
  { title: "Profile", url: "/account", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="neu-card border-0 rounded-r-3xl">
      <SidebarContent className="bg-transparent">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="neu-card p-3 rounded-xl">
              <Gamepad2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">Glitch</h2>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">AI Game Creator</span>
                <Sparkles className="h-3 w-3 text-primary animate-pulse-soft" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <NavLink
            to="/create"
            className="neu-button gradient-primary text-white px-4 py-3 rounded-xl flex items-center gap-3 w-full hover:shadow-neu transition-all duration-300"
          >
            <PlusCircle className="h-5 w-5" />
            <span className="font-medium">Quick Create</span>
          </NavLink>
        </div>

        <SidebarGroup className="px-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive(item.url) 
                          ? "gradient-primary text-white shadow-neu" 
                          : "neu-button hover:shadow-neu"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-sidebar-border">
          <button
            onClick={async () => {
              try {
                await logout();
                navigate("/");
              } catch (error) {
                toast({ title: "Error", description: "Failed to sign out. Please try again.", variant: "destructive" });
              }
            }}
            className="neu-button flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:shadow-neu transition-all duration-300 text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}