import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ExperienceProvider } from "@/experience/ExperienceProvider";
import ExperienceOverlay from "@/components/ExperienceOverlay";
import ThemeToggle from "@/components/ThemeToggle";
import Header from "@/components/Header";
import DebugOverlay from "@/components/DebugOverlay";
import SpecVerificationPanel from "@/components/SpecVerificationPanel";
import StructuredData from "@/components/StructuredData";
import { defaultMetadata } from "./metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen antialiased font-sans" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'night') {
                    document.documentElement.setAttribute('data-theme', 'night');
                  } else {
                    document.documentElement.removeAttribute('data-theme');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <StructuredData />
        <ExperienceProvider>
          <Header />
          <ExperienceOverlay />
          <DebugOverlay />
          <SpecVerificationPanel />
          <div className="fixed top-6 right-6 z-50 reveal-global">
            <ThemeToggle />
          </div>
          <main>{children}</main>
        </ExperienceProvider>
      </body>
    </html>
  );
}
