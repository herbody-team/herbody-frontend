import PlaceholderCard from "@/components/ui/PlaceholderCard";

const topics = [
  ["Explore the body", "Discover how your body works in everyday life."],
  ["Understand organs", "Learn what your organs do and how they work together."],
  ["Follow your cycle", "Build a clearer picture of your cycle over time."],
  ["Learn about hormones", "Explore the role hormones play in your wellbeing."],
  ["Wellbeing support", "Find gentle guidance for feeling supported day to day."],
];

export default function HealthyLifePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-brand-purple sm:text-4xl">Healthy Life</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink/75">
          Understand your body and find supportive guidance for everyday wellbeing.
        </p>
      </section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Healthy Life topics">
        {topics.map(([title, description]) => (
          <PlaceholderCard
            key={title}
            title={title}
            description={description}
            href={title === "Explore the body" ? "/interactive-body" : undefined}
          />
        ))}
      </section>
    </div>
  );
}
