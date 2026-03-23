import eventConference from "@/assets/event-conference.jpg";
import eventMusic from "@/assets/event-music.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventGala from "@/assets/event-gala.jpg";
import eventSports from "@/assets/event-sports.jpg";
import eventArt from "@/assets/event-art.jpg";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  category: string;
  attendees: number;
  capacity: number;
  price: string;
  priceValue: number;
  description: string;
  organizer: string;
  status: "draft" | "published" | "cancelled" | "completed";
  registrations: number;
  revenue: number;
  waitlist: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  capacity: number;
  type: "indoor" | "outdoor" | "hybrid" | "virtual";
  amenities: string[];
  pricePerDay: number;
  image: string;
  status: "available" | "booked" | "maintenance";
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  status: "confirmed" | "pending" | "cancelled" | "waitlisted" | "checked-in";
  registeredAt: string;
  ticketCode: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventsAttended: number;
  totalSpent: number;
  registeredSince: string;
  status: "active" | "inactive";
  avatar?: string;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Global Tech Summit 2026",
    date: "2026-04-15",
    time: "9:00 AM – 6:00 PM IST",
    location: "Bangalore International Centre, Bangalore",
    venue: "1",
    image: eventConference,
    category: "Conference",
    attendees: 2400,
    capacity: 3000,
    price: "₹4,999",
    priceValue: 4999,
    description: "Join 3,000+ innovators, developers, and visionaries at India's premier technology conference.",
    organizer: "TechVerse India",
    status: "published",
    registrations: 2400,
    revenue: 11997600,
    waitlist: 85,
  },
  {
    id: "2",
    title: "Midnight Echoes — Live Music Festival",
    date: "2026-05-03",
    time: "5:00 PM – 2:00 AM IST",
    location: "Sunset Arena, Mumbai",
    venue: "2",
    image: eventMusic,
    category: "Music",
    attendees: 8500,
    capacity: 10000,
    price: "₹1,499",
    priceValue: 1499,
    description: "An electrifying night of live performances featuring chart-topping artists.",
    organizer: "Echo Productions",
    status: "published",
    registrations: 8500,
    revenue: 12741500,
    waitlist: 320,
  },
  {
    id: "3",
    title: "Design Thinking Masterclass",
    date: "2026-04-22",
    time: "10:00 AM – 4:00 PM IST",
    location: "WeWork Galaxy, Bangalore",
    venue: "3",
    image: eventWorkshop,
    category: "Workshop",
    attendees: 120,
    capacity: 150,
    price: "Free",
    priceValue: 0,
    description: "A hands-on masterclass in human-centered design methodology.",
    organizer: "DesignLab Academy",
    status: "published",
    registrations: 120,
    revenue: 0,
    waitlist: 15,
  },
  {
    id: "4",
    title: "Annual Charity Gala Night",
    date: "2026-06-08",
    time: "7:00 PM – 11:00 PM IST",
    location: "The Taj Mahal Palace, Mumbai",
    venue: "4",
    image: eventGala,
    category: "Gala",
    attendees: 350,
    capacity: 400,
    price: "₹15,000",
    priceValue: 15000,
    description: "An evening of elegance supporting education initiatives across rural India.",
    organizer: "Hope Foundation India",
    status: "draft",
    registrations: 350,
    revenue: 5250000,
    waitlist: 42,
  },
  {
    id: "5",
    title: "City Marathon & Fun Run",
    date: "2026-05-18",
    time: "6:00 AM – 12:00 PM IST",
    location: "Marine Drive, Mumbai",
    venue: "5",
    image: eventSports,
    category: "Sports",
    attendees: 12000,
    capacity: 15000,
    price: "₹999",
    priceValue: 999,
    description: "Mumbai's biggest running event returns!",
    organizer: "RunIndia Sports",
    status: "published",
    registrations: 12000,
    revenue: 11988000,
    waitlist: 0,
  },
  {
    id: "6",
    title: "Contemporary Art Exhibition",
    date: "2026-04-28",
    time: "10:00 AM – 7:00 PM IST",
    location: "National Gallery, New Delhi",
    venue: "6",
    image: eventArt,
    category: "Art",
    attendees: 680,
    capacity: 1000,
    price: "₹299",
    priceValue: 299,
    description: "Featuring 80+ works from emerging South Asian artists.",
    organizer: "Canvas Collective",
    status: "completed",
    registrations: 680,
    revenue: 203320,
    waitlist: 0,
  },
];

export const mockVenues: Venue[] = [
  {
    id: "1",
    name: "Bangalore International Centre",
    address: "7, 4th Main Rd, Domlur II Stage",
    city: "Bangalore",
    capacity: 3000,
    type: "indoor",
    amenities: ["Wi-Fi", "A/V System", "Catering", "Parking", "Green Room"],
    pricePerDay: 250000,
    image: eventConference,
    status: "booked",
  },
  {
    id: "2",
    name: "Sunset Arena",
    address: "Worli Sea Face Road",
    city: "Mumbai",
    capacity: 15000,
    type: "outdoor",
    amenities: ["Stage", "Sound System", "Lighting", "Security", "Food Courts"],
    pricePerDay: 800000,
    image: eventMusic,
    status: "booked",
  },
  {
    id: "3",
    name: "WeWork Galaxy",
    address: "43, Residency Rd, Ashok Nagar",
    city: "Bangalore",
    capacity: 200,
    type: "indoor",
    amenities: ["Wi-Fi", "Projector", "Whiteboard", "Coffee Bar"],
    pricePerDay: 50000,
    image: eventWorkshop,
    status: "available",
  },
  {
    id: "4",
    name: "The Taj Mahal Palace",
    address: "Apollo Bunder, Colaba",
    city: "Mumbai",
    capacity: 500,
    type: "indoor",
    amenities: ["Banquet Hall", "Catering", "Valet Parking", "Live Kitchen"],
    pricePerDay: 500000,
    image: eventGala,
    status: "available",
  },
  {
    id: "5",
    name: "Marine Drive Open Ground",
    address: "Netaji Subhash Chandra Bose Road",
    city: "Mumbai",
    capacity: 20000,
    type: "outdoor",
    amenities: ["Medical Tent", "Hydration Stations", "Timing Mats", "PA System"],
    pricePerDay: 100000,
    image: eventSports,
    status: "available",
  },
  {
    id: "6",
    name: "National Gallery of Modern Art",
    address: "Jaipur House, India Gate",
    city: "New Delhi",
    capacity: 1000,
    type: "indoor",
    amenities: ["Exhibition Walls", "Lighting", "Security", "Audio Guide"],
    pricePerDay: 150000,
    image: eventArt,
    status: "booked",
  },
];

export const mockRegistrations: Registration[] = [
  { id: "R001", eventId: "1", eventTitle: "Global Tech Summit 2026", attendeeName: "Priya Sharma", attendeeEmail: "priya@email.com", ticketType: "VIP", quantity: 1, totalAmount: 9999, status: "confirmed", registeredAt: "2026-03-01", ticketCode: "GTS-VIP-001" },
  { id: "R002", eventId: "1", eventTitle: "Global Tech Summit 2026", attendeeName: "Rahul Verma", attendeeEmail: "rahul@email.com", ticketType: "General", quantity: 2, totalAmount: 9998, status: "confirmed", registeredAt: "2026-03-02", ticketCode: "GTS-GEN-002" },
  { id: "R003", eventId: "2", eventTitle: "Midnight Echoes", attendeeName: "Ananya Patel", attendeeEmail: "ananya@email.com", ticketType: "Early Bird", quantity: 3, totalAmount: 3597, status: "confirmed", registeredAt: "2026-02-15", ticketCode: "ME-EB-003" },
  { id: "R004", eventId: "1", eventTitle: "Global Tech Summit 2026", attendeeName: "Kiran Desai", attendeeEmail: "kiran@email.com", ticketType: "General", quantity: 1, totalAmount: 4999, status: "pending", registeredAt: "2026-03-10", ticketCode: "GTS-GEN-004" },
  { id: "R005", eventId: "3", eventTitle: "Design Thinking Masterclass", attendeeName: "Meera Nair", attendeeEmail: "meera@email.com", ticketType: "Free", quantity: 1, totalAmount: 0, status: "confirmed", registeredAt: "2026-03-15", ticketCode: "DTM-FREE-005" },
  { id: "R006", eventId: "2", eventTitle: "Midnight Echoes", attendeeName: "Arjun Singh", attendeeEmail: "arjun@email.com", ticketType: "VIP", quantity: 1, totalAmount: 4999, status: "waitlisted", registeredAt: "2026-03-18", ticketCode: "ME-VIP-006" },
  { id: "R007", eventId: "5", eventTitle: "City Marathon & Fun Run", attendeeName: "Sneha Gupta", attendeeEmail: "sneha@email.com", ticketType: "Full Marathon", quantity: 1, totalAmount: 999, status: "checked-in", registeredAt: "2026-03-05", ticketCode: "CM-FM-007" },
  { id: "R008", eventId: "4", eventTitle: "Annual Charity Gala Night", attendeeName: "Vikram Malhotra", attendeeEmail: "vikram@email.com", ticketType: "Platinum", quantity: 2, totalAmount: 30000, status: "confirmed", registeredAt: "2026-03-20", ticketCode: "ACG-PLT-008" },
  { id: "R009", eventId: "1", eventTitle: "Global Tech Summit 2026", attendeeName: "Deepika Reddy", attendeeEmail: "deepika@email.com", ticketType: "General", quantity: 1, totalAmount: 4999, status: "cancelled", registeredAt: "2026-02-28", ticketCode: "GTS-GEN-009" },
  { id: "R010", eventId: "6", eventTitle: "Contemporary Art Exhibition", attendeeName: "Rohan Kapoor", attendeeEmail: "rohan@email.com", ticketType: "Day Pass", quantity: 4, totalAmount: 1196, status: "confirmed", registeredAt: "2026-03-22", ticketCode: "CAE-DP-010" },
];

export const mockAttendees: Attendee[] = [
  { id: "A001", name: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43210", eventsAttended: 8, totalSpent: 42500, registeredSince: "2024-06-15", status: "active" },
  { id: "A002", name: "Rahul Verma", email: "rahul@email.com", phone: "+91 98765 43211", eventsAttended: 12, totalSpent: 67800, registeredSince: "2024-01-10", status: "active" },
  { id: "A003", name: "Ananya Patel", email: "ananya@email.com", phone: "+91 98765 43212", eventsAttended: 5, totalSpent: 15400, registeredSince: "2024-09-22", status: "active" },
  { id: "A004", name: "Kiran Desai", email: "kiran@email.com", phone: "+91 98765 43213", eventsAttended: 3, totalSpent: 12999, registeredSince: "2025-02-01", status: "active" },
  { id: "A005", name: "Meera Nair", email: "meera@email.com", phone: "+91 98765 43214", eventsAttended: 15, totalSpent: 89000, registeredSince: "2023-11-30", status: "active" },
  { id: "A006", name: "Arjun Singh", email: "arjun@email.com", phone: "+91 98765 43215", eventsAttended: 2, totalSpent: 4999, registeredSince: "2025-08-14", status: "inactive" },
  { id: "A007", name: "Sneha Gupta", email: "sneha@email.com", phone: "+91 98765 43216", eventsAttended: 7, totalSpent: 28500, registeredSince: "2024-04-05", status: "active" },
  { id: "A008", name: "Vikram Malhotra", email: "vikram@email.com", phone: "+91 98765 43217", eventsAttended: 20, totalSpent: 245000, registeredSince: "2023-07-19", status: "active" },
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
    case "confirmed":
    case "active":
    case "available":
    case "checked-in":
      return "bg-emerald-100 text-emerald-700";
    case "draft":
    case "pending":
    case "maintenance":
      return "bg-amber-100 text-amber-700";
    case "cancelled":
    case "inactive":
      return "bg-red-100 text-red-700";
    case "completed":
    case "booked":
      return "bg-blue-100 text-blue-700";
    case "waitlisted":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};
