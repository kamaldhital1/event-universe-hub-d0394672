import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Kumar",
    role: "Event Director, Echo Productions",
    type: "Organizer",
    quote: "Sansaar transformed how we manage our 50+ annual events. Registration went up 40% and our team saves 20 hours per week.",
    rating: 5,
    avatar: "AK",
    gradient: "from-accent/20 to-coral-dark/20",
    typeBg: "bg-accent/8",
    typeColor: "text-accent",
  },
  {
    name: "Priya Sharma",
    role: "College Student & Event Enthusiast",
    type: "Attendee",
    quote: "I've discovered events I never knew existed in my city. The QR ticketing is so smooth — no more standing in queues or printing tickets.",
    rating: 5,
    avatar: "PS",
    gradient: "from-violet/20 to-blue-500/20",
    typeBg: "bg-violet/8",
    typeColor: "text-violet",
  },
  {
    name: "Arjun Patel",
    role: "Volunteer Coordinator, TEDx Ahmedabad",
    type: "Volunteer",
    quote: "Managing 200+ volunteers used to be spreadsheet hell. Now shift assignments, task tracking, and certificates are all automated.",
    rating: 5,
    avatar: "AP",
    gradient: "from-emerald/20 to-gold/20",
    typeBg: "bg-emerald/8",
    typeColor: "text-emerald",
  },
  {
    name: "Rajesh Mehta",
    role: "Founder, TechVerse India",
    type: "Organizer",
    quote: "The analytics dashboard alone is worth it. We can see real-time attendance, revenue breakdowns, and predict sellouts weeks in advance.",
    rating: 5,
    avatar: "RM",
    gradient: "from-gold/20 to-accent/20",
    typeBg: "bg-accent/8",
    typeColor: "text-accent",
  },
  {
    name: "Meera Joshi",
    role: "Frequent Event-Goer, Pune",
    type: "Attendee",
    quote: "The wishlist feature and price-drop alerts helped me attend 12 events last year on a student budget. Absolute game changer!",
    rating: 5,
    avatar: "MJ",
    gradient: "from-violet/20 to-emerald/20",
    typeBg: "bg-violet/8",
    typeColor: "text-violet",
  },
  {
    name: "Sneha Gupta",
    role: "Marathon Coordinator, RunIndia Sports",
    type: "Organizer",
    quote: "Managing 15,000 runners across multiple categories used to be chaos. With Sansaar, it's seamless — from registration to finish line.",
    rating: 5,
    avatar: "SG",
    gradient: "from-accent/20 to-gold/20",
    typeBg: "bg-accent/8",
    typeColor: "text-accent",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const TestimonialsSection = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight">
            Loved by <span className="text-gradient">Everyone</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Hear from organizers, attendees, and volunteers who make Sansaar their home.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl p-7 border border-border/40 hover:border-border transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/10 group-hover:text-accent/20 transition-colors duration-500" />

              <div className="flex items-center gap-2 mb-5">
                <span className={`text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${t.typeBg} ${t.typeColor}`}>
                  {t.type}
                </span>
                <div className="flex gap-0.5 ml-auto">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
              </div>

              <p className="text-card-foreground leading-relaxed mb-6 text-[15px]">"{t.quote}"</p>

              <div className="flex items-center gap-3 pt-5 border-t border-border/40">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center`}>
                  <span className="text-xs font-heading font-bold text-foreground">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-heading font-bold text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
