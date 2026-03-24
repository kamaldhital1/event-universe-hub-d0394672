import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, QrCode, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockRegistrations, mockEvents, formatCurrency, getStatusColor } from "@/data/mockData";

const tabs = ["Upcoming", "Past", "Cancelled"];

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

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">My Tickets</h1>
        <p className="text-muted-foreground mt-1">Manage your event registrations and tickets.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Ticket cards */}
      <div className="space-y-4">
        {filtered.map((reg, i) => (
          <motion.div
            key={reg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              {reg.event && (
                <div className="sm:w-48 h-32 sm:h-auto shrink-0">
                  <img src={reg.event.image} alt={reg.event.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-card-foreground">{reg.eventTitle}</h3>
                    {reg.event && (
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Date(reg.event.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {reg.event.time.split("–")[0].trim()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {reg.event.location.split(",")[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusColor(reg.status)}`}>
                    {reg.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/50">
                  <div>
                    <span className="text-xs text-muted-foreground">Ticket Type</span>
                    <p className="text-sm font-medium text-card-foreground">{reg.ticketType}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Qty</span>
                    <p className="text-sm font-medium text-card-foreground">{reg.quantity}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Amount</span>
                    <p className="text-sm font-medium text-accent">{formatCurrency(reg.totalAmount)}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Ticket Code</span>
                    <p className="text-sm font-mono font-medium text-card-foreground">{reg.ticketCode}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 rounded-lg">
                      <QrCode className="h-3.5 w-3.5" /> QR Code
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 rounded-lg">
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
          <p className="text-muted-foreground text-lg">No {tab.toLowerCase()} tickets found.</p>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
