import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, MapPin, Edit, Shield, Bell, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { mockAttendees, formatCurrency } from "@/data/mockData";

const user = mockAttendees[0]; // Priya

const AttendeeProfile = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
      >
        <div className="h-28 bg-gradient-to-r from-primary via-navy-light to-primary" />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center border-4 border-card shadow-lg">
              <span className="text-2xl font-heading font-bold text-accent-foreground">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1 pb-1">
              <h1 className="font-heading text-2xl font-bold text-card-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground">Member since {new Date(user.registeredSince).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-lg">
              <Edit className="h-3.5 w-3.5" /> Edit Profile
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Events Attended", value: user.eventsAttended },
              { label: "Total Spent", value: formatCurrency(user.totalSpent) },
              { label: "Status", value: user.status, isStatus: true },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-muted/50">
                <div className="font-heading font-bold text-lg text-card-foreground">
                  {s.isStatus ? (
                    <span className="capitalize text-emerald-600">{String(s.value)}</span>
                  ) : (
                    s.value
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 shadow-card border border-border/50 space-y-5"
      >
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-accent" /> Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={user.name} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user.email} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={user.phone} />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input defaultValue="Mumbai" />
          </div>
        </div>
        <Button variant="hero" size="sm">Save Changes</Button>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 shadow-card border border-border/50 space-y-5"
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
        ].map((pref) => (
          <div key={pref.label} className="flex items-center justify-between">
            <span className="text-sm text-card-foreground">{pref.label}</span>
            <Switch defaultChecked={pref.on} />
          </div>
        ))}
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-6 shadow-card border border-border/50 space-y-4"
      >
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-accent" /> Payment Methods
        </h2>
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
          <div className="w-12 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary-foreground">VISA</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">•••• •••• •••• 4242</p>
            <p className="text-xs text-muted-foreground">Expires 08/27</p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Default</span>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <CreditCard className="h-3.5 w-3.5" /> Add Payment Method
        </Button>
      </motion.div>
    </div>
  );
};

export default AttendeeProfile;
