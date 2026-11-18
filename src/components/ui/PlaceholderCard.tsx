import Link from "next/link";

type PlaceholderCardProps = {
  title: string;
  description: string;
  href?: string;
};

export default function PlaceholderCard({
  title,
  description,
  href,
}: PlaceholderCardProps) {
  const content = (
    <>
      <span className="inline-flex rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-brand-purple">
        Coming soon
      </span>
      <h2 className="mt-4 text-xl font-semibold text-brand-purple">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/75">{description}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-purple"
      >
        {content}
      </Link>
    );
  }

  return (
    <article className="rounded-2xl border border-brand-purple/10 bg-white p-6 shadow-sm">
      {content}
    </article>
  );
}
