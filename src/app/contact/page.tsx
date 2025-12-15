export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="text-zinc-700 max-w-2xl">
        Fastest way to reach me:
      </p>
      <div className="rounded-lg border p-5 text-sm text-zinc-700 space-y-2">
        <div>
          Email: <a className="underline" href="mailto:layth@example.com">layth@example.com</a>
        </div>
        <div>
          GitHub: <a className="underline" href="https://github.com/laythayache" target="_blank" rel="noreferrer">github.com/laythayache</a>
        </div>
        <div>
          LinkedIn: <a className="underline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">linkedin.com</a>
        </div>
      </div>
    </section>
  );
}
