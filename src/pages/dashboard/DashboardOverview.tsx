import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Plus, ArrowRight, Clock, MapPin, AlertCircle, CheckCircle2, UserPlus, Sparkles, Eye, Zap, Target, Globe } from "lucide-react";
import { mockEvents, mockRegistrations, mockAttendees, formatCurrency } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const totalRevenue = mockEvents.reduce((sum, e) => sum + e.revenue, 0);
const totalRegistrations = mockRegistrations.length;
const totalAttendees = mockAttendees.length;
const activeEvents = mockEvents.filter((e) => e.status === "published").length;

const stats = [
  { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, change: "+12.5%", up: true, gradient: "from-emerald/10 to-emerald/5", iconColor: "text-emerald", iconBg: "bg-emerald/10" },
  { label: "Active Events", value: activeEvents.toString(), icon: CalendarDays, change: "+2", up: true, gradient: "from-blue-500/10 to-blue-500/5", iconColor: "text-blue-600", iconBg: "bg-blue-500/10" },
  { label: "Registrations", value: totalRegistrations.toLocaleString(), icon: TrendingUp, change: "+8.3%", up: true, gradient: "from-gold/10 to-gold/5", iconColor: "text-gold", iconBg: "bg-gold/10" },
  { label: "Total Attendees", value: totalAttendees.toLocaleString(), icon: Users, change: "+15", up: true, gradient: "from-violet/10 to-violet/5", iconColor: "text-violet", iconBg: "bg-violet/10" },
];

const revenueByEvent = mockEvents.map((e) => ({
  name: e.title.length > 12 ? e.title.substring(0, 12) + "…" : e.title,
  revenue: e.revenue,
}));

const registrationTrend = [
  { month: "Jan", registrations: 420 },
  { month: "Feb", registrations: 680 },
  { month: "Mar", registrations: 1250 },
  { month: "Apr", registrations: 890 },
  { month: "May", registrations: 1500 },
  { month: "Jun", registrations: 780 },
];

const categoryData = [
  { name: "Conference", value: 1 },
  { name: "Music", value: 1 },
  { name: "Workshop", value: 1 },
  { name: "Gala", value: 1 },
  { name: "Sports", value: 1 },
  { name: "Art", value: 1 },
];

const COLORS = [
  "hsl(348, 83%, 55%)",
  "hsl(228, 55%, 16%)",
  "hsl(42, 78%, 55%)",
  "hsl(262, 72%, 58%)",
  "hsl(160, 64%, 43%)",
  "hsl(220, 18%, 70%)",
];

const upcomingEvents = mockEvents.filter((e) => e.status === "published").slice(0, 3);

const activityFeed = [
  { id: 1, icon: UserPlus, text: "Priya Sharma registered for Global Tech Summit", time: "2 min ago", color: "text-emerald", bg: "bg-emerald/10" },
  { id: 2, icon: CheckCircle2, text: "Midnight Echoes passed 8,500 registrations", time: "1h ago", color: "text-blue-600", bg: "bg-blue-500/10" },
  { id: 3, icon: DollarSign, text: "₹4,999 payment received from Kiran Desai", time: "3h ago", color: "text-emerald", bg: "bg-emerald/10" },
  { id: 4, icon: AlertCircle, text: "Annual Charity Gala is still in draft", time: "5h ago", color: "text-gold", bg: "bg-gold/10" },
  { id: 5, icon: UserPlus, text: "Arjun Singh waitlisted for Midnight Echoes", time: "6h ago", color: "text-violet", bg: "bg-violet/10" },
  { id: 6, icon: Eye, text: "Global Tech Summit page viewed 340 times today", time: "8h ago", color: "text-accent", bg: "bg-accent/10" },
];

const quickActions = [
  { label: "Create Event", icon: Plus, to: "/dashboard/events/new", color: "text-accent", bg: "bg-accent/8" },
  { label: "View Analytics", icon: TrendingUp, to: "/dashboard/analytics", color: "text-violet", bg: "bg-violet/8" },
  { label: "Manage Venues", icon: Globe, to: "/dashboard/venues", color: "text-emerald", bg: "bg-emerald/8" },
  { label: "Export Data", icon: Target, to: "/dashboard/registrations", color: "text-gold", bg: "bg-gold/8" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const DashboardOverview = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 space-y-7">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/15 mb-3">
            <Sparkles className="h-3 w-3 text-accent" />
            <span className="text-xs font-semibold text-accent">Live Dashboard</span>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's what's happening across your events.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/events/new">
            <Button variant="hero" size="sm" className="gap-2 rounded-xl">
              <Plus className="h-4 w-4" /> Create Event
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`bg-card rounded-2xl p-6 shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-500 bg-gradient-to-br ${stat.gradient}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? "text-emerald" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <div className="font-heading text-2xl lg:text-3xl font-bold text-card-foreground tracking-tight">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Link key={action.label} to={action.to}>
            <div className="bg-card rounded-2xl p-4 shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-300 flex items-center gap-3 group hover:-translate-y-1 cursor-pointer">
              <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <span className="text-sm font-semibold text-card-foreground">{action.label}</span>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-card-foreground tracking-tight">Revenue by Event</h3>
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByEvent}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(220, 12%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220, 12%, 46%)" }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="revenue" fill="hsl(348, 83%, 55%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-card-foreground tracking-tight">Registration Trend</h3>
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={registrationTrend}>
              <defs>
                <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(348, 83%, 55%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(348, 83%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220, 12%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220, 12%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="registrations" stroke="hsl(348, 83%, 55%)" strokeWidth={2.5} fill="url(#regGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-card-foreground tracking-tight">Upcoming Events</h3>
            <Link to="/dashboard/events" className="text-xs text-accent hover:underline font-semibold">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-all duration-300 group cursor-pointer">
                <img src={event.image} alt={event.title} className="w-12 h-12 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-card-foreground line-clamp-1">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3 shrink-0 text-accent/60" />
                    <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(event.registrations / event.capacity) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">{event.registrations}/{event.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <h3 className="font-heading font-bold text-card-foreground mb-5 tracking-tight">Recent Activity</h3>
          <div className="space-y-4">
            {activityFeed.map((a) => (
              <div key={a.id} className="flex items-start gap-3 group">
                <div className={`w-8 h-8 rounded-xl ${a.bg} flex items-center justify-center shrink-0 ${a.color} group-hover:scale-110 transition-transform duration-200`}>
                  <a.icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-card-foreground leading-snug">{a.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Pie */}
        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <h3 className="font-heading font-bold text-card-foreground mb-5 tracking-tight">Events by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={75} innerRadius={45} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[10px] text-muted-foreground font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Registrations */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-bold text-card-foreground tracking-tight">Recent Registrations</h3>
          <Link to="/dashboard/registrations" className="text-xs text-accent hover:underline font-semibold flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Attendee</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Event</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Ticket</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Amount</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRegistrations.slice(0, 5).map((reg) => (
                <tr key={reg.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/8 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-accent">{reg.attendeeName.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-card-foreground">{reg.attendeeName}</p>
                        <p className="text-xs text-muted-foreground">{reg.attendeeEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 hidden md:table-cell">
                    <p className="text-sm text-card-foreground">{reg.eventTitle}</p>
                  </td>
                  <td className="py-4 hidden md:table-cell">
                    <span className="text-xs font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">{reg.ticketCode}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm font-semibold text-card-foreground">{formatCurrency(reg.totalAmount)}</span>
                  </td>
                  <td className="py-4">
                    <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize ${
                      reg.status === "confirmed" ? "bg-emerald/10 text-emerald"
                      : reg.status === "pending" ? "bg-gold/10 text-gold"
                      : reg.status === "waitlisted" ? "bg-violet/10 text-violet"
                      : "bg-secondary text-muted-foreground"
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Performance Insights */}
      <motion.div variants={item} className="bg-gradient-to-r from-accent/5 via-violet/5 to-emerald/5 rounded-2xl p-6 border border-accent/10">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="h-5 w-5 text-accent" />
          <h3 className="font-heading font-bold text-card-foreground tracking-tight">Performance Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Best Performing Event", value: "Midnight Echoes", detail: "85% capacity filled in 2 weeks" },
            { title: "Top Registration Day", value: "Tuesday", detail: "32% of all registrations happen on Tuesdays" },
            { title: "Avg. Revenue/Event", value: formatCurrency(Math.round(totalRevenue / mockEvents.length)), detail: "Up 18% from last quarter" },
          ].map((insight) => (
            <div key={insight.title} className="bg-card/60 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{insight.title}</p>
              <p className="font-heading font-bold text-lg text-card-foreground mt-1">{insight.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{insight.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
