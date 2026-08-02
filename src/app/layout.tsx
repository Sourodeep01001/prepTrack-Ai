import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PrepTrack AI — Turn daily progress into momentum",
    template: "%s | PrepTrack AI",
  },
  description:
    "Track your GATE preparation and coding goals, build consistent streaks, and turn completed milestones into LinkedIn posts with AI.",
  keywords: ["GATE preparation", "coding tracker", "study planner", "LinkedIn post generator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
