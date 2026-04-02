import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = () => {
    if (otp.join("").length === 6) {
      setVerified(true);
      setTimeout(() => navigate("/attendee"), 2000);
    }
  };

  const handleResend = () => {
    setResendCooldown(30);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md text-center"
      >
        {!verified ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2 tracking-tight">Verify your email</h2>
            <p className="text-muted-foreground mb-2">We've sent a 6-digit code to</p>
            <p className="font-semibold text-foreground mb-8">user@example.com</p>

            <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                />
              ))}
            </div>

            <Button
              variant="hero"
              className="w-full h-12 rounded-xl text-sm mb-4"
              onClick={handleVerify}
              disabled={otp.join("").length !== 6}
            >
              Verify Email
            </Button>

            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              {resendCooldown > 0 ? (
                <span className="text-muted-foreground">Resend in {resendCooldown}s</span>
              ) : (
                <button onClick={handleResend} className="text-accent hover:underline font-semibold inline-flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" /> Resend Code
                </button>
              )}
            </p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Email verified!</h2>
            <p className="text-muted-foreground">Welcome to Sansaar. Redirecting you now...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
