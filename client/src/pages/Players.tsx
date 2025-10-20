import { useState } from "react";
import { Input } from "@/components/ui/input";
import PlayerCard from "@/components/PlayerCard";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Players() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allPlayers = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/players"],
  });

  const filteredPlayers = allPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-foreground">Players</h1>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-players"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading players...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredPlayers.map((player) => (
                <PlayerCard key={player.id} {...player} />
              ))}
            </div>

            {filteredPlayers.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery ? `No players found matching "${searchQuery}"` : "No players available"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
