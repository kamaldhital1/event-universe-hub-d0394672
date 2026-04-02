import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative items-center justify-center p-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 w-80 h-80 bg-accent/15 rounded-full blur-[100px]"
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
          <h1 className="font-heading text-4xl font-bold text-primary-foreground mb-5 leading-[1.1] tracking-tight">
            Don't worry, we've got you covered
          </h1>
          <p className="text-primary-foreground/50 text-lg leading-relaxed">
            Reset your password in a few simple steps and get back to managing your events.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Sign In
          </Link>

          {!sent ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Mail className="h-7 w-7 text-accent" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-2 tracking-tight">Forgot password?</h2>
              <p className="text-muted-foreground mb-8">
                No worries! Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
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
                <Button variant="hero" className="w-full h-12 rounded-xl text-sm" type="submit">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-3 tracking-tight">Check your email</h2>
              <p className="text-muted-foreground mb-2">
                We've sent a password reset link to
              </p>
              <p className="font-semibold text-foreground mb-8">{email}</p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn't receive the email?{" "}
                <button onClick={() => setSent(false)} className="text-accent hover:underline font-semibold">Try again</button>
              </p>
              <Link to="/login">
                <Button variant="outline" className="rounded-xl">Back to Sign In</Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
