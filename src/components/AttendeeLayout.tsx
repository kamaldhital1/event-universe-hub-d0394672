import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Search, Ticket, Heart, User, Bell, LogOut, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, path: "/attendee" },
  { label: "Discover", icon: Search, path: "/attendee/discover" },
  { label: "My Tickets", icon: Ticket, path: "/attendee/tickets" },
  { label: "Saved", icon: Heart, path: "/attendee/saved" },
  { label: "Profile", icon: User, path: "/attendee/profile" },
];

const AttendeeLayout = () => {
  const location = useLocation();
  const isActive = (path: string) =>
    path === "/attendee" ? location.pathname === "/attendee" : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav — warm, light, consumer-friendly */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/attendee" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-sm">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Sansaar</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  isActive(item.path)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </Button>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
              <span className="text-xs font-bold text-accent-foreground">PS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                isActive(item.path)
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AttendeeLayout;
