import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, CalendarDays, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockEvents } from "@/data/mockData";

const categories = ["All", "Conference", "Music", "Workshop", "Gala", "Sports", "Art"];

const DiscoverEvents = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const filtered = mockEvents.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || e.category === category;
    return matchSearch && matchCat && e.status === "published";
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Discover Events</h1>
        <p className="text-muted-foreground mt-1">Find experiences that inspire you.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events, venues, or cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 rounded-xl text-base"
          />
        </div>
        <Button variant="outline" className="gap-2 h-12 rounded-xl px-6">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              category === c
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover:shadow-card-hover transition-all group"
          >
            <div className="relative h-48">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
              <button
                onClick={() => toggleSave(event.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
              >
                <Heart className={`h-4 w-4 ${savedIds.includes(event.id) ? "fill-accent text-accent" : "text-card-foreground"}`} />
              </button>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="text-xs font-medium bg-accent/90 text-accent-foreground px-2.5 py-1 rounded-full">
                  {event.category}
                </span>
                {event.waitlist > 0 && (
                  <span className="text-xs font-medium bg-amber-500/90 text-white px-2.5 py-1 rounded-full">
                    🔥 Filling Fast
                  </span>
                )}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-heading font-bold text-base text-card-foreground line-clamp-1">{event.title}</h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                  <span>{new Date(event.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
                  <span className="text-xs">· {event.time.split("–")[0].trim()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div>
                  <span className="font-heading font-bold text-lg text-accent">{event.price}</span>
                  {event.priceValue > 0 && <span className="text-xs text-muted-foreground ml-1">onwards</span>}
                </div>
                <Button variant="hero" size="sm" className="rounded-lg">
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No events found matching your search.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCategory("All"); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiscoverEvents;
