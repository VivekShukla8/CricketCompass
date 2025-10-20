import TournamentTable from "@/components/TournamentTable";

export default function Tournaments() {
  // Mock tournament data //todo: remove mock functionality
  const iplStandings = [
    { position: 1, team: "Mumbai Indians", played: 14, won: 10, lost: 4, nrr: "+0.456", points: 20 },
    { position: 2, team: "Chennai Super Kings", played: 14, won: 9, lost: 5, nrr: "+0.321", points: 18 },
    { position: 3, team: "Royal Challengers", played: 14, won: 8, lost: 6, nrr: "+0.178", points: 16 },
    { position: 4, team: "Kolkata Knight Riders", played: 14, won: 8, lost: 6, nrr: "-0.045", points: 16 },
    { position: 5, team: "Delhi Capitals", played: 14, won: 7, lost: 7, nrr: "+0.123", points: 14 },
    { position: 6, team: "Rajasthan Royals", played: 14, won: 6, lost: 8, nrr: "-0.234", points: 12 },
    { position: 7, team: "Punjab Kings", played: 14, won: 5, lost: 9, nrr: "-0.345", points: 10 },
    { position: 8, team: "Sunrisers Hyderabad", played: 14, won: 4, lost: 10, nrr: "-0.567", points: 8 },
  ];

  const wcStandings = [
    { position: 1, team: "India", played: 9, won: 9, lost: 0, nrr: "+2.570", points: 18 },
    { position: 2, team: "South Africa", played: 9, won: 7, lost: 2, nrr: "+1.261", points: 14 },
    { position: 3, team: "Australia", played: 9, won: 7, lost: 2, nrr: "+0.841", points: 14 },
    { position: 4, team: "New Zealand", played: 9, won: 5, lost: 4, nrr: "+0.743", points: 10 },
    { position: 5, team: "Pakistan", played: 9, won: 4, lost: 5, nrr: "-0.199", points: 8 },
    { position: 6, team: "Afghanistan", played: 9, won: 4, lost: 5, nrr: "-0.336", points: 8 },
    { position: 7, team: "England", played: 9, won: 3, lost: 6, nrr: "-0.572", points: 6 },
    { position: 8, team: "Bangladesh", played: 9, won: 2, lost: 7, nrr: "-1.087", points: 4 },
    { position: 9, team: "Sri Lanka", played: 9, won: 2, lost: 7, nrr: "-1.162", points: 4 },
    { position: 10, team: "Netherlands", played: 9, won: 2, lost: 7, nrr: "-1.800", points: 4 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <h1 className="text-3xl font-bold text-foreground">Tournaments</h1>

        <div className="space-y-8">
          <TournamentTable title="IPL 2025 Points Table" standings={iplStandings} />
          <TournamentTable title="ICC World Cup 2023 - Group Stage" standings={wcStandings} />
        </div>
      </div>
    </div>
  );
}
