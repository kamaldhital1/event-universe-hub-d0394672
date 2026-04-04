import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Zap, Heart, MessageSquare, TrendingUp, Wifi, ThermometerSun, Volume2, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const zones = [
  { name: "Main Stage", crowd: 92, mood: "🔥 Electric", color: "bg-accent" },
  { name: "Workshop Hall A", crowd: 67, mood: "💡 Focused", color: "bg-violet" },
  { name: "Networking Lounge", crowd: 45, mood: "😊 Social", color: "bg-emerald" },
  { name: "Food Court", crowd: 78, mood: "🍕 Relaxed", color: "bg-gold" },
  { name: "Expo Floor", crowd: 83, mood: "🤩 Excited", color: "bg-accent" },
];

const socialBuzz = [
  { user: "Priya S.", text: "The keynote is absolutely mind-blowing! #TechVerse2026 🚀", time: "2m ago", likes: 34 },
  { user: "Rahul M.", text: "Just met the CTO of @SansaarHQ at the networking lounge!", time: "5m ago", likes: 21 },
  { user: "Ananya K.", text: "Workshop on AI agents is packed! Standing room only 🧠", time: "8m ago", likes: 18 },
  { user: "Dev P.", text: "The food at this conference > every other conference I've been to", time: "12m ago", likes: 45 },
];

const LiveEventPulse = () => {
  const [energy, setEnergy] = useState(87);
  const [sentiment, setSentiment] = useState(94);
  const [activeUsers, setActiveUsers] = useState(2847);
  const [postsPerMin, setPostsPerMin] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => Math.min(100, Math.max(60, prev + (Math.random() - 0.45) * 4)));
      setSentiment(prev => Math.min(100, Math.max(70, prev + (Math.random() - 0.4) * 3)));
      setActiveUsers(prev => Math.max(2500, prev + Math.floor((Math.random() - 0.4) * 20)));
      setPostsPerMin(prev => Math.max(10, prev + Math.floor((Math.random() - 0.45) * 5)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
            <Activity className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Live Event Pulse</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald rounded-full animate-pulse-soft" />
              <span className="text-xs text-muted-foreground font-medium">TechVerse Summit 2026 · Live Now</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Real-time metrics */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Zap, label: "Energy Level", value: `${Math.round(energy)}%`, color: "text-accent", bg: "bg-accent/10", bar: energy },
          { icon: Heart, label: "Sentiment", value: `${Math.round(sentiment)}%`, color: "text-emerald", bg: "bg-emerald/10", bar: sentiment },
          { icon: Users, label: "Active Now", value: activeUsers.toLocaleString(), color: "text-violet", bg: "bg-violet/10", bar: (activeUsers / 3500) * 100 },
          { icon: MessageSquare, label: "Posts/min", value: postsPerMin.toString(), color: "text-gold", bg: "bg-gold/10", bar: (postsPerMin / 50) * 100 },
        ].map(m => (
          <div key={m.label} className="bg-card rounded-2xl p-4 border border-border/40 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                <m.icon className={`h-4 w-4 ${m.color}`} />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{m.label}</span>
            </div>
            <p className={`text-2xl font-heading font-bold ${m.color}`}>{m.value}</p>
            <div className="mt-2">
              <Progress value={m.bar} className="h-1.5" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Crowd Heatmap */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 border border-border/40 shadow-card">
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2 mb-4">
          <ThermometerSun className="h-5 w-5 text-accent" /> Crowd Density Heatmap
        </h2>
        <div className="space-y-3">
          {zones.map(zone => (
            <div key={zone.name} className="flex items-center gap-4">
              <div className="w-32 shrink-0">
                <p className="text-sm font-medium text-card-foreground">{zone.name}</p>
                <p className="text-[10px] text-muted-foreground">{zone.mood}</p>
              </div>
              <div className="flex-1 relative">
                <div className="h-8 bg-secondary/50 rounded-xl overflow-hidden">
                  <motion.div
                    className={`h-full ${zone.color} rounded-xl`}
                    initial={{ width: 0 }}
                    animate={{ width: `${zone.crowd}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              <span className="text-sm font-bold text-card-foreground w-12 text-right">{zone.crowd}%</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-2 bg-emerald rounded-sm" /> Low</span>
          <span className="flex items-center gap-1"><span className="w-3 h-2 bg-gold rounded-sm" /> Medium</span>
          <span className="flex items-center gap-1"><span className="w-3 h-2 bg-accent rounded-sm" /> High</span>
        </div>
      </motion.div>

      {/* Social Buzz */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 border border-border/40 shadow-card">
        <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-accent" /> Live Social Buzz
        </h2>
        <div className="space-y-3">
          {socialBuzz.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/20"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-accent">{post.user.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-card-foreground">{post.user}</span>
                  <span className="text-[10px] text-muted-foreground">{post.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{post.text}</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Heart className="h-3 w-3" />
                <span className="text-[10px]">{post.likes}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Environment */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        {[
          { icon: Volume2, label: "Noise Level", value: "72 dB", sub: "Moderate" },
          { icon: Wifi, label: "WiFi Speed", value: "85 Mbps", sub: "Excellent" },
          { icon: MapPin, label: "Exits Open", value: "4/4", sub: "All clear" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl p-4 border border-border/40 shadow-card text-center">
            <s.icon className="h-5 w-5 text-accent mx-auto mb-2" />
            <p className="text-lg font-heading font-bold text-card-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
            <p className="text-[9px] text-emerald font-medium mt-1">{s.sub}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LiveEventPulse;
