import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, UserPlus, MoreHorizontal, Mail, Ban, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAttendees, formatCurrency, getStatusColor } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AttendeesList = () => {
  const [search, setSearch] = useState("");

  const filtered = mockAttendees.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Attendees</h1>
          <p className="text-muted-foreground text-sm mt-1">Your community of event participants.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="hero" className="gap-2">
            <UserPlus className="h-4 w-4" /> Add Attendee
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search attendees..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Attendees", value: mockAttendees.length },
          { label: "Active", value: mockAttendees.filter((a) => a.status === "active").length },
          { label: "Avg. Events/Person", value: Math.round(mockAttendees.reduce((s, a) => s + a.eventsAttended, 0) / mockAttendees.length) },
          { label: "Total Revenue", value: formatCurrency(mockAttendees.reduce((s, a) => s + a.totalSpent, 0)) },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-4 shadow-card">
            <div className="text-xl font-heading font-bold text-card-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendee</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Events</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Total Spent</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((attendee, i) => (
                <motion.tr
                  key={attendee.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-accent">
                          {attendee.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{attendee.name}</p>
                        <p className="text-xs text-muted-foreground">Since {new Date(attendee.registeredSince).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm text-card-foreground">{attendee.email}</p>
                    <p className="text-xs text-muted-foreground">{attendee.phone}</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm text-card-foreground">{attendee.eventsAttended}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm font-medium text-card-foreground">{formatCurrency(attendee.totalSpent)}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusColor(attendee.status)}`}>
                      {attendee.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> Profile</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Mail className="h-4 w-4" /> Email</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive"><Ban className="h-4 w-4" /> Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendeesList;
