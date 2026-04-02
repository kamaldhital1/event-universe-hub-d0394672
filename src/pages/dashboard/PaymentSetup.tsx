import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Building2, CheckCircle2, Shield, Plus, Trash2, ArrowRight, IndianRupee, Check } from "lucide-react";

const steps = ["Choose Method", "Add Details", "Verify", "Complete"];

const PaymentSetup = () => {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<"razorpay" | "bank" | null>(null);
  const [savedMethods] = useState([
    { id: "1", type: "UPI", details: "business@ybl", primary: true },
    { id: "2", type: "Bank Account", details: "ICICI •••• 4567", primary: false },
  ]);

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Payment Setup</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure how you receive payments from ticket sales and registrations.</p>
      </div>

      {/* Current Payment Methods */}
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-accent" /> Payment Methods
          </h2>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5" onClick={() => setStep(0)}>
            <Plus className="h-3.5 w-3.5" /> Add Method
          </Button>
        </div>
        <div className="space-y-3">
          {savedMethods.map((m) => (
            <div key={m.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-border/30">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                {m.type === "UPI" ? <IndianRupee className="h-5 w-5 text-accent" /> : <Building2 className="h-5 w-5 text-accent" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-card-foreground">{m.type}</p>
                  {m.primary && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">Primary</span>}
                </div>
                <p className="text-xs text-muted-foreground">{m.details}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              i < step ? "bg-emerald-500 text-white" : i === step ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-emerald-500" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 0 */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { id: "razorpay" as const, name: "Razorpay", desc: "Accept UPI, cards, net banking, and wallets. Most popular in India.", icon: CreditCard },
            { id: "bank" as const, name: "Direct Bank Transfer", desc: "Receive payouts directly to your bank account via NEFT/RTGS.", icon: Building2 },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => { setMethod(opt.id); setStep(1); }}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${
                method === opt.id ? "border-accent bg-accent/5" : "border-border/40 bg-card hover:border-accent/50"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <opt.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-card-foreground mb-1">{opt.name}</h3>
              <p className="text-sm text-muted-foreground">{opt.desc}</p>
            </button>
          ))}
        </motion.div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 lg:p-8 shadow-card border border-border/40 space-y-6">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">
            {method === "razorpay" ? "Razorpay Details" : "Bank Account Details"}
          </h2>
          {method === "razorpay" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Razorpay Key ID</Label>
                <Input placeholder="rzp_live_xxxxxxxxx" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Razorpay Key Secret</Label>
                <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Webhook Secret</Label>
                <Input type="password" placeholder="whsec_••••••••" className="h-12 rounded-xl" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Account Holder Name</Label>
                <Input placeholder="TechVerse India Pvt Ltd" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input placeholder="Enter account number" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>IFSC Code</Label>
                <Input placeholder="ICIC0001234" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input placeholder="ICICI Bank" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Branch</Label>
                <Input placeholder="MG Road, Bangalore" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <Input placeholder="Current" className="h-12 rounded-xl" />
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)} className="rounded-xl">Back</Button>
            <Button variant="hero" onClick={() => setStep(2)} className="rounded-xl gap-2">
              Verify <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 lg:p-8 shadow-card border border-border/40 space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Shield className="h-7 w-7 text-accent" />
          </div>
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Verifying your details</h2>
          <p className="text-sm text-muted-foreground">We're verifying your payment details. This usually takes a few seconds.</p>
          <div className="flex justify-center">
            <div className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-accent rounded-full"
                onAnimationComplete={() => setStep(3)}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl p-8 shadow-card border border-border/40 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-card-foreground">Payment Method Added!</h2>
          <p className="text-sm text-muted-foreground">You're all set to start receiving payments from ticket sales.</p>
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 text-left">
            <Shield className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-card-foreground">Payouts will be processed every 3 business days</p>
              <p className="text-xs text-muted-foreground">First payout may take 5-7 business days for verification</p>
            </div>
          </div>
          <Button variant="hero" className="rounded-xl" onClick={() => setStep(0)}>Done</Button>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentSetup;
