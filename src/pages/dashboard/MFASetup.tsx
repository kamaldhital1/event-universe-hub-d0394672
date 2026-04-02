import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Smartphone, Copy, CheckCircle2, ArrowRight, Check } from "lucide-react";

const steps = ["Download App", "Scan QR Code", "Enter Code", "Complete"];
const mockSecret = "JBSWY3DPEHPK3PXP";

const MFASetup = () => {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [backupCodes] = useState(["A1B2-C3D4", "E5F6-G7H8", "I9J0-K1L2", "M3N4-O5P6", "Q7R8-S9T0", "U1V2-W3X4", "Y5Z6-A7B8", "C9D0-E1F2"]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Two-Factor Authentication</h1>
        <p className="text-muted-foreground text-sm mt-1">Add an extra layer of security to your account.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
              i < step ? "bg-emerald-500 text-white" : i === step ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Download */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-8 shadow-card border border-border/40 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg text-card-foreground">Download Authenticator App</h2>
              <p className="text-sm text-muted-foreground">You'll need one of these apps to continue</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Google Authenticator", desc: "By Google LLC" },
              { name: "Authy", desc: "By Twilio" },
              { name: "Microsoft Authenticator", desc: "By Microsoft" },
              { name: "1Password", desc: "By AgileBits" },
            ].map((app) => (
              <div key={app.name} className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border/30">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{app.name}</p>
                  <p className="text-xs text-muted-foreground">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="hero" onClick={() => setStep(1)} className="rounded-xl gap-2">
            I have an app <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* Step 1: QR Code */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-8 shadow-card border border-border/40 space-y-6">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Scan QR Code</h2>
          <p className="text-sm text-muted-foreground">Open your authenticator app and scan this QR code.</p>
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-foreground rounded-2xl flex items-center justify-center">
              <div className="w-40 h-40 bg-background rounded-xl grid grid-cols-5 gap-1 p-3">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? "bg-foreground" : "bg-background"}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-2">Can't scan? Enter this code manually:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 font-mono text-sm text-foreground bg-background px-3 py-2 rounded-lg border border-border">{mockSecret}</code>
              <Button variant="outline" size="sm" onClick={handleCopy} className="rounded-lg gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)} className="rounded-xl">Back</Button>
            <Button variant="hero" onClick={() => setStep(2)} className="rounded-xl gap-2">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Verify */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-8 shadow-card border border-border/40 space-y-6">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Enter Verification Code</h2>
          <p className="text-sm text-muted-foreground">Enter the 6-digit code from your authenticator app.</p>
          <Input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="h-14 text-center text-2xl font-mono tracking-[0.5em] rounded-xl"
          />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl">Back</Button>
            <Button variant="hero" onClick={() => setStep(3)} className="rounded-xl gap-2" disabled={code.length !== 6}>
              Verify <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Done */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/40 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-card-foreground">MFA Enabled!</h2>
            <p className="text-sm text-muted-foreground">Your account is now protected with two-factor authentication.</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
            <h3 className="font-heading font-semibold text-card-foreground">Backup Recovery Codes</h3>
            <p className="text-sm text-muted-foreground">Save these codes in a safe place. Each can be used once if you lose access to your authenticator app.</p>
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((bc) => (
                <code key={bc} className="text-sm font-mono bg-secondary/50 rounded-lg px-3 py-2 text-center text-foreground border border-border/30">{bc}</code>
              ))}
            </div>
            <Button variant="outline" className="rounded-xl w-full gap-2">
              <Copy className="h-4 w-4" /> Copy All Codes
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MFASetup;
