import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Bot, User, Zap, Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

const quickActions = [
  { icon: Calendar, label: "Find events near me", query: "Find popular events happening near me this weekend" },
  { icon: Ticket, label: "My upcoming events", query: "Show me my upcoming events and tickets" },
  { icon: MapPin, label: "Best venues", query: "What are the top-rated venues in my city?" },
  { icon: Zap, label: "Trending now", query: "What events are trending right now?" },
];

const mockResponses: Record<string, string> = {
  "Find popular events happening near me this weekend": "🎉 Here are **3 trending events** near you this weekend:\n\n1. **TechVerse Summit** — Sat, 2:00 PM at Bengaluru Convention Center\n   🔥 85% sold out · ₹1,499\n\n2. **Indie Music Night** — Fri, 7:30 PM at The Blue Note\n   🎵 Live performances · ₹799\n\n3. **Startup Pitch Day** — Sun, 10:00 AM at HSR Hub\n   💡 Free entry · Limited seats\n\nWant me to book tickets for any of these?",
  "Show me my upcoming events and tickets": "📋 You have **2 upcoming events**:\n\n1. **DevConf 2026** — Apr 12, 9:00 AM\n   📍 HICC Hyderabad · Ticket #DC-4821\n   ✅ Check-in available\n\n2. **AI Workshop** — Apr 18, 2:00 PM\n   📍 Online (Zoom) · Ticket #AW-1093\n   📅 Reminder set\n\nNeed directions or want to share with friends?",
  "What are the top-rated venues in my city?": "🏟️ **Top Venues in Bengaluru**:\n\n1. **Palace Grounds** ⭐ 4.9\n   Capacity: 10,000+ · Best for concerts & festivals\n\n2. **Jayamahal Palace** ⭐ 4.8\n   Capacity: 500 · Perfect for premium galas\n\n3. **MLR Convention Centre** ⭐ 4.7\n   Capacity: 2,000 · Tech conferences favorite\n\nWant a 3D preview of any venue?",
  "What events are trending right now?": "🔥 **Trending on Sansaar**:\n\n1. **AI & Future Summit** — 12K interested\n   Apr 20 · ₹2,499 · Selling fast!\n\n2. **Bengaluru Comic Con** — 8.5K interested\n   May 3-4 · ₹999 · Early bird\n\n3. **Holi Color Run 5K** — 6K interested\n   Mar 25 · ₹599 · Limited spots\n\n📈 Based on your interests in tech & music, I'd recommend #1 and #3!",
};

const defaultResponse = "I'd be happy to help with that! 🎯 I can assist you with:\n\n• **Finding events** based on your interests\n• **Booking tickets** and managing reservations\n• **Venue recommendations** with virtual previews\n• **Networking suggestions** for upcoming events\n• **Schedule management** and reminders\n\nWhat would you like to explore?";

const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! 👋 I'm your **AI Event Concierge**. I can help you discover events, book tickets, find networking matches, and more. What can I do for you?", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateResponse = (query: string) => {
    setIsTyping(true);
    const response = mockResponses[query] || defaultResponse;
    const words = response.split(" ");
    let current = "";
    let i = 0;

    const interval = setInterval(() => {
      if (i < words.length) {
        current += (i === 0 ? "" : " ") + words[i];
        i++;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.timestamp.getTime() > Date.now() - 10000) {
            return [...prev.slice(0, -1), { ...last, content: current }];
          }
          return [...prev, { role: "assistant", content: current, timestamp: new Date() }];
        });
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: text.trim(), timestamp: new Date() }]);
    setInput("");
    setTimeout(() => simulateResponse(text.trim()), 600);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 md:bottom-8 right-6 z-[60] w-14 h-14 rounded-2xl bg-gradient-accent shadow-glow flex items-center justify-center group"
          >
            <Sparkles className="h-6 w-6 text-accent-foreground group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald rounded-full animate-pulse-soft border-2 border-background" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 md:bottom-8 right-4 md:right-6 z-[60] w-[calc(100vw-2rem)] md:w-[400px] h-[500px] md:h-[560px] bg-card rounded-2xl shadow-elevated border border-border/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/40 bg-gradient-to-r from-accent/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow">
                  <Sparkles className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-card-foreground">AI Concierge</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald rounded-full animate-pulse-soft" />
                    <span className="text-[10px] text-muted-foreground font-medium">Always online</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-xl h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-2.5", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-accent" />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-md"
                      : "bg-secondary/60 text-card-foreground rounded-bl-md"
                  )}>
                    {msg.content.split("\n").map((line, li) => (
                      <span key={li}>
                        {line.split(/(\*\*.*?\*\*)/).map((part, pi) =>
                          part.startsWith("**") && part.endsWith("**")
                            ? <strong key={pi} className="font-semibold">{part.slice(2, -2)}</strong>
                            : part
                        )}
                        {li < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5 text-accent" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div className="bg-secondary/60 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    {[0, 1, 2].map(d => (
                      <motion.div key={d} className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick actions on first load */}
              {messages.length === 1 && !isTyping && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => send(action.query)}
                      className="flex items-center gap-2 p-3 rounded-xl bg-secondary/40 hover:bg-secondary/80 border border-border/30 transition-all text-left group"
                    >
                      <action.icon className="h-4 w-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-medium text-card-foreground leading-tight">{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/40 bg-card">
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-secondary/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 border border-border/30"
                />
                <Button type="submit" size="icon" variant="hero" className="rounded-xl h-10 w-10 shrink-0" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-[9px] text-muted-foreground text-center mt-2">Powered by Sansaar AI · Mock responses for demo</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIConcierge;
