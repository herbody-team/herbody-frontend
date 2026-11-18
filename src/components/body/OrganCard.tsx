import { ORGANS } from "@/lib/organs";
import type { OrganId } from "@/types/organ";

type OrganCardProps = {
  selectedOrgan: OrganId | null;
};

export default function OrganCard({ selectedOrgan }: OrganCardProps) {
  const organ = selectedOrgan ? ORGANS[selectedOrgan] : null;

  return (
    <article className="rounded-2xl border border-brand-purple/10 bg-white p-5 shadow-sm sm:p-6">
      {organ ? (
        <>
          <span className="inline-flex rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-brand-purple">
            Selected organ
          </span>
          <h2 className="mt-4 text-2xl font-bold text-brand-purple">{organ.label}</h2>
          <p className="mt-2 text-sm leading-6 text-ink/75">{organ.role}</p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-ink/80">
            {organ.facts.map((fact) => (
              <li key={fact} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-pink" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-brand-purple/10 pt-4 text-xs leading-5 text-ink/65">
            Educational information only. HerBody explains and guides; it does not diagnose.
          </p>
        </>
      ) : (
        <div className="min-h-32">
          <span className="inline-flex rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-brand-purple">
            Organ guide
          </span>
          <h2 className="mt-4 text-xl font-semibold text-brand-purple">Explore an organ</h2>
          <p className="mt-2 text-sm leading-6 text-ink/75">
            Tap an organ to learn about it.
          </p>
        </div>
      )}
    </article>
  );
}
