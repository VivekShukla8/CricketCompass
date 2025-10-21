import TournamentTable from '../TournamentTable';

export default function TournamentTableExample() {
  const mockStandings = [
    { position: 1, team: "Mumbai Indians", played: 14, won: 10, lost: 4, nrr: "+0.456", points: 20 },
    { position: 2, team: "Chennai Super Kings", played: 14, won: 9, lost: 5, nrr: "+0.321", points: 18 },
    { position: 3, team: "Royal Challengers", played: 14, won: 8, lost: 6, nrr: "+0.178", points: 16 },
    { position: 4, team: "Kolkata Knight Riders", played: 14, won: 8, lost: 6, nrr: "-0.045", points: 16 },
    { position: 5, team: "Delhi Capitals", played: 14, won: 7, lost: 7, nrr: "+0.123", points: 14 },
    { position: 6, team: "Rajasthan Royals", played: 14, won: 6, lost: 8, nrr: "-0.234", points: 12 },
    { position: 7, team: "Punjab Kings", played: 14, won: 5, lost: 9, nrr: "-0.345", points: 10 },
    { position: 8, team: "Sunrisers Hyderabad", played: 14, won: 4, lost: 10, nrr: "-0.567", points: 8 },
  ];

  return (
    <div className="max-w-4xl">
      <TournamentTable title="IPL 2025 Points Table" standings={mockStandings} />
    </div>
  );
}
