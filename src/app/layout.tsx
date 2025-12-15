import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Systems Failure Analysis | AI, Security, Digital Infrastructure",
  description: "I study why systems fail under pressure. AI, security, and digital infrastructure — focused on government, healthcare, and public services in constrained environments.",
  metadataBase: new URL("https://laythayache.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased font-sans">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
