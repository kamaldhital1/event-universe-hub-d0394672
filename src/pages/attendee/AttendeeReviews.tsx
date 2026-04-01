import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star, MessageSquare, ThumbsUp, CalendarDays, MapPin, ArrowRight,
  Sparkles, TrendingUp, Award, Edit, Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { mockEvents } from "@/data/mockData";

const myReviews = [
  {
    id: "1",
    eventId: "3",
    eventTitle: "Design Thinking Masterclass",
    eventImage: mockEvents[2].image,
    rating: 5,
    review: "Absolutely transformative workshop! The hands-on exercises were brilliant and the facilitators really knew their stuff. Would highly recommend to anyone in product or design.",
    date: "Feb 22, 2026",
    likes: 24,
    replies: 3,
  },
  {
    id: "2",
    eventId: "5",
    eventTitle: "City Marathon & Fun Run",
    eventImage: mockEvents[4].image,
    rating: 4,
    review: "Great organization and route planning. The water stations were well-placed. Only wish the medal design was cooler! The after-party was fantastic though.",
    date: "Jan 18, 2026",
    likes: 18,
    replies: 5,
  },
];

const pendingReviews = [
  { eventId: "1", title: "Global Tech Summit 2026", image: mockEvents[0].image, date: "Apr 15, 2026" },
  { eventId: "2", title: "Midnight Echoes Festival", image: mockEvents[1].image, date: "May 3, 2026" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const AttendeeReviews = () => {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold text-foreground tracking-tight">My Reviews</h1>
        <p className="text-muted-foreground mt-1.5">Share your event experiences and help the community discover great events.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        {[
          { label: "Reviews Written", value: myReviews.length, icon: MessageSquare, color: "text-accent", bg: "bg-accent/8" },
          { label: "Avg. Rating Given", value: "4.5", icon: Star, color: "text-gold", bg: "bg-gold/8" },
          { label: "Helpful Votes", value: "42", icon: ThumbsUp, color: "text-emerald", bg: "bg-emerald/8" },
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

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <motion.section variants={item}>
          <h2 className="font-heading text-xl font-bold text-foreground tracking-tight mb-4 flex items-center gap-2">
            <Edit className="h-5 w-5 text-gold" /> Pending Reviews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pendingReviews.map((event) => (
              <div key={event.eventId} className="bg-gold/5 border border-gold/20 rounded-2xl p-5 flex gap-4">
                <img src={event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-sm text-card-foreground line-clamp-1">{event.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Attended {event.date}</p>
                  <Button variant="outline" size="sm" className="rounded-xl mt-3 gap-1.5">
                    <Star className="h-3.5 w-3.5" /> Write Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* My Reviews */}
      <motion.section variants={item}>
        <h2 className="font-heading text-xl font-bold text-foreground tracking-tight mb-4">Your Reviews</h2>
        <div className="space-y-4">
          {myReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={item}
              className="bg-card rounded-2xl border border-border/40 overflow-hidden hover:border-border transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-44 h-32 sm:h-auto shrink-0">
                  <img src={review.eventImage} alt={review.eventTitle} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link to={`/event/${review.eventId}`} className="font-heading font-bold text-base text-card-foreground hover:text-accent transition-colors">
                        {review.eventTitle}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">Reviewed on {review.date}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-gold text-gold" : "text-border"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-card-foreground leading-relaxed">{review.review}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{review.likes} helpful</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{review.replies} replies</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Button variant="ghost" size="sm" className="rounded-xl text-xs gap-1"><Edit className="h-3 w-3" /> Edit</Button>
                      <Button variant="ghost" size="sm" className="rounded-xl text-xs gap-1"><Camera className="h-3 w-3" /> Add Photos</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Reviewer Badge */}
      <motion.div variants={item} className="bg-gradient-to-r from-accent/5 via-violet/5 to-gold/5 rounded-2xl p-6 border border-accent/10 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
          <Award className="h-7 w-7 text-gold" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-heading font-bold text-lg text-card-foreground">Reviewer Badge: Rising Critic ⭐</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Write 3 more reviews to unlock the "Trusted Reviewer" badge and get early access to events!</p>
        </div>
        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full" style={{ width: "40%" }} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AttendeeReviews;
