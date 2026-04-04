import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Sparkles, Heart, X, MessageCircle, Briefcase, MapPin, Star, Zap, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

type Match = {
  id: number; name: string; role: string; company: string; location: string;
  compatibility: number; initials: string; interests: string[];
  icebreaker: string; mutualConnections: number; attendingEvents: string[];
};

const matches: Match[] = [
  { id: 1, name: "Ananya Sharma", role: "Product Lead", company: "Flipkart", location: "Bengaluru", compatibility: 96, initials: "AS", interests: ["AI/ML", "Product Strategy", "SaaS"], icebreaker: "You both attended DevConf 2025 and are interested in AI product management", mutualConnections: 5, attendingEvents: ["TechVerse Summit", "AI Workshop"] },
  { id: 2, name: "Vikram Desai", role: "CTO", company: "Razorpay", location: "Bengaluru", compatibility: 91, initials: "VD", interests: ["FinTech", "System Design", "Scaling"], icebreaker: "Vikram recently spoke about event-driven architecture — a topic you bookmarked", mutualConnections: 3, attendingEvents: ["TechVerse Summit"] },
  { id: 3, name: "Meera Iyer", role: "UX Director", company: "Swiggy", location: "Chennai", compatibility: 88, initials: "MI", interests: ["Design Systems", "User Research", "Accessibility"], icebreaker: "You both follow similar design thought leaders and attended UX India 2025", mutualConnections: 7, attendingEvents: ["Design Summit", "TechVerse Summit"] },
  { id: 4, name: "Arjun Nair", role: "ML Engineer", company: "Google", location: "Hyderabad", compatibility: 85, initials: "AN", interests: ["Deep Learning", "NLP", "Open Source"], icebreaker: "Arjun contributed to an open-source project you starred on GitHub", mutualConnections: 2, attendingEvents: ["AI Workshop"] },
  { id: 5, name: "Kavya Reddy", role: "Startup Founder", company: "EventFlow", location: "Mumbai", compatibility: 82, initials: "KR", interests: ["Events", "Growth", "Community"], icebreaker: "Kavya is building in the same event-tech space and shares your passion for community building", mutualConnections: 4, attendingEvents: ["Startup Pitch Day", "TechVerse Summit"] },
];

const SmartNetworking = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const [dismissedIds, setDismissedIds] = useState<number[]>([]);

  const visibleMatches = matches.filter(m => !dismissedIds.includes(m.id));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet to-accent flex items-center justify-center shadow-glow">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Smart Networking</h1>
            <p className="text-xs text-muted-foreground">AI-powered matches based on your interests, goals & event history</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        {[
          { icon: Users, label: "Matches Found", value: visibleMatches.length },
          { icon: Zap, label: "Avg Compatibility", value: "88%" },
          { icon: Coffee, label: "Connections Made", value: connectedIds.length },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl p-4 border border-border/40 shadow-card text-center">
            <s.icon className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="text-xl font-heading font-bold text-card-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Match Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {visibleMatches.map(match => (
            <motion.div
              key={match.id}
              variants={item}
              layout
              exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
              className={cn(
                "bg-card rounded-2xl p-5 border shadow-card cursor-pointer transition-all hover:shadow-elevated",
                selectedMatch?.id === match.id ? "border-accent/40 ring-2 ring-accent/10" : "border-border/40"
              )}
              onClick={() => setSelectedMatch(selectedMatch?.id === match.id ? null : match)}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-violet/20 flex items-center justify-center">
                    <span className="text-base font-heading font-bold text-accent">{match.initials}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border-2 border-card flex items-center justify-center">
                    <span className={cn("text-[8px] font-bold", match.compatibility >= 90 ? "text-emerald" : "text-gold")}>{match.compatibility}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-card-foreground">{match.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Briefcase className="h-3 w-3" /> {match.role} at {match.company}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" /> {match.location}
                        <span className="mx-1">·</span>
                        <Users className="h-3 w-3" /> {match.mutualConnections} mutual
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {!connectedIds.includes(match.id) ? (
                        <>
                          <Button
                            variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-muted-foreground hover:text-destructive"
                            onClick={e => { e.stopPropagation(); setDismissedIds(prev => [...prev, match.id]); }}
                          ><X className="h-4 w-4" /></Button>
                          <Button
                            variant="hero" size="icon" className="h-8 w-8 rounded-xl"
                            onClick={e => { e.stopPropagation(); setConnectedIds(prev => [...prev, match.id]); }}
                          ><Heart className="h-4 w-4" /></Button>
                        </>
                      ) : (
                        <Badge variant="outline" className="bg-emerald/10 text-emerald border-emerald/20 text-[10px]">
                          Connected ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {match.interests.map(i => (
                      <Badge key={i} variant="secondary" className="text-[10px] font-medium">{i}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {selectedMatch?.id === match.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                      {/* Icebreaker */}
                      <div className="bg-accent/5 rounded-xl p-3 border border-accent/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="h-3.5 w-3.5 text-accent" />
                          <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">AI Icebreaker</span>
                        </div>
                        <p className="text-xs text-card-foreground leading-relaxed">{match.icebreaker}</p>
                      </div>

                      {/* Shared events */}
                      <div>
                        <p className="text-[10px] text-muted-foreground font-medium mb-1.5">Also attending:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {match.attendingEvents.map(ev => (
                            <Badge key={ev} variant="outline" className="text-[10px]">{ev}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="hero" size="sm" className="rounded-xl flex-1 gap-1.5 text-xs">
                          <MessageCircle className="h-3.5 w-3.5" /> Send Message
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl flex-1 gap-1.5 text-xs">
                          <Coffee className="h-3.5 w-3.5" /> Schedule Coffee
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleMatches.length === 0 && (
        <motion.div variants={item} className="text-center py-12">
          <Star className="h-12 w-12 text-accent/20 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">You've reviewed all matches! Check back before your next event.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SmartNetworking;
