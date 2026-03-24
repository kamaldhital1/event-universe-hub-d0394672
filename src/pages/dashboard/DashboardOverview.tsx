import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Plus, ArrowRight, Clock, MapPin, AlertCircle, CheckCircle2, UserPlus } from "lucide-react";
import { mockEvents, mockRegistrations, mockAttendees, formatCurrency } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const totalRevenue = mockEvents.reduce((sum, e) => sum + e.revenue, 0);
const totalRegistrations = mockRegistrations.length;
const totalAttendees = mockAttendees.length;
const activeEvents = mockEvents.filter((e) => e.status === "published").length;

const stats = [
  { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, change: "+12.5%", up: true, color: "bg-emerald-50 text-emerald-600" },
  { label: "Active Events", value: activeEvents.toString(), icon: CalendarDays, change: "+2", up: true, color: "bg-blue-50 text-blue-600" },
  { label: "Registrations", value: totalRegistrations.toLocaleString(), icon: TrendingUp, change: "+8.3%", up: true, color: "bg-amber-50 text-amber-600" },
  { label: "Total Attendees", value: totalAttendees.toLocaleString(), icon: Users, change: "+15", up: true, color: "bg-purple-50 text-purple-600" },
];

const revenueByEvent = mockEvents.map((e) => ({
  name: e.title.length > 15 ? e.title.substring(0, 15) + "…" : e.title,
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
  "hsl(12, 80%, 62%)",
  "hsl(220, 50%, 15%)",
  "hsl(35, 30%, 60%)",
  "hsl(12, 80%, 72%)",
  "hsl(220, 40%, 25%)",
  "hsl(35, 20%, 80%)",
];

const upcomingEvents = mockEvents.filter((e) => e.status === "published").slice(0, 3);

const activityFeed = [
  { id: 1, icon: UserPlus, text: "Priya Sharma registered for Global Tech Summit", time: "2 min ago", color: "text-emerald-600" },
  { id: 2, icon: CheckCircle2, text: "Midnight Echoes passed 8,500 registrations", time: "1h ago", color: "text-blue-600" },
  { id: 3, icon: AlertCircle, text: "Annual Charity Gala is still in draft", time: "3h ago", color: "text-amber-600" },
  { id: 4, icon: DollarSign, text: "₹4,999 payment received from Kiran Desai", time: "5h ago", color: "text-emerald-600" },
  { id: 5, icon: UserPlus, text: "Arjun Singh waitlisted for Midnight Echoes", time: "6h ago", color: "text-purple-600" },
];

const DashboardOverview = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header with quick actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's what's happening across your events.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/events/new">
            <Button variant="hero" size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Create Event
            </Button>
          </Link>
          <Link to="/dashboard/analytics">
            <Button variant="outline" size="sm" className="gap-2">
              <TrendingUp className="h-4 w-4" /> View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-5 shadow-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-emerald-600" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <div className="font-heading text-2xl font-bold text-card-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Revenue by Event</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueByEvent}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Bar dataKey="revenue" fill="hsl(12, 80%, 62%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Registration Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={registrationTrend}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="hsl(12, 80%, 62%)" strokeWidth={2.5} dot={{ fill: "hsl(12, 80%, 62%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Upcoming Events + Activity + Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-card-foreground">Upcoming Events</h3>
            <Link to="/dashboard/events" className="text-xs text-accent hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <img src={event.image} alt={event.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-card-foreground line-clamp-1">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3 shrink-0" />
                    <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="w-16 h-1.5 bg-muted rounded-full">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${(event.registrations / event.capacity) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{event.registrations}/{event.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 lg:col-span-1">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-card-foreground leading-snug">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Pie */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 lg:col-span-1">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Events by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" label={(e) => e.name}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Recent Registrations</h3>
          <Link to="/dashboard/registrations" className="text-xs text-accent hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendee</th>
                <th className="text-left pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Event</th>
                <th className="text-left pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Ticket</th>
                <th className="text-left pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left pb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRegistrations.slice(0, 5).map((reg) => (
                <tr key={reg.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-accent">{reg.attendeeName.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{reg.attendeeName}</p>
                        <p className="text-xs text-muted-foreground">{reg.attendeeEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <p className="text-sm text-card-foreground">{reg.eventTitle}</p>
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{reg.ticketCode}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm font-medium text-card-foreground">{formatCurrency(reg.totalAmount)}</span>
                  </td>
                  <td className="py-3">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                      reg.status === "confirmed" ? "bg-emerald-100 text-emerald-700"
                      : reg.status === "pending" ? "bg-amber-100 text-amber-700"
                      : reg.status === "waitlisted" ? "bg-purple-100 text-purple-700"
                      : "bg-muted text-muted-foreground"
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
