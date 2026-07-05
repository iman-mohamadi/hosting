# Premium VPS Hosting Platform — Frontend Blueprint



Single source of truth for the Vibe Coding process. This is a **frontend-only** application that consumes an external REST API — no local database or backend implementation lives in this repo. Check off items as they ship.



---



## Phase 1: Foundation & Marketing (✅ COMPLETED)



- [x] Initialize Next.js, Tailwind, shadcn/ui.

- [x] Setup `.cursorrules` (strict `snake_case` for all API payloads).

- [x] Configure prefix-less i18n routing (`fa` default, `en` secondary).

- [x] Build minimal Header and Hero Section.

- [x] Build Pricing & Feature Comparison pages.

- [x] Build About Us, Terms of Service, and Contact Us pages.

- [x] Build Privacy Policy page.

- [x] Implement smooth scrolling (Lenis) and footer.



---



## Phase 2: API Layer Setup & Auth Flow (✅ IN PROGRESS)



- [ ] Setup API service layer (Axios or native fetch wrapper) to handle external backend communication.

- [ ] Define all TypeScript interfaces for external API responses.

- [ ] Build interactive, glassmorphic Login and Register modals/pages.

- [ ] Implement JWT/Cookie-based session management on the client side.



---



## Phase 3: The Showpiece (VPS Configurator)



- [ ] Setup WebGL/Three.js canvas context for the configurator.

- [ ] Build the interactive UI controls (sliders/toggles for CPU, RAM, NVMe storage, network speed).

- [ ] Implement real-time pricing calculation logic based on selected resources.

- [ ] Integrate OS selection (Linux/Windows distributions) and add-ons (IPs, backups).



---



## Phase 4: Client Dashboard (User Portal)



- [ ] Design Dashboard layout with a minimal, custom sidebar.

- [ ] **Overview page:** Active services, pending invoices, recent tickets.

- [ ] **Instance management:** Detailed view for a specific VPS.

  - [ ] Implement server controls (Start, Stop, Restart, Rebuild OS).

  - [ ] Resource usage charts (CPU, bandwidth).

- [ ] **Billing & Invoices:** View transaction history, pay pending invoices.

- [ ] **Support system:** Create and reply to support tickets.



---



## Phase 5: Backoffice (Admin Panel)



- [ ] Design Admin layout (distinct from Client Dashboard).

- [ ] **Admin dashboard:** Revenue metrics, active nodes, pending orders overview.

- [ ] **User management:** View, edit, suspend, or terminate client accounts.

- [ ] **Order management:** Approve/reject pending VPS configurations.

- [ ] **Node/Server monitoring:** Visual status of main physical servers.

- [ ] **Ticket management:** Interface for admins to answer user support requests.



---



## Phase 6: Production Polish



- [ ] Replace all mock data in `src/actions.ts` with real external API endpoints.

- [ ] SEO optimization, metadata, and OpenGraph images.

- [ ] Performance audits, accessibility (a11y) passes, and responsive checks.


