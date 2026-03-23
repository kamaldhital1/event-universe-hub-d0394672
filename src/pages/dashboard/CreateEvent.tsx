import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { mockVenues } from "@/data/mockData";

const categories = ["Conference", "Music", "Workshop", "Gala", "Sports", "Art", "Meetup", "Webinar"];

const CreateEvent = () => {
  const navigate = useNavigate();
  const [ticketTypes, setTicketTypes] = useState([{ name: "General", price: "", quantity: "" }]);

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: "", price: "", quantity: "" }]);
  };

  const removeTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard/events");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard/events">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Create New Event</h1>
          <p className="text-muted-foreground text-sm">Fill in the details to publish your event.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-6 shadow-card space-y-5">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Basic Information</h2>

          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="Give your event a catchy title" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Venue</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select venue" /></SelectTrigger>
                <SelectContent>
                  {mockVenues.map((v) => (
                    <SelectItem key={v.id} value={v.id}>{v.name} ({v.city})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your event in detail..." className="min-h-[120px]" required />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </motion.div>

        {/* Date & Time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-6 shadow-card space-y-5">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Date & Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" />
            </div>
          </div>
        </motion.div>

        {/* Tickets */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg text-card-foreground">Ticket Types</h2>
            <Button type="button" variant="outline" size="sm" className="gap-2" onClick={addTicketType}>
              <Plus className="h-4 w-4" /> Add Type
            </Button>
          </div>

          {ticketTypes.map((ticket, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end p-4 bg-muted/30 rounded-lg">
              <div className="space-y-2">
                <Label>Type Name</Label>
                <Input placeholder="e.g. VIP, Early Bird" defaultValue={ticket.name} />
              </div>
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" placeholder="0 for free" min="0" />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="Available tickets" min="1" />
              </div>
              <div>
                {ticketTypes.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeTicketType(i)} className="text-destructive">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Capacity & Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl p-6 shadow-card space-y-5">
          <h2 className="font-heading font-semibold text-lg text-card-foreground">Capacity & Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Max Capacity</Label>
              <Input id="capacity" type="number" placeholder="Maximum attendees" min="1" />
            </div>
            <div className="space-y-2">
              <Label>Enable Waitlist?</Label>
              <Select defaultValue="yes">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard/events")}>Cancel</Button>
          <Button type="submit" variant="secondary">Save as Draft</Button>
          <Button type="submit" variant="hero">Publish Event</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
