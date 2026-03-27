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

export type OrgType = "individual" | "company" | "ngo" | "government" | "educational" | "startup";
export type OrgStatus = "pending" | "under_review" | "approved" | "rejected" | "suspended";

export interface Organization {
  id: string;
  name: string;
  type: OrgType;
  email: string;
  phone: string;
  website: string;
  registrationNumber: string;
  gstNumber: string;
  panNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  description: string;
  logo?: string;
  contactPersonName: string;
  contactPersonRole: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  documentsSubmitted: string[];
  totalEvents: number;
  totalRevenue: number;
  status: OrgStatus;
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  notes?: string;
  tier: "basic" | "professional" | "enterprise";
  teamSize: number;
  socialLinks: { platform: string; url: string }[];
  pastEventExperience: string;
  expectedEventsPerYear: number;
}

export const mockOrganizations: Organization[] = [
  {
    id: "ORG001",
    name: "TechVerse India Pvt. Ltd.",
    type: "company",
    email: "admin@techverse.in",
    phone: "+91 80 4567 8901",
    website: "https://techverse.in",
    registrationNumber: "CIN-U72200KA2020PTC123456",
    gstNumber: "29AABCT1234Q1Z5",
    panNumber: "AABCT1234Q",
    address: "4th Floor, Brigade Tower, MG Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    description: "India's leading technology events company specializing in developer conferences, hackathons, and AI summits. 6+ years of experience organizing 200+ events.",
    contactPersonName: "Rajesh Krishnamurthy",
    contactPersonRole: "CEO & Founder",
    contactPersonEmail: "rajesh@techverse.in",
    contactPersonPhone: "+91 98450 12345",
    documentsSubmitted: ["Certificate of Incorporation", "GST Certificate", "PAN Card", "Company Profile", "Past Event Portfolio"],
    totalEvents: 47,
    totalRevenue: 45000000,
    status: "approved",
    appliedAt: "2024-01-15",
    reviewedAt: "2024-01-18",
    reviewedBy: "Super Admin",
    tier: "enterprise",
    teamSize: 35,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/techverse" },
      { platform: "Twitter", url: "https://twitter.com/techverse" },
      { platform: "Instagram", url: "https://instagram.com/techverse" },
    ],
    pastEventExperience: "Organized 200+ events including Global Tech Summit (3000+ attendees), AI India Conference, DevFest Bangalore. Partnered with Google, Microsoft, AWS.",
    expectedEventsPerYear: 24,
  },
  {
    id: "ORG002",
    name: "Echo Productions LLP",
    type: "company",
    email: "hello@echoproductions.in",
    phone: "+91 22 6789 0123",
    website: "https://echoproductions.in",
    registrationNumber: "LLP-AAH-4567",
    gstNumber: "27AABFE5678R1Z3",
    panNumber: "AABFE5678R",
    address: "201, Film City Complex, Goregaon East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400065",
    description: "Premium live entertainment and music festival production company. Known for creating immersive concert experiences across India.",
    contactPersonName: "Sanya Mehta",
    contactPersonRole: "Managing Director",
    contactPersonEmail: "sanya@echoproductions.in",
    contactPersonPhone: "+91 98200 54321",
    documentsSubmitted: ["LLP Agreement", "GST Certificate", "PAN Card", "Entertainment License", "Past Event Photos"],
    totalEvents: 32,
    totalRevenue: 68000000,
    status: "approved",
    appliedAt: "2024-02-10",
    reviewedAt: "2024-02-14",
    reviewedBy: "Super Admin",
    tier: "enterprise",
    teamSize: 50,
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/echoproductions" },
      { platform: "YouTube", url: "https://youtube.com/echoproductions" },
    ],
    pastEventExperience: "Midnight Echoes Festival (10K attendees), Sonic Bloom Series, Bollywood Unplugged. Worked with T-Series, Sony Music.",
    expectedEventsPerYear: 18,
  },
  {
    id: "ORG003",
    name: "Hope Foundation India",
    type: "ngo",
    email: "contact@hopefoundation.org",
    phone: "+91 11 4523 6789",
    website: "https://hopefoundation.org",
    registrationNumber: "NGO-DL-2019-00456",
    gstNumber: "07AABTH7890P1Z2",
    panNumber: "AABTH7890P",
    address: "C-45, Hauz Khas Village",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110016",
    description: "Non-profit organization dedicated to education and healthcare in rural India. Organizes charity galas, fundraisers, and awareness campaigns.",
    contactPersonName: "Dr. Priya Raghavan",
    contactPersonRole: "Executive Director",
    contactPersonEmail: "priya@hopefoundation.org",
    contactPersonPhone: "+91 98110 67890",
    documentsSubmitted: ["NGO Registration Certificate", "12A Certificate", "80G Certificate", "FCRA License", "Annual Report"],
    totalEvents: 15,
    totalRevenue: 12000000,
    status: "approved",
    appliedAt: "2024-03-05",
    reviewedAt: "2024-03-08",
    reviewedBy: "Super Admin",
    tier: "professional",
    teamSize: 12,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/hopefoundation" },
      { platform: "Facebook", url: "https://facebook.com/hopefoundation" },
    ],
    pastEventExperience: "Annual Charity Gala (5 editions), Rural Education Drive, Health Awareness Marathon. Partnered with UNICEF, WHO.",
    expectedEventsPerYear: 8,
  },
  {
    id: "ORG004",
    name: "Vivek Sharma (Individual Organizer)",
    type: "individual",
    email: "vivek.events@gmail.com",
    phone: "+91 99876 54321",
    website: "",
    registrationNumber: "",
    gstNumber: "",
    panNumber: "BQPPS1234K",
    address: "Flat 302, Sunrise Apartments, HSR Layout",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560102",
    description: "Freelance event organizer specializing in intimate tech meetups, startup networking events, and workshop sessions.",
    contactPersonName: "Vivek Sharma",
    contactPersonRole: "Owner",
    contactPersonEmail: "vivek.events@gmail.com",
    contactPersonPhone: "+91 99876 54321",
    documentsSubmitted: ["PAN Card", "Aadhaar Card", "Previous Event References"],
    totalEvents: 0,
    totalRevenue: 0,
    status: "pending",
    appliedAt: "2026-03-25",
    tier: "basic",
    teamSize: 1,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/viveksharma" },
    ],
    pastEventExperience: "Organized 12 tech meetups in Bangalore with 50-100 attendees each. Speaker at BangaloreJS and ReactBLR communities.",
    expectedEventsPerYear: 6,
  },
  {
    id: "ORG005",
    name: "Canvas Collective Arts Foundation",
    type: "ngo",
    email: "info@canvascollective.art",
    phone: "+91 11 2345 6780",
    website: "https://canvascollective.art",
    registrationNumber: "NGO-DL-2021-00891",
    gstNumber: "",
    panNumber: "AABCC9012L",
    address: "B-12, Lodhi Colony",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110003",
    description: "Arts and culture foundation promoting contemporary South Asian art through exhibitions, workshops, and artist residencies.",
    contactPersonName: "Anisha Kapoor",
    contactPersonRole: "Curator & Director",
    contactPersonEmail: "anisha@canvascollective.art",
    contactPersonPhone: "+91 98765 09876",
    documentsSubmitted: ["NGO Certificate", "PAN Card", "Artist Portfolio", "Exhibition History"],
    totalEvents: 8,
    totalRevenue: 3500000,
    status: "under_review",
    appliedAt: "2026-03-20",
    notes: "Verified NGO registration. Checking past exhibition history and venue partnerships.",
    tier: "professional",
    teamSize: 8,
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/canvascollective" },
    ],
    pastEventExperience: "Contemporary Art Exhibition at NGMA (1000 attendees), Art Walk Delhi, South Asian Emerging Artists showcase.",
    expectedEventsPerYear: 10,
  },
  {
    id: "ORG006",
    name: "RunIndia Sports Pvt. Ltd.",
    type: "company",
    email: "events@runindia.co",
    phone: "+91 22 8901 2345",
    website: "https://runindia.co",
    registrationNumber: "CIN-U93000MH2018PTC234567",
    gstNumber: "27AABCR3456S1Z8",
    panNumber: "AABCR3456S",
    address: "A-Wing, Marathon Innova, Lower Parel",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400013",
    description: "Sports event management company organizing marathons, triathlons, and fitness events across India. AIMS certified race organizer.",
    contactPersonName: "Amit Joshi",
    contactPersonRole: "CEO",
    contactPersonEmail: "amit@runindia.co",
    contactPersonPhone: "+91 98210 11111",
    documentsSubmitted: ["Certificate of Incorporation", "GST Certificate", "AIMS Certification", "Police NOC", "Medical Team Agreement"],
    totalEvents: 22,
    totalRevenue: 35000000,
    status: "approved",
    appliedAt: "2024-05-20",
    reviewedAt: "2024-05-25",
    reviewedBy: "Super Admin",
    tier: "enterprise",
    teamSize: 28,
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/runindia" },
      { platform: "Strava", url: "https://strava.com/clubs/runindia" },
    ],
    pastEventExperience: "City Marathon (15K participants), Ironman India Partner, Fit India Movement events. Government of Maharashtra partnership.",
    expectedEventsPerYear: 15,
  },
  {
    id: "ORG007",
    name: "NexGen EdTech Academy",
    type: "educational",
    email: "admin@nexgenedtech.edu.in",
    phone: "+91 40 6789 1234",
    website: "https://nexgenedtech.edu.in",
    registrationNumber: "EDU-TS-2022-00123",
    gstNumber: "36AABCN6789T1Z1",
    panNumber: "AABCN6789T",
    address: "Plot 45, HITEC City, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    description: "EdTech institute organizing coding bootcamps, AI workshops, and career fairs. University-accredited programs.",
    contactPersonName: "Dr. Ramya Srinivasan",
    contactPersonRole: "Academic Director",
    contactPersonEmail: "ramya@nexgenedtech.edu.in",
    contactPersonPhone: "+91 90000 12345",
    documentsSubmitted: ["UGC Recognition", "PAN Card", "Institution License"],
    totalEvents: 0,
    totalRevenue: 0,
    status: "pending",
    appliedAt: "2026-03-26",
    tier: "professional",
    teamSize: 15,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/school/nexgenedtech" },
    ],
    pastEventExperience: "First time on Sansaar. Previously organized events through own website — 20+ workshops, 5 career fairs.",
    expectedEventsPerYear: 12,
  },
  {
    id: "ORG008",
    name: "Maharashtra State Tourism Board",
    type: "government",
    email: "events@maharashtratourism.gov.in",
    phone: "+91 22 2204 5678",
    website: "https://maharashtratourism.gov.in",
    registrationNumber: "GOV-MH-TOURISM-001",
    gstNumber: "27AAAGM0001A1Z5",
    panNumber: "AAAGM0001A",
    address: "Mantralaya, Madam Cama Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400032",
    description: "Government tourism board promoting cultural festivals, heritage walks, and tourism events across Maharashtra.",
    contactPersonName: "IAS Suresh Patil",
    contactPersonRole: "Director of Tourism Events",
    contactPersonEmail: "suresh.patil@maharashtratourism.gov.in",
    contactPersonPhone: "+91 22 2204 5679",
    documentsSubmitted: ["Government Authorization Letter", "Department Order", "Budget Allocation Document"],
    totalEvents: 5,
    totalRevenue: 0,
    status: "rejected",
    appliedAt: "2026-03-10",
    reviewedAt: "2026-03-15",
    reviewedBy: "Super Admin",
    rejectionReason: "Incomplete documentation. Missing: Official letterhead authorization from Chief Secretary, Event insurance policy. Please resubmit with complete documents.",
    tier: "enterprise",
    teamSize: 40,
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com/maboratourism" },
    ],
    pastEventExperience: "Ganesh Utsav Cultural Festival, Ajanta-Ellora Heritage Walk, Konkan Food Festival.",
    expectedEventsPerYear: 20,
  },
  {
    id: "ORG009",
    name: "Startup Garage LLP",
    type: "startup",
    email: "team@startupgarage.co",
    phone: "+91 80 4321 8765",
    website: "https://startupgarage.co",
    registrationNumber: "LLP-KA-2025-00789",
    gstNumber: "",
    panNumber: "AABFS7890U",
    address: "CoWork Central, Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560038",
    description: "Early-stage startup focused on creating pitch competitions, demo days, and investor meetups for the Indian startup ecosystem.",
    contactPersonName: "Aditya Nair",
    contactPersonRole: "Co-founder",
    contactPersonEmail: "aditya@startupgarage.co",
    contactPersonPhone: "+91 97890 56789",
    documentsSubmitted: ["LLP Agreement", "PAN Card", "Pitch Deck", "Startup India Certificate"],
    totalEvents: 0,
    totalRevenue: 0,
    status: "under_review",
    appliedAt: "2026-03-22",
    notes: "Startup India recognized. Checking venue partnerships and event insurance.",
    tier: "basic",
    teamSize: 4,
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/startupgarage" },
      { platform: "Twitter", url: "https://twitter.com/startupgarage" },
    ],
    pastEventExperience: "Organized 3 demo days with 200+ attendees each at local coworking spaces.",
    expectedEventsPerYear: 8,
  },
];

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
    case "approved":
      return "bg-emerald-100 text-emerald-700";
    case "draft":
    case "pending":
    case "maintenance":
    case "under_review":
      return "bg-amber-100 text-amber-700";
    case "cancelled":
    case "inactive":
    case "rejected":
    case "suspended":
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

export const getOrgTypeLabel = (type: OrgType) => {
  const labels: Record<OrgType, string> = {
    individual: "Individual",
    company: "Company / Pvt. Ltd.",
    ngo: "NGO / Non-Profit",
    government: "Government Body",
    educational: "Educational Institute",
    startup: "Startup",
  };
  return labels[type];
};

export const getOrgStatusLabel = (status: OrgStatus) => {
  const labels: Record<OrgStatus, string> = {
    pending: "Pending Review",
    under_review: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
    suspended: "Suspended",
  };
  return labels[status];
};
