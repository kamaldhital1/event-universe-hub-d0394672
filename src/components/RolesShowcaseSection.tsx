import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Search, Ticket, Heart, Share2, Bell, Star,
  Calendar, BarChart3, Users, Megaphone, Settings, CreditCard,
  HandHeart, Clock, Award, CheckCircle, MapPin, Shield,
  ArrowRight, ChevronRight, Sparkles, QrCode, Globe, TrendingUp,
  Zap, Eye, MessageSquare, Play,
} from "lucide-react";

const roles = [
  {
    id: "attendee",
    label: "Attendees",
    icon: Sparkles,
    tagline: "Discover. Experience. Remember.",
    description: "Find events you love, register in seconds, and build a personal event timeline that's uniquely yours.",
    accent: "accent",
    heroFeature: {
      title: "Smart Event Discovery",
      desc: "AI-powered recommendations learn your preferences over time, surfacing events you'll actually love — not just what's popular.",
      icon: Search,
    },
    stats: [
      { value: "2M+", label: "Events Discovered" },
      { value: "< 30s", label: "Avg. Booking Time" },
      { value: "98%", label: "Satisfaction Rate" },
    ],
    features: [
      { icon: QrCode, title: "QR Ticketing", desc: "Paperless entry with dynamic QR codes. No printing, no waiting." },
      { icon: Heart, title: "Wishlist & Alerts", desc: "Save events, get price-drop notifications and early-bird alerts." },
      { icon: Share2, title: "Social Sharing", desc: "Invite friends, create group bookings, earn referral rewards." },
      { icon: Bell, title: "Real-Time Updates", desc: "Live push notifications for schedule changes and gate openings." },
      { icon: Star, title: "Rate & Review", desc: "Share your experience and help others find quality events." },
      { icon: MessageSquare, title: "Community", desc: "Join interest groups, chat with fellow attendees, plan together." },
    ],
    mockUI: {
      type: "phone",
      screens: [
        { label: "For You", active: true },
        { label: "Music", active: false },
        { label: "Tech", active: false },
        { label: "Sports", active: false },
      ],
      cards: [
        { title: "Bangalore Music Festival", date: "Dec 15", price: "₹1,299", tag: "Trending", color: "bg-accent/10 text-accent" },
        { title: "AI & ML Summit 2025", date: "Jan 8", price: "₹2,499", tag: "New", color: "bg-emerald/10 text-emerald" },
        { title: "Sunset Yoga Retreat", date: "Dec 22", price: "₹799", tag: "Filling Fast", color: "bg-gold/10 text-gold" },
      ],
    },
  },
  {
    id: "volunteer",
    label: "Volunteers",
    icon: HandHeart,
    tagline: "Contribute. Grow. Make Impact.",
    description: "Join event teams, build your portfolio, earn certificates, and make every event run smoother.",
    accent: "emerald",
    heroFeature: {
      title: "Your Volunteering Portfolio",
      desc: "Every event you contribute to builds your verified portfolio — certificates, badges, hours logged, and skills endorsed by organizers.",
      icon: Award,
    },
    stats: [
      { value: "50K+", label: "Active Volunteers" },
      { value: "12K+", label: "Certificates Issued" },
      { value: "4.9★", label: "Volunteer Rating" },
    ],
    features: [
      { icon: HandHeart, title: "One-Tap Apply", desc: "Browse opportunities by role, skill, and location — apply instantly." },
      { icon: Clock, title: "Shift Management", desc: "View assigned shifts, swap with teammates, check in/out digitally." },
      { icon: CheckCircle, title: "Task Tracking", desc: "Real-time task assignments, checklists, and progress dashboards." },
      { icon: MapPin, title: "Venue Navigation", desc: "Floor maps, assigned zones, and emergency contact info on the go." },
      { icon: Shield, title: "Safety & Support", desc: "Incident reporting, emergency alerts, direct coordinator chat." },
      { icon: Globe, title: "Skill Network", desc: "Connect with other volunteers, join communities, find mentors." },
    ],
    mockUI: {
      type: "dashboard",
      header: "Volunteer Dashboard",
      shifts: [
        { role: "Stage Coordinator", time: "10:00 AM – 2:00 PM", status: "Active", statusColor: "bg-emerald/15 text-emerald" },
        { role: "Tech Support", time: "2:00 PM – 6:00 PM", status: "Upcoming", statusColor: "bg-gold/15 text-gold" },
        { role: "Guest Liaison", time: "6:00 PM – 9:00 PM", status: "Upcoming", statusColor: "bg-gold/15 text-gold" },
      ],
      badges: ["First Event ⭐", "10 Hours 🕐", "Team Lead 🏆"],
    },
  },
  {
    id: "organizer",
    label: "Organizers",
    icon: Calendar,
    tagline: "Create. Manage. Scale.",
    description: "End-to-end tools to build world-class events — from a 50-person workshop to a 50,000-seat festival.",
    accent: "violet",
    heroFeature: {
      title: "Command Center Analytics",
      desc: "Real-time dashboards with live ticket sales, demographic breakdowns, marketing attribution, and AI-powered demand forecasting.",
      icon: BarChart3,
    },
    stats: [
      { value: "₹200Cr+", label: "Revenue Processed" },
      { value: "15K+", label: "Events Hosted" },
      { value: "99.9%", label: "Uptime SLA" },
    ],
    features: [
      { icon: Calendar, title: "Event Builder", desc: "Drag-and-drop creation with branding, multi-day schedules, and speakers." },
      { icon: CreditCard, title: "Revenue Suite", desc: "Multi-tier tickets, promo codes, group discounts, instant payouts." },
      { icon: Users, title: "Team Management", desc: "Assign roles, manage volunteer shifts, coordinate your entire crew." },
      { icon: Megaphone, title: "Marketing Suite", desc: "Email campaigns, social integration, UTM tracking, segmentation." },
      { icon: Settings, title: "Operations Hub", desc: "Floor plans, vendor coordination, equipment tracking, logistics." },
      { icon: TrendingUp, title: "AI Insights", desc: "Predictive pricing, demand forecasting, optimal send-time analysis." },
    ],
    mockUI: {
      type: "analytics",
      metrics: [
        { label: "Tickets Sold", value: "2,847", change: "+18%", up: true },
        { label: "Revenue", value: "₹37.2L", change: "+24%", up: true },
        { label: "Check-ins", value: "1,923", change: "68%", up: true },
      ],
      chartBars: [65, 78, 45, 88, 92, 71, 95],
    },
  },
];

const accentMap: Record<string, { text: string; bg: string; bgStrong: string; border: string; gradient: string }> = {
  accent: {
    text: "text-accent",
    bg: "bg-accent/8",
    bgStrong: "bg-accent/15",
    border: "border-accent/20",
    gradient: "from-accent to-accent/60",
  },
  emerald: {
    text: "text-emerald",
    bg: "bg-emerald/8",
    bgStrong: "bg-emerald/15",
    border: "border-emerald/20",
    gradient: "from-emerald to-emerald/60",
  },
  violet: {
    text: "text-violet",
    bg: "bg-violet/8",
    bgStrong: "bg-violet/15",
    border: "border-violet/20",
    gradient: "from-violet to-violet/60",
  },
};

/* ---------- Mock UI Renderers ---------- */

const PhoneMockUI = ({ data }: { data: typeof roles[0]["mockUI"] }) => {
  if (data.type !== "phone") return null;
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-4 w-full max-w-[320px] mx-auto">
      {/* Phone header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-heading font-bold text-sm text-foreground">Explore</span>
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      {/* Category pills */}
      <div className="flex gap-2 mb-4 overflow-hidden">
        {data.screens?.map((s) => (
          <span
            key={s.label}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              s.active
                ? "bg-accent/15 text-accent border border-accent/20"
                : "bg-muted text-muted-foreground border border-transparent"
            }`}
          >
            {s.label}
          </span>
        ))}
      </div>
      {/* Event cards */}
      <div className="space-y-3">
        {data.cards?.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="bg-background rounded-xl p-3 border border-border/40"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-xs text-foreground truncate">{card.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{card.date} · {card.price}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-semibold whitespace-nowrap ${card.color}`}>
                {card.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const DashboardMockUI = ({ data }: { data: typeof roles[1]["mockUI"] }) => {
  if (data.type !== "dashboard") return null;
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-4 w-full max-w-[360px] mx-auto">
      <p className="font-heading font-bold text-sm text-foreground mb-4">{data.header}</p>
      {/* Shifts */}
      <div className="space-y-2 mb-4">
        {data.shifts?.map((shift, i) => (
          <motion.div
            key={shift.role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center justify-between bg-background rounded-xl px-3 py-2.5 border border-border/40"
          >
            <div>
              <p className="font-heading font-semibold text-xs text-foreground">{shift.role}</p>
              <p className="text-[10px] text-muted-foreground">{shift.time}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-md text-[9px] font-semibold ${shift.statusColor}`}>
              {shift.status}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        {data.badges?.map((badge) => (
          <span key={badge} className="px-2.5 py-1 rounded-lg bg-emerald/8 border border-emerald/20 text-[10px] font-semibold text-emerald">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
};

const AnalyticsMockUI = ({ data }: { data: typeof roles[2]["mockUI"] }) => {
  if (data.type !== "analytics") return null;
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-4 w-full max-w-[360px] mx-auto">
      <p className="font-heading font-bold text-sm text-foreground mb-4">Live Dashboard</p>
      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {data.metrics?.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-background rounded-xl p-2.5 border border-border/40 text-center"
          >
            <p className="font-heading font-bold text-sm text-foreground">{m.value}</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{m.label}</p>
            <span className="text-[9px] font-semibold text-emerald">{m.change}</span>
          </motion.div>
        ))}
      </div>
      {/* Chart bars */}
      <div className="flex items-end justify-between gap-1.5 h-16 px-1">
        {data.chartBars?.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 bg-gradient-to-t from-violet to-violet/40 rounded-t-md"
          />
        ))}
      </div>
      <div className="flex justify-between mt-1.5 px-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d} className="text-[8px] text-muted-foreground flex-1 text-center">{d}</span>
        ))}
      </div>
    </div>
  );
};

const MockRenderer = ({ mockUI }: { mockUI: typeof roles[number]["mockUI"] }) => {
  if (mockUI.type === "phone") return <PhoneMockUI data={mockUI} />;
  if (mockUI.type === "dashboard") return <DashboardMockUI data={mockUI as typeof roles[1]["mockUI"]} />;
  if (mockUI.type === "analytics") return <AnalyticsMockUI data={mockUI as typeof roles[2]["mockUI"]} />;
  return null;
};

/* ---------- Main Component ---------- */

const RolesShowcaseSection = () => {
  const [active, setActive] = useState("attendee");
  const current = roles.find((r) => r.id === active)!;
  const colors = accentMap[current.accent];

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

        {/* Role Tabs — premium pill style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mb-16"
        >
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-card border border-border/60">
            {roles.map((role) => {
              const isActive = active === role.id;
              const rc = accentMap[role.accent];
              return (
                <button
                  key={role.id}
                  onClick={() => setActive(role.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all duration-300 ${
                    isActive
                      ? `${rc.bgStrong} ${rc.text}`
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <role.icon className="h-4 w-4" />
                  {role.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Role Content — Bento Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto"
          >
            {/* Row 1: Hero Feature + Mock UI */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
              {/* Hero Feature — spans 3 cols */}
              <div className={`lg:col-span-3 bg-card rounded-2xl border border-border/40 p-8 lg:p-10 relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border} mb-6`}>
                    <current.heroFeature.icon className={`h-4 w-4 ${colors.text}`} />
                    <span className={`text-xs font-semibold ${colors.text}`}>Highlight Feature</span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">
                    {current.heroFeature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg text-base">
                    {current.heroFeature.desc}
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-6 mt-8">
                    {current.stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <p className={`font-heading text-2xl md:text-3xl font-bold ${colors.text}`}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Decorative gradient blob */}
                <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${colors.gradient} opacity-[0.06] blur-3xl`} />
              </div>

              {/* Mock UI — spans 2 cols */}
              <div className="lg:col-span-2 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-full"
                >
                  <MockRenderer mockUI={current.mockUI} />
                </motion.div>
              </div>
            </div>

            {/* Row 2: Tagline banner */}
            <div className={`rounded-2xl ${colors.bg} border ${colors.border} px-8 py-5 mb-5 flex flex-col md:flex-row items-center justify-between gap-4`}>
              <div className="flex items-center gap-3">
                <current.icon className={`h-6 w-6 ${colors.text}`} />
                <div>
                  <h4 className={`font-heading text-xl font-bold ${colors.text}`}>{current.tagline}</h4>
                  <p className="text-muted-foreground text-sm">{current.description}</p>
                </div>
              </div>
              <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-semibold ${colors.bgStrong} ${colors.text} border ${colors.border} hover:scale-[1.02] transition-transform`}>
                Learn More <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Row 3: Feature Grid — 3x2 bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {current.features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl p-6 border border-border/40 hover:border-border transition-all duration-300 hover:-translate-y-1 h-full relative overflow-hidden">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-base text-card-foreground mb-1.5">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
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
