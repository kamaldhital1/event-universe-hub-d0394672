import { useState } from "react";
import { motion } from "framer-motion";
import {
  HandHeart, Search, Plus, Clock, Award, CheckCircle2, XCircle,
  MapPin, Phone, Mail, MoreHorizontal, Download, Users, Star,
  CalendarDays, ArrowUpRight, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const volunteers = [
  { id: "V001", name: "Arjun Patel", email: "arjun@gmail.com", phone: "+91 98765 43210", role: "Stage Coordinator", event: "Global Tech Summit 2026", shift: "9 AM – 1 PM", status: "confirmed", rating: 4.8, eventsCompleted: 12, avatar: "AP" },
  { id: "V002", name: "Meera Joshi", email: "meera@gmail.com", phone: "+91 98234 56780", role: "Registration Desk", event: "Global Tech Summit 2026", shift: "8 AM – 12 PM", status: "confirmed", rating: 4.9, eventsCompleted: 8, avatar: "MJ" },
  { id: "V003", name: "Kiran Singh", email: "kiran@gmail.com", phone: "+91 97654 32100", role: "Crowd Management", event: "Midnight Echoes Festival", shift: "4 PM – 10 PM", status: "pending", rating: 4.5, eventsCompleted: 5, avatar: "KS" },
  { id: "V004", name: "Sneha Reddy", email: "sneha@gmail.com", phone: "+91 96543 21090", role: "First Aid", event: "City Marathon & Fun Run", shift: "5 AM – 11 AM", status: "confirmed", rating: 5.0, eventsCompleted: 20, avatar: "SR" },
  { id: "V005", name: "Rahul Verma", email: "rahul@gmail.com", phone: "+91 95432 10980", role: "Photography", event: "Global Tech Summit 2026", shift: "9 AM – 6 PM", status: "pending", rating: 4.3, eventsCompleted: 3, avatar: "RV" },
  { id: "V006", name: "Anjali Das", email: "anjali@gmail.com", phone: "+91 94321 09870", role: "Speaker Liaison", event: "Design Thinking Masterclass", shift: "9 AM – 5 PM", status: "rejected", rating: 4.6, eventsCompleted: 7, avatar: "AD" },
  { id: "V007", name: "Dev Chopra", email: "dev@gmail.com", phone: "+91 93210 98760", role: "Tech Support", event: "Global Tech Summit 2026", shift: "8 AM – 6 PM", status: "confirmed", rating: 4.7, eventsCompleted: 15, avatar: "DC" },
  { id: "V008", name: "Priya Nair", email: "priyanair@gmail.com", phone: "+91 92109 87650", role: "Food & Beverage", event: "Annual Charity Gala Night", shift: "5 PM – 11 PM", status: "confirmed", rating: 4.4, eventsCompleted: 6, avatar: "PN" },
];

const roles = ["All Roles", "Stage Coordinator", "Registration Desk", "Crowd Management", "First Aid", "Photography", "Speaker Liaison", "Tech Support", "Food & Beverage"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const VolunteerManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const confirmed = volunteers.filter((v) => v.status === "confirmed").length;
  const pending = volunteers.filter((v) => v.status === "pending").length;

  const filtered = volunteers.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.role.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 space-y-7">
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/8 border border-emerald/15 mb-3">
            <HandHeart className="h-3 w-3 text-emerald" />
            <span className="text-xs font-semibold text-emerald">Volunteer Management</span>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Volunteers</h1>
          <p className="text-muted-foreground text-sm mt-1">Recruit, assign, and manage your event volunteer team.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-xl">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="hero" className="gap-2 rounded-xl">
            <Plus className="h-4 w-4" /> Add Volunteer
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Volunteers", value: volunteers.length, icon: Users, color: "text-accent", bg: "bg-accent/8" },
          { label: "Confirmed", value: confirmed, icon: CheckCircle2, color: "text-emerald", bg: "bg-emerald/8" },
          { label: "Pending", value: pending, icon: Clock, color: "text-gold", bg: "bg-gold/8" },
          { label: "Avg. Rating", value: "4.7", icon: Star, color: "text-violet", bg: "bg-violet/8" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border/40 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <div className="font-heading text-xl font-bold text-card-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <Input
            placeholder="Search volunteers by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 rounded-xl"
          />
        </div>
        <div className="flex gap-1.5 p-1.5 bg-secondary rounded-xl">
          {["all", "confirmed", "pending", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-300 ${
                statusFilter === s ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Volunteer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((vol, i) => (
          <motion.div
            key={vol.id}
            variants={item}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-card rounded-2xl p-5 border border-border/40 hover:border-border transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-sm font-heading font-bold text-emerald">{vol.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading font-bold text-base text-card-foreground">{vol.name}</h3>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize ${
                    vol.status === "confirmed" ? "bg-emerald/10 text-emerald"
                    : vol.status === "pending" ? "bg-gold/10 text-gold"
                    : "bg-destructive/10 text-destructive"
                  }`}>{vol.status}</span>
                </div>
                <p className="text-xs text-accent font-semibold mb-2">{vol.role}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{vol.event}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{vol.shift}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-gold fill-gold" />{vol.rating}</span>
                    <span>{vol.eventsCompleted} events</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><Mail className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><Phone className="h-3.5 w-3.5" /></Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem className="rounded-lg gap-2"><CheckCircle2 className="h-4 w-4" /> Approve</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg gap-2"><Award className="h-4 w-4" /> Issue Certificate</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg gap-2 text-destructive"><XCircle className="h-4 w-4" /> Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="text-center py-16 bg-card rounded-2xl border border-border/40">
          <HandHeart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg font-heading font-semibold">No volunteers found.</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or add new volunteers.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VolunteerManagement;
