import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/20 backdrop-blur-sm mb-8"
          >
            <Sparkles className="h-3.5 w-3.5 text-coral-light" />
            <span className="text-xs font-medium text-primary-foreground/80">Join 2M+ attendees, 10K+ organizers & 50K+ volunteers</span>
          </motion.div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-7 tracking-tight leading-[1.05]">
            Ready to Create Something{" "}
            <span className="text-gradient">Extraordinary</span>?
          </h2>
          <p className="text-primary-foreground/55 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Join thousands of organizers and millions of attendees already building the future of events on Sansaar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="rounded-2xl animate-glow-pulse">
              Start Organizing
              <ArrowRight className="h-5 w-5 ml-1" />
            </Button>
            <Button
              variant="glass"
              size="xl"
              className="rounded-2xl border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Explore as Attendee
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
