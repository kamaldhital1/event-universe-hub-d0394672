import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Clock, ArrowRight, Ticket, Star, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEvents, mockRegistrations } from "@/data/mockData";

const upcomingRegistrations = mockRegistrations
  .filter((r) => r.status === "confirmed" || r.status === "checked-in")
  .slice(0, 3);

const recommendedEvents = mockEvents.filter((e) => e.status === "published").slice(0, 4);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const AttendeeHome = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-10 text-primary-foreground"
      >
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-72 h-72 bg-accent/15 rounded-full -translate-y-1/2 translate-x-1/3 blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 14, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-56 h-56 bg-violet/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-[60px]"
        />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/20 backdrop-blur-sm mb-5">
            <Sparkles className="h-3 w-3 text-coral-light" />
            <span className="text-xs font-medium text-primary-foreground/80">Your Event Dashboard</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3 tracking-tight">Welcome back, Priya! 👋</h1>
          <p className="text-primary-foreground/55 text-lg max-w-lg leading-relaxed">
            You have {upcomingRegistrations.length} upcoming events. Explore what's happening around you.
          </p>
          <div className="flex gap-3 mt-8">
            <Link to="/attendee/discover">
              <Button variant="hero" size="lg" className="gap-2 rounded-2xl">
                Explore Events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/attendee/tickets">
              <Button variant="glass" size="lg" className="gap-2 rounded-2xl border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/10">
                <Ticket className="h-4 w-4" /> My Tickets
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Events Attended", value: "8", icon: CalendarDays, color: "text-accent", bg: "bg-accent/8" },
          { label: "Upcoming", value: "3", icon: Clock, color: "text-emerald", bg: "bg-emerald/8" },
          { label: "Saved Events", value: "12", icon: Star, color: "text-gold", bg: "bg-gold/8" },
          { label: "This Month", value: "2", icon: TrendingUp, color: "text-violet", bg: "bg-violet/8" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={item}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-card rounded-2xl p-5 shadow-card border border-border/40 hover:shadow-card-hover transition-shadow duration-500 group"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="font-heading text-2xl font-bold text-card-foreground tracking-tight">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Tickets */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xl font-bold text-foreground tracking-tight">Your Upcoming Events</h2>
          <Link to="/attendee/tickets" className="text-sm text-accent hover:underline font-semibold flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {upcomingRegistrations.map((reg, i) => {
            const event = mockEvents.find((e) => e.id === reg.eventId);
            if (!event) return null;
            return (
              <motion.div
                key={reg.id}
                variants={item}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-500 group"
              >
                <div className="relative h-36">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold bg-accent/90 text-accent-foreground px-3 py-1 rounded-full shadow-sm">
                      {reg.ticketType}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2.5">
                  <h3 className="font-heading font-bold text-sm text-card-foreground line-clamp-1">{event.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3 text-accent/60" />
                    <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    <span className="mx-1 text-border">·</span>
                    <MapPin className="h-3 w-3 text-accent/60" />
                    <span className="line-clamp-1">{event.location.split(",")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded-lg">{reg.ticketCode}</span>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize ${
                      reg.status === "confirmed" ? "bg-emerald/10 text-emerald" : "bg-blue-500/10 text-blue-600"
                    }`}>{reg.status}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Recommended */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xl font-bold text-foreground tracking-tight">Recommended for You</h2>
          <Link to="/attendee/discover" className="text-sm text-accent hover:underline font-semibold flex items-center gap-1">
            See all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendedEvents.map((event, i) => (
            <motion.div
              key={event.id}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-500 group cursor-pointer"
            >
              <div className="relative h-40">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-semibold bg-card/90 text-card-foreground px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm">
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2.5">
                <h3 className="font-heading font-bold text-sm text-card-foreground line-clamp-1">{event.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3 text-accent/60" />
                  <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-heading font-bold text-accent">{event.price}</span>
                  <span className="text-xs text-muted-foreground">{event.capacity - event.attendees} left</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AttendeeHome;
