import { useQuery } from "@tanstack/react-query";
import PollCard from "@/components/PollCard";

export default function Polls() {
  const { data: polls, isLoading } = useQuery<any[]>({
    queryKey: ["/api/polls"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-6">Polls</h1>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading polls...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Polls</h1>

        {polls && polls.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {polls.map((poll) => (
              <PollCard key={poll.id} {...poll} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No polls available</p>
          </div>
        )}
      </div>
    </div>
  );
}
