import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Search, Ticket, Heart, Share2, Bell, Star,
  Calendar, BarChart3, Users, Megaphone, Settings, CreditCard,
  HandHeart, Clock, Award, CheckCircle, MapPin, Shield,
  ArrowRight,
} from "lucide-react";

const roles = [
  {
    id: "attendee",
    label: "Attendees",
    tagline: "Discover. Experience. Remember.",
    description: "Find events you love, register in seconds, and build a personal event timeline that's uniquely yours.",
    color: "text-violet",
    bg: "bg-violet/8",
    border: "border-violet/20",
    activeBg: "bg-violet/15",
    features: [
      { icon: Search, title: "Smart Discovery", desc: "AI-powered recommendations based on your interests, location, and past events." },
      { icon: Ticket, title: "Instant Ticketing", desc: "Book tickets with UPI, cards, or wallets. QR-based check-in — no paper needed." },
      { icon: Heart, title: "Save & Wishlist", desc: "Bookmark events, get price-drop alerts, and never miss an experience you love." },
      { icon: Share2, title: "Social Sharing", desc: "Share events with friends, create group bookings, and earn referral rewards." },
      { icon: Bell, title: "Live Notifications", desc: "Real-time updates on schedule changes, gate openings, and exclusive perks." },
      { icon: Star, title: "Rate & Review", desc: "Share your experience, rate organizers, and help the community find quality events." },
    ],
  },
  {
    id: "volunteer",
    label: "Volunteers",
    tagline: "Contribute. Grow. Make an Impact.",
    description: "Join event teams, build your portfolio, earn certificates, and make every event run smoother.",
    color: "text-emerald",
    bg: "bg-emerald/8",
    border: "border-emerald/20",
    activeBg: "bg-emerald/15",
    features: [
      { icon: HandHeart, title: "Easy Sign-Up", desc: "Browse volunteer opportunities by role, skill, and location — apply with one tap." },
      { icon: Clock, title: "Shift Management", desc: "View your assigned shifts, swap with teammates, and check in/out digitally." },
      { icon: Award, title: "Certificates & Badges", desc: "Earn verifiable certificates and skill badges for every event you contribute to." },
      { icon: CheckCircle, title: "Task Tracking", desc: "Get real-time task assignments, checklists, and progress updates during events." },
      { icon: MapPin, title: "Venue Navigation", desc: "Access event floor maps, assigned zones, and emergency contact info on the go." },
      { icon: Shield, title: "Safety & Support", desc: "Built-in incident reporting, emergency alerts, and direct communication with coordinators." },
    ],
  },
  {
    id: "organizer",
    label: "Organizers",
    tagline: "Create. Manage. Scale.",
    description: "End-to-end tools to build world-class events — from a 50-person workshop to a 50,000-seat festival.",
    color: "text-accent",
    bg: "bg-accent/8",
    border: "border-accent/20",
    activeBg: "bg-accent/15",
    features: [
      { icon: Calendar, title: "Event Builder", desc: "Drag-and-drop event creation with custom branding, multi-day schedules, and speaker management." },
      { icon: CreditCard, title: "Revenue & Payments", desc: "Multi-tier ticketing, promo codes, group discounts, and instant payouts to your bank." },
      { icon: BarChart3, title: "Live Analytics", desc: "Real-time dashboards for attendance, revenue, demographics, and marketing ROI." },
      { icon: Users, title: "Team & Volunteer Mgmt", desc: "Assign roles, manage volunteer shifts, and coordinate your crew from one dashboard." },
      { icon: Megaphone, title: "Marketing Suite", desc: "Email campaigns, social media integration, UTM tracking, and audience segmentation." },
      { icon: Settings, title: "Venue & Operations", desc: "Floor plan management, vendor coordination, equipment tracking, and day-of logistics." },
    ],
  },
];

const RolesShowcaseSection = () => {
  const [active, setActive] = useState("attendee");
  const current = roles.find((r) => r.id === active)!;

  return (
    <section className="py-28 bg-warm-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Built for Everyone
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight">
            One Platform,{" "}
            <span className="text-gradient">Three Experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you're discovering events, volunteering your time, or organizing the next big thing — Sansaar has purpose-built tools for you.
          </p>
        </motion.div>

        {/* Role Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-14"
        >
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActive(role.id)}
              className={`relative px-6 py-3 rounded-xl text-sm font-heading font-semibold transition-all duration-300 border ${
                active === role.id
                  ? `${role.activeBg} ${role.color} ${role.border}`
                  : "bg-card border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {role.label}
            </button>
          ))}
        </motion.div>

        {/* Active Role Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tagline & description */}
            <div className="text-center mb-12">
              <h3 className={`font-heading text-2xl md:text-3xl font-bold ${current.color} mb-3`}>
                {current.tagline}
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {current.features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className={`bg-card rounded-2xl p-6 border border-border/40 hover:border-border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}>
                    <div className={`w-11 h-11 rounded-xl ${current.bg} border ${current.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-5 w-5 ${current.color}`} />
                    </div>
                    <h4 className="font-heading font-bold text-base text-card-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RolesShowcaseSection;
