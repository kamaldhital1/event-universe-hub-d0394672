Design system: Space Grotesk headings, DM Sans body, navy primary (#1a2744), coral accent (hsl 12 80% 62%), warm off-white bg
Key tokens: --coral, --coral-light, --coral-dark, --navy, --navy-light, --warm-surface
Button variants: hero (coral bg), hero-outline (coral border)
Images: hero-event.jpg, event-conference/music/workshop/gala/sports/art.jpg in src/assets/

Routes:
- / (landing), /event/:id (detail), /login, /signup
- /attendee (attendee layout with top nav + bottom mobile nav)
- /attendee/discover, /attendee/tickets, /attendee/saved, /attendee/profile
- /dashboard (organizer layout with sidebar + nested routes)
- /dashboard/events, /dashboard/events/new, /dashboard/venues
- /dashboard/registrations, /dashboard/attendees, /dashboard/analytics, /dashboard/settings

Two dashboards: Attendee (consumer card-based, top nav) vs Organizer (sidebar, data tables, charts)
Login/Signup route by role: attendee → /attendee, organizer → /dashboard
Mock data in src/data/mockData.ts (events, venues, registrations, attendees)
UI-first approach — no backend connected yet
