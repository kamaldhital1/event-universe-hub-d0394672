import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50000, suffix: "+", label: "Events Hosted", description: "Across 100+ cities in India" },
  { value: 2, suffix: "M+", label: "Happy Attendees", description: "And counting every day" },
  { value: 10000, suffix: "+", label: "Organizers", description: "From startups to enterprises" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", description: "Based on post-event surveys" },
];

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);

      if (end >= 1000000) {
        setDisplay((current / 1000000).toFixed(0));
      } else if (end >= 10000) {
        setDisplay((current / 1000).toFixed(0) + "K");
      } else {
        setDisplay(current.toLocaleString());
      }

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="font-heading text-5xl md:text-6xl font-bold text-foreground tracking-tight">
      {display}{suffix.replace(/[KM+]/g, "")}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div className="font-heading font-semibold text-primary-foreground text-sm mt-2">{stat.label}</div>
              <div className="text-xs text-primary-foreground/40 mt-1">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
