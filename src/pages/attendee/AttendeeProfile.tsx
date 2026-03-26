import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, MapPin, Edit, Shield, Bell, CreditCard, Award, TrendingUp, Star, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { mockAttendees, mockRegistrations, mockEvents, formatCurrency } from "@/data/mockData";
import { Link } from "react-router-dom";

const user = mockAttendees[0];

const recentActivity = [
  { action: "Registered for", event: "Global Tech Summit 2026", date: "Mar 1, 2026", type: "registration" },
  { action: "Saved", event: "Midnight Echoes Festival", date: "Feb 28, 2026", type: "save" },
  { action: "Attended", event: "AI Workshop Bangalore", date: "Feb 15, 2026", type: "attend" },
  { action: "Reviewed", event: "Design Thinking Masterclass", date: "Feb 10, 2026", type: "review" },
  { action: "Registered for", event: "City Marathon & Fun Run", date: "Feb 5, 2026", type: "registration" },
];

const badges = [
  { name: "Early Adopter", icon: Star, color: "text-gold", bg: "bg-gold/10" },
  { name: "Event Explorer", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
  { name: "Social Butterfly", icon: Award, color: "text-violet", bg: "bg-violet/10" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const AttendeeProfile = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-3xl mx-auto">
      {/* Profile Header */}
      <motion.div
        variants={item}
        className="bg-card rounded-2xl shadow-card border border-border/40 overflow-hidden"
      >
        <div className="h-32 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-40" />
        </div>
        <div className="px-6 pb-6 -mt-14">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-coral-dark flex items-center justify-center border-4 border-card shadow-elevated">
              <span className="text-2xl font-heading font-bold text-accent-foreground">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1 pb-1">
              <h1 className="font-heading text-2xl font-bold text-card-foreground tracking-tight">{user.name}</h1>
              <p className="text-sm text-muted-foreground">Member since {new Date(user.registeredSince).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
              <Edit className="h-3.5 w-3.5" /> Edit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Events Attended", value: user.eventsAttended, icon: Calendar },
              { label: "Total Spent", value: formatCurrency(user.totalSpent), icon: CreditCard },
              { label: "Status", value: "Active", icon: Shield, isStatus: true },
            ].map((s) => (
              <div key={s.label} className="text-center p-3.5 rounded-xl bg-secondary/50 border border-border/30">
                <div className="font-heading font-bold text-lg text-card-foreground">
                  {s.isStatus ? (
                    <span className="text-emerald capitalize">{String(s.value)}</span>
                  ) : (
                    s.value
                  )}
                </div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex gap-3 mt-5">
            {badges.map((b) => (
              <div key={b.name} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${b.bg} border border-border/30`}>
                <b.icon className={`h-3.5 w-3.5 ${b.color}`} />
                <span className="text-xs font-semibold text-card-foreground">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        variants={item}
        className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5"
      >
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-accent" /> Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={user.name} className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user.email} type="email" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={user.phone} className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input defaultValue="Mumbai" className="rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Bio</Label>
          <Input defaultValue="Tech enthusiast, music lover, and marathon runner 🏃‍♀️" className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Interests</Label>
          <div className="flex flex-wrap gap-2">
            {["Technology", "Music", "Running", "Design", "Art"].map((interest) => (
              <span key={interest} className="text-xs font-medium bg-accent/8 text-accent px-3 py-1.5 rounded-full border border-accent/15">
                {interest}
              </span>
            ))}
            <button className="text-xs font-medium bg-secondary text-muted-foreground px-3 py-1.5 rounded-full hover:bg-secondary/80 transition-colors">
              + Add more
            </button>
          </div>
        </div>
        <Button variant="hero" size="sm" className="rounded-xl">Save Changes</Button>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={item}
        className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5"
      >
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" /> Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors">
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                a.type === "registration" ? "bg-emerald" : a.type === "save" ? "bg-accent" : a.type === "attend" ? "bg-violet" : "bg-gold"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-semibold">{a.event}</span>
                </p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{a.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        variants={item}
        className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5"
      >
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" /> Notification Preferences
        </h2>
        {[
          { label: "Event reminders (24h before)", on: true },
          { label: "New events from saved organizers", on: true },
          { label: "Price drop alerts", on: false },
          { label: "Weekly event digest", on: true },
          { label: "SMS notifications", on: false },
          { label: "Push notifications", on: true },
        ].map((pref) => (
          <div key={pref.label} className="flex items-center justify-between py-1">
            <span className="text-sm text-card-foreground">{pref.label}</span>
            <Switch defaultChecked={pref.on} />
          </div>
        ))}
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        variants={item}
        className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4"
      >
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-accent" /> Payment Methods
        </h2>
        {[
          { type: "VISA", last4: "4242", exp: "08/27", isDefault: true },
          { type: "UPI", last4: "priya@oksbi", exp: "Linked", isDefault: false },
        ].map((card) => (
          <div key={card.last4} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-border/30">
            <div className="w-12 h-8 bg-primary rounded-md flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary-foreground">{card.type}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">
                {card.type === "UPI" ? card.last4 : `•••• •••• •••• ${card.last4}`}
              </p>
              <p className="text-xs text-muted-foreground">{card.type === "UPI" ? "UPI Linked" : `Expires ${card.exp}`}</p>
            </div>
            {card.isDefault && (
              <span className="text-[10px] bg-emerald/10 text-emerald px-2.5 py-1 rounded-full font-semibold">Default</span>
            )}
          </div>
        ))}
        <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
          <CreditCard className="h-3.5 w-3.5" /> Add Payment Method
        </Button>
      </motion.div>

      {/* Account Actions */}
      <motion.div variants={item} className="flex gap-3">
        <Link to="/login" className="flex-1">
          <Button variant="outline" className="w-full gap-2 rounded-xl text-destructive hover:bg-destructive/5">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default AttendeeProfile;
