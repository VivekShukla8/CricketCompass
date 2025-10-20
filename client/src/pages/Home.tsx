import LiveScoreboard from "@/components/LiveScoreboard";
import CommentaryFeed from "@/components/CommentaryFeed";
import MatchCard from "@/components/MatchCard";
import PollCard from "@/components/PollCard";

export default function Home() {
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

  const otherMatches = [ //todo: remove mock functionality
    {
      id: "2",
      team1: "England",
      team2: "Pakistan",
      team1Score: "178",
      team2Score: "182/4",
      team1Overs: "20.0",
      team2Overs: "18.2",
      status: "recent" as const,
      matchInfo: "2nd T20I • Karachi",
      result: "Pakistan won by 6 wickets",
    },
    {
      id: "3",
      team1: "South Africa",
      team2: "New Zealand",
      status: "upcoming" as const,
      matchInfo: "1st Test",
      venue: "Newlands, Cape Town",
      dateTime: "Tomorrow, 10:00 AM",
    },
  ];

  const mockPoll = { //todo: remove mock functionality
    id: "poll1",
    question: "Who will win the India vs Australia match?",
    options: [
      { id: "opt1", text: "India", votes: 1247 },
      { id: "opt2", text: "Australia", votes: 892 },
      { id: "opt3", text: "Tie/No Result", votes: 156 },
    ],
    totalVotes: 2295,
  };

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
                {otherMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </div>
            </div>

            <PollCard {...mockPoll} />
          </div>
        </div>
      </div>
    </div>
  );
}
