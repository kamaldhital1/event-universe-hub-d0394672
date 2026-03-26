import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, QrCode, Download, Clock, ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockRegistrations, mockEvents, formatCurrency, getStatusColor } from "@/data/mockData";
import { Link } from "react-router-dom";

const tabs = ["Upcoming", "Past", "Cancelled"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const getCountdown = (dateStr: string) => {
  const diff = new Date(dateStr).getTime() - new Date("2026-03-26").getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

const MyTickets = () => {
  const [tab, setTab] = useState("Upcoming");

  const enriched = mockRegistrations.map((r) => ({
    ...r,
    event: mockEvents.find((e) => e.id === r.eventId),
  }));

  const filtered = enriched.filter((r) => {
    if (tab === "Upcoming") return r.status === "confirmed" || r.status === "checked-in" || r.status === "pending";
    if (tab === "Past") return r.status === "checked-in";
    return r.status === "cancelled";
  });

  const totalUpcoming = enriched.filter((r) => r.status === "confirmed" || r.status === "checked-in" || r.status === "pending").length;
  const totalSpent = enriched.reduce((sum, r) => sum + r.totalAmount, 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 max-w-4xl mx-auto">
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold text-foreground tracking-tight">My Tickets</h1>
        <p className="text-muted-foreground mt-1.5">Manage your event registrations and tickets.</p>
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Tickets", value: enriched.length, icon: QrCode, color: "text-accent", bg: "bg-accent/8" },
          { label: "Upcoming", value: totalUpcoming, icon: CalendarDays, color: "text-emerald", bg: "bg-emerald/8" },
          { label: "Total Spent", value: formatCurrency(totalSpent), icon: Download, color: "text-violet", bg: "bg-violet/8" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-4 shadow-card border border-border/40 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-card-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item} className="flex gap-1 p-1.5 bg-secondary rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              tab === t ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </motion.div>

      {/* Ticket cards */}
      <div className="space-y-4">
        {filtered.map((reg, i) => {
          const daysLeft = reg.event ? getCountdown(reg.event.date) : 0;
          return (
            <motion.div
              key={reg.id}
              variants={item}
              className="bg-card rounded-2xl shadow-card border border-border/40 overflow-hidden hover:shadow-card-hover transition-all duration-500 group"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                {reg.event && (
                  <div className="sm:w-52 h-36 sm:h-auto shrink-0 relative">
                    <img src={reg.event.image} alt={reg.event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10" />
                    {tab === "Upcoming" && daysLeft <= 7 && (
                      <div className="absolute top-3 left-3 bg-gold/90 text-gold-foreground px-2.5 py-1 rounded-full">
                        <span className="text-[10px] font-bold">{daysLeft === 0 ? "Today!" : `${daysLeft}d left`}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-card-foreground group-hover:text-accent transition-colors">{reg.eventTitle}</h3>
                      {reg.event && (
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 text-accent/60" />
                            {new Date(reg.event.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-accent/60" />
                            {reg.event.time.split("–")[0].trim()}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-accent/60" />
                            {reg.event.location.split(",")[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize shrink-0 ${getStatusColor(reg.status)}`}>
                      {reg.status === "checked-in" ? (
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Checked In</span>
                      ) : reg.status === "pending" ? (
                        <span className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Pending</span>
                      ) : reg.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-border/40">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Ticket</span>
                      <p className="text-sm font-semibold text-card-foreground">{reg.ticketType}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Qty</span>
                      <p className="text-sm font-semibold text-card-foreground">{reg.quantity}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Amount</span>
                      <p className="text-sm font-bold text-accent">{formatCurrency(reg.totalAmount)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Code</span>
                      <p className="text-sm font-mono font-semibold text-card-foreground">{reg.ticketCode}</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
                        <QrCode className="h-3.5 w-3.5" /> QR Code
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl">
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                      {reg.event && (
                        <Link to={`/event/${reg.eventId}`}>
                          <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl">
                            <ExternalLink className="h-3.5 w-3.5" /> View Event
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="text-center py-20 bg-card rounded-2xl border border-border/40 shadow-card">
          <QrCode className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg font-heading font-semibold">No {tab.toLowerCase()} tickets found.</p>
          <p className="text-sm text-muted-foreground mt-1">
            {tab === "Upcoming" ? "Explore events and book your first ticket!" : "Check your upcoming or past tickets."}
          </p>
          {tab === "Upcoming" && (
            <Link to="/attendee/discover">
              <Button variant="hero" className="mt-5 rounded-xl">Discover Events</Button>
            </Link>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyTickets;
