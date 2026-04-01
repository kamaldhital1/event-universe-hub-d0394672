import { useState } from "react";
import { motion } from "framer-motion";
import {
  Megaphone, Mail, Share2, TrendingUp, Users, Eye, MousePointerClick,
  ArrowUpRight, ArrowDownRight, Send, Copy, ExternalLink, BarChart3,
  CalendarDays, Globe, MessageSquare, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockEvents, formatCurrency } from "@/data/mockData";

const campaignData = [
  { name: "Tech Summit Launch", sent: 12500, opened: 8200, clicked: 3100, conversions: 890, status: "active" },
  { name: "Early Bird Reminder", sent: 8000, opened: 5600, clicked: 2400, conversions: 720, status: "active" },
  { name: "Last Chance Alert", sent: 10000, opened: 7200, clicked: 3800, conversions: 1050, status: "scheduled" },
  { name: "Midnight Echoes Teaser", sent: 15000, opened: 11200, clicked: 5600, conversions: 1800, status: "completed" },
];

const channelPerformance = [
  { channel: "Email", registrations: 4200, cost: 12000, roi: "350%" },
  { channel: "Instagram", registrations: 3100, cost: 45000, roi: "180%" },
  { channel: "Google Ads", registrations: 1800, cost: 60000, roi: "120%" },
  { channel: "WhatsApp", registrations: 2200, cost: 8000, roi: "410%" },
  { channel: "Referral", registrations: 1500, cost: 0, roi: "∞" },
];

const utmData = [
  { source: "instagram_story", clicks: 4200, conversions: 890 },
  { source: "email_launch", clicks: 3800, conversions: 1050 },
  { source: "whatsapp_blast", clicks: 2900, conversions: 720 },
  { source: "google_search", clicks: 2100, conversions: 380 },
  { source: "twitter_promo", clicks: 1400, conversions: 210 },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const MarketingPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 lg:p-8 space-y-7">
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/15 mb-3">
            <Megaphone className="h-3 w-3 text-accent" />
            <span className="text-xs font-semibold text-accent">Marketing Suite</span>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight">Marketing & Promotions</h1>
          <p className="text-muted-foreground text-sm mt-1">Drive registrations with campaigns, UTM tracking, and audience insights.</p>
        </div>
        <Button variant="hero" className="gap-2 rounded-xl">
          <Send className="h-4 w-4" /> New Campaign
        </Button>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Email Subscribers", value: "24.5K", change: "+8.2%", up: true, icon: Mail, color: "text-accent", bg: "bg-accent/8" },
          { label: "Social Reach", value: "156K", change: "+22.1%", up: true, icon: Globe, color: "text-violet", bg: "bg-violet/8" },
          { label: "Campaign CTR", value: "34.2%", change: "+5.1%", up: true, icon: MousePointerClick, color: "text-emerald", bg: "bg-emerald/8" },
          { label: "Cost per Registration", value: "₹68", change: "-12.3%", up: true, icon: TrendingUp, color: "text-gold", bg: "bg-gold/8" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-5 border border-border/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? "text-emerald" : "text-destructive"}`}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <div className="font-heading text-2xl font-bold text-card-foreground tracking-tight">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Campaigns */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 border border-border/40">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-bold text-card-foreground tracking-tight">Email Campaigns</h3>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5"><Mail className="h-3.5 w-3.5" /> Create</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Campaign</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Sent</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Opened</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Clicked</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Conversions</th>
                <th className="text-left pb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((c) => (
                <tr key={c.name} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="py-3.5 text-sm font-semibold text-card-foreground">{c.name}</td>
                  <td className="py-3.5 text-sm text-muted-foreground">{c.sent.toLocaleString()}</td>
                  <td className="py-3.5 text-sm text-muted-foreground hidden md:table-cell">{c.opened.toLocaleString()} ({Math.round(c.opened/c.sent*100)}%)</td>
                  <td className="py-3.5 text-sm text-muted-foreground hidden md:table-cell">{c.clicked.toLocaleString()}</td>
                  <td className="py-3.5 text-sm font-semibold text-emerald">{c.conversions.toLocaleString()}</td>
                  <td className="py-3.5">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize ${
                      c.status === "active" ? "bg-emerald/10 text-emerald"
                      : c.status === "scheduled" ? "bg-blue-500/10 text-blue-600"
                      : "bg-secondary text-muted-foreground"
                    }`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <motion.div variants={item} className="bg-card rounded-2xl p-6 border border-border/40">
          <h3 className="font-heading font-bold text-card-foreground mb-5 tracking-tight">Channel Performance</h3>
          <div className="space-y-3">
            {channelPerformance.map((ch) => (
              <div key={ch.channel} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-card-foreground">{ch.channel}</span>
                    <span className="text-xs font-bold text-emerald">{ch.roi} ROI</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{ch.registrations.toLocaleString()} registrations</span>
                    <span>₹{ch.cost.toLocaleString()} spent</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* UTM Tracking */}
        <motion.div variants={item} className="bg-card rounded-2xl p-6 border border-border/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-card-foreground tracking-tight">UTM Tracking</h3>
            <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl text-xs"><Copy className="h-3 w-3" /> Copy UTM Link</Button>
          </div>
          <div className="space-y-3">
            {utmData.map((utm) => (
              <div key={utm.source} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                <div>
                  <span className="text-sm font-mono text-card-foreground">{utm.source}</span>
                  <div className="text-xs text-muted-foreground mt-0.5">{utm.clicks.toLocaleString()} clicks</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-accent">{utm.conversions}</span>
                  <div className="text-[10px] text-muted-foreground">{Math.round(utm.conversions/utm.clicks*100)}% conv.</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Promo Codes */}
      <motion.div variants={item} className="bg-card rounded-2xl p-6 border border-border/40">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-bold text-card-foreground tracking-tight">Active Promo Codes</h3>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5"><Plus className="h-3.5 w-3.5" /> Create Code</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { code: "EARLYBIRD25", discount: "25% off", uses: "890/1000", event: "Tech Summit", expires: "Apr 10, 2026" },
            { code: "GROUPOF5", discount: "₹500 off", uses: "234/500", event: "All Events", expires: "May 1, 2026" },
            { code: "STUDENT50", discount: "50% off", uses: "456/2000", event: "Workshops", expires: "Dec 31, 2026" },
          ].map((promo) => (
            <div key={promo.code} className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-border transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-accent">{promo.code}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg"><Copy className="h-3 w-3" /></Button>
              </div>
              <p className="text-sm font-semibold text-card-foreground">{promo.discount}</p>
              <div className="flex flex-col gap-1 mt-2 text-xs text-muted-foreground">
                <span>{promo.uses} used</span>
                <span>For: {promo.event}</span>
                <span>Expires: {promo.expires}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Suggestions */}
      <motion.div variants={item} className="bg-gradient-to-r from-accent/5 via-violet/5 to-emerald/5 rounded-2xl p-6 border border-accent/10">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="font-heading font-bold text-card-foreground tracking-tight">AI Marketing Suggestions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Best Send Time", value: "Tuesday 7 PM", detail: "Emails sent Tuesday evening have 2.3x higher open rates for your audience." },
            { title: "Untapped Channel", value: "LinkedIn Ads", detail: "Your tech events audience has 68% LinkedIn presence. Consider allocating budget." },
            { title: "Retargeting Opportunity", value: "2,400 users", detail: "Visitors who viewed event pages but didn't register — send a reminder campaign." },
          ].map((insight) => (
            <div key={insight.title} className="bg-card/60 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{insight.title}</p>
              <p className="font-heading font-bold text-lg text-card-foreground mt-1">{insight.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{insight.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Plus = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

export default MarketingPage;
