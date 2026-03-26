import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Heart, Star, Shield, Sparkles, ChevronDown, MessageSquare, Tag, Globe, Wifi, Coffee, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockEvents } from "@/data/mockData";

import eventConference from "@/assets/event-conference.jpg";
import eventMusic from "@/assets/event-music.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventGala from "@/assets/event-gala.jpg";
import eventSports from "@/assets/event-sports.jpg";
import eventArt from "@/assets/event-art.jpg";

const eventsData: Record<string, {
  title: string; date: string; time: string; location: string; image: string;
  category: string; attendees: number; capacity: number; price: string; description: string;
  organizer: string; highlights: string[]; schedule: { time: string; title: string; speaker?: string }[];
  speakers: { name: string; role: string; initials: string }[];
  faqs: { q: string; a: string }[];
  amenities: string[];
  ticketTiers: { name: string; price: string; perks: string[] }[];
}> = {
  "1": {
    title: "Global Tech Summit 2026", date: "April 15–17, 2026", time: "9:00 AM – 6:00 PM IST",
    location: "Bangalore International Centre, Bangalore", image: eventConference, category: "Conference",
    attendees: 2400, capacity: 3000, price: "₹4,999",
    description: "Join 3,000+ innovators, developers, and visionaries at India's premier technology conference. Three days of keynotes, workshops, and networking with leaders from Google, Microsoft, and top startups. Explore AI, cloud computing, cybersecurity, and the future of tech. Includes hands-on coding labs, startup pitch competitions, and an exclusive expo hall with 100+ exhibitors.",
    organizer: "TechVerse India",
    highlights: ["200+ speakers across 8 tracks", "Hands-on AI/ML workshops", "Startup pitch competition with ₹50L prize pool", "Networking dinner with industry leaders", "Certificate of participation"],
    schedule: [
      { time: "9:00 AM", title: "Registration & Welcome Coffee" },
      { time: "10:00 AM", title: "Opening Keynote: The Future of AI", speaker: "Dr. Priya Ranjan" },
      { time: "11:30 AM", title: "Panel: Building Scalable Products", speaker: "CTO Panel" },
      { time: "1:00 PM", title: "Networking Lunch & Expo Hall" },
      { time: "2:30 PM", title: "Workshop: Hands-on with LLMs", speaker: "Arjun Menon" },
      { time: "4:00 PM", title: "Fireside Chat: Startup to Unicorn", speaker: "Kavita Sharma" },
      { time: "5:30 PM", title: "Closing Remarks & Happy Hour" },
    ],
    speakers: [
      { name: "Dr. Priya Ranjan", role: "Chief Scientist, DeepMind India", initials: "PR" },
      { name: "Arjun Menon", role: "VP Engineering, Razorpay", initials: "AM" },
      { name: "Kavita Sharma", role: "Founder & CEO, NeoStack", initials: "KS" },
      { name: "Vikram Iyer", role: "CTO, Flipkart", initials: "VI" },
    ],
    faqs: [
      { q: "What's included in the ticket?", a: "Access to all 3 days of talks, workshops, expo hall, meals, and the networking dinner. VIP tickets include front-row seating and speaker meet-and-greet." },
      { q: "Is there a student discount?", a: "Yes! Students get 50% off with a valid ID. Use code STUDENT50 at checkout." },
      { q: "Can I get a refund?", a: "Full refunds up to 14 days before the event. 50% refunds within 7 days. No refunds after that." },
      { q: "Is parking available?", a: "Yes, complimentary parking for all ticket holders at the venue's underground lot." },
    ],
    amenities: ["Wi-Fi", "Parking", "Catering", "Live Streaming"],
    ticketTiers: [
      { name: "General", price: "₹4,999", perks: ["All sessions access", "Expo hall", "Lunch & snacks", "Event kit"] },
      { name: "VIP", price: "₹9,999", perks: ["Everything in General", "Front-row seating", "Speaker meet & greet", "Networking dinner", "Priority parking"] },
      { name: "Workshop Pass", price: "₹2,499", perks: ["Workshop sessions only", "Hands-on labs", "Certificate", "Lunch included"] },
    ],
  },
  "2": {
    title: "Midnight Echoes — Live Music Festival", date: "May 3, 2026", time: "5:00 PM – 2:00 AM IST",
    location: "Sunset Arena, Mumbai", image: eventMusic, category: "Music",
    attendees: 8500, capacity: 10000, price: "₹1,499",
    description: "An electrifying night of live performances featuring chart-topping artists and emerging talent. Multiple stages, immersive art installations, and curated food experiences under the stars. This is Mumbai's biggest open-air music event of the year.",
    organizer: "Echo Productions",
    highlights: ["5 stages, 30+ artists", "Food court with 40+ vendors", "Art installations & photo zones", "Silent disco after 12 AM", "Free merchandise for early birds"],
    schedule: [
      { time: "5:00 PM", title: "Gates Open · Food Court & Art Walk" },
      { time: "6:00 PM", title: "Opening Act: Indie Stage" },
      { time: "7:30 PM", title: "Rising Stars Showcase" },
      { time: "9:00 PM", title: "Headliner Performance" },
      { time: "11:00 PM", title: "EDM Stage Takeover" },
      { time: "12:30 AM", title: "Silent Disco & Acoustic Lounge" },
    ],
    speakers: [
      { name: "Prateek Kuhad", role: "Headliner", initials: "PK" },
      { name: "RITVIZ", role: "EDM Stage", initials: "RV" },
      { name: "The Local Train", role: "Rock Stage", initials: "TL" },
    ],
    faqs: [
      { q: "Can I bring my own food/drinks?", a: "Outside food and beverages are not allowed. We have 40+ food vendors on-site." },
      { q: "Is it an all-ages event?", a: "Ages 16+ welcome. Guests under 18 must be accompanied by an adult." },
      { q: "What about rain?", a: "The event is rain or shine. Main stage has covered seating for VIP holders." },
    ],
    amenities: ["Sound System", "Security", "Food Courts", "Parking"],
    ticketTiers: [
      { name: "Early Bird", price: "₹1,499", perks: ["General admission", "Access to all stages", "Food court access"] },
      { name: "VIP", price: "₹4,999", perks: ["Premium viewing area", "Covered seating", "Complimentary drinks", "Artist meet & greet"] },
    ],
  },
  "3": {
    title: "Design Thinking Masterclass", date: "April 22, 2026", time: "10:00 AM – 4:00 PM IST",
    location: "WeWork Galaxy, Bangalore", image: eventWorkshop, category: "Workshop",
    attendees: 120, capacity: 150, price: "Free",
    description: "A hands-on masterclass in human-centered design methodology. Learn from IDEO-trained facilitators and apply design thinking to real-world challenges. Materials and lunch provided. Perfect for product managers, designers, and entrepreneurs.",
    organizer: "DesignLab Academy",
    highlights: ["IDEO-certified facilitators", "Real-world case studies", "Design toolkit included", "Certificate of completion", "Post-workshop mentorship"],
    schedule: [
      { time: "10:00 AM", title: "Welcome & Ice Breaker" },
      { time: "10:30 AM", title: "Empathize: User Research Methods" },
      { time: "12:00 PM", title: "Define: Problem Framing Workshop" },
      { time: "1:00 PM", title: "Lunch & Networking" },
      { time: "2:00 PM", title: "Ideate & Prototype: Rapid Solutions" },
      { time: "3:30 PM", title: "Test & Present: Team Pitches" },
    ],
    speakers: [
      { name: "Neha Kapoor", role: "Lead Facilitator, IDEO Alumni", initials: "NK" },
      { name: "Siddharth Rao", role: "Product Design Lead, Swiggy", initials: "SR" },
    ],
    faqs: [
      { q: "Do I need design experience?", a: "Not at all! This workshop is beginner-friendly and suitable for anyone interested in problem-solving." },
      { q: "What should I bring?", a: "Just yourself and a laptop. All materials are provided." },
    ],
    amenities: ["Wi-Fi", "Projector", "Coffee Bar", "Materials"],
    ticketTiers: [
      { name: "Free", price: "Free", perks: ["Full workshop access", "Materials kit", "Lunch", "Certificate"] },
    ],
  },
  "4": {
    title: "Annual Charity Gala Night", date: "June 8, 2026", time: "7:00 PM – 11:00 PM IST",
    location: "The Taj Mahal Palace, Mumbai", image: eventGala, category: "Gala",
    attendees: 350, capacity: 400, price: "₹15,000",
    description: "An evening of elegance supporting education initiatives across rural India. Fine dining, live entertainment, silent auction, and the opportunity to make a meaningful impact. Dress code: Black tie.",
    organizer: "Hope Foundation India",
    highlights: ["5-course dinner by Taj chefs", "Live jazz & classical performances", "Silent auction with 50+ items", "₹1Cr+ raised last year", "Celebrity guest appearances"],
    schedule: [
      { time: "7:00 PM", title: "Red Carpet & Welcome Cocktails" },
      { time: "8:00 PM", title: "Dinner & Foundation Address" },
      { time: "9:00 PM", title: "Live Entertainment & Performances" },
      { time: "9:45 PM", title: "Silent Auction Results" },
      { time: "10:30 PM", title: "Closing & Thank You" },
    ],
    speakers: [
      { name: "Priya Dutt", role: "Patron, Hope Foundation", initials: "PD" },
      { name: "Zubin Mehta", role: "Live Performance", initials: "ZM" },
    ],
    faqs: [
      { q: "What is the dress code?", a: "Black tie / formal evening wear is required." },
      { q: "Where do the funds go?", a: "100% of auction proceeds go to building schools in rural Maharashtra and Rajasthan." },
    ],
    amenities: ["Valet Parking", "Catering", "Live Kitchen", "Security"],
    ticketTiers: [
      { name: "Platinum", price: "₹15,000", perks: ["5-course dinner", "Premium seating", "Welcome champagne", "Event souvenir"] },
      { name: "Diamond Table (8)", price: "₹1,00,000", perks: ["Table for 8", "Meet the artists", "Name on donor wall", "Tax receipt"] },
    ],
  },
  "5": {
    title: "City Marathon & Fun Run", date: "May 18, 2026", time: "6:00 AM – 12:00 PM IST",
    location: "Marine Drive, Mumbai", image: eventSports, category: "Sports",
    attendees: 12000, capacity: 15000, price: "₹999",
    description: "Mumbai's biggest running event returns! Choose from full marathon, half marathon, 10K, or 5K fun run. Professional timing, hydration stations every 3km, and a spectacular finish-line celebration with live music and food trucks.",
    organizer: "RunIndia Sports",
    highlights: ["Chip-based timing system", "Hydration every 3km", "Medical support throughout", "Finisher medal & t-shirt", "Live music at finish line"],
    schedule: [
      { time: "5:00 AM", title: "BIB Collection & Warm-up Zone" },
      { time: "6:00 AM", title: "Full Marathon Start (42.2km)" },
      { time: "6:30 AM", title: "Half Marathon Start (21.1km)" },
      { time: "7:00 AM", title: "10K & 5K Fun Run Start" },
      { time: "10:00 AM", title: "Finish Line Celebration" },
      { time: "11:00 AM", title: "Awards Ceremony" },
    ],
    speakers: [
      { name: "Anil Ambani", role: "Chief Guest", initials: "AA" },
      { name: "Mary Kom", role: "Flag Off", initials: "MK" },
    ],
    faqs: [
      { q: "Can beginners participate?", a: "Absolutely! The 5K fun run is perfect for beginners. No time pressure — just enjoy the run!" },
      { q: "Will there be pace setters?", a: "Yes, professional pacers for all marathon and half-marathon categories." },
    ],
    amenities: ["Medical Tent", "Hydration Stations", "Timing Mats", "PA System"],
    ticketTiers: [
      { name: "5K Fun Run", price: "₹999", perks: ["BIB & timing chip", "Finisher medal", "T-shirt", "Refreshments"] },
      { name: "Half Marathon", price: "₹1,499", perks: ["Everything in 5K", "Route support", "Certificate", "Meal coupon"] },
      { name: "Full Marathon", price: "₹1,999", perks: ["Everything in Half", "Elite start corral", "Physiotherapy tent", "Premium finisher kit"] },
    ],
  },
  "6": {
    title: "Contemporary Art Exhibition", date: "April 28 – May 10, 2026", time: "10:00 AM – 7:00 PM IST",
    location: "National Gallery, New Delhi", image: eventArt, category: "Art",
    attendees: 680, capacity: 1000, price: "₹299",
    description: "Featuring 80+ works from emerging South Asian artists exploring identity, technology, and nature. Guided tours available daily. Opening night reception with artist Q&A sessions. A must-visit for art lovers and collectors.",
    organizer: "Canvas Collective",
    highlights: ["80+ artworks from 30 artists", "Daily guided tours at 11 AM & 3 PM", "Artist-in-residence live painting", "Opening night cocktail reception", "Limited edition prints for sale"],
    schedule: [
      { time: "10:00 AM", title: "Gallery Opens" },
      { time: "11:00 AM", title: "Guided Tour (Morning)" },
      { time: "1:00 PM", title: "Artist-in-Residence Session" },
      { time: "3:00 PM", title: "Guided Tour (Afternoon)" },
      { time: "5:00 PM", title: "Open Gallery Hours" },
      { time: "7:00 PM", title: "Gallery Closes" },
    ],
    speakers: [
      { name: "Subodh Gupta", role: "Featured Artist", initials: "SG" },
      { name: "Bharti Kher", role: "Keynote Speaker", initials: "BK" },
    ],
    faqs: [
      { q: "Is photography allowed?", a: "Yes, non-flash photography is permitted throughout the gallery." },
      { q: "Are guided tours included?", a: "Yes, two guided tours daily are included with your ticket." },
    ],
    amenities: ["Exhibition Walls", "Lighting", "Audio Guide", "Gift Shop"],
    ticketTiers: [
      { name: "Day Pass", price: "₹299", perks: ["Full gallery access", "Audio guide", "Guided tour"] },
      { name: "Season Pass", price: "₹999", perks: ["Unlimited visits", "Opening night access", "10% off prints", "Catalog book"] },
    ],
  },
};

const categoryColors: Record<string, string> = {
  Conference: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Music: "bg-violet/10 text-violet border-violet/20",
  Workshop: "bg-emerald/10 text-emerald border-emerald/20",
  Gala: "bg-gold/10 text-gold border-gold/20",
  Sports: "bg-accent/10 text-accent border-accent/20",
  Art: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const amenityIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  Parking: Car,
  Catering: Coffee,
  "Live Streaming": Globe,
  "Valet Parking": Car,
  "Sound System": Globe,
  Security: Shield,
  "Food Courts": Coffee,
  "Medical Tent": Shield,
  "Hydration Stations": Coffee,
  "Timing Mats": Tag,
  "PA System": Globe,
  "Exhibition Walls": Globe,
  Lighting: Sparkles,
  "Audio Guide": Globe,
  "Gift Shop": Tag,
  Projector: Globe,
  "Coffee Bar": Coffee,
  Materials: Tag,
  "Live Kitchen": Coffee,
};

const EventDetail = () => {
  const { id } = useParams();
  const event = eventsData[id || "1"];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Event not found</h2>
          <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
          <Link to="/"><Button variant="hero" className="rounded-xl">Back to Home</Button></Link>
        </div>
      </div>
    );
  }

  const spotsLeft = event.capacity - event.attendees;
  const fillPercentage = (event.attendees / event.capacity) * 100;
  const relatedEvents = mockEvents.filter((e) => e.category === event.category && e.id !== (id || "1")).slice(0, 3);

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
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full border ${categoryColors[event.category] || "bg-accent/10 text-accent border-accent/20"}`}>
                {event.category}
              </span>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mt-4">{event.title}</h1>
              <p className="text-muted-foreground text-sm mt-2">Organized by <span className="text-foreground font-semibold">{event.organizer}</span></p>
            </div>

            {/* Info cards */}
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

            {/* About */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/40">
              <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 tracking-tight">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>

              {/* Highlights */}
              <div className="mt-6 space-y-3">
                <h3 className="font-heading font-semibold text-card-foreground text-sm uppercase tracking-wider">Event Highlights</h3>
                <ul className="space-y-2">
                  {event.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Speakers */}
            {event.speakers.length > 0 && (
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/40">
                <h2 className="font-heading text-xl font-bold text-card-foreground mb-6 tracking-tight">
                  {event.category === "Music" ? "Artists & Performers" : "Speakers & Hosts"}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {event.speakers.map((s) => (
                    <motion.div
                      key={s.name}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="text-center group"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-violet/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 border border-border/40">
                        <span className="font-heading font-bold text-lg text-foreground">{s.initials}</span>
                      </div>
                      <p className="font-heading font-bold text-sm text-card-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/40">
              <h2 className="font-heading text-xl font-bold text-card-foreground mb-6 tracking-tight">Event Schedule</h2>
              <div className="space-y-4 relative">
                <div className="absolute left-[55px] top-2 bottom-2 w-px bg-border/60" />
                {event.schedule.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 group"
                  >
                    <span className="text-xs font-mono text-muted-foreground w-[50px] pt-1 text-right shrink-0">{s.time}</span>
                    <div className="w-3 h-3 rounded-full bg-accent border-2 border-background shrink-0 mt-1.5 relative z-10 group-hover:scale-125 transition-transform" />
                    <div className="flex-1 bg-secondary/50 rounded-xl p-3 group-hover:bg-secondary/80 transition-colors">
                      <p className="text-sm font-semibold text-card-foreground">{s.title}</p>
                      {s.speaker && <p className="text-xs text-muted-foreground mt-0.5">{s.speaker}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Ticket Tiers */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/40">
              <h2 className="font-heading text-xl font-bold text-card-foreground mb-6 tracking-tight">Ticket Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {event.ticketTiers.map((tier, i) => (
                  <motion.div
                    key={tier.name}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`rounded-2xl p-5 border transition-all duration-300 ${
                      i === 1 ? "bg-accent/5 border-accent/30 shadow-card-hover" : "bg-secondary/50 border-border/40"
                    }`}
                  >
                    {i === 1 && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-3">Most Popular</span>
                    )}
                    <h3 className="font-heading font-bold text-card-foreground">{tier.name}</h3>
                    <div className="font-heading text-2xl font-bold text-accent mt-1">{tier.price}</div>
                    <ul className="mt-4 space-y-2">
                      {tier.perks.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-accent mt-0.5">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant={i === 1 ? "hero" : "outline"} size="sm" className="w-full mt-4 rounded-xl">
                      Select
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/40">
              <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 tracking-tight">Venue Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {event.amenities.map((a) => {
                  const Icon = amenityIcons[a] || Globe;
                  return (
                    <div key={a} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary border border-border/40">
                      <Icon className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-card-foreground">{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/40">
              <h2 className="font-heading text-xl font-bold text-card-foreground mb-6 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {event.faqs.map((faq, i) => (
                  <div key={i} className="bg-secondary/50 rounded-xl p-5">
                    <h4 className="font-heading font-semibold text-sm text-card-foreground flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {faq.q}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2 ml-6 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Shield, text: "Verified Organizer" },
                { icon: Star, text: "4.8 Rating (2.4K reviews)" },
                { icon: Sparkles, text: "Featured Event" },
                { icon: Tag, text: "Free Cancellation (14 days)" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/40">
                  <badge.icon className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs font-semibold text-muted-foreground">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-5 tracking-tight">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedEvents.map((re) => (
                    <Link key={re.id} to={`/event/${re.id}`} className="group">
                      <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                        <div className="relative h-32">
                          <img src={re.image} alt={re.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-heading font-bold text-sm text-card-foreground line-clamp-1">{re.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{new Date(re.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                          <p className="text-sm font-bold text-accent mt-1">{re.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-card rounded-2xl p-7 shadow-elevated border border-border/40 sticky top-24 space-y-6">
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-foreground tracking-tight">{event.price}</div>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>

              <div>
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
                <p className="text-xs text-accent mt-2 font-semibold">
                  {spotsLeft > 0 ? `${spotsLeft.toLocaleString()} spots left` : "Sold Out!"}
                </p>
              </div>

              {fillPercentage > 80 && (
                <div className="flex items-center gap-2 bg-gold/10 text-gold rounded-xl px-3 py-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold">🔥 Filling fast — {Math.round(fillPercentage)}% sold</span>
                </div>
              )}

              <Button variant="hero" size="xl" className="w-full rounded-2xl animate-glow-pulse">
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

              {/* Organizer card */}
              <div className="bg-secondary/50 rounded-xl p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Organized by</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">{event.organizer.split(" ").map(w => w[0]).join("").slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-heading font-bold text-card-foreground">{event.organizer}</p>
                    <p className="text-xs text-muted-foreground">Verified · 50+ events</p>
                  </div>
                </div>
              </div>

              {/* Quick info */}
              <div className="space-y-3 pt-2">
                {[
                  { icon: Shield, text: "Secure checkout · SSL encrypted" },
                  { icon: Tag, text: "Group discounts available" },
                  { icon: MessageSquare, text: "24/7 support via chat" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <item.icon className="h-3.5 w-3.5 text-accent/60" />
                    <span>{item.text}</span>
                  </div>
                ))}
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
