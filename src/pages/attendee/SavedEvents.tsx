import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, CalendarDays, MapPin, ArrowUpRight, Trash2, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/data/mockData";
import { Link } from "react-router-dom";

const savedEvents = mockEvents.filter(e => e.status === "published");

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const SavedEvents = () => {
  const [notifyIds, setNotifyIds] = useState<string[]>(["1", "2"]);

  const toggleNotify = (id: string) =>
    setNotifyIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 max-w-5xl mx-auto">
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold text-foreground tracking-tight">Saved Events</h1>
        <p className="text-muted-foreground mt-1.5">
          {savedEvents.length} events you've bookmarked. Get notified when prices drop or seats open up.
        </p>
      </motion.div>

      {/* Summary banner */}
      <motion.div variants={item} className="bg-accent/5 border border-accent/15 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Heart className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-card-foreground">{savedEvents.length} saved events</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {notifyIds.length} with price drop alerts enabled
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedEvents.map((event) => (
          <motion.div
            key={event.id}
            variants={item}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-500 group"
          >
            <div className="relative h-44">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
              <button className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-md flex items-center justify-center hover:bg-card transition-all shadow-sm hover:scale-110">
                <Heart className="h-4 w-4 fill-accent text-accent" />
              </button>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="text-xs font-semibold bg-accent/90 text-accent-foreground px-3 py-1 rounded-full">{event.category}</span>
                {event.waitlist > 0 && (
                  <span className="text-xs font-semibold bg-gold/20 text-gold backdrop-blur-sm px-3 py-1 rounded-full">🔥 Hot</span>
                )}
              </div>
              {/* Hover arrow */}
              <Link to={`/event/${event.id}`} className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-glow">
                <ArrowUpRight className="h-4 w-4 text-accent-foreground" />
              </Link>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-heading font-bold text-base text-card-foreground line-clamp-1 group-hover:text-accent transition-colors duration-300">{event.title}</h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-accent/60" />
                  <span>{new Date(event.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-accent/60" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div>
                  <span className="font-heading font-bold text-lg text-accent">{event.price}</span>
                  {event.priceValue > 0 && <span className="text-xs text-muted-foreground ml-1">onwards</span>}
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => toggleNotify(event.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      notifyIds.includes(event.id) ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                    title={notifyIds.includes(event.id) ? "Alerts on" : "Enable alerts"}
                  >
                    {notifyIds.includes(event.id) ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
                  </button>
                  <Link to={`/event/${event.id}`}>
                    <Button variant="hero" size="sm" className="rounded-xl">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {savedEvents.length === 0 && (
        <motion.div variants={item} className="text-center py-20 bg-card rounded-2xl border border-border/40 shadow-card">
          <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg font-heading font-semibold">No saved events yet.</p>
          <p className="text-sm text-muted-foreground mt-1">Tap the heart icon on any event to save it here.</p>
          <Link to="/attendee/discover">
            <Button variant="hero" className="mt-5 rounded-xl">Discover Events</Button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SavedEvents;
