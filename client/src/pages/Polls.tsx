import PollCard from "@/components/PollCard";

export default function Polls() {
  // Mock poll data //todo: remove mock functionality
  const polls = [
    {
      id: "poll1",
      question: "Who will win the India vs Australia match?",
      options: [
        { id: "opt1", text: "India", votes: 1247 },
        { id: "opt2", text: "Australia", votes: 892 },
        { id: "opt3", text: "Tie/No Result", votes: 156 },
      ],
      totalVotes: 2295,
    },
    {
      id: "poll2",
      question: "Best batsman of the decade?",
      options: [
        { id: "opt1", text: "Virat Kohli", votes: 2134 },
        { id: "opt2", text: "Steve Smith", votes: 1567 },
        { id: "opt3", text: "Kane Williamson", votes: 987 },
        { id: "opt4", text: "Joe Root", votes: 756 },
      ],
      totalVotes: 5444,
    },
    {
      id: "poll3",
      question: "Which format do you enjoy the most?",
      options: [
        { id: "opt1", text: "Test Cricket", votes: 1823 },
        { id: "opt2", text: "ODI", votes: 1456 },
        { id: "opt3", text: "T20", votes: 2987 },
      ],
      totalVotes: 6266,
    },
    {
      id: "poll4",
      question: "Who will win IPL 2025?",
      options: [
        { id: "opt1", text: "Mumbai Indians", votes: 1890 },
        { id: "opt2", text: "Chennai Super Kings", votes: 1654 },
        { id: "opt3", text: "Royal Challengers", votes: 1234 },
        { id: "opt4", text: "Other", votes: 567 },
      ],
      totalVotes: 5345,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Polls</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <PollCard key={poll.id} {...poll} />
          ))}
        </div>
      </div>
    </div>
  );
}
