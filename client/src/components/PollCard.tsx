import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

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

export default function PollCard({ id, question, options: initialOptions, totalVotes: initialTotalVotes }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [localOptions, setLocalOptions] = useState(initialOptions);
  const [localTotalVotes, setLocalTotalVotes] = useState(initialTotalVotes);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: async (optionId: string) => {
      return await apiRequest("POST", `/api/polls/${id}/vote`, { optionId });
    },
    onSuccess: (data: any) => {
      setLocalOptions(data.options);
      setLocalTotalVotes(data.totalVotes);
      setHasVoted(true);
      toast({
        title: "Vote recorded!",
        description: "Thank you for voting.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/polls"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You need to log in to vote. Redirecting...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      
      toast({
        title: "Error",
        description: error.message || "Failed to record vote",
        variant: "destructive",
      });
    },
  });

  const handleVote = () => {
    if (!selectedOption) return;
    
    if (!isAuthenticated && !authLoading) {
      toast({
        title: "Login Required",
        description: "Please log in to vote. Redirecting...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }

    voteMutation.mutate(selectedOption);
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
                  disabled={voteMutation.isPending}
                  className={`w-full text-left p-3 rounded-md border transition-colors disabled:opacity-50 ${
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
          disabled={!selectedOption || voteMutation.isPending}
          className="w-full mt-4"
          data-testid="button-vote"
        >
          {voteMutation.isPending ? "Voting..." : "Vote"}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          {localTotalVotes.toLocaleString()} votes
        </p>
      )}
    </Card>
  );
}
