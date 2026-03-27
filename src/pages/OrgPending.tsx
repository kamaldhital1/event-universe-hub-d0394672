import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Mail, FileText, ArrowRight, CheckCircle2, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrgPending = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full text-center"
      >
        {/* Animated clock icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-3xl bg-amber-100 flex items-center justify-center mx-auto mb-8"
        >
          <Clock className="h-12 w-12 text-amber-600" />
        </motion.div>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Application Under Review</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Your organization registration has been submitted successfully. Our verification team is reviewing your details.
        </p>

        {/* Status timeline */}
        <div className="text-left bg-card rounded-2xl border border-border p-6 mb-8">
          <h3 className="font-heading font-semibold text-foreground mb-4">Application Status</h3>
          <div className="space-y-4">
            {[
              { icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, title: "Application Submitted", desc: "March 27, 2026 at 2:30 PM", done: true },
              { icon: <FileText className="h-5 w-5 text-amber-500 animate-pulse" />, title: "Document Verification", desc: "In progress — estimated 24-48 hours", done: false },
              { icon: <Shield className="h-5 w-5 text-muted-foreground" />, title: "Background Check", desc: "Pending", done: false },
              { icon: <CheckCircle2 className="h-5 w-5 text-muted-foreground" />, title: "Final Approval", desc: "Pending", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className={`text-sm font-medium ${item.done ? "text-foreground" : "text-muted-foreground"}`}>{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application ID */}
        <div className="bg-muted/50 rounded-xl p-4 mb-8">
          <p className="text-xs text-muted-foreground mb-1">Application Reference</p>
          <p className="font-heading font-bold text-foreground text-lg tracking-wide">SAN-ORG-2026-0042</p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-xl bg-card border border-border text-left">
            <Mail className="h-5 w-5 text-accent mb-2" />
            <p className="text-xs text-muted-foreground">We'll notify you at</p>
            <p className="text-sm font-medium text-foreground truncate">your-email@org.com</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-left">
            <Phone className="h-5 w-5 text-accent mb-2" />
            <p className="text-xs text-muted-foreground">Need help?</p>
            <p className="text-sm font-medium text-foreground">support@sansaar.io</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link to="/">
            <Button variant="outline" className="rounded-xl">Back to Home</Button>
          </Link>
          <Link to="/login">
            <Button variant="hero" className="rounded-xl gap-2">
              Check Status <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrgPending;
