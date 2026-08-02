# Landing Page Implementation

This document records the first public landing-page implementation for PrepTrack AI.

## Goal

Introduce the product before authentication, communicate the daily workflow quickly, and give visitors a clear path into Clerk sign-in or their existing dashboard.

## Page structure

1. **Navigation** — brand, section links, sign-in, and primary action.
2. **Hero** — outcome-led message with an interactive 3D dashboard preview.
3. **Benefit ticker** — a compact summary of the product loop.
4. **How it works** — daily targets, completion, and LinkedIn publishing.
5. **Momentum feature** — streak and progress visualization.
6. **Final CTA** — a second authentication entry point.
7. **Footer** — brand, message, and current year.

## Authentication behavior

The landing page uses Clerk's `SignedIn`, `SignedOut`, and `SignInButton` components.

- Signed-out users open Clerk's sign-in modal from each primary CTA.
- Signed-in users go directly to `/dashboard`.
- `/dashboard` remains protected by `src/middleware.ts`.

This avoids showing a sign-in action to an already authenticated user and keeps the public homepage accessible.

## Visual system

- **Ink:** `#122238` for high-contrast typography and dark surfaces
- **Action blue:** `#2358f6` for primary actions and progress
- **Momentum orange:** `#ff6b35` for energy, highlights, and streaks
- **Warm canvas:** `#f6f2e9` to keep the page personal rather than corporate
- **Typography:** Geist for interface copy and Georgia italics for editorial emphasis
- **Shape language:** soft 10–36 px radii, tactile shadows, and subtle rotated surfaces

The dashboard preview uses CSS perspective and layered transforms rather than WebGL. This keeps the effect lightweight and removes the need for another runtime dependency.

## Interaction and accessibility

- Pointer movement subtly tilts the dashboard preview.
- Floating cards use a slow vertical motion.
- `prefers-reduced-motion` disables animation and transition effects.
- Navigation landmarks, descriptive labels, focusable CTAs, and semantic sections are preserved.
- Decorative shapes are hidden from assistive technology.
- The layout collapses to one column on tablets and phones.

## Files changed

- `src/app/page.tsx` — landing-page content and Clerk-aware actions
- `src/components/landing/HeroDashboardPreview.tsx` — isolated client-side 3D interaction
- `src/app/globals.css` — landing visual system, animation, and breakpoints
- `src/app/layout.tsx` — product metadata for search and sharing
- `README.md` — project setup and architecture
- `LANDING_PAGE.md` — this implementation record

## Recommended next steps

1. Replace mock dashboard values with live user data.
2. Add dedicated Clerk sign-in and sign-up routes if branded auth pages are preferred over modals.
3. Add an Open Graph image for richer LinkedIn previews.
4. Run accessibility and performance audits after deployment.
5. Add analytics to measure CTA conversion and completed onboarding.

