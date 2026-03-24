import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview.tsx";
import EventsList from "./pages/dashboard/EventsList.tsx";
import CreateEvent from "./pages/dashboard/CreateEvent.tsx";
import VenueManagement from "./pages/dashboard/VenueManagement.tsx";
import RegistrationsList from "./pages/dashboard/RegistrationsList.tsx";
import AttendeesList from "./pages/dashboard/AttendeesList.tsx";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage.tsx";
import SettingsPage from "./pages/dashboard/SettingsPage.tsx";
import AttendeeLayout from "./components/AttendeeLayout.tsx";
import AttendeeHome from "./pages/attendee/AttendeeHome.tsx";
import DiscoverEvents from "./pages/attendee/DiscoverEvents.tsx";
import MyTickets from "./pages/attendee/MyTickets.tsx";
import SavedEvents from "./pages/attendee/SavedEvents.tsx";
import AttendeeProfile from "./pages/attendee/AttendeeProfile.tsx";
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

          {/* Attendee Dashboard */}
          <Route path="/attendee" element={<AttendeeLayout />}>
            <Route index element={<AttendeeHome />} />
            <Route path="discover" element={<DiscoverEvents />} />
            <Route path="tickets" element={<MyTickets />} />
            <Route path="saved" element={<SavedEvents />} />
            <Route path="profile" element={<AttendeeProfile />} />
          </Route>

          {/* Organizer Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="events" element={<EventsList />} />
            <Route path="events/new" element={<CreateEvent />} />
            <Route path="venues" element={<VenueManagement />} />
            <Route path="registrations" element={<RegistrationsList />} />
            <Route path="attendees" element={<AttendeesList />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
