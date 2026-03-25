import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Search, Ticket, Heart, User, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      {/* Top nav */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-2xl border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/attendee" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
              <span className="text-accent-foreground font-heading font-bold text-sm">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground tracking-tight">Sansaar</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative",
                  isActive(item.path)
                    ? "text-accent bg-accent/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="attendee-active"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse-soft" />
            </Button>
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
            <div className="w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-accent-foreground">PS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-2xl border-t border-border/40 z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-w-[56px]",
                isActive(item.path)
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-transform duration-300", isActive(item.path) && "scale-110")} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AttendeeLayout;
