import PollCard from '../PollCard';

export default function PollCardExample() {
  const mockPoll = {
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
    <div className="max-w-md">
      <PollCard {...mockPoll} />
    </div>
  );
}
