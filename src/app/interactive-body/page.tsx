"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import OrganCard from "@/components/body/OrganCard";
import { ORGANS } from "@/lib/organs";
import type { OrganId } from "@/types/organ";

const BodyViewer = dynamic(
  () => import("@/components/body/BodyViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full min-h-80 place-items-center p-6 text-center text-ink/70">
        Loading the interactive body…
      </div>
    ),
  },
);

export default function InteractiveBodyPage() {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganId | null>(null);

  const liveMessage = selectedOrgan
    ? `${ORGANS[selectedOrgan].label} selected.`
    : "No organ selected.";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section>
        <p className="text-sm font-semibold text-brand-pink">3D FEMTECH ATLAS</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-purple sm:text-4xl">
          Interactive Body
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/75 sm:text-base">
          Rotate and zoom to explore. Select the uterus, ovaries, or brain to learn more.
        </p>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,.75fr)]">
        <div className="min-w-0 space-y-4">
          <div className="h-[420px] min-h-[420px] overflow-hidden rounded-2xl border border-brand-purple/10 bg-white/70 shadow-sm sm:h-[520px] lg:h-[620px]">
            <Suspense
              fallback={
                <div className="grid h-full place-items-center text-ink/70">
                  Loading the interactive body…
                </div>
              }
            >
              <BodyViewer
                selectedOrgan={selectedOrgan}
                onSelect={setSelectedOrgan}
              />
            </Suspense>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Choose an organ"
          >
            {(Object.keys(ORGANS) as OrganId[]).map((organId) => {
              const organ = ORGANS[organId];
              const isSelected = selectedOrgan === organId;
              return (
                <button
                  key={organId}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedOrgan(organId)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple ${
                    isSelected
                      ? "border-brand-pink bg-brand-pink text-white"
                      : "border-brand-purple/15 bg-white text-brand-purple hover:border-brand-pink/50"
                  }`}
                >
                  {organ.label}
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {liveMessage}
          </p>
        </div>

        <aside className="min-w-0 space-y-5">
          <OrganCard selectedOrgan={selectedOrgan} />
          <article className="rounded-2xl border border-dashed border-brand-purple/25 bg-white/60 p-5">
            <span className="inline-flex rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-brand-purple">
              Coming next
            </span>
            <h2 className="mt-4 text-xl font-semibold text-brand-purple">AI companion</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">Coming next</p>
          </article>
        </aside>
      </section>
    </main>
  );
}
