import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-bg pt-16 md:pt-20">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-ink mb-4">
            Welcome
          </h1>
          <p className="text-lg text-brand-ink/80">
            Portfolio content goes here.
          </p>
        </div>
      </main>
    </div>
  );
}

