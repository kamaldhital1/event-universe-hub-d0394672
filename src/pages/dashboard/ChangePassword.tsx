import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Check, X, CheckCircle2 } from "lucide-react";

const requirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[!@#$%^&*]/.test(p) },
];

const ChangePassword = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [success, setSuccess] = useState(false);

  const allValid = requirements.every((r) => r.test(newPass));
  const match = newPass === confirmPass && confirmPass.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allValid && match && current) setSuccess(true);
  };

  return (
    <div className="p-6 lg:p-8 max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Change Password</h1>
        <p className="text-muted-foreground text-sm mt-1">Update your password to keep your account secure.</p>
      </div>

      {!success ? (
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-6 lg:p-8 shadow-card border border-border/40 space-y-6"
        >
          <div className="space-y-2">
            <Label className="text-sm font-medium">Current Password</Label>
            <div className="relative">
              <Input type={showCurrent ? "text" : "password"} value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Enter current password" className="h-12 rounded-xl pr-12" required />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">New Password</Label>
            <div className="relative">
              <Input type={showNew ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Enter new password" className="h-12 rounded-xl pr-12" required />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Confirm New Password</Label>
            <Input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Re-enter new password" className="h-12 rounded-xl" required />
            {confirmPass.length > 0 && !match && <p className="text-xs text-destructive">Passwords don't match</p>}
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            {requirements.map((req) => (
              <div key={req.label} className="flex items-center gap-2">
                {req.test(newPass) ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <X className="h-3.5 w-3.5 text-muted-foreground" />}
                <span className={`text-xs ${req.test(newPass) ? "text-emerald-600" : "text-muted-foreground"}`}>{req.label}</span>
              </div>
            ))}
          </div>

          <Button variant="hero" className="w-full h-12 rounded-xl" type="submit" disabled={!allValid || !match || !current}>
            Update Password
          </Button>
        </motion.form>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl p-8 shadow-card border border-border/40 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-card-foreground">Password Updated!</h2>
          <p className="text-sm text-muted-foreground">Your password has been changed successfully.</p>
          <Button variant="outline" className="rounded-xl" onClick={() => { setSuccess(false); setCurrent(""); setNewPass(""); setConfirmPass(""); }}>
            Done
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ChangePassword;
