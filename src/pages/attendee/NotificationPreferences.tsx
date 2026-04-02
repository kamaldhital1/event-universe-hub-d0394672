import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, Smartphone, MessageSquare, Calendar, Tag, Users, Volume2, CheckCircle2 } from "lucide-react";

const categories = [
  { icon: Calendar, label: "Event reminders", desc: "Get notified 24h and 1h before events you're attending", key: "eventReminders", default: true },
  { icon: Tag, label: "Price drops & promos", desc: "Alerts when events you saved have discounts", key: "priceDrops", default: true },
  { icon: Users, label: "Community activity", desc: "Updates from groups and communities you follow", key: "community", default: false },
  { icon: Bell, label: "New events near you", desc: "Weekly digest of new events in your cities", key: "newEvents", default: true },
  { icon: Volume2, label: "Lineup announcements", desc: "Speaker/artist reveals for events you follow", key: "lineups", default: true },
  { icon: MessageSquare, label: "Review requests", desc: "Reminders to review events you attended", key: "reviews", default: false },
];

const NotificationPreferences = () => {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.key, c.default]))
  );
  const [channels, setChannels] = useState({ email: true, push: true, sms: false });
  const [saved, setSaved] = useState(false);

  const togglePref = (key: string) => setPrefs((p) => ({ ...p, [key]: !p[key] }));
  const toggleChannel = (key: keyof typeof channels) => setChannels((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">Notifications</h1>
        <p className="text-muted-foreground text-sm mt-1">Control what you hear about and how.</p>
      </div>

      {/* Channels */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
        <h2 className="font-heading font-semibold text-lg text-card-foreground">Notification Channels</h2>
        {[
          { key: "email" as const, label: "Email", icon: Mail, desc: "Detailed updates to your inbox" },
          { key: "push" as const, label: "Push Notifications", icon: Bell, desc: "Real-time browser/mobile alerts" },
          { key: "sms" as const, label: "SMS", icon: Smartphone, desc: "Text messages for critical updates" },
        ].map((ch) => (
          <div key={ch.key} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <ch.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{ch.label}</p>
                <p className="text-xs text-muted-foreground">{ch.desc}</p>
              </div>
            </div>
            <Switch checked={channels[ch.key]} onCheckedChange={() => toggleChannel(ch.key)} />
          </div>
        ))}
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
        <h2 className="font-heading font-semibold text-lg text-card-foreground">What to Notify</h2>
        {categories.map((cat) => (
          <div key={cat.key} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <cat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </div>
            </div>
            <Switch checked={prefs[cat.key]} onCheckedChange={() => togglePref(cat.key)} />
          </div>
        ))}
      </motion.div>

      <Button variant="hero" className="w-full h-12 rounded-xl gap-2" onClick={handleSave}>
        {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : "Save Preferences"}
      </Button>
    </div>
  );
};

export default NotificationPreferences;
