import PlaceholderCard from "@/components/ui/PlaceholderCard";

const topics = [
  ["Organize test results", "Keep your health information together in one place."],
  ["See changes over time", "Notice patterns and changes across your health journey."],
  ["Understand lab values", "Get clear explanations for common lab results."],
  ["Prepare appointment questions", "Gather questions to help you make the most of appointments."],
];

export default function HealthJourneyPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-brand-purple sm:text-4xl">Health Journey</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink/75">
          Keep your health information organized and feel prepared for what comes next.
        </p>
      </section>
      <section className="grid gap-5 sm:grid-cols-2" aria-label="Health Journey topics">
        {topics.map(([title, description]) => (
          <PlaceholderCard key={title} title={title} description={description} />
        ))}
      </section>
    </div>
  );
}
