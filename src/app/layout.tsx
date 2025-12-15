import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layth Ayache",
  description: "AI / ML / Computer Vision Portfolio",
  metadataBase: new URL("https://laythayache.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Header />
          <main className="mt-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between gap-6">
      <a href="/" className="font-semibold tracking-tight">
        Layth Ayache
      </a>
      <nav className="flex items-center gap-5 text-sm text-zinc-700">
        <a className="hover:text-zinc-900" href="/projects">Projects</a>
        <a className="hover:text-zinc-900" href="/about">About</a>
        <a className="hover:text-zinc-900" href="/contact">Contact</a>
        <a className="rounded border px-3 py-1 hover:bg-zinc-50" href="/resume">Resume</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t pt-6 text-sm text-zinc-600">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Layth Ayache</span>
        <div className="flex gap-4">
          <a className="hover:text-zinc-900" href="https://github.com/laythayache" target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-zinc-900" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
