import { motion } from "framer-motion";
import { Globe, Zap, Lock, Headphones, Smartphone, TrendingUp } from "lucide-react";

const reasons = [
  { icon: Globe, title: "100+ Cities", desc: "Pan-India coverage from metro cities to tier-3 towns.", color: "text-violet", bg: "bg-violet/8", border: "border-violet/20" },
  { icon: Zap, title: "Sub-Second Booking", desc: "Blazing-fast checkout with UPI, cards, and wallets.", color: "text-accent", bg: "bg-accent/8", border: "border-accent/20" },
  { icon: Lock, title: "Bank-Grade Security", desc: "PCI-DSS compliant payments and encrypted data.", color: "text-emerald", bg: "bg-emerald/8", border: "border-emerald/20" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated support for organizers, volunteers, and attendees.", color: "text-gold", bg: "bg-gold/8", border: "border-gold/20" },
  { icon: Smartphone, title: "Mobile-First", desc: "Native app experience for Android and iOS.", color: "text-blue-600", bg: "bg-blue-500/8", border: "border-blue-500/20" },
  { icon: TrendingUp, title: "AI Insights", desc: "Predictive analytics, smart pricing, and demand forecasting.", color: "text-violet", bg: "bg-violet/8", border: "border-violet/20" },
];

const WhyChooseSection = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Why Sansaar
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight">
            The Platform That{" "}
            <span className="text-gradient">Does It All</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Trusted by organizers, loved by attendees, empowering volunteers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/40 hover:border-border transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-11 h-11 rounded-xl ${r.bg} border ${r.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <r.icon className={`h-5 w-5 ${r.color}`} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-card-foreground mb-1">{r.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
