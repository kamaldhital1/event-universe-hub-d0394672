import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, DollarSign, Calendar, Wifi, Car, Coffee, Shield, Sparkles, Globe, Tag, Edit } from "lucide-react";
import { mockVenues, formatCurrency, getStatusColor } from "@/data/mockData";

const amenityIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi, "A/V System": Globe, Catering: Coffee, Parking: Car, "Green Room": Sparkles,
  Stage: Globe, "Sound System": Globe, Lighting: Sparkles, Security: Shield, "Food Courts": Coffee,
  "Medical Tent": Shield, "Hydration Stations": Coffee, "Timing Mats": Tag, "PA System": Globe,
  "Exhibition Walls": Globe, "Audio Guide": Globe, Projector: Globe, "Coffee Bar": Coffee,
  Materials: Tag, "Live Kitchen": Coffee, "Live Streaming": Globe, Whiteboard: Tag,
};

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = mockVenues.find((v) => v.id === id);

  if (!venue) {
    return (
      <div className="p-6 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground mb-2">Venue not found</h2>
        <Button variant="outline" onClick={() => navigate("/dashboard/venues")} className="rounded-xl">Back to Venues</Button>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/venues")} className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </div>

      {/* Hero Image */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-2xl overflow-hidden h-64 lg:h-80">
        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 mb-2">
            <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusColor(venue.status)}`}>
              {venue.status}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize bg-card/80 text-card-foreground backdrop-blur-sm">
              {venue.type}
            </span>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-white tracking-tight">{venue.name}</h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: MapPin, label: "Location", value: `${venue.address}, ${venue.city}` },
              { icon: Users, label: "Capacity", value: venue.capacity.toLocaleString() + " people" },
              { icon: DollarSign, label: "Price", value: formatCurrency(venue.pricePerDay) + "/day" },
            ].map((info) => (
              <div key={info.label} className="bg-card rounded-2xl p-4 shadow-card border border-border/40">
                <div className="flex items-center gap-2 mb-1">
                  <info.icon className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground font-medium">{info.label}</span>
                </div>
                <p className="text-sm font-semibold text-card-foreground">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
            <h2 className="font-heading font-semibold text-lg text-card-foreground">Amenities & Facilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {venue.amenities.map((a) => {
                const Icon = amenityIcons[a] || Tag;
                return (
                  <div key={a} className="flex items-center gap-2.5 p-3 bg-secondary/50 rounded-xl border border-border/30">
                    <Icon className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-sm text-card-foreground">{a}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Bookings (mock) */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
            <h2 className="font-heading font-semibold text-lg text-card-foreground">Upcoming Bookings</h2>
            {[
              { event: "Global Tech Summit 2026", date: "Apr 15–17, 2026", status: "confirmed" },
              { event: "Startup Demo Day", date: "May 2, 2026", status: "pending" },
            ].map((booking) => (
              <div key={booking.event} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-border/30">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-card-foreground">{booking.event}</p>
                  <p className="text-xs text-muted-foreground">{booking.date}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
            <h3 className="font-heading font-semibold text-card-foreground">Actions</h3>
            <Button variant="hero" className="w-full rounded-xl gap-2">
              <Calendar className="h-4 w-4" /> Book Venue
            </Button>
            <Button variant="outline" className="w-full rounded-xl gap-2">
              <Edit className="h-4 w-4" /> Edit Details
            </Button>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-3">
            <h3 className="font-heading font-semibold text-card-foreground">Stats</h3>
            {[
              { label: "Total Bookings", value: "24" },
              { label: "Revenue Generated", value: "₹60,00,000" },
              { label: "Avg. Rating", value: "4.8 ★" },
              { label: "Repeat Clients", value: "67%" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-sm font-semibold text-card-foreground">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VenueDetail;
