import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowRight, AlertTriangle, FileText, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrgRejected = () => {
  const rejectionReason = "Incomplete documentation. Missing: Official letterhead authorization from Chief Secretary, Event insurance policy. Please resubmit with complete documents.";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-3xl bg-red-100 flex items-center justify-center mx-auto mb-8"
        >
          <XCircle className="h-12 w-12 text-red-500" />
        </motion.div>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Application Not Approved</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Unfortunately, your organization registration could not be approved at this time.
        </p>

        {/* Rejection reason */}
        <div className="text-left bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/30 p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="font-heading font-semibold text-red-700 dark:text-red-400">Reason for Rejection</h3>
          </div>
          <p className="text-sm text-red-600 dark:text-red-300 leading-relaxed">{rejectionReason}</p>
        </div>

        {/* What you can do */}
        <div className="text-left bg-card rounded-2xl border border-border p-6 mb-8">
          <h3 className="font-heading font-semibold text-foreground mb-4">What you can do</h3>
          <div className="space-y-3">
            {[
              { icon: <FileText className="h-4 w-4" />, text: "Review and update your submitted documents" },
              { icon: <RefreshCw className="h-4 w-4" />, text: "Resubmit your application with complete information" },
              { icon: <Mail className="h-4 w-4" />, text: "Contact support at support@sansaar.io for clarification" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link to="/">
            <Button variant="outline" className="rounded-xl">Back to Home</Button>
          </Link>
          <Link to="/org/onboarding">
            <Button variant="hero" className="rounded-xl gap-2">
              <RefreshCw className="h-4 w-4" /> Reapply
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrgRejected;
