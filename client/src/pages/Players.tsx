import { useState } from "react";
import { Input } from "@/components/ui/input";
import PlayerCard from "@/components/PlayerCard";
import { Search } from "lucide-react";

export default function Players() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock player data //todo: remove mock functionality
  const allPlayers = [
    {
      id: "1",
      name: "Virat Kohli",
      country: "India",
      role: "Batsman",
      matches: 262,
      runs: 12427,
      average: 57.32,
      strikeRate: 93.17,
    },
    {
      id: "2",
      name: "Jasprit Bumrah",
      country: "India",
      role: "Bowler",
      matches: 72,
      wickets: 121,
      average: 24.43,
      strikeRate: 32.1,
    },
    {
      id: "3",
      name: "Steve Smith",
      country: "Australia",
      role: "Batsman",
      matches: 128,
      runs: 4378,
      average: 43.34,
      strikeRate: 87.76,
    },
    {
      id: "4",
      name: "Pat Cummins",
      country: "Australia",
      role: "All-rounder",
      matches: 72,
      runs: 650,
      wickets: 111,
      average: 25.65,
      strikeRate: 29.8,
    },
    {
      id: "5",
      name: "Babar Azam",
      country: "Pakistan",
      role: "Batsman",
      matches: 94,
      runs: 4442,
      average: 56.87,
      strikeRate: 88.27,
    },
    {
      id: "6",
      name: "Rashid Khan",
      country: "Afghanistan",
      role: "Bowler",
      matches: 80,
      wickets: 154,
      average: 18.63,
      strikeRate: 16.9,
    },
  ];

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

        <div className="grid md:grid-cols-2 gap-4">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} {...player} />
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No players found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
