import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, MapPin, Plus, X, CheckCircle2 } from "lucide-react";

const venueTypes = ["indoor", "outdoor", "hybrid", "virtual"] as const;
const amenityOptions = ["Wi-Fi", "A/V System", "Catering", "Parking", "Green Room", "Stage", "Sound System", "Lighting", "Security", "Food Courts", "Medical Tent", "Live Streaming", "Projector", "Whiteboard", "Coffee Bar"];

const AddVenue = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [type, setType] = useState<typeof venueTypes[number]>("indoor");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleAmenity = (a: string) => {
    setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl p-8 shadow-card border border-border/40 text-center space-y-4 mt-12">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-card-foreground">Venue Added!</h2>
          <p className="text-sm text-muted-foreground">"{name}" has been added to your venues.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" className="rounded-xl" onClick={() => navigate("/dashboard/venues")}>View Venues</Button>
            <Button variant="hero" className="rounded-xl" onClick={() => { setSubmitted(false); setName(""); setAddress(""); setCity(""); setCapacity(""); setPricePerDay(""); setAmenities([]); setDescription(""); }}>Add Another</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/venues")} className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">Add New Venue</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Fill in the details to add a new event venue.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-5">
          <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Venue Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Bangalore International Centre" className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address *</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full street address" className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label>City *</Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Bangalore" className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label>Venue Type *</Label>
              <div className="flex gap-2 flex-wrap">
                {venueTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all border ${
                      type === t ? "border-accent bg-accent/10 text-accent" : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Capacity *</Label>
              <Input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g., 3000" className="h-12 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label>Price per Day (₹) *</Label>
              <Input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} placeholder="e.g., 250000" className="h-12 rounded-xl" required />
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Description</h2>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the venue, its unique features, and what makes it great for events..." className="min-h-[100px] rounded-xl" />
        </motion.div>

        {/* Amenities */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => toggleAmenity(a)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                  amenities.includes(a) ? "border-accent bg-accent/10 text-accent" : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {amenities.includes(a) && <span className="mr-1">✓</span>}
                {a}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Image Upload */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-2xl p-6 shadow-card border border-border/40 space-y-4">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Photos</h2>
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-card-foreground">Drag & drop venue photos here</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB. Recommended: 1920×1080</p>
            <Button variant="outline" size="sm" className="mt-4 rounded-xl">Browse Files</Button>
          </div>
        </motion.div>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" className="rounded-xl" onClick={() => navigate("/dashboard/venues")}>Cancel</Button>
          <Button type="submit" variant="hero" className="rounded-xl gap-2">
            <Plus className="h-4 w-4" /> Add Venue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVenue;
