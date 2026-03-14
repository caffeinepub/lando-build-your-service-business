# Lando - Build Your Service Business

## Current State
Three-page personal brand site (Home, Opt-in/LeadMagnet, About) with:
- Backend: `submitEmail(email)` and `getEmails()` Motoko functions
- Frontend: React + TanStack Router, Tailwind CSS, navy/black/white design
- No admin interface exists

## Requested Changes (Diff)

### Add
- Admin dashboard page at `/admin` (password-protected via Internet Identity / authorization component)
- Admin view: table of all collected emails with index, email address, and row count
- Subscriber count displayed prominently
- CSV export button that downloads all emails as a `.csv` file
- Admin route in App.tsx router

### Modify
- Backend: add admin-only `getEmails()` restricted to authorized callers (using authorization component)
- App.tsx: add admin route

### Remove
- Nothing removed

## Implementation Plan
1. Select `authorization` Caffeine component
2. Regenerate backend with authorization-gated `getEmails` and admin role
3. Add `/admin` route in App.tsx
4. Build Admin page component:
   - Login gate using Internet Identity (authorization hooks)
   - Subscriber count stat card
   - Emails table with index and email columns
   - CSV export button (client-side generation)
