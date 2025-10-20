import TournamentTable from "@/components/TournamentTable";
import { useQuery } from "@tanstack/react-query";

export default function Tournaments() {
  const { data: tournaments = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/tournaments"],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <h1 className="text-3xl font-bold text-foreground">Tournaments</h1>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading tournaments...</p>
          </div>
        ) : tournaments.length > 0 ? (
          <div className="space-y-8">
            {tournaments.map((tournament) => (
              <TournamentTable key={tournament.id} title={tournament.title} standings={tournament.standings} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tournament data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
