import { motion } from "framer-motion";
import { UserPlus, CalendarPlus, Ticket, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds as an organizer or attendee. Set up your profile and preferences to get personalized recommendations.",
    color: "text-accent",
    bg: "bg-accent/8",
    borderColor: "border-accent/20",
  },
  {
    step: "02",
    icon: CalendarPlus,
    title: "Create or Discover Events",
    description: "Organizers can build events with custom tickets, venues, and branding. Attendees can browse, filter, and find experiences that match their interests.",
    color: "text-violet",
    bg: "bg-violet/8",
    borderColor: "border-violet/20",
  },
  {
    step: "03",
    icon: Ticket,
    title: "Seamless Registration",
    description: "Smart ticketing with multiple tiers, early bird pricing, group discounts, and automated waitlists. Secure payments via UPI, cards, and wallets.",
    color: "text-emerald",
    bg: "bg-emerald/8",
    borderColor: "border-emerald/20",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Track & Optimize",
    description: "Real-time dashboards show attendance, revenue, engagement metrics, and marketing channel performance. Export reports and iterate on your next event.",
    color: "text-gold",
    bg: "bg-gold/8",
    borderColor: "border-gold/20",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            How It Works
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight">
            From Idea to <span className="text-gradient">Sold Out</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Four simple steps to create, launch, and manage world-class events.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Connection line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-violet/20 via-emerald/20 to-gold/20 hidden md:block" />

          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-6 md:gap-8 items-start group"
              >
                <div className={`w-[80px] h-[80px] rounded-2xl ${s.bg} border ${s.borderColor} flex flex-col items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 relative z-10 bg-background`}>
                  <s.icon className={`h-6 w-6 ${s.color} mb-1`} />
                  <span className={`text-[10px] font-heading font-bold ${s.color}`}>{s.step}</span>
                </div>
                <div className="flex-1 bg-card rounded-2xl p-6 shadow-card border border-border/40 hover:shadow-card-hover transition-all duration-500 group-hover:-translate-y-1">
                  <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
