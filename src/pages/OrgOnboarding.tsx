import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2, User, Globe, FileText, Users, ArrowRight, ArrowLeft,
  Check, Upload, Briefcase, GraduationCap, Landmark, Rocket, Heart, ChevronRight,
  Shield, Clock, Sparkles, MapPin, Phone, Mail, Hash
} from "lucide-react";
import type { OrgType } from "@/data/mockData";

const orgTypes: { value: OrgType; label: string; icon: React.ReactNode; desc: string; features: string[] }[] = [
  { value: "individual", label: "Individual", icon: <User className="h-6 w-6" />, desc: "Solo event organizer or freelancer", features: ["Up to 5 events/year", "Basic analytics", "Email support"] },
  { value: "company", label: "Company", icon: <Building2 className="h-6 w-6" />, desc: "Registered business or corporation", features: ["Unlimited events", "Advanced analytics", "Priority support", "Custom branding"] },
  { value: "ngo", label: "NGO / Non-Profit", icon: <Heart className="h-6 w-6" />, desc: "Charitable or non-profit organization", features: ["Discounted pricing", "Donation integration", "Impact reports", "Volunteer management"] },
  { value: "government", label: "Government", icon: <Landmark className="h-6 w-6" />, desc: "Government body or public institution", features: ["Unlimited events", "Public portal", "Compliance reports", "Dedicated manager"] },
  { value: "educational", label: "Educational", icon: <GraduationCap className="h-6 w-6" />, desc: "School, college, or training institute", features: ["Student discounts", "Academic calendar", "Certificate generation", "LMS integration"] },
  { value: "startup", label: "Startup", icon: <Rocket className="h-6 w-6" />, desc: "Early-stage venture or startup", features: ["Startup-friendly pricing", "Investor connect", "Demo day tools", "Growth analytics"] },
];

const steps = [
  { id: 1, title: "Organization Type", icon: <Briefcase className="h-4 w-4" /> },
  { id: 2, title: "Basic Details", icon: <Building2 className="h-4 w-4" /> },
  { id: 3, title: "Contact Person", icon: <User className="h-4 w-4" /> },
  { id: 4, title: "Documents & Verification", icon: <FileText className="h-4 w-4" /> },
  { id: 5, title: "Review & Submit", icon: <Check className="h-4 w-4" /> },
];

const OrgOnboarding = () => {
  const [step, setStep] = useState(1);
  const [orgType, setOrgType] = useState<OrgType | null>(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    orgName: "", email: "", phone: "", website: "",
    regNumber: "", gstNumber: "", panNumber: "",
    address: "", city: "", state: "", pincode: "",
    description: "", pastExperience: "", expectedEvents: "",
    contactName: "", contactRole: "", contactEmail: "", contactPhone: "",
    socialLinkedin: "", socialInstagram: "", socialTwitter: "",
  });

  const update = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));

  const handleSubmit = () => navigate("/org/pending");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
              <span className="text-accent-foreground font-heading font-bold text-sm">S</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">Sansaar</span>
          </Link>
          <span className="text-sm text-muted-foreground font-medium">Organization Registration</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  step === s.id ? "bg-accent/10 text-accent" : step > s.id ? "text-emerald-600" : "text-muted-foreground"
                }`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step === s.id ? "bg-accent text-accent-foreground" : step > s.id ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
                  }`}>
                    {step > s.id ? <Check className="h-3.5 w-3.5" /> : s.id}
                  </div>
                  <span className="hidden md:block">{s.title}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 mx-1 hidden md:block" />
                )}
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-accent rounded-full"
              animate={{ width: `${(step / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Org Type */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Select your organization type</h2>
              <p className="text-muted-foreground mb-8">This helps us tailor the platform features and verification process for you.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orgTypes.map((t) => (
                  <motion.button
                    key={t.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOrgType(t.value)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                      orgType === t.value
                        ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                        : "border-border hover:border-accent/30 bg-card"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      orgType === t.value ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {t.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{t.label}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{t.desc}</p>
                    <ul className="space-y-1">
                      {t.features.map((f) => (
                        <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Basic Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Organization Details</h2>
              <p className="text-muted-foreground mb-8">Provide your organization's official information for verification.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5 text-muted-foreground" /> Organization Name *</Label>
                  <Input placeholder="e.g. TechVerse India Pvt. Ltd." value={form.orgName} onChange={e => update("orgName", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-muted-foreground" /> Official Email *</Label>
                  <Input type="email" placeholder="admin@yourorg.com" value={form.email} onChange={e => update("email", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-muted-foreground" /> Phone Number *</Label>
                  <Input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => update("phone", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-muted-foreground" /> Website</Label>
                  <Input placeholder="https://yourorg.com" value={form.website} onChange={e => update("website", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Hash className="h-3.5 w-3.5 text-muted-foreground" /> Registration / CIN Number</Label>
                  <Input placeholder="CIN-XXXXXX or REG-XXXXX" value={form.regNumber} onChange={e => update("regNumber", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>GST Number</Label>
                  <Input placeholder="29AABCT1234Q1Z5" value={form.gstNumber} onChange={e => update("gstNumber", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>PAN Number *</Label>
                  <Input placeholder="AABCT1234Q" value={form.panNumber} onChange={e => update("panNumber", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="md:col-span-2 border-t border-border/50 pt-6 mt-2">
                  <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Address</h3>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Street Address *</Label>
                  <Input placeholder="Full address" value={form.address} onChange={e => update("address", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input placeholder="City" value={form.city} onChange={e => update("city", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Input placeholder="State" value={form.state} onChange={e => update("state", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Pincode *</Label>
                  <Input placeholder="XXXXXX" value={form.pincode} onChange={e => update("pincode", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Organization Description *</Label>
                  <Textarea placeholder="Tell us about your organization, mission, and what kind of events you organize..." value={form.description} onChange={e => update("description", e.target.value)} className="rounded-xl min-h-[100px]" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Past Event Experience</Label>
                  <Textarea placeholder="Describe your past event organizing experience, notable events, partnerships..." value={form.pastExperience} onChange={e => update("pastExperience", e.target.value)} className="rounded-xl min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <Label>Expected Events per Year</Label>
                  <Input type="number" placeholder="12" value={form.expectedEvents} onChange={e => update("expectedEvents", e.target.value)} className="h-12 rounded-xl" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Person */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Contact Person</h2>
              <p className="text-muted-foreground mb-8">Who should we contact regarding this organization's account?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input placeholder="Full name" value={form.contactName} onChange={e => update("contactName", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Role / Designation *</Label>
                  <Input placeholder="CEO, Director, Manager..." value={form.contactRole} onChange={e => update("contactRole", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" placeholder="contact@yourorg.com" value={form.contactEmail} onChange={e => update("contactEmail", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input placeholder="+91 XXXXX XXXXX" value={form.contactPhone} onChange={e => update("contactPhone", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="md:col-span-2 border-t border-border/50 pt-6 mt-2">
                  <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><Globe className="h-4 w-4 text-accent" /> Social Links (Optional)</h3>
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input placeholder="https://linkedin.com/company/..." value={form.socialLinkedin} onChange={e => update("socialLinkedin", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input placeholder="https://instagram.com/..." value={form.socialInstagram} onChange={e => update("socialInstagram", e.target.value)} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Twitter / X</Label>
                  <Input placeholder="https://twitter.com/..." value={form.socialTwitter} onChange={e => update("socialTwitter", e.target.value)} className="h-12 rounded-xl" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Documents & Verification</h2>
              <p className="text-muted-foreground mb-8">Upload required documents for verification. Accepted formats: PDF, JPG, PNG (max 5MB each).</p>
              
              <div className="max-w-3xl space-y-4">
                {/* Required docs based on org type */}
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-foreground">Required for {orgType ? orgType.charAt(0).toUpperCase() + orgType.slice(1) : "your"} registration</span>
                  </div>
                  <p className="text-xs text-muted-foreground">All documents are securely stored and only accessible by the verification team.</p>
                </div>

                {[
                  { name: "PAN Card", required: true, desc: "Permanent Account Number card" },
                  { name: "Registration Certificate", required: orgType !== "individual", desc: "Company/NGO/Govt registration proof" },
                  { name: "GST Certificate", required: orgType === "company", desc: "Goods and Services Tax certificate" },
                  { name: "Address Proof", required: true, desc: "Utility bill, bank statement, or lease agreement" },
                  { name: "Identity Proof", required: orgType === "individual", desc: "Aadhaar Card, Passport, or Voter ID" },
                  { name: "Past Event Portfolio", required: false, desc: "Photos, reports, or references from previous events" },
                  { name: "Authorization Letter", required: orgType === "government", desc: "Official authorization from department head" },
                ].map((doc) => (
                  <div key={doc.name} className={`p-4 rounded-xl border ${doc.required ? "border-border" : "border-border/50"} bg-card flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          {doc.name}
                          {doc.required && <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-md font-semibold">REQUIRED</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{doc.desc}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg gap-1.5">
                      <Upload className="h-3.5 w-3.5" /> Upload
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Review & Submit</h2>
              <p className="text-muted-foreground mb-8">Please review your details before submitting for verification.</p>

              <div className="max-w-3xl space-y-6">
                {/* Summary Cards */}
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-accent" /> Organization Type
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {orgType ? orgTypes.find(t => t.value === orgType)?.label : "Not selected"} — {orgTypes.find(t => t.value === orgType)?.desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-accent" /> Basic Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Name", form.orgName || "—"],
                      ["Email", form.email || "—"],
                      ["Phone", form.phone || "—"],
                      ["Website", form.website || "—"],
                      ["City", form.city || "—"],
                      ["State", form.state || "—"],
                    ].map(([l, v]) => (
                      <div key={l}>
                        <span className="text-muted-foreground">{l}:</span>
                        <span className="ml-1 text-foreground font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                    <User className="h-4 w-4 text-accent" /> Contact Person
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Name", form.contactName || "—"],
                      ["Role", form.contactRole || "—"],
                      ["Email", form.contactEmail || "—"],
                      ["Phone", form.contactPhone || "—"],
                    ].map(([l, v]) => (
                      <div key={l}>
                        <span className="text-muted-foreground">{l}:</span>
                        <span className="ml-1 text-foreground font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification info */}
                <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">What happens next?</h4>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-bold">1</span> Your application will be reviewed by our verification team</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-bold">2</span> We may contact you for additional information (within 24-48 hours)</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-bold">3</span> Upon approval, you'll get full access to the Organizer Dashboard</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-bold">4</span> Rejected applications can reapply with updated documents</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <input type="checkbox" id="terms" className="rounded" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I confirm that all information provided is accurate and I agree to the{" "}
                    <Link to="/" className="text-accent hover:underline">Terms of Service</Link> and{" "}
                    <Link to="/" className="text-accent hover:underline">Organizer Agreement</Link>.
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/50 max-w-3xl">
          <Button
            variant="outline"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="rounded-xl gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          {step < 5 ? (
            <Button
              variant="hero"
              onClick={() => setStep(s => Math.min(5, s + 1))}
              disabled={step === 1 && !orgType}
              className="rounded-xl gap-2"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="hero" onClick={handleSubmit} className="rounded-xl gap-2">
              <Sparkles className="h-4 w-4" /> Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgOnboarding;
