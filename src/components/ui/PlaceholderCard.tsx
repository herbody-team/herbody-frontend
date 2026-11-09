type PlaceholderCardProps = {
  title: string;
  description: string;
};

export default function PlaceholderCard({
  title,
  description,
}: PlaceholderCardProps) {
  return (
    <article className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm">
      <span className="inline-flex rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-brand-purple">
        Coming soon
      </span>
      <h2 className="mt-4 text-xl font-semibold text-brand-purple">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/75">{description}</p>
    </article>
  );
}
