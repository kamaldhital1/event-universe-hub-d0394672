import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";
import OrgOnboarding from "./pages/OrgOnboarding.tsx";
import OrgPending from "./pages/OrgPending.tsx";
import OrgRejected from "./pages/OrgRejected.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview.tsx";
import EventsList from "./pages/dashboard/EventsList.tsx";
import CreateEvent from "./pages/dashboard/CreateEvent.tsx";
import VenueManagement from "./pages/dashboard/VenueManagement.tsx";
import AddVenue from "./pages/dashboard/AddVenue.tsx";
import VenueDetail from "./pages/dashboard/VenueDetail.tsx";
import RegistrationsList from "./pages/dashboard/RegistrationsList.tsx";
import AttendeesList from "./pages/dashboard/AttendeesList.tsx";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage.tsx";
import SettingsPage from "./pages/dashboard/SettingsPage.tsx";
import MFASetup from "./pages/dashboard/MFASetup.tsx";
import ChangePassword from "./pages/dashboard/ChangePassword.tsx";
import PaymentSetup from "./pages/dashboard/PaymentSetup.tsx";
import AttendeeLayout from "./components/AttendeeLayout.tsx";
import AttendeeHome from "./pages/attendee/AttendeeHome.tsx";
import DiscoverEvents from "./pages/attendee/DiscoverEvents.tsx";
import MyTickets from "./pages/attendee/MyTickets.tsx";
import SavedEvents from "./pages/attendee/SavedEvents.tsx";
import AttendeeProfile from "./pages/attendee/AttendeeProfile.tsx";
import AttendeeCommunity from "./pages/attendee/AttendeeCommunity.tsx";
import AttendeeReviews from "./pages/attendee/AttendeeReviews.tsx";
import EventCheckout from "./pages/attendee/EventCheckout.tsx";
import OnboardingWizard from "./pages/attendee/OnboardingWizard.tsx";
import NotificationPreferences from "./pages/attendee/NotificationPreferences.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminOrganizations from "./pages/admin/AdminOrganizations.tsx";
import VolunteerManagement from "./pages/dashboard/VolunteerManagement.tsx";
import MarketingPage from "./pages/dashboard/MarketingPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Index />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Organization Onboarding Flow */}
          <Route path="/org/onboarding" element={<OrgOnboarding />} />
          <Route path="/org/pending" element={<OrgPending />} />
          <Route path="/org/rejected" element={<OrgRejected />} />

          {/* Attendee Onboarding */}
          <Route path="/onboarding" element={<OnboardingWizard />} />

          {/* Attendee Dashboard */}
          <Route path="/attendee" element={<AttendeeLayout />}>
            <Route index element={<AttendeeHome />} />
            <Route path="discover" element={<DiscoverEvents />} />
            <Route path="tickets" element={<MyTickets />} />
            <Route path="saved" element={<SavedEvents />} />
            <Route path="community" element={<AttendeeCommunity />} />
            <Route path="reviews" element={<AttendeeReviews />} />
            <Route path="profile" element={<AttendeeProfile />} />
            <Route path="notifications" element={<NotificationPreferences />} />
          </Route>

          {/* Attendee checkout (full-page, no layout) */}
          <Route path="/attendee/checkout/:id" element={<EventCheckout />} />

          {/* Organizer Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="events" element={<EventsList />} />
            <Route path="events/new" element={<CreateEvent />} />
            <Route path="venues" element={<VenueManagement />} />
            <Route path="venues/new" element={<AddVenue />} />
            <Route path="venues/:id" element={<VenueDetail />} />
            <Route path="registrations" element={<RegistrationsList />} />
            <Route path="attendees" element={<AttendeesList />} />
            <Route path="volunteers" element={<VolunteerManagement />} />
            <Route path="marketing" element={<MarketingPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="security/mfa" element={<MFASetup />} />
            <Route path="security/password" element={<ChangePassword />} />
            <Route path="payments" element={<PaymentSetup />} />
          </Route>

          {/* Super Admin Panel */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="organizations" element={<AdminOrganizations />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
