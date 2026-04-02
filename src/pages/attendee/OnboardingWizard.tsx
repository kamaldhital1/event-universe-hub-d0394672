import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, User, Heart, Bell, Sparkles, Check, MapPin } from "lucide-react";

const categories = ["Technology", "Music", "Art", "Sports", "Business", "Food", "Health", "Education", "Gaming", "Photography"];
const cities = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [notifPrefs, setNotifPrefs] = useState({ email: true, push: true, sms: false });

  const totalSteps = 4;

  const toggleInterest = (cat: string) => {
    setSelectedInterests((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) => prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i <= step ? "bg-accent" : "bg-secondary"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Profile */}
          {step === 0 && (
            <motion.div key="profile" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <User className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight">Welcome to Sansaar!</h2>
                <p className="text-muted-foreground mt-1">Let's personalize your experience. What should we call you?</p>
              </div>
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Upload Avatar (Optional)</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-accent/50" />
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">Choose Photo</Button>
                </div>
              </div>
              <Button variant="hero" className="w-full h-12 rounded-xl gap-2" onClick={() => setStep(1)}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 1: Interests */}
          {step === 1 && (
            <motion.div key="interests" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Heart className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight">What are you into?</h2>
                <p className="text-muted-foreground mt-1">Pick at least 3 interests so we can recommend the best events for you.</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleInterest(cat)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      selectedInterests.includes(cat) ? "border-accent bg-accent/10 text-accent" : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/50"
                    }`}
                  >
                    {selectedInterests.includes(cat) && <span className="mr-1">✓</span>}
                    {cat}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{selectedInterests.length} selected • minimum 3</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)} className="rounded-xl"><ArrowLeft className="h-4 w-4" /></Button>
                <Button variant="hero" className="flex-1 h-12 rounded-xl gap-2" onClick={() => setStep(2)} disabled={selectedInterests.length < 3}>
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <motion.div key="location" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <MapPin className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight">Where are you based?</h2>
                <p className="text-muted-foreground mt-1">Select your preferred cities for event discovery.</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => toggleCity(city)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      selectedCities.includes(city) ? "border-accent bg-accent/10 text-accent" : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/50"
                    }`}
                  >
                    {selectedCities.includes(city) && <span className="mr-1">✓</span>}
                    {city}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl"><ArrowLeft className="h-4 w-4" /></Button>
                <Button variant="hero" className="flex-1 h-12 rounded-xl gap-2" onClick={() => setStep(3)}>
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Notifications */}
          {step === 3 && (
            <motion.div key="notifs" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Bell className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight">Stay in the loop</h2>
                <p className="text-muted-foreground mt-1">Choose how you'd like to hear about events and updates.</p>
              </div>
              <div className="space-y-3">
                {[
                  { key: "email" as const, label: "Email notifications", desc: "Event recommendations and booking updates" },
                  { key: "push" as const, label: "Push notifications", desc: "Real-time alerts for events near you" },
                  { key: "sms" as const, label: "SMS reminders", desc: "Text messages for upcoming events" },
                ].map((pref) => (
                  <button
                    key={pref.key}
                    onClick={() => setNotifPrefs((p) => ({ ...p, [pref.key]: !p[pref.key] }))}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                      notifPrefs[pref.key] ? "border-accent bg-accent/5" : "border-border bg-card"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      notifPrefs[pref.key] ? "bg-accent text-accent-foreground" : "bg-secondary"
                    }`}>
                      {notifPrefs[pref.key] && <Check className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="rounded-xl"><ArrowLeft className="h-4 w-4" /></Button>
                <Button variant="hero" className="flex-1 h-12 rounded-xl gap-2" onClick={() => navigate("/attendee")}>
                  <Sparkles className="h-4 w-4" /> Start Exploring
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingWizard;
