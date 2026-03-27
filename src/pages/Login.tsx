import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === "organizer" ? "/dashboard" : "/attendee");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — dramatic */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative items-center justify-center p-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 w-80 h-80 bg-accent/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-1/4 w-60 h-60 bg-violet/10 rounded-full blur-[80px]"
        />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-md"
        >
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-11 h-11 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
              <span className="text-accent-foreground font-heading font-bold">S</span>
            </div>
            <span className="font-heading font-bold text-2xl text-primary-foreground">Sansaar</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-[1.1] tracking-tight">
            Welcome back to the Event Universe
          </h1>
          <p className="text-primary-foreground/50 text-lg leading-relaxed">
            Manage your events, track registrations, and build communities — all in one place.
          </p>

          {/* Floating testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 p-5 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-xs font-bold text-accent">AK</span>
              </div>
              <div>
                <p className="text-sm font-medium text-primary-foreground">Ananya Kumar</p>
                <p className="text-xs text-primary-foreground/40">Event Organizer · Mumbai</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/50 italic leading-relaxed">
              "Sansaar transformed how we manage our 50+ annual events. The platform is incredibly intuitive."
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
              <span className="text-accent-foreground font-heading font-bold text-sm">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Sansaar</span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-foreground mb-2 tracking-tight">Sign in</h2>
          <p className="text-muted-foreground mb-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent hover:underline font-semibold">Create one</Link>
          </p>
          {role === "organizer" && (
            <p className="text-xs text-muted-foreground mb-4">
              Super Admin? <Link to="/admin" className="text-red-500 hover:underline font-semibold">Access Admin Panel →</Link>
            </p>
          )}

          {/* Role selector */}
          <div className="flex gap-1.5 mb-8 p-1.5 bg-secondary rounded-xl">
            {(["attendee", "organizer"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  role === r
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "attendee" ? "Attendee" : "Organizer"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link to="/" className="text-xs text-accent hover:underline font-medium">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button variant="hero" className="w-full h-12 rounded-xl text-sm" type="submit">
              Sign In as {role === "organizer" ? "Organizer" : "Attendee"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link to="/" className="underline hover:text-foreground transition-colors">Terms</Link> and{" "}
              <Link to="/" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
