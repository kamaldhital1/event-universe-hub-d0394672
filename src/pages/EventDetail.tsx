import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Heart, Star, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import eventConference from "@/assets/event-conference.jpg";
import eventMusic from "@/assets/event-music.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventGala from "@/assets/event-gala.jpg";
import eventSports from "@/assets/event-sports.jpg";
import eventArt from "@/assets/event-art.jpg";

const eventsData: Record<string, {
  title: string; date: string; time: string; location: string; image: string;
  category: string; attendees: number; capacity: number; price: string; description: string;
  organizer: string;
}> = {
  "1": { title: "Global Tech Summit 2026", date: "April 15–17, 2026", time: "9:00 AM – 6:00 PM IST", location: "Bangalore International Centre, Bangalore", image: eventConference, category: "Conference", attendees: 2400, capacity: 3000, price: "₹4,999", description: "Join 3,000+ innovators, developers, and visionaries at India's premier technology conference. Three days of keynotes, workshops, and networking with leaders from Google, Microsoft, and top startups. Explore AI, cloud computing, cybersecurity, and the future of tech.", organizer: "TechVerse India" },
  "2": { title: "Midnight Echoes — Live Music Festival", date: "May 3, 2026", time: "5:00 PM – 2:00 AM IST", location: "Sunset Arena, Mumbai", image: eventMusic, category: "Music", attendees: 8500, capacity: 10000, price: "₹1,499", description: "An electrifying night of live performances featuring chart-topping artists and emerging talent. Multiple stages, immersive art installations, and curated food experiences under the stars.", organizer: "Echo Productions" },
  "3": { title: "Design Thinking Masterclass", date: "April 22, 2026", time: "10:00 AM – 4:00 PM IST", location: "WeWork Galaxy, Bangalore", image: eventWorkshop, category: "Workshop", attendees: 120, capacity: 150, price: "Free", description: "A hands-on masterclass in human-centered design methodology. Learn from IDEO-trained facilitators and apply design thinking to real-world challenges. Materials and lunch provided.", organizer: "DesignLab Academy" },
  "4": { title: "Annual Charity Gala Night", date: "June 8, 2026", time: "7:00 PM – 11:00 PM IST", location: "The Taj Mahal Palace, Mumbai", image: eventGala, category: "Gala", attendees: 350, capacity: 400, price: "₹15,000", description: "An evening of elegance supporting education initiatives across rural India. Fine dining, live entertainment, silent auction, and the opportunity to make a meaningful impact.", organizer: "Hope Foundation India" },
  "5": { title: "City Marathon & Fun Run", date: "May 18, 2026", time: "6:00 AM – 12:00 PM IST", location: "Marine Drive, Mumbai", image: eventSports, category: "Sports", attendees: 12000, capacity: 15000, price: "₹999", description: "Mumbai's biggest running event returns! Choose from full marathon, half marathon, 10K, or 5K fun run. Professional timing, hydration stations every 3km, and a spectacular finish-line celebration.", organizer: "RunIndia Sports" },
  "6": { title: "Contemporary Art Exhibition", date: "April 28 – May 10, 2026", time: "10:00 AM – 7:00 PM IST", location: "National Gallery, New Delhi", image: eventArt, category: "Art", attendees: 680, capacity: 1000, price: "₹299", description: "Featuring 80+ works from emerging South Asian artists exploring identity, technology, and nature. Guided tours available daily. Opening night reception with artist Q&A sessions.", organizer: "Canvas Collective" },
};

const categoryColors: Record<string, string> = {
  Conference: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Music: "bg-violet/10 text-violet border-violet/20",
  Workshop: "bg-emerald/10 text-emerald border-emerald/20",
  Gala: "bg-gold/10 text-gold border-gold/20",
  Sports: "bg-accent/10 text-accent border-accent/20",
  Art: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const EventDetail = () => {
  const { id } = useParams();
  const event = eventsData[id || "1"];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Event not found.</p>
      </div>
    );
  }

  const spotsLeft = event.capacity - event.attendees;
  const fillPercentage = (event.attendees / event.capacity) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[55vh] md:h-[65vh]">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-foreground/30" />
        <div className="absolute top-20 left-4 md:left-8">
          <Link to="/">
            <Button variant="glass" size="sm" className="gap-2 rounded-xl backdrop-blur-md">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-36 relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full border ${categoryColors[event.category] || "bg-accent/10 text-accent border-accent/20"}`}>
              {event.category}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">{event.title}</h1>
            <p className="text-muted-foreground text-sm">Organized by <span className="text-foreground font-semibold">{event.organizer}</span></p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: event.date },
                { icon: Clock, label: event.time },
                { icon: MapPin, label: event.location },
                { icon: Users, label: `${event.attendees.toLocaleString()} attending` },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-3 bg-card rounded-2xl p-4 shadow-card border border-border/40">
                  <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center shrink-0">
                    <info.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-sm text-card-foreground font-medium">{info.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/40">
              <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 tracking-tight">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Shield, text: "Verified Organizer" },
                { icon: Star, text: "4.8 Rating" },
                { icon: Sparkles, text: "Featured Event" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/40">
                  <badge.icon className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs font-semibold text-muted-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-card rounded-2xl p-7 shadow-elevated border border-border/40 sticky top-24">
              <div className="text-center mb-7">
                <div className="font-heading text-4xl font-bold text-foreground mb-1 tracking-tight">{event.price}</div>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>

              <div className="mb-7">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground font-medium">Capacity</span>
                  <span className="text-foreground font-semibold">{event.attendees.toLocaleString()} / {event.capacity.toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-accent rounded-full"
                  />
                </div>
                <p className="text-xs text-accent mt-2 font-semibold">{spotsLeft.toLocaleString()} spots left</p>
              </div>

              <Button variant="hero" size="xl" className="w-full mb-3 rounded-2xl animate-glow-pulse">
                Register Now
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2 rounded-xl">
                  <Heart className="h-4 w-4" /> Save
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-2 rounded-xl">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;
