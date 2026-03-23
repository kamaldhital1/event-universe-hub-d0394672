import { motion } from "framer-motion";
import { mockEvents, mockRegistrations, mockAttendees, formatCurrency } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

const totalRevenue = mockEvents.reduce((s, e) => s + e.revenue, 0);
const totalTicketsSold = mockEvents.reduce((s, e) => s + e.registrations, 0);
const avgTicketPrice = totalRevenue / totalTicketsSold;

const monthlyRevenue = [
  { month: "Oct", revenue: 1200000 },
  { month: "Nov", revenue: 2800000 },
  { month: "Dec", revenue: 1500000 },
  { month: "Jan", revenue: 3200000 },
  { month: "Feb", revenue: 4500000 },
  { month: "Mar", revenue: 6800000 },
];

const attendeeGrowth = [
  { month: "Oct", attendees: 120 },
  { month: "Nov", attendees: 280 },
  { month: "Dec", attendees: 350 },
  { month: "Jan", attendees: 520 },
  { month: "Feb", attendees: 680 },
  { month: "Mar", attendees: 850 },
];

const ticketTypeDistribution = [
  { name: "General", value: 45 },
  { name: "VIP", value: 25 },
  { name: "Early Bird", value: 20 },
  { name: "Free", value: 10 },
];

const COLORS = ["hsl(12,80%,62%)", "hsl(220,50%,15%)", "hsl(35,30%,60%)", "hsl(12,80%,72%)"];

const channelData = [
  { channel: "Organic", registrations: 4200 },
  { channel: "Social", registrations: 3100 },
  { channel: "Email", registrations: 2800 },
  { channel: "Referral", registrations: 1500 },
  { channel: "Paid Ads", registrations: 900 },
];

const AnalyticsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Deep insights into your event performance.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: formatCurrency(totalRevenue) },
          { label: "Tickets Sold", value: totalTicketsSold.toLocaleString() },
          { label: "Avg. Ticket Price", value: formatCurrency(Math.round(avgTicketPrice)) },
          { label: "Conversion Rate", value: "68.4%" },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-5 shadow-card"
          >
            <div className="text-2xl font-heading font-bold text-card-foreground">{metric.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue + Attendee Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(12,80%,62%)" fill="hsl(12,80%,62%)" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Attendee Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={attendeeGrowth}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="attendees" stroke="hsl(220,50%,15%)" strokeWidth={2} dot={{ fill: "hsl(220,50%,15%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ticket + Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Ticket Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ticketTypeDistribution} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="value" label={(e) => `${e.name} (${e.value}%)`}>
                {ticketTypeDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Registration Channels</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={channelData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="channel" tick={{ fontSize: 11 }} width={60} />
              <Tooltip />
              <Bar dataKey="registrations" fill="hsl(12,80%,62%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
