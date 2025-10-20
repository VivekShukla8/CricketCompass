import CommentaryFeed from '../CommentaryFeed';

export default function CommentaryFeedExample() {
  const mockCommentary = [
    {
      id: "1",
      over: "28.4",
      ball: "4",
      runs: 0,
      isWicket: true,
      commentary: "OUT! Caught behind! Bumrah gets his third wicket. Short ball outside off, Warner goes for the pull but gets a thin edge to the keeper. India on top now!",
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
      commentary: "FOUR! Beautiful cover drive! Pitched up delivery, Warner leans into it and times it perfectly through the gap.",
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
    <div className="max-w-3xl">
      <CommentaryFeed items={mockCommentary} />
    </div>
  );
}
