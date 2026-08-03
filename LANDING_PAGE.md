# Landing Page Implementation

This document records the first public landing-page implementation for PrepTrack AI.

## Goal

Introduce the product before authentication, communicate the daily workflow quickly, and give visitors a clear path into Clerk sign-in or their existing dashboard.

## Page structure

1. **Navigation** — brand, section links, conditional sign-up/account control, and the authenticated dashboard action.
2. **Hero** — outcome-led message with an interactive 3D dashboard preview.
3. **Benefit ticker** — a compact summary of the product loop.
4. **How it works** — daily targets, completion, and LinkedIn publishing.
5. **Momentum feature** — streak and progress visualization.
6. **Final CTA** — a second authentication entry point.
7. **Footer** — brand, message, and current year.

## Authentication behavior

The landing page uses Clerk's `Show`, `SignUpButton`, `useUser`, and `useClerk` APIs.

- Signed-out visitors see the supplied human-profile logo in the top-right navigation. It opens Clerk's sign-up modal, which also provides a sign-in route for returning users.
- Signed-out visitors who use a primary CTA also enter the Clerk sign-up flow.
- Signed-in users see both the **Start tracking** dashboard action and their Clerk profile image. Google/Gmail sign-ins use the user's synced Google profile photo when Clerk provides it; accounts without an image fall back to their initials.
- Clicking the signed-in profile image opens a branded floating summary with the user's Clerk name, primary email, and profile image. **Manage account** opens Clerk's secure profile modal where supported email addresses, passwords, security settings, and profile information can be maintained; **Sign out** ends the current session.
- `/dashboard` remains protected by `src/middleware.ts`.

The landing page remains public for everyone. Existing account ownership cannot be safely inferred while a visitor is signed out, so the sign-up modal deliberately includes Clerk's normal sign-in path for returning users. Once Clerk restores a valid session, the navigation switches automatically to the authenticated controls.

## Visual system

- **Forest ink:** `#102c25` for high-contrast typography
- **Action green:** `#0f7a5a` for primary actions, progress, and brand emphasis
- **Deep forest:** `#095941` for depth, gradients, and hover states
- **Momentum lime:** `#84cc16` for streaks, progress highlights, and focus rings
- **Soft mint:** `#dff4e8` for supporting cards and icon surfaces
- **Sage canvas:** `#f1f6f0` for a fresh, calm page background
- **Typography:** a fast system sans-serif stack for interface copy and Georgia italics for editorial emphasis
- **Shape language:** soft 10–36 px radii, tactile shadows, and subtle rotated surfaces

The palette is intentionally green-forward without becoming monochrome. Deep forest surfaces provide contrast, emerald communicates action, and lime adds small moments of energy. The dashboard preview uses CSS perspective and layered transforms rather than WebGL, keeping the effect lightweight and removing the need for another runtime dependency.

## Button interaction system

All landing-page buttons share visible hover, active, and keyboard-focus feedback:

- **Primary buttons** lift and scale subtly, increase their green shadow, sweep a light highlight across the surface, and move the arrow icon forward.
- **Secondary buttons** lift into a soft green shadow while their border and text become more saturated.
- **Text buttons** move up slightly and reveal a lime underline from left to right.
- **Account buttons** lift with a soft green shadow and animate the profile icon or authenticated avatar.
- **Dashboard preview action** changes from forest to emerald, gains elevation, and rotates the sparkle icon.
- **Active states** compress buttons slightly so clicks feel tactile.
- **Focus-visible states** use a lime focus ring for keyboard navigation.
- **Reduced-motion mode** removes the decorative transitions while preserving clear color changes.

## Interaction and accessibility

- Pointer movement subtly tilts the dashboard preview.
- Floating cards use a slow vertical motion.
- Every button has an intentional hover and pressed state.
- `prefers-reduced-motion` disables decorative animation and transition effects.
- Navigation landmarks, descriptive labels, focusable CTAs, and semantic sections are preserved.
- Decorative shapes are hidden from assistive technology.
- The layout collapses to one column on tablets and phones.

## Files changed

- `src/app/page.tsx` — landing-page content and Clerk-aware actions
- `src/components/landing/HeroDashboardPreview.tsx` — isolated client-side 3D interaction
- `src/components/landing/LandingAccountMenu.tsx` — account summary popover and Clerk profile actions
- `src/app/globals.css` — landing visual system, animation, and breakpoints
- `public/user-login.png` — resized human-profile logo used for signed-out visitors; the circular viewport crops away its surrounding checkerboard
- `src/app/layout.tsx` — product metadata for search and sharing
- `README.md` — project setup and architecture
- `LANDING_PAGE.md` — this implementation record

## Recommended next steps

1. Replace mock dashboard values with live user data.
2. Add dedicated Clerk sign-in and sign-up routes if branded auth pages are preferred over modals.
3. Add an Open Graph image for richer LinkedIn previews.
4. Run accessibility and performance audits after deployment.
5. Add analytics to measure CTA conversion and completed onboarding.
