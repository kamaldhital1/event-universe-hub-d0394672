import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plus, MapPin, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockVenues, formatCurrency, getStatusColor } from "@/data/mockData";

const VenueManagement = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = mockVenues.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Venues</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your event spaces and locations.</p>
        </div>
        <Button variant="hero" className="gap-2">
          <Plus className="h-4 w-4" /> Add Venue
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search venues..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((venue, i) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="relative h-40">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 right-3">
                <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusColor(venue.status)}`}>
                  {venue.status}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-heading font-semibold text-card-foreground">{venue.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{venue.address}, {venue.city}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{venue.capacity.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{formatCurrency(venue.pricePerDay)}/day</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {venue.amenities.slice(0, 3).map((a) => (
                  <span key={a} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{a}</span>
                ))}
                {venue.amenities.length > 3 && (
                  <span className="text-xs text-accent font-medium">+{venue.amenities.length - 3} more</span>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button variant="hero" size="sm" className="flex-1">Book</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VenueManagement;
