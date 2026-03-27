import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2, Users, CalendarDays, TrendingUp, AlertTriangle, Clock,
  CheckCircle2, XCircle, ArrowRight, Activity, IndianRupee, Shield
} from "lucide-react";
import { mockOrganizations, formatCurrency, getStatusColor, getOrgStatusLabel } from "@/data/mockData";

const stats = [
  { label: "Total Organizations", value: "9", change: "+2 this week", icon: Building2, color: "bg-blue-50 text-blue-600" },
  { label: "Pending Approvals", value: "2", change: "Needs attention", icon: Clock, color: "bg-amber-50 text-amber-600" },
  { label: "Under Review", value: "2", change: "In progress", icon: AlertTriangle, color: "bg-orange-50 text-orange-600" },
  { label: "Active Organizations", value: "4", change: "92% approval rate", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
];

const platformStats = [
  { label: "Total Platform Revenue", value: formatCurrency(175000000), icon: IndianRupee },
  { label: "Total Events Hosted", value: "129", icon: CalendarDays },
  { label: "Platform Users", value: "48,500+", icon: Users },
  { label: "Avg. Events/Org", value: "14.3", icon: TrendingUp },
];

const recentActivity = [
  { action: "New application", org: "NexGen EdTech Academy", type: "Educational", time: "1 hour ago", status: "pending" },
  { action: "Application submitted", org: "Vivek Sharma (Individual)", type: "Individual", time: "2 days ago", status: "pending" },
  { action: "Under review", org: "Startup Garage LLP", type: "Startup", time: "5 days ago", status: "under_review" },
  { action: "Under review", org: "Canvas Collective Arts", type: "NGO", time: "7 days ago", status: "under_review" },
  { action: "Rejected", org: "Maharashtra State Tourism", type: "Government", time: "12 days ago", status: "rejected" },
  { action: "Approved", org: "RunIndia Sports", type: "Company", time: "1 month ago", status: "approved" },
];

const AdminDashboard = () => {
  const pendingOrgs = mockOrganizations.filter(o => o.status === "pending" || o.status === "under_review");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">Platform overview and organization management</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-card border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            <p className="text-xs text-accent font-medium mt-0.5">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Platform stats */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><Activity className="h-4 w-4" /> Platform Performance</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map((s) => (
            <div key={s.label} className="p-3 rounded-xl bg-primary-foreground/10">
              <s.icon className="h-4 w-4 text-primary-foreground/60 mb-1" />
              <p className="font-heading font-bold text-lg">{s.value}</p>
              <p className="text-xs text-primary-foreground/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Pending approvals */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" /> Pending Approvals
            </h3>
            <Link to="/admin/organizations" className="text-xs text-accent hover:underline font-medium flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {pendingOrgs.map((org) => (
              <div key={org.id} className="p-4 rounded-xl border border-border hover:border-accent/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{org.name}</p>
                    <p className="text-xs text-muted-foreground">{org.type.charAt(0).toUpperCase() + org.type.slice(1)} · {org.city} · Applied {org.appliedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getStatusColor(org.status)}`}>
                    {getOrgStatusLabel(org.status)}
                  </span>
                  <Link to="/admin/organizations">
                    <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-accent transition-colors cursor-pointer" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-heading font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  a.status === "approved" ? "bg-emerald-500" : a.status === "rejected" ? "bg-red-500" : a.status === "under_review" ? "bg-orange-500" : "bg-amber-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium truncate">{a.org}</p>
                  <p className="text-xs text-muted-foreground">{a.action} · {a.type} · {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
