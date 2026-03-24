import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Clock, ArrowRight, Ticket, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEvents, mockRegistrations } from "@/data/mockData";

const upcomingRegistrations = mockRegistrations
  .filter((r) => r.status === "confirmed" || r.status === "checked-in")
  .slice(0, 3);

const recommendedEvents = mockEvents.filter((e) => e.status === "published").slice(0, 4);

const AttendeeHome = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-navy-light p-8 text-primary-foreground"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="relative z-10">
          <h1 className="font-heading text-3xl font-bold mb-2">Welcome back, Priya! 👋</h1>
          <p className="text-primary-foreground/70 text-lg max-w-lg">
            You have {upcomingRegistrations.length} upcoming events. Explore what's happening around you.
          </p>
          <div className="flex gap-3 mt-6">
            <Link to="/attendee/discover">
              <Button variant="hero" size="lg" className="gap-2">
                Explore Events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/attendee/tickets">
              <Button variant="hero-outline" size="lg" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Ticket className="h-4 w-4" /> My Tickets
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Events Attended", value: "8", icon: CalendarDays, color: "text-accent" },
          { label: "Upcoming", value: "3", icon: Clock, color: "text-emerald-600" },
          { label: "Saved Events", value: "12", icon: Star, color: "text-amber-500" },
          { label: "This Month", value: "2", icon: TrendingUp, color: "text-blue-600" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-card rounded-xl p-5 shadow-card border border-border/50"
          >
            <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
            <div className="font-heading text-2xl font-bold text-card-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Tickets */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-foreground">Your Upcoming Events</h2>
          <Link to="/attendee/tickets" className="text-sm text-accent hover:underline font-medium flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingRegistrations.map((reg, i) => {
            const event = mockEvents.find((e) => e.id === reg.eventId);
            if (!event) return null;
            return (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-card border border-border/50 hover:shadow-card-hover transition-all group"
              >
                <div className="relative h-32">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-medium bg-accent/90 text-accent-foreground px-2.5 py-1 rounded-full">
                      {reg.ticketType}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-heading font-semibold text-sm text-card-foreground line-clamp-1">{event.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    <span className="mx-1">·</span>
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{event.location.split(",")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{reg.ticketCode}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${
                      reg.status === "confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    }`}>{reg.status}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Recommended */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-foreground">Recommended for You</h2>
          <Link to="/attendee/discover" className="text-sm text-accent hover:underline font-medium flex items-center gap-1">
            See all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="bg-card rounded-xl overflow-hidden shadow-card border border-border/50 hover:shadow-card-hover transition-all group cursor-pointer"
            >
              <div className="relative h-36">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-medium bg-card/90 text-card-foreground px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-heading font-semibold text-sm text-card-foreground line-clamp-1">{event.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-heading font-bold text-accent">{event.price}</span>
                  <span className="text-xs text-muted-foreground">{event.capacity - event.attendees} spots left</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AttendeeHome;
