import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Building2, Bell, CreditCard, Shield, Users, Palette, Globe, Mail, Trash2 } from "lucide-react";

const teamMembers = [
  { name: "Ravi Kumar", email: "ravi@techverse.in", role: "Admin", initials: "RK" },
  { name: "Neha Joshi", email: "neha@techverse.in", role: "Editor", initials: "NJ" },
  { name: "Amit Patel", email: "amit@techverse.in", role: "Viewer", initials: "AP" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const SettingsPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
      <motion.div variants={item}>
        <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your organization, team, and account preferences.</p>
      </motion.div>

      {/* Organization */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-accent" /> Organization Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Organization Name</Label>
            <Input defaultValue="TechVerse India" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input defaultValue="https://techverse.in" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="hello@techverse.in" type="email" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue="+91 80 4567 8900" className="rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>About</Label>
          <Textarea defaultValue="India's leading technology events and conference organizer. We bring together innovators, developers, and business leaders to shape the future of technology." className="min-h-[80px] rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Logo</Label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-coral-dark flex items-center justify-center">
              <span className="text-xl font-heading font-bold text-accent-foreground">TV</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">Upload New Logo</Button>
          </div>
        </div>
        <Button variant="hero" size="sm" className="rounded-xl">Save Changes</Button>
      </motion.div>

      {/* Team */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" /> Team Members
          </h2>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <Mail className="h-3.5 w-3.5" /> Invite Member
          </Button>
        </div>
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.email} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-border/30">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-accent">{member.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                member.role === "Admin" ? "bg-accent/10 text-accent" : member.role === "Editor" ? "bg-violet/10 text-violet" : "bg-secondary text-muted-foreground"
              }`}>{member.role}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Branding */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <Palette className="h-5 w-5 text-accent" /> Branding & Customization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Brand Color</Label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent border border-border/40" />
              <Input defaultValue="#D94F4F" className="rounded-xl flex-1" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Custom Domain</Label>
            <Input defaultValue="events.techverse.in" className="rounded-xl" />
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-card-foreground font-medium">Show Sansaar branding on event pages</p>
            <p className="text-xs text-muted-foreground mt-0.5">Display "Powered by Sansaar" on your public event pages</p>
          </div>
          <Switch defaultChecked />
        </div>
        <Button variant="hero" size="sm" className="rounded-xl">Update Branding</Button>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" /> Notifications
        </h2>
        {[
          { label: "Email notifications for new registrations", on: true, desc: "Get notified every time someone registers" },
          { label: "Push notifications for event updates", on: true, desc: "Browser push alerts for important changes" },
          { label: "Weekly analytics digest", on: false, desc: "Summary of your event performance every Monday" },
          { label: "SMS alerts for event day reminders", on: false, desc: "Text message reminders 24h before events" },
          { label: "Revenue milestone alerts", on: true, desc: "Get notified when you hit revenue milestones" },
        ].map((pref) => (
          <div key={pref.label} className="flex items-center justify-between py-1">
            <div>
              <span className="text-sm text-card-foreground font-medium">{pref.label}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{pref.desc}</p>
            </div>
            <Switch defaultChecked={pref.on} />
          </div>
        ))}
      </motion.div>

      {/* Payment */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-accent" /> Payment & Payouts
        </h2>
        <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-4 flex items-center gap-3">
          <Shield className="h-5 w-5 text-emerald" />
          <div>
            <p className="text-sm font-semibold text-card-foreground">Payment gateway connected</p>
            <p className="text-xs text-muted-foreground">Razorpay · Account verified · Payouts every 3 business days</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Bank Account Name</Label>
            <Input defaultValue="TechVerse India Pvt Ltd" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Account Number</Label>
            <Input defaultValue="•••• •••• 4567" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>IFSC Code</Label>
            <Input defaultValue="ICIC0001234" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>GST Number</Label>
            <Input defaultValue="29ABCDE1234F1ZK" className="rounded-xl" />
          </div>
        </div>
        <Button variant="hero" size="sm" className="rounded-xl">Update Payment Details</Button>
      </motion.div>

      {/* Security */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" /> Security
        </h2>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-card-foreground font-medium">Two-factor authentication</p>
            <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-card-foreground font-medium">Session timeout</p>
            <p className="text-xs text-muted-foreground mt-0.5">Auto-logout after 30 minutes of inactivity</p>
          </div>
          <Switch defaultChecked />
        </div>
        <Button variant="outline" size="sm" className="rounded-xl">Change Password</Button>
      </motion.div>

      <Separator />

      {/* Danger Zone */}
      <motion.div variants={item} className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 space-y-3">
        <h2 className="font-heading font-semibold text-lg text-destructive flex items-center gap-2">
          <Trash2 className="h-5 w-5" /> Danger Zone
        </h2>
        <p className="text-sm text-muted-foreground">Once you delete your organization, all events, data, and team access will be permanently removed. This action cannot be undone.</p>
        <Button variant="destructive" size="sm" className="rounded-xl">Delete Organization</Button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
