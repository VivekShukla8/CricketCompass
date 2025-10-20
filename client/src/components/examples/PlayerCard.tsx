import PlayerCard from '../PlayerCard';

export default function PlayerCardExample() {
  return (
    <div className="grid gap-4 max-w-2xl">
      <PlayerCard
        id="1"
        name="Virat Kohli"
        country="India"
        role="Batsman"
        matches={262}
        runs={12427}
        average={57.32}
        strikeRate={93.17}
      />
      <PlayerCard
        id="2"
        name="Jasprit Bumrah"
        country="India"
        role="Bowler"
        matches={72}
        wickets={121}
        average={24.43}
        strikeRate={32.1}
      />
    </div>
  );
}
