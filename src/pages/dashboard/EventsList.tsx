import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Copy, CalendarDays, Users, DollarSign, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockEvents, formatCurrency, getStatusColor } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const EventsList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = mockEvents.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = filtered.reduce((s, e) => s + e.revenue, 0);
  const totalRegistrations = filtered.reduce((s, e) => s + e.registrations, 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 space-y-7">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/8 border border-blue-500/15 mb-3">
            <CalendarDays className="h-3 w-3 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600">Event Management</span>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Events</h1>
          <p className="text-muted-foreground text-sm mt-1">Create, manage, and track all your events in one place.</p>
        </div>
        <Link to="/dashboard/events/new">
          <Button variant="hero" className="gap-2 rounded-xl">
            <Plus className="h-4 w-4" /> Create Event
          </Button>
        </Link>
      </motion.div>

      {/* Summary stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/8 flex items-center justify-center shrink-0">
            <CalendarDays className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="font-heading text-xl font-bold text-card-foreground">{filtered.length}</div>
            <div className="text-[10px] text-muted-foreground font-medium">Total Events</div>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald/8 flex items-center justify-center shrink-0">
            <Users className="h-5 w-5 text-emerald" />
          </div>
          <div>
            <div className="font-heading text-xl font-bold text-card-foreground">{totalRegistrations.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground font-medium">Registrations</div>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/8 flex items-center justify-center shrink-0">
            <DollarSign className="h-5 w-5 text-gold" />
          </div>
          <div>
            <div className="font-heading text-xl font-bold text-card-foreground">{formatCurrency(totalRevenue)}</div>
            <div className="text-[10px] text-muted-foreground font-medium">Total Revenue</div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 rounded-xl"
          />
        </div>
        <div className="flex gap-1.5 p-1.5 bg-secondary rounded-xl">
          {["all", "published", "draft", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-300 ${
                statusFilter === s
                  ? "bg-card text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Events Table */}
      <motion.div variants={item} className="bg-card rounded-2xl shadow-card border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Event</th>
                <th className="text-left p-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Date</th>
                <th className="text-left p-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden lg:table-cell">Registrations</th>
                <th className="text-left p-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden lg:table-cell">Revenue</th>
                <th className="text-left p-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Status</th>
                <th className="text-right p-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((event, i) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={event.image} alt={event.title} className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div>
                        <p className="font-heading font-bold text-sm text-card-foreground group-hover:text-accent transition-colors">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.category} · {event.location.split(",")[0]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-sm text-card-foreground">{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <div className="text-sm font-semibold text-card-foreground">{event.registrations.toLocaleString()} / {event.capacity.toLocaleString()}</div>
                    <div className="w-24 h-1.5 bg-secondary rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(event.registrations / event.capacity) * 100}%` }} />
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm font-bold text-card-foreground">{formatCurrency(event.revenue)}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem className="gap-2 rounded-lg"><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-lg"><Edit className="h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-lg"><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-lg text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="text-center py-16 bg-card rounded-2xl border border-border/40 shadow-card">
          <CalendarDays className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg font-heading font-semibold">No events found.</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or create a new event.</p>
          <Link to="/dashboard/events/new">
            <Button variant="hero" className="mt-5 rounded-xl">Create Event</Button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EventsList;
