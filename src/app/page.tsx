import SpinningLogo from '@/components/SpinningLogo'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-16 md:pt-20">
      <div className="flex flex-col items-center space-y-6 max-w-2xl w-full text-center">
        {/* Static Logo */}
        <div className="mb-4 -mb-16 md:-mb-20">
          <SpinningLogo
            src="/logo-mark.svg"
            alt="Logo"
            className="block h-80 w-auto md:h-96"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight" style={{ color: '#2b2e34' }}>
          Layth Ayache
        </h1>
        <p className="text-xl md:text-2xl" style={{ color: '#6b7280' }}>
          AI Engineer
        </p>
        <p className="text-sm md:text-base" style={{ color: 'rgba(107, 114, 128, 0.7)' }}>
          I build calm, precise software.
        </p>
      </div>
    </div>
  )
}
