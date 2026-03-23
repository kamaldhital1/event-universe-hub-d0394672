import { motion } from "framer-motion";
import { CalendarDays, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { mockEvents, mockRegistrations, mockAttendees, formatCurrency } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const totalRevenue = mockEvents.reduce((sum, e) => sum + e.revenue, 0);
const totalRegistrations = mockRegistrations.length;
const totalAttendees = mockAttendees.length;
const activeEvents = mockEvents.filter((e) => e.status === "published").length;

const stats = [
  { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, change: "+12.5%", up: true },
  { label: "Active Events", value: activeEvents.toString(), icon: CalendarDays, change: "+2", up: true },
  { label: "Total Registrations", value: totalRegistrations.toLocaleString(), icon: TrendingUp, change: "+8.3%", up: true },
  { label: "Total Attendees", value: totalAttendees.toLocaleString(), icon: Users, change: "+15", up: true },
];

const revenueByEvent = mockEvents.map((e) => ({
  name: e.title.length > 20 ? e.title.substring(0, 20) + "…" : e.title,
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

const DashboardOverview = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's what's happening across your events.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-5 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-accent" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <div className="font-heading text-2xl font-bold text-card-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Revenue by Event</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueByEvent}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Bar dataKey="revenue" fill="hsl(12, 80%, 62%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Registrations Trend */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Registration Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={registrationTrend}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="hsl(12, 80%, 62%)" strokeWidth={2} dot={{ fill: "hsl(12, 80%, 62%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Events by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={(e) => e.name}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Registrations */}
        <div className="bg-card rounded-xl p-6 shadow-card lg:col-span-2">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Recent Registrations</h3>
          <div className="space-y-3">
            {mockRegistrations.slice(0, 5).map((reg) => (
              <div key={reg.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{reg.attendeeName}</p>
                  <p className="text-xs text-muted-foreground">{reg.eventTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">{formatCurrency(reg.totalAmount)}</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                    reg.status === "confirmed" ? "bg-emerald-100 text-emerald-700"
                    : reg.status === "pending" ? "bg-amber-100 text-amber-700"
                    : "bg-muted text-muted-foreground"
                  }`}>
                    {reg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
