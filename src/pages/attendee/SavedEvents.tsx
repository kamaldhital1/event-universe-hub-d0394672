import { motion } from "framer-motion";
import { Heart, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/data/mockData";

// Mock saved — first 3 events
const savedEvents = mockEvents.slice(0, 3);

const SavedEvents = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Saved Events</h1>
        <p className="text-muted-foreground mt-1">Events you've bookmarked for later.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 group"
          >
            <div className="relative h-44">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
                <Heart className="h-4 w-4 fill-accent text-accent" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="text-xs font-medium bg-accent/90 text-accent-foreground px-2.5 py-1 rounded-full">{event.category}</span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-heading font-bold text-card-foreground">{event.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                <span>·</span>
                <MapPin className="h-3.5 w-3.5" />
                <span className="line-clamp-1">{event.location.split(",")[0]}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-heading font-bold text-accent">{event.price}</span>
                <Button variant="hero" size="sm" className="rounded-lg">Book Now</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {savedEvents.length === 0 && (
        <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
          <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No saved events yet.</p>
          <p className="text-sm text-muted-foreground mt-1">Tap the heart icon on any event to save it here.</p>
        </div>
      )}
    </div>
  );
};

export default SavedEvents;
