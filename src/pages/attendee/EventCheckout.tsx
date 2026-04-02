import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Minus, Plus, CreditCard, Shield, CheckCircle2, Ticket, Tag, IndianRupee, Check } from "lucide-react";
import { mockEvents, formatCurrency } from "@/data/mockData";

const steps = ["Select Tickets", "Your Details", "Payment", "Confirmation"];

const EventCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find((e) => e.id === id);
  const [step, setStep] = useState(0);
  const [tickets, setTickets] = useState<Record<string, number>>({});
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  if (!event) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Event not found.</p>
        <Link to="/attendee/discover"><Button variant="outline" className="mt-4 rounded-xl">Browse Events</Button></Link>
      </div>
    );
  }

  const ticketTiers = [
    { name: "General", price: event.priceValue, perks: ["All sessions access", "Event kit", "Lunch & snacks"] },
    { name: "VIP", price: event.priceValue * 2, perks: ["Everything in General", "Front-row seating", "Networking dinner", "Priority parking"] },
    { name: "Group (4+)", price: Math.round(event.priceValue * 0.8), perks: ["General access", "Group discount 20%", "Dedicated seating block"] },
  ];

  const totalTickets = Object.values(tickets).reduce((a, b) => a + b, 0);
  const subtotal = ticketTiers.reduce((sum, tier) => sum + (tickets[tier.name] || 0) * tier.price, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const platformFee = Math.round(subtotal * 0.02);
  const total = subtotal - discount + platformFee;

  const updateTicket = (name: string, delta: number) => {
    setTickets((prev) => {
      const curr = prev[name] || 0;
      const next = Math.max(0, Math.min(10, curr + delta));
      return { ...prev, [name]: next };
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)} className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> {step > 0 ? "Back" : "Cancel"}
        </Button>
        <div>
          <h1 className="font-heading text-xl lg:text-2xl font-bold text-foreground tracking-tight">{step < 3 ? "Book Tickets" : "Booking Confirmed"}</h1>
          <p className="text-muted-foreground text-xs mt-0.5">{event.title}</p>
        </div>
      </div>

      {/* Stepper */}
      {step < 3 && (
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                i < step ? "bg-emerald-500 text-white" : i === step ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-emerald-500" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 0: Tickets */}
            {step === 0 && (
              <motion.div key="tickets" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                {ticketTiers.map((tier) => (
                  <div key={tier.name} className="bg-card rounded-2xl p-5 shadow-card border border-border/40">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading font-semibold text-card-foreground">{tier.name}</h3>
                        <p className="text-lg font-bold text-accent">{tier.price === 0 ? "Free" : formatCurrency(tier.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateTicket(tier.name, -1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-semibold">{tickets[tier.name] || 0}</span>
                        <button onClick={() => updateTicket(tier.name, 1)} className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tier.perks.map((p) => (
                        <span key={p} className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-full">{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <Button variant="hero" className="w-full rounded-xl h-12" disabled={totalTickets === 0} onClick={() => setStep(1)}>
                  Continue — {totalTickets} {totalTickets === 1 ? "ticket" : "tickets"}
                </Button>
              </motion.div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
                <h2 className="font-heading font-semibold text-lg text-card-foreground">Your Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input placeholder="Your full name" className="h-12 rounded-xl" defaultValue="Priya Sharma" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="you@example.com" className="h-12 rounded-xl" defaultValue="priya@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="+91 98765 43210" className="h-12 rounded-xl" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label>Company (Optional)</Label>
                    <Input placeholder="Your company" className="h-12 rounded-xl" />
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground">
                  <p>📧 E-tickets will be sent to your email address after payment</p>
                </div>
                <Button variant="hero" className="w-full rounded-xl h-12" onClick={() => setStep(2)}>
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
                <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent" /> Payment
                </h2>
                <div className="flex gap-2 p-1 bg-secondary rounded-xl">
                  {["UPI", "Card", "Net Banking"].map((m, i) => (
                    <button key={m} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${i === 0 ? "bg-card shadow-card text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {m}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>UPI ID</Label>
                    <Input placeholder="yourname@upi" className="h-12 rounded-xl" />
                  </div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                  <p className="text-xs text-muted-foreground">Your payment is secured with 256-bit encryption via Razorpay</p>
                </div>
                <Button variant="hero" className="w-full rounded-xl h-12" onClick={() => setStep(3)}>
                  Pay {formatCurrency(total)}
                </Button>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl p-8 shadow-card border border-border/40 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-card-foreground mb-2">Booking Confirmed!</h2>
                  <p className="text-muted-foreground">Your tickets for <span className="font-semibold text-foreground">{event.title}</span> are confirmed.</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 space-y-2 text-left">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Booking ID</span><span className="font-mono font-semibold text-foreground">BK-2026-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tickets</span><span className="font-semibold text-foreground">{totalTickets}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Paid</span><span className="font-semibold text-accent">{formatCurrency(total)}</span></div>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" className="rounded-xl" onClick={() => navigate("/attendee/tickets")}>
                    <Ticket className="h-4 w-4 mr-1.5" /> View Tickets
                  </Button>
                  <Button variant="hero" className="rounded-xl" onClick={() => navigate("/attendee/discover")}>
                    Discover More Events
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        {step < 3 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border/40 space-y-4 sticky top-24">
              <h3 className="font-heading font-semibold text-card-foreground">Order Summary</h3>
              <div className="flex items-center gap-3">
                <img src={event.image} alt={event.title} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-semibold text-card-foreground line-clamp-1">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
              <div className="border-t border-border/40 pt-3 space-y-2">
                {ticketTiers.filter((t) => tickets[t.name]).map((tier) => (
                  <div key={tier.name} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{tier.name} × {tickets[tier.name]}</span>
                    <span className="text-foreground">{formatCurrency(tier.price * (tickets[tier.name] || 0))}</span>
                  </div>
                ))}
              </div>

              {/* Promo */}
              <div className="flex gap-2">
                <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="h-9 rounded-lg text-xs" />
                <Button variant="outline" size="sm" className="rounded-lg text-xs shrink-0" onClick={() => setPromoApplied(!!promoCode)} disabled={promoApplied}>
                  {promoApplied ? "Applied" : "Apply"}
                </Button>
              </div>
              {promoApplied && <p className="text-xs text-emerald-600 flex items-center gap-1"><Tag className="h-3 w-3" /> 10% discount applied!</p>}

              <div className="border-t border-border/40 pt-3 space-y-1.5">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-sm"><span className="text-emerald-600">Discount</span><span className="text-emerald-600">-{formatCurrency(discount)}</span></div>}
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Platform fee</span><span>{formatCurrency(platformFee)}</span></div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-border/40">
                  <span>Total</span>
                  <span className="text-accent">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventCheckout;
