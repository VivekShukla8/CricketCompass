import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollCardProps {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export default function PollCard({ id, question, options, totalVotes }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [localOptions, setLocalOptions] = useState(options);
  const [localTotalVotes, setLocalTotalVotes] = useState(totalVotes);

  const handleVote = () => {
    if (!selectedOption) return;
    
    // Update vote counts //todo: remove mock functionality
    const newOptions = localOptions.map(opt => 
      opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
    );
    
    setLocalOptions(newOptions);
    setLocalTotalVotes(prev => prev + 1);
    setHasVoted(true);
    console.log(`Voted for option: ${selectedOption}`);
  };

  return (
    <Card className="p-6" data-testid={`poll-${id}`}>
      <h3 className="text-lg font-semibold text-foreground mb-4">{question}</h3>

      <div className="space-y-3">
        {localOptions.map((option) => {
          const percentage = localTotalVotes > 0 
            ? Math.round((option.votes / localTotalVotes) * 100) 
            : 0;

          return (
            <div key={option.id} className="space-y-2">
              {!hasVoted ? (
                <button
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left p-3 rounded-md border transition-colors ${
                    selectedOption === option.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover-elevate'
                  }`}
                  data-testid={`poll-option-${option.id}`}
                >
                  <span className="text-sm font-medium text-foreground">{option.text}</span>
                </button>
              ) : (
                <div className="relative">
                  <div className="flex items-center justify-between p-3 rounded-md border border-border">
                    <span className="text-sm font-medium text-foreground relative z-10">
                      {option.text}
                    </span>
                    <span className="text-sm font-semibold text-foreground relative z-10">
                      {percentage}%
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 bg-primary/20 rounded-md transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!hasVoted ? (
        <Button
          onClick={handleVote}
          disabled={!selectedOption}
          className="w-full mt-4"
          data-testid="button-vote"
        >
          Vote
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          {localTotalVotes.toLocaleString()} votes
        </p>
      )}
    </Card>
  );
}
