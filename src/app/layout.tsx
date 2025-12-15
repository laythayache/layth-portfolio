import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ExperienceProvider } from "@/contexts/ExperienceContext";
import WelcomeLoaderWrapper from "@/components/WelcomeLoaderWrapper";
import ThemeToggle from "@/components/ThemeToggle";
import Header from "@/components/Header";
import ColorVerification from "@/components/ColorVerification";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Layth Ayache | AI, Security, Digital Infrastructure",
  description: "Engineering systems that fail gracefully under pressure. Focused on AI, security, and digital infrastructure for government, healthcare, and public services.",
  metadataBase: new URL("https://laythayache.com"),
  icons: {
    icon: "/logo/emblem.svg",
    apple: "/logo/emblem.svg",
  },
};

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
        <ExperienceProvider>
          <ColorVerification />
          <Header />
          <WelcomeLoaderWrapper />
          <div className="fixed top-6 right-6 z-50 reveal-global">
            <ThemeToggle />
          </div>
          <main>{children}</main>
        </ExperienceProvider>
      </body>
    </html>
  );
}
