import Link from "next/link";
import Image from "next/image";
import { Show, SignUpButton } from "@clerk/nextjs";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Code2,
  Share2,
  Sparkles,
  Target,
  TimerReset,
  Zap,
} from "lucide-react";
import { HeroDashboardPreview } from "@/components/landing/HeroDashboardPreview";
import { LandingAccountMenu } from "@/components/landing/LandingAccountMenu";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Set your daily targets",
    copy: "Keep GATE preparation and coding practice in one calm, focused workspace.",
  },
  {
    number: "02",
    icon: Check,
    title: "Finish the work",
    copy: "Check off your learning goals and make every day of progress visible.",
  },
  {
    number: "03",
    icon: Share2,
    title: "Share the milestone",
    copy: "Turn completed tasks into a polished LinkedIn draft in one click.",
  },
];

function DashboardLink({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Show when="signed-in">
        <Link href="/dashboard" className="landing-primary-button">
          {children}
        </Link>
      </Show>
      <Show when="signed-out">
        <SignUpButton mode="modal">
          <button type="button" className="landing-primary-button">
            {children}
          </button>
        </SignUpButton>
      </Show>
    </>
  );
}

export default function Home() {
  return (
    <main id="top" className="landing-shell">
      <nav className="landing-nav" aria-label="Main navigation">
        <Link href="/" className="landing-brand" aria-label="PrepTrack AI home">
          <span className="landing-brand-mark" aria-hidden="true">
            P
          </span>
          <span>
            PrepTrack <strong>AI</strong>
          </span>
        </Link>

        <div className="landing-nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
        </div>

        <div className="landing-nav-actions">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button
                type="button"
                className="landing-account-button"
                aria-label="Create your PrepTrack AI account"
                title="Create account or sign in"
              >
                <Image
                  src="/user-login.png"
                  alt=""
                  width={1024}
                  height={1024}
                  className="landing-account-logo"
                  priority
                />
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="landing-primary-button">
              Start tracking <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <LandingAccountMenu />
          </Show>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-orb landing-orb-one" aria-hidden="true" />
        <div className="landing-orb landing-orb-two" aria-hidden="true" />

        <div className="landing-hero-copy">
          <div className="landing-eyebrow">
            <span>
              <Sparkles size={18} />
            </span>
            😊 Built for ambitious students and developers 😊
          </div>
          <h1>
            Small wins.
            <br />
            <em>Serious momentum.</em>
          </h1>
          <p>
            PrepTrack AI turns your daily GATE and coding goals into a clear
            routine—and your progress into a LinkedIn story worth sharing.
          </p>
          <div className="landing-hero-actions">
            <DashboardLink>
              Build today&apos;s streak{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </DashboardLink>
            <a className="landing-secondary-button" href="#how-it-works">
              See how it works
            </a>
          </div>
          <div className="landing-proof">
            <div className="landing-avatar-stack" aria-hidden="true">
              <span>DS</span>
              <span>AI</span>
              <span>JS</span>
            </div>
            <p>
              <strong>One focused system</strong>
              <br />
              for study, code &amp; consistency
            </p>
          </div>
        </div>

        <HeroDashboardPreview />
      </section>

      <section className="landing-ticker" aria-label="Product benefits">
        <div>
          <Zap size={17} /> Daily focus
        </div>
        <span>•</span>
        <div>
          <Code2 size={17} /> Coding momentum
        </div>
        <span>•</span>
        <div>
          <BrainCircuit size={17} /> AI-powered posts
        </div>
        <span>•</span>
        <div>
          <TimerReset size={17} /> Consistent streaks
        </div>
      </section>

      <section
        id="how-it-works"
        className="landing-section landing-steps-section"
      >
        <div className="landing-section-heading">
          <span className="landing-kicker">Your daily loop</span>
          <h2>
            From plan to proof,
            <br />
            in three simple moves.
          </h2>
          <p>
            No complicated productivity system. Just a focused loop that keeps
            you moving.
          </p>
        </div>
        <div className="landing-steps-grid">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article className="landing-step-card" key={step.number}>
                <span className="landing-step-number">{step.number}</span>
                <div className="landing-step-icon">
                  <Icon size={22} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="features" className="landing-feature-wrap">
        <div className="landing-feature-copy">
          <span className="landing-kicker">Progress you can feel</span>
          <h2>Your preparation deserves more than a checkbox.</h2>
          <p>
            See the day, the goal, and the bigger journey together. PrepTrack AI
            gives every focused session a place in your story.
          </p>
          <ul>
            <li>
              <Check size={16} /> Separate GATE and coding goals
            </li>
            <li>
              <Check size={16} /> A visible exam countdown
            </li>
            <li>
              <Check size={16} /> LinkedIn drafts after completion
            </li>
          </ul>
        </div>
        <div className="landing-streak-card">
          <div className="landing-streak-top">
            <span>Momentum</span>
            <span className="landing-live-dot">Live</span>
          </div>
          <strong>12 day streak</strong>
          <p>You showed up every day this week.</p>
          <div className="landing-week">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div key={`${day}-${index}`}>
                <span className={index < 6 ? "is-done" : ""}>
                  {index < 6 ? <Check size={14} /> : day}
                </span>
                <small>{day}</small>
              </div>
            ))}
          </div>
          <div className="landing-quote">
            <Sparkles size={18} />
            <p>“Consistency is a skill. Every completed day is another rep.”</p>
          </div>
        </div>
      </section>

      <section className="landing-cta-section">
        <div className="landing-cta-glow" aria-hidden="true" />
        <span className="landing-kicker">Start with today</span>
        <h2>
          Your next milestone
          <br />
          is waiting.
        </h2>
        <p>Plan the work. Finish the reps. Share the win.</p>
        <DashboardLink>
          Open PrepTrack AI <ArrowRight size={18} aria-hidden="true" />
        </DashboardLink>
      </section>

      <footer className="landing-footer">
        <Link href="#top" className="landing-brand" aria-label="Back to top">
          <span className="landing-brand-mark" aria-hidden="true">
            P
          </span>
          <span>
            PrepTrack <strong>AI</strong>
          </span>
        </Link>
        <p>Built for the days that build you.</p>
        <span>© {new Date().getFullYear()} PrepTrack AI</span>
      </footer>
    </main>
  );
}
