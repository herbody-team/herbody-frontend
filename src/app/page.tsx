import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-pink">
          HerBody
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-brand-purple sm:text-5xl">
          Your Body, Your Companion
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/75">
          Know your body. Understand your health. Own your journey.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2" aria-label="HerBody experiences">
        <Link
          href="/healthy-life"
          className="rounded-2xl border border-brand-purple/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-purple"
        >
          <h2 className="text-2xl font-semibold text-brand-purple">Healthy Life</h2>
          <p className="mt-3 text-ink/75">
            Understand your body and feel supported day to day.
          </p>
        </Link>
        <Link
          href="/health-journey"
          className="rounded-2xl border border-brand-purple/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-purple"
        >
          <h2 className="text-2xl font-semibold text-brand-purple">Health Journey</h2>
          <p className="mt-3 text-ink/75">
            Keep your health information organized and within reach.
          </p>
        </Link>
      </section>
    </div>
  );
}
