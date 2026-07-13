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



## Phase 2: API Layer Setup & Auth Flow (✅ COMPLETED)

- [x] Setup API service layer (Axios or native fetch wrapper) to handle external backend communication.

- [x] Define all TypeScript interfaces for external API responses.

- [x] Build interactive, glassmorphic Login and Register modals/pages.

- [x] Implement JWT/Cookie-based session management on the client side.

---



## Phase 3: The Showpiece (VPS Configurator) (✅ COMPLETED)

- [x] Build the interactive UI controls (sliders/toggles for CPU, RAM, NVMe storage, network speed).

- [x] Implement real-time pricing calculation logic based on selected resources.

- [x] Integrate OS selection (Ubuntu, Windows, Arch Linux).

- [x] Add optional add-ons (dedicated IPs, automated backups, advanced DDoS).

---



## Phase 4: Client Dashboard (User Portal) (✅ COMPLETED)

- [x] Design Dashboard layout with a minimal, custom sidebar.

- [x] **Overview page:** Active services, pending invoices, recent tickets.

- [x] **Instance management:** Detailed view for a specific VPS.
  - [x] Implement server controls (Start, Stop, Restart, Rebuild OS).

- [x] **Billing & Invoices:** View transaction history, pay pending invoices.

- [x] **Support system:** Create and reply to support tickets.

---



## Phase 5: Backoffice (Admin Panel) (✅ COMPLETED)

- [x] Design Admin layout (distinct from Client Dashboard).

- [x] **Admin dashboard:** Revenue metrics, active nodes, pending orders overview.

- [x] **User management:** View, suspend, activate, or terminate client accounts.

- [x] **Order management:** Approve/reject pending VPS configurations.

- [x] **Node/Server monitoring:** Visual status of main physical servers.

- [x] **Ticket management:** Interface for admins to answer user support requests.

---



## Phase 4.5: Instance & Account Depth (✅ COMPLETED)

- [x] **Instance detail tabs:** Overview, Resize, Snapshots, Firewall, Network, Console.
- [x] **Resize:** CPU/RAM/storage sliders, warm/cold apply mode, live price delta.
- [x] **Snapshots:** Create, restore, delete.
- [x] **Firewall:** Inbound rule CRUD.
- [x] **Network tab:** Reverse DNS (PTR), attached floating IPs/volumes.
- [x] **Console:** Mock browser serial console.
- [x] **Portal pages:** `/dashboard/networking`, `/dashboard/activity`, `/dashboard/account`.
- [x] **Account:** Profile, password, 2FA toggle, SSH keys, API tokens, sessions.
- [x] **Networking:** Floating IPs and block volumes with attach/detach.
- [x] **Sidebar nav:** networking, activity, account links added.

---



## Phase 6: Production Polish (✅ FRONTEND COMPLETE)

- [ ] Replace all mock data in `src/actions.ts` with real external API endpoints. *(Blocked on external backend. All actions speak* `snake_case` *and live in* `src/actions.ts` *for a clean swap.)*

- [x] SEO optimization, metadata, robots.txt, sitemap, and localized page metadata.

- [x] Auth completion: password reset flow, terms acceptance on register, demo reset token.

- [x] Marketing polish: docs article pages, FAQ, SLA, cookie consent.

- [x] Dashboard depth: instance settings/backups, DNS zones, payment methods, notification preferences, checkout promo codes.

- [x] Error/loading/not-found shells and bilingual 404 copy.

- [x] Lint/typecheck/production build green; responsive layouts and reduced-motion support in place.