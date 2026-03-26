import { motion } from "framer-motion";
import { mockEvents, mockRegistrations, mockAttendees, formatCurrency } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Download, Calendar, DollarSign, Users, Sparkles, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const totalRevenue = mockEvents.reduce((s, e) => s + e.revenue, 0);
const totalTicketsSold = mockEvents.reduce((s, e) => s + e.registrations, 0);
const avgTicketPrice = totalRevenue / totalTicketsSold;

const monthlyRevenue = [
  { month: "Oct", revenue: 1200000, prev: 900000 },
  { month: "Nov", revenue: 2800000, prev: 2100000 },
  { month: "Dec", revenue: 1500000, prev: 1800000 },
  { month: "Jan", revenue: 3200000, prev: 2600000 },
  { month: "Feb", revenue: 4500000, prev: 3900000 },
  { month: "Mar", revenue: 6800000, prev: 5200000 },
];

const attendeeGrowth = [
  { month: "Oct", attendees: 120, newUsers: 45 },
  { month: "Nov", attendees: 280, newUsers: 95 },
  { month: "Dec", attendees: 350, newUsers: 70 },
  { month: "Jan", attendees: 520, newUsers: 130 },
  { month: "Feb", attendees: 680, newUsers: 160 },
  { month: "Mar", attendees: 850, newUsers: 170 },
];

const ticketTypeDistribution = [
  { name: "General", value: 45 },
  { name: "VIP", value: 25 },
  { name: "Early Bird", value: 20 },
  { name: "Free", value: 10 },
];

const COLORS = ["hsl(12,80%,62%)", "hsl(228,55%,16%)", "hsl(42,78%,55%)", "hsl(262,72%,58%)"];

const channelData = [
  { channel: "Organic", registrations: 4200 },
  { channel: "Social", registrations: 3100 },
  { channel: "Email", registrations: 2800 },
  { channel: "Referral", registrations: 1500 },
  { channel: "Paid Ads", registrations: 900 },
];

const engagementData = [
  { metric: "Page Views", value: 85 },
  { metric: "Saves", value: 65 },
  { metric: "Shares", value: 45 },
  { metric: "Registrations", value: 72 },
  { metric: "Check-ins", value: 90 },
  { metric: "Reviews", value: 55 },
];

const hourlyData = [
  { hour: "6AM", registrations: 12 },
  { hour: "8AM", registrations: 35 },
  { hour: "10AM", registrations: 68 },
  { hour: "12PM", registrations: 95 },
  { hour: "2PM", registrations: 78 },
  { hour: "4PM", registrations: 55 },
  { hour: "6PM", registrations: 88 },
  { hour: "8PM", registrations: 120 },
  { hour: "10PM", registrations: 92 },
  { hour: "12AM", registrations: 45 },
];

const topEvents = mockEvents
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 5)
  .map((e) => ({
    name: e.title.length > 20 ? e.title.substring(0, 20) + "…" : e.title,
    revenue: e.revenue,
    registrations: e.registrations,
    fillRate: Math.round((e.registrations / e.capacity) * 100),
  }));

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const AnalyticsPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 space-y-7">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/8 border border-violet/15 mb-3">
            <TrendingUp className="h-3 w-3 text-violet" />
            <span className="text-xs font-semibold text-violet">Deep Analytics</span>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Deep insights into your event performance and growth.</p>
        </div>
        <Button variant="outline" className="gap-2 rounded-xl">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: formatCurrency(totalRevenue), change: "+18.2%", up: true, icon: DollarSign, color: "text-emerald", bg: "bg-emerald/8" },
          { label: "Tickets Sold", value: totalTicketsSold.toLocaleString(), change: "+12.5%", up: true, icon: Target, color: "text-accent", bg: "bg-accent/8" },
          { label: "Avg. Ticket Price", value: formatCurrency(Math.round(avgTicketPrice)), change: "-2.1%", up: false, icon: Calendar, color: "text-gold", bg: "bg-gold/8" },
          { label: "Conversion Rate", value: "68.4%", change: "+5.3%", up: true, icon: Eye, color: "text-violet", bg: "bg-violet/8" },
        ].map((metric) => (
          <motion.div
            key={metric.label}
            variants={item}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-card rounded-2xl p-5 shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${metric.bg} flex items-center justify-center`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${metric.up ? "text-emerald" : "text-destructive"}`}>
                {metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.change}
              </span>
            </div>
            <div className="font-heading text-2xl font-bold text-card-foreground tracking-tight">{metric.value}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue + Attendee Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-card-foreground tracking-tight">Revenue Comparison</h3>
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">vs. Last Period</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="currentRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(12,80%,62%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(12,80%,62%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220,12%,46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220,12%,46%)" }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="prev" stroke="hsl(220,12%,76%)" strokeWidth={1.5} fill="none" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="revenue" stroke="hsl(12,80%,62%)" strokeWidth={2.5} fill="url(#currentRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-card-foreground tracking-tight">Attendee Growth</h3>
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">Total + New</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendeeGrowth}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220,12%,46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220,12%,46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="attendees" fill="hsl(228,55%,16%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="newUsers" fill="hsl(12,80%,62%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Ticket + Channel + Hourly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <h3 className="font-heading font-bold text-card-foreground mb-5 tracking-tight">Ticket Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ticketTypeDistribution} cx="50%" cy="50%" outerRadius={75} innerRadius={45} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                {ticketTypeDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {ticketTypeDistribution.map((t, i) => (
              <div key={t.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs font-medium text-card-foreground">{t.name}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{t.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <h3 className="font-heading font-bold text-card-foreground mb-5 tracking-tight">Registration Channels</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={channelData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220,12%,46%)" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: "hsl(220,12%,46%)" }} width={60} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="registrations" fill="hsl(12,80%,62%)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
          <h3 className="font-heading font-bold text-card-foreground mb-5 tracking-tight">Peak Registration Hours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="hourlyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(262,72%,58%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(262,72%,58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "hsl(220,12%,46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220,12%,46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              <Area type="monotone" dataKey="registrations" stroke="hsl(262,72%,58%)" strokeWidth={2} fill="url(#hourlyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Events Table */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 shadow-card border border-border/40">
        <h3 className="font-heading font-bold text-card-foreground mb-5 tracking-tight">Top Performing Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">#</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Event</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Revenue</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Registrations</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Fill Rate</th>
              </tr>
            </thead>
            <tbody>
              {topEvents.map((e, i) => (
                <tr key={e.name} className="border-b border-border/30 last:border-0">
                  <td className="py-3.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                      i === 0 ? "bg-gold/10 text-gold" : "bg-secondary text-muted-foreground"
                    }`}>{i + 1}</span>
                  </td>
                  <td className="py-3.5 text-sm font-semibold text-card-foreground">{e.name}</td>
                  <td className="py-3.5 text-sm font-semibold text-card-foreground">{formatCurrency(e.revenue)}</td>
                  <td className="py-3.5 text-sm text-muted-foreground">{e.registrations.toLocaleString()}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${e.fillRate}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">{e.fillRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div variants={item} className="bg-gradient-to-r from-violet/5 via-accent/5 to-emerald/5 rounded-2xl p-6 border border-violet/10">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-5 w-5 text-violet" />
          <h3 className="font-heading font-bold text-card-foreground tracking-tight">AI-Powered Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Revenue Forecast", value: formatCurrency(totalRevenue * 1.3), detail: "Projected 30% increase next quarter based on current trends" },
            { title: "Optimal Pricing", value: formatCurrency(Math.round(avgTicketPrice * 1.1)), detail: "11% price increase recommended for VIP tickets based on demand" },
            { title: "Best Launch Day", value: "Tuesday 8 PM", detail: "Events launched on Tuesday evenings see 45% higher first-day registrations" },
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

export default AnalyticsPage;
