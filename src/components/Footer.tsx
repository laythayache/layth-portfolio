import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#d1d5db] mt-16 pt-8 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          <p className="text-sm" style={{ color: '#6b7280' }}>
            Learning in public: projects, failures, and revisions.
          </p>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link
              href="/about"
              className="text-sm hover:underline transition-colors"
              style={{ color: '#6b7280' }}
            >
              About me
            </Link>
            <Link
              href="/completed"
              className="text-sm hover:underline transition-colors"
              style={{ color: '#6b7280' }}
            >
              Completed
            </Link>
            <Link
              href="/ongoing"
              className="text-sm hover:underline transition-colors"
              style={{ color: '#6b7280' }}
            >
              Ongoing
            </Link>
            <Link
              href="/ideas"
              className="text-sm hover:underline transition-colors"
              style={{ color: '#6b7280' }}
            >
              Ideas
            </Link>
          </nav>
        </div>
        <div className="mt-6 pt-6 border-t border-[#d1d5db]">
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            © {currentYear} Layth Ayache
          </p>
        </div>
      </div>
    </footer>
  )
}

