import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === "organizer" ? "/org/onboarding" : "/attendee");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold">S</span>
            </div>
            <span className="font-heading font-bold text-2xl text-primary-foreground">Sansaar</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-primary-foreground mb-4">
            Join the Event Universe
          </h1>
          <p className="text-primary-foreground/60 text-lg">
            Whether you're attending or organizing — Sansaar has everything you need to create extraordinary experiences.
          </p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-sm">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Sansaar</span>
          </div>

          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Create your account</h2>
          <p className="text-muted-foreground mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline font-medium">Sign in</Link>
          </p>

          {/* Role selector */}
          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
            <button
              type="button"
              onClick={() => setRole("attendee")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                role === "attendee"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Attendee
            </button>
            <button
              type="button"
              onClick={() => setRole("organizer")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                role === "organizer"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Organizer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button variant="hero" className="w-full h-11" type="submit">
              Create {role === "organizer" ? "Organizer" : "Attendee"} Account
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link to="/" className="underline">Terms</Link> and{" "}
            <Link to="/" className="underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
