import { motion } from "framer-motion";

const brands = [
  "TechVerse", "Echo Productions", "DesignLab", "Hope Foundation",
  "RunIndia Sports", "Canvas Collective", "Zee Events", "BookMyShow",
];

const TrustedBySection = () => {
  return (
    <section className="py-16 border-y border-border/30 bg-warm-surface/50">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-10"
        >
          Trusted by India's leading event organizers
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300"
            >
              <span className="font-heading font-bold text-lg tracking-tight">{brand}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
