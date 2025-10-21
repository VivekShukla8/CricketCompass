import LiveScoreboard from '../LiveScoreboard';

export default function LiveScoreboardExample() {
  return (
    <div className="max-w-3xl">
      <LiveScoreboard
        team1="India"
        team2="Australia"
        battingTeam="Australia"
        score="145/3"
        overs="28.4"
        target="Target: 288"
        runRate="5.06"
        requiredRate="6.71"
        batsmen={[
          {
            name: "S Smith",
            runs: 67,
            balls: 82,
            fours: 6,
            sixes: 1,
            strikeRate: 81.71,
            onStrike: true,
          },
          {
            name: "M Labuschagne",
            runs: 34,
            balls: 45,
            fours: 3,
            sixes: 0,
            strikeRate: 75.56,
          },
        ]}
        bowler={{
          name: "J Bumrah",
          overs: "6.4",
          maidens: 1,
          runs: 28,
          wickets: 2,
          economy: 4.20,
        }}
        partnership={{
          runs: 78,
          balls: 94,
        }}
      />
    </div>
  );
}
