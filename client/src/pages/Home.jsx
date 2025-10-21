import LiveScoreboard from "@/components/LiveScoreboard";
import CommentaryFeed from "@/components/CommentaryFeed";
import MatchCard from "@/components/MatchCard";
import PollCard from "@/components/PollCard";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: allMatches = [] } = useQuery<any[]>({
    queryKey: ["/api/matches"],
  });

  const { data: polls = [] } = useQuery<any[]>({
    queryKey: ["/api/polls"],
  });

  const liveMatch = allMatches.find((m) => m.status === 'live');
  const otherMatches = allMatches.filter((m, i) => i < 3 && m.id !== liveMatch?.id).slice(0, 2);
  // Mock data for live match //todo: remove mock functionality
  const mockBatsmen = [
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
  ];

  const mockBowler = {
    name: "J Bumrah",
    overs: "6.4",
    maidens: 1,
    runs: 28,
    wickets: 2,
    economy: 4.20,
  };

  const mockCommentary = [
    {
      id: "1",
      over: "28.4",
      ball: "4",
      runs: 0,
      isWicket: true,
      commentary: "OUT! Caught behind! Bumrah gets his third wicket. Short ball outside off, Warner goes for the pull but gets a thin edge to the keeper.",
      batsman: "D Warner",
      bowler: "J Bumrah",
    },
    {
      id: "2",
      over: "28.3",
      ball: "3",
      runs: 6,
      isSix: true,
      commentary: "SIX! What a shot! Warner dances down the track and launches it over long-on for a massive six!",
      batsman: "D Warner",
      bowler: "J Bumrah",
    },
    {
      id: "3",
      over: "28.2",
      ball: "2",
      runs: 4,
      isBoundary: true,
      commentary: "FOUR! Beautiful cover drive! Pitched up delivery, Warner leans into it and times it perfectly.",
      batsman: "D Warner",
      bowler: "J Bumrah",
    },
    {
      id: "4",
      over: "28.1",
      ball: "1",
      runs: 1,
      commentary: "Good length delivery on off stump, Smith taps it to cover and takes a quick single.",
      batsman: "S Smith",
      bowler: "J Bumrah",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LiveScoreboard
              team1="India"
              team2="Australia"
              battingTeam="Australia"
              score="145/3"
              overs="28.4"
              target="Target: 288"
              runRate="5.06"
              requiredRate="6.71"
              batsmen={mockBatsmen}
              bowler={mockBowler}
              partnership={{
                runs: 78,
                balls: 94,
              }}
            />

            <CommentaryFeed items={mockCommentary} />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Other Matches</h2>
              <div className="space-y-4">
                {otherMatches.length > 0 ? (
                  otherMatches.map((match) => (
                    <MatchCard key={match.id} {...match} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No other matches available
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Fan Poll</h2>
              {polls.length > 0 ? (
                <PollCard {...polls[0]} />
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No polls available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
