import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Building2, Users, Shield, Settings, LogOut, Bell, Search,
  ChevronDown, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { title: "Organizations", path: "/admin/organizations", icon: Building2 },
  { title: "Users", path: "/admin/users", icon: Users },
  { title: "Platform Analytics", path: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const isActive = (path: string, end?: boolean) =>
    end ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border/50 bg-card/50 flex flex-col">
        {/* Logo */}
        <div className="p-5 flex items-center gap-2.5 border-b border-border/50">
          <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-bold text-foreground block text-sm leading-tight">Sansaar Admin</span>
            <span className="text-[10px] text-muted-foreground font-medium">Super Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path, item.end);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
                {item.title === "Organizations" && (
                  <span className="ml-auto text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-bold">4</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border/50">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
            <LogOut className="h-4 w-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between border-b border-border/50 px-6 bg-card/50 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">Super Admin</span>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-bold">ADMIN</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
            <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shadow-sm ml-1">
              <span className="text-xs font-bold text-white">SA</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
