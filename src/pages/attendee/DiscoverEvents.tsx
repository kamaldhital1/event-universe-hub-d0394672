import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, CalendarDays, MapPin, Heart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockEvents } from "@/data/mockData";

const categories = ["All", "Conference", "Music", "Workshop", "Gala", "Sports", "Art"];

const categoryColors: Record<string, string> = {
  Conference: "bg-blue-500/10 text-blue-600",
  Music: "bg-violet/10 text-violet",
  Workshop: "bg-emerald/10 text-emerald",
  Gala: "bg-gold/10 text-gold",
  Sports: "bg-accent/10 text-accent",
  Art: "bg-purple-500/10 text-purple-600",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

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
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 max-w-6xl mx-auto">
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold text-foreground tracking-tight">Discover Events</h1>
        <p className="text-muted-foreground mt-1.5">Find experiences that inspire you.</p>
      </motion.div>

      {/* Search + Filter */}
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <Input
            placeholder="Search events, venues, or cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 rounded-2xl text-sm border-border/50 focus:border-accent/30 focus:ring-accent/20"
          />
        </div>
        <Button variant="outline" className="gap-2 h-12 rounded-2xl px-6">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </motion.div>

      {/* Categories */}
      <motion.div variants={item} className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              category === c
                ? "bg-accent text-accent-foreground shadow-glow"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </motion.div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((event, i) => (
          <motion.div
            key={event.id}
            variants={item}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-500 group"
          >
            <div className="relative h-52">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
              <button
                onClick={() => toggleSave(event.id)}
                className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-md flex items-center justify-center hover:bg-card transition-all duration-300 shadow-sm hover:scale-110"
              >
                <Heart className={`h-4 w-4 transition-all ${savedIds.includes(event.id) ? "fill-accent text-accent scale-110" : "text-card-foreground"}`} />
              </button>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${categoryColors[event.category] || "bg-accent/10 text-accent"}`}>
                  {event.category}
                </span>
                {event.waitlist > 0 && (
                  <span className="text-xs font-semibold bg-gold/20 text-gold backdrop-blur-sm px-3 py-1.5 rounded-full">
                    🔥 Filling Fast
                  </span>
                )}
              </div>
              {/* Hover arrow */}
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-glow">
                <ArrowUpRight className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-heading font-bold text-base text-card-foreground line-clamp-1 group-hover:text-accent transition-colors duration-300">{event.title}</h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-accent/60" />
                  <span>{new Date(event.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
                  <span className="text-xs text-border">·</span>
                  <span className="text-xs">{event.time.split("–")[0].trim()}</span>
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
                <Button variant="hero" size="sm" className="rounded-xl">
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No events found matching your search.</p>
          <Button variant="outline" className="mt-4 rounded-xl" onClick={() => { setSearch(""); setCategory("All"); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default DiscoverEvents;
