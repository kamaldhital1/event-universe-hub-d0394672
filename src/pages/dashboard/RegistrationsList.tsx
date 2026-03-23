import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Filter, Eye, MoreHorizontal, Mail, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockRegistrations, formatCurrency, getStatusColor } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RegistrationsList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockRegistrations.filter((r) => {
    const matchSearch =
      r.attendeeName.toLowerCase().includes(search.toLowerCase()) ||
      r.eventTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.ticketCode.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = {
    all: mockRegistrations.length,
    confirmed: mockRegistrations.filter((r) => r.status === "confirmed").length,
    pending: mockRegistrations.filter((r) => r.status === "pending").length,
    waitlisted: mockRegistrations.filter((r) => r.status === "waitlisted").length,
    "checked-in": mockRegistrations.filter((r) => r.status === "checked-in").length,
    cancelled: mockRegistrations.filter((r) => r.status === "cancelled").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Registrations</h1>
          <p className="text-muted-foreground text-sm mt-1">Track and manage all event registrations.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Button
            key={status}
            variant={statusFilter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(status)}
            className="capitalize gap-1"
          >
            {status === "all" ? "All" : status}
            <span className="ml-1 text-xs bg-background/20 px-1.5 py-0.5 rounded-full">{count}</span>
          </Button>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name, event, or ticket code..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendee</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Event</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Ticket</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Amount</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg, i) => (
                <motion.tr
                  key={reg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <p className="text-sm font-medium text-card-foreground">{reg.attendeeName}</p>
                    <p className="text-xs text-muted-foreground">{reg.attendeeEmail}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm text-card-foreground">{reg.eventTitle}</p>
                    <p className="text-xs text-muted-foreground">{reg.registeredAt}</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <p className="text-sm text-card-foreground">{reg.ticketType}</p>
                    <p className="text-xs text-muted-foreground font-mono">{reg.ticketCode}</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm font-medium text-card-foreground">{formatCurrency(reg.totalAmount)}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusColor(reg.status)}`}>
                      {reg.status}
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
                        <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Mail className="h-4 w-4" /> Send Ticket</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive"><XCircle className="h-4 w-4" /> Cancel</DropdownMenuItem>
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

export default RegistrationsList;
