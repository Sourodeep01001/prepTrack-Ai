# PrepTrack AI

PrepTrack AI is a focused progress tracker for students balancing GATE preparation, coding practice, and professional consistency. Users complete their daily study and coding goals, then use AI to turn that progress into a ready-to-edit LinkedIn post.

## Current experience

- Public, responsive landing page with an interactive 3D product preview
- Clerk authentication for sign-in and sign-up
- Protected dashboard at `/dashboard`
- Daily GATE and coding tasks
- Exam countdown and progress status
- AI-generated LinkedIn post drafts after completing the day

## Tech stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 plus project-level CSS
- Clerk for authentication
- Google Gen AI for post and schedule generation
- Prisma for the data layer
- Lucide React for icons

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` and add the required credentials:

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The landing page is public. Clerk middleware protects `/dashboard` and sends signed-out visitors through authentication.

## Useful commands

```bash
npm run dev     # Start the local server
npm run lint    # Run ESLint
npm run build   # Create a production build
npm run start   # Serve the production build
```

## Project structure

```text
src/
├── app/
│   ├── page.tsx                         # Public landing page
│   ├── layout.tsx                       # Root providers and metadata
│   ├── globals.css                      # Design tokens and page styles
│   ├── (dashboard)/dashboard/page.tsx   # Authenticated dashboard
│   └── api/                             # AI generation endpoints
├── components/
│   ├── landing/HeroDashboardPreview.tsx # Interactive 3D product preview
│   └── ui/                              # Shared interface components
└── middleware.ts                        # Clerk route protection
```

## Product documentation

See [LANDING_PAGE.md](./LANDING_PAGE.md) for the landing-page design system, component decisions, interaction notes, responsive behavior, and suggested next steps.

hello all 2

## Security notes

- Never commit `.env.local` or production credentials.
- Keep AI API keys in server-only environment variables.
- Add new private routes to the matcher in `src/middleware.ts`.
