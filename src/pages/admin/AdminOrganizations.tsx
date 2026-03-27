import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Search, Filter, Eye, CheckCircle2, XCircle, Clock, ChevronDown,
  Globe, Mail, Phone, MapPin, FileText, Users, CalendarDays, IndianRupee,
  ExternalLink, AlertTriangle, MessageSquare, Shield, ArrowLeft, Briefcase, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  mockOrganizations, formatCurrency, getStatusColor, getOrgStatusLabel, getOrgTypeLabel,
  type Organization, type OrgStatus
} from "@/data/mockData";

type FilterStatus = "all" | OrgStatus;

const AdminOrganizations = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [showActionModal, setShowActionModal] = useState<"approve" | "reject" | null>(null);

  const filtered = mockOrganizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(search.toLowerCase()) || org.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || org.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusFilters: { value: FilterStatus; label: string; count: number }[] = [
    { value: "all", label: "All", count: mockOrganizations.length },
    { value: "pending", label: "Pending", count: mockOrganizations.filter(o => o.status === "pending").length },
    { value: "under_review", label: "Under Review", count: mockOrganizations.filter(o => o.status === "under_review").length },
    { value: "approved", label: "Approved", count: mockOrganizations.filter(o => o.status === "approved").length },
    { value: "rejected", label: "Rejected", count: mockOrganizations.filter(o => o.status === "rejected").length },
  ];

  if (selectedOrg) {
    return (
      <div className="p-6">
        <button onClick={() => setSelectedOrg(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Organizations
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground">{selectedOrg.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                      <Briefcase className="h-3.5 w-3.5" /> {getOrgTypeLabel(selectedOrg.type)}
                      <span>·</span>
                      <MapPin className="h-3.5 w-3.5" /> {selectedOrg.city}, {selectedOrg.state}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${getStatusColor(selectedOrg.status)}`}>
                  {getOrgStatusLabel(selectedOrg.status)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedOrg.description}</p>
            </div>

            {/* Business Details */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" /> Business Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ["Registration / CIN", selectedOrg.registrationNumber || "N/A"],
                  ["GST Number", selectedOrg.gstNumber || "N/A"],
                  ["PAN Number", selectedOrg.panNumber],
                  ["Tier", selectedOrg.tier.charAt(0).toUpperCase() + selectedOrg.tier.slice(1)],
                  ["Team Size", `${selectedOrg.teamSize} members`],
                  ["Expected Events/Year", `${selectedOrg.expectedEventsPerYear}`],
                  ["Total Events", `${selectedOrg.totalEvents}`],
                  ["Total Revenue", formatCurrency(selectedOrg.totalRevenue)],
                ].map(([label, value]) => (
                  <div key={label} className="p-3 rounded-xl bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> Address
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedOrg.address}, {selectedOrg.city}, {selectedOrg.state} — {selectedOrg.pincode}
              </p>
            </div>

            {/* Past Experience */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-accent" /> Past Event Experience
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedOrg.pastEventExperience}</p>
            </div>

            {/* Documents */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" /> Submitted Documents ({selectedOrg.documentsSubmitted.length})
              </h3>
              <div className="space-y-2">
                {selectedOrg.documentsSubmitted.map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{doc}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      <Eye className="h-3 w-3" /> View
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            {selectedOrg.socialLinks.length > 0 && (
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-accent" /> Social Presence
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOrg.socialLinks.map((link) => (
                    <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="h-3 w-3" /> {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Rejection reason if rejected */}
            {selectedOrg.status === "rejected" && selectedOrg.rejectionReason && (
              <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30">
                <h3 className="font-heading font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Rejection Reason
                </h3>
                <p className="text-sm text-red-600 dark:text-red-300">{selectedOrg.rejectionReason}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Person */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" /> Contact Person
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">
                      {selectedOrg.contactPersonName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedOrg.contactPersonName}</p>
                    <p className="text-xs text-muted-foreground">{selectedOrg.contactPersonRole}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-2"><Mail className="h-3 w-3" /> {selectedOrg.contactPersonEmail}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2"><Phone className="h-3 w-3" /> {selectedOrg.contactPersonPhone}</p>
                </div>
              </div>
            </div>

            {/* Org Info */}
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-4">Organization Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground font-medium text-xs">{selectedOrg.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="text-foreground font-medium text-xs">{selectedOrg.phone}</span>
                </div>
                {selectedOrg.website && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Website</span>
                    <a href={selectedOrg.website} className="text-accent text-xs hover:underline">{selectedOrg.website.replace("https://", "")}</a>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applied</span>
                  <span className="text-foreground font-medium text-xs">{selectedOrg.appliedAt}</span>
                </div>
                {selectedOrg.reviewedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reviewed</span>
                    <span className="text-foreground font-medium text-xs">{selectedOrg.reviewedAt}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Notes */}
            {selectedOrg.notes && (
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
                <h3 className="font-heading font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Admin Notes
                </h3>
                <p className="text-sm text-amber-600 dark:text-amber-300">{selectedOrg.notes}</p>
              </div>
            )}

            {/* Actions */}
            {(selectedOrg.status === "pending" || selectedOrg.status === "under_review") && (
              <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
                <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" /> Admin Actions
                </h3>
                <Button
                  variant="default"
                  className="w-full rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => setShowActionModal("approve")}
                >
                  <CheckCircle2 className="h-4 w-4" /> Approve Organization
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl gap-2 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => setShowActionModal("reject")}
                >
                  <XCircle className="h-4 w-4" /> Reject Application
                </Button>
                {selectedOrg.status === "pending" && (
                  <Button variant="outline" className="w-full rounded-xl gap-2">
                    <Clock className="h-4 w-4" /> Mark as Under Review
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Modal */}
        <AnimatePresence>
          {showActionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6"
              onClick={() => setShowActionModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={e => e.stopPropagation()}
                className="bg-card rounded-2xl border border-border p-6 max-w-md w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-foreground">
                    {showActionModal === "approve" ? "Approve Organization" : "Reject Application"}
                  </h3>
                  <button onClick={() => setShowActionModal(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {showActionModal === "approve"
                    ? `Approve "${selectedOrg.name}" and grant them access to the Organizer Dashboard?`
                    : `Reject "${selectedOrg.name}"? They'll be notified with the reason below.`
                  }
                </p>
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium text-foreground">
                    {showActionModal === "approve" ? "Approval Note (optional)" : "Rejection Reason *"}
                  </label>
                  <Textarea
                    placeholder={showActionModal === "approve" ? "Add a note..." : "Explain why the application was rejected..."}
                    value={actionNote}
                    onChange={e => setActionNote(e.target.value)}
                    className="rounded-xl min-h-[80px]"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowActionModal(null)}>Cancel</Button>
                  <Button
                    className={`flex-1 rounded-xl ${showActionModal === "approve" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
                    onClick={() => { setShowActionModal(null); setSelectedOrg(null); }}
                  >
                    {showActionModal === "approve" ? "Confirm Approval" : "Confirm Rejection"}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Organizations</h1>
        <p className="text-muted-foreground text-sm">Review, approve, or reject organization registrations</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilterStatus(f.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filterStatus === f.value
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Organization</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">City</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Applied</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Events</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((org, i) => (
                <motion.tr
                  key={org.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrg(org)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{org.name}</p>
                        <p className="text-xs text-muted-foreground">{org.contactPersonName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="text-xs font-normal">{getOrgTypeLabel(org.type)}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{org.city}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{org.appliedAt}</td>
                  <td className="py-3 px-4 text-sm text-foreground font-medium">{org.totalEvents}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getStatusColor(org.status)}`}>
                      {getOrgStatusLabel(org.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="rounded-lg gap-1 text-xs" onClick={(e) => { e.stopPropagation(); setSelectedOrg(org); }}>
                      <Eye className="h-3 w-3" /> Review
                    </Button>
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

export default AdminOrganizations;
