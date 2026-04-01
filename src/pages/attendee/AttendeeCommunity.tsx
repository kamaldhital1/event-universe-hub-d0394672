import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users, MessageSquare, UserPlus, Heart, Share2, Star, CalendarDays,
  MapPin, ArrowRight, Sparkles, TrendingUp, Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/data/mockData";

const communities = [
  { id: "1", name: "Bangalore Tech Meetup", members: 3420, events: 24, category: "Technology", avatar: "BT", gradient: "from-blue-500/20 to-violet/20", joined: true },
  { id: "2", name: "Mumbai Music Lovers", members: 8900, events: 18, category: "Music", avatar: "MM", gradient: "from-accent/20 to-gold/20", joined: true },
  { id: "3", name: "Design India Community", members: 1560, events: 12, category: "Design", avatar: "DI", gradient: "from-emerald/20 to-blue-500/20", joined: false },
  { id: "4", name: "Fitness & Wellness Hub", members: 5200, events: 32, category: "Sports", avatar: "FW", gradient: "from-gold/20 to-emerald/20", joined: false },
  { id: "5", name: "Art Collective Delhi", members: 890, events: 8, category: "Art", avatar: "AC", gradient: "from-violet/20 to-accent/20", joined: true },
  { id: "6", name: "Startup Founders Network", members: 2100, events: 15, category: "Business", avatar: "SF", gradient: "from-accent/20 to-emerald/20", joined: false },
];

const activityFeed = [
  { user: "Arjun P.", action: "is attending", event: "Global Tech Summit 2026", time: "5 min ago", avatar: "AP" },
  { user: "Meera J.", action: "reviewed", event: "Design Thinking Masterclass", time: "20 min ago", avatar: "MJ" },
  { user: "Sneha G.", action: "saved", event: "Midnight Echoes Festival", time: "1h ago", avatar: "SG" },
  { user: "Rahul V.", action: "joined", event: "Bangalore Tech Meetup", time: "2h ago", avatar: "RV" },
  { user: "Priya S.", action: "shared", event: "City Marathon & Fun Run", time: "3h ago", avatar: "PS" },
  { user: "Kiran D.", action: "is attending", event: "Annual Charity Gala Night", time: "4h ago", avatar: "KD" },
];

const upcomingCommunityEvents = mockEvents.filter((e) => e.status === "published").slice(0, 3);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const AttendeeCommunity = () => {
  const [joinedIds, setJoinedIds] = useState<string[]>(
    communities.filter((c) => c.joined).map((c) => c.id)
  );

  const toggleJoin = (id: string) =>
    setJoinedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold text-foreground tracking-tight">Community</h1>
        <p className="text-muted-foreground mt-1.5">Connect with fellow event-goers, join groups, and discover shared experiences.</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        {[
          { label: "Communities Joined", value: joinedIds.length, icon: Users, color: "text-accent", bg: "bg-accent/8" },
          { label: "People You Follow", value: "24", icon: UserPlus, color: "text-violet", bg: "bg-violet/8" },
          { label: "Events Together", value: "6", icon: Heart, color: "text-emerald", bg: "bg-emerald/8" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border/40 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <div className="font-heading text-xl font-bold text-card-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Communities List */}
        <div className="lg:col-span-2 space-y-5">
          <motion.div variants={item} className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-foreground tracking-tight">Your Communities</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {communities.map((comm) => (
              <motion.div
                key={comm.id}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-card rounded-2xl p-5 border border-border/40 hover:border-border transition-all duration-300 group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${comm.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-xs font-heading font-bold text-foreground">{comm.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-base text-card-foreground line-clamp-1">{comm.name}</h3>
                    <p className="text-xs text-muted-foreground">{comm.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{comm.members.toLocaleString()} members</span>
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{comm.events} events</span>
                </div>
                <Button
                  variant={joinedIds.includes(comm.id) ? "outline" : "hero"}
                  size="sm"
                  className="w-full rounded-xl"
                  onClick={() => toggleJoin(comm.id)}
                >
                  {joinedIds.includes(comm.id) ? "Joined ✓" : "Join Community"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <motion.div variants={item} className="space-y-5">
          <h2 className="font-heading text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" /> Live Feed
          </h2>
          <div className="bg-card rounded-2xl p-5 border border-border/40 space-y-4">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-[10px] font-heading font-bold text-accent">{a.avatar}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-card-foreground leading-snug">
                    <span className="font-semibold">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-semibold text-accent">{a.event}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Community Events */}
          <h2 className="font-heading text-lg font-bold text-foreground tracking-tight">Community Events</h2>
          <div className="space-y-3">
            {upcomingCommunityEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`} className="group">
                <div className="bg-card rounded-2xl p-4 border border-border/40 hover:border-border transition-all duration-300 flex gap-3">
                  <img src={event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-heading font-bold text-card-foreground line-clamp-1">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                    <p className="text-xs text-accent font-semibold mt-1">{event.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AttendeeCommunity;
