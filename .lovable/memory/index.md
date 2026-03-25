Design system: Space Grotesk headings, DM Sans body
Color palette: Navy primary (hsl 228 55% 16%), Rose-crimson accent (hsl 348 83% 55%), Gold (hsl 42 78% 55%), Emerald (hsl 160 64% 43%), Violet (hsl 262 72% 58%)
Tokens: --coral/coral-light/coral-dark, --navy/navy-light, --gold/gold-light, --emerald, --violet
Button variants: hero (gradient accent + glow), hero-outline, glass (backdrop-blur)
Button size: xl added (h-14)
Utility classes: bg-gradient-hero, bg-gradient-accent, bg-mesh, glass, glass-dark, noise, shadow-elevated
Animations: float, pulse-soft, shimmer, slide-up, slide-down, scale-in, blur-in, gradient-shift, glow-pulse
Images: hero-event.jpg, event-conference/music/workshop/gala/sports/art.jpg in src/assets/

Routes:
- / (landing), /event/:id (detail), /login, /signup
- /attendee (layout with top nav + bottom mobile nav)
- /attendee/discover, /attendee/tickets, /attendee/saved, /attendee/profile
- /dashboard (organizer layout with sidebar)
- /dashboard/events, /dashboard/events/new, /dashboard/venues
- /dashboard/registrations, /dashboard/attendees, /dashboard/analytics, /dashboard/settings

Mock data in src/data/mockData.ts
UI-first approach — no backend connected yet
