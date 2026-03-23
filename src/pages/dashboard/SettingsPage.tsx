import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your organization and account settings.</p>
      </div>

      {/* Organization */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-6 shadow-card space-y-5">
        <h2 className="font-heading font-semibold text-lg text-card-foreground">Organization Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Organization Name</Label>
            <Input defaultValue="TechVerse India" />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input defaultValue="https://techverse.in" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>About</Label>
          <Textarea defaultValue="India's leading technology events platform." className="min-h-[80px]" />
        </div>
        <Button variant="hero" size="sm">Save Changes</Button>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-6 shadow-card space-y-5">
        <h2 className="font-heading font-semibold text-lg text-card-foreground">Notifications</h2>
        {[
          { label: "Email notifications for new registrations", defaultChecked: true },
          { label: "Push notifications for event updates", defaultChecked: true },
          { label: "Weekly analytics digest", defaultChecked: false },
          { label: "SMS alerts for event day reminders", defaultChecked: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">{item.label}</span>
            <Switch defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </motion.div>

      {/* Payment */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl p-6 shadow-card space-y-5">
        <h2 className="font-heading font-semibold text-lg text-card-foreground">Payment Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Bank Account Name</Label>
            <Input placeholder="Account holder name" />
          </div>
          <div className="space-y-2">
            <Label>Account Number</Label>
            <Input placeholder="XXXX XXXX XXXX" />
          </div>
          <div className="space-y-2">
            <Label>IFSC Code</Label>
            <Input placeholder="XXXXXXXXXX" />
          </div>
          <div className="space-y-2">
            <Label>GST Number</Label>
            <Input placeholder="Optional" />
          </div>
        </div>
        <Button variant="hero" size="sm">Update Payment Details</Button>
      </motion.div>

      <Separator />

      {/* Danger Zone */}
      <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 space-y-3">
        <h2 className="font-heading font-semibold text-lg text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground">Once you delete your organization, there is no going back.</p>
        <Button variant="destructive" size="sm">Delete Organization</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
