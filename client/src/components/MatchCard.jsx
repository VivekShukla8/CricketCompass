import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LiveIndicator from "./LiveIndicator";

export type MatchStatus = 'live' | 'recent' | 'upcoming';

export interface MatchCardProps {
  id: string;
  team1: string;
  team2: string;
  team1Score?: string;
  team2Score?: string;
  team1Overs?: string;
  team2Overs?: string;
  status: MatchStatus;
  matchInfo: string;
  result?: string;
  venue?: string;
  dateTime?: string;
}

export default function MatchCard({
  team1,
  team2,
  team1Score,
  team2Score,
  team1Overs,
  team2Overs,
  status,
  matchInfo,
  result,
  venue,
  dateTime,
}: MatchCardProps) {
  return (
    <Card className="p-4 hover-elevate cursor-pointer" data-testid="card-match">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {matchInfo}
          </p>
          {status === 'live' && <LiveIndicator />}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">{team1}</span>
            {team1Score && (
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold text-foreground">
                  {team1Score}
                </span>
                {team1Overs && (
                  <span className="text-sm text-muted-foreground">({team1Overs})</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">{team2}</span>
            {team2Score && (
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold text-foreground">
                  {team2Score}
                </span>
                {team2Overs && (
                  <span className="text-sm text-muted-foreground">({team2Overs})</span>
                )}
              </div>
            )}
          </div>
        </div>

        {status === 'recent' && result && (
          <p className="text-sm font-medium text-primary pt-1">{result}</p>
        )}

        {status === 'live' && result && (
          <p className="text-sm font-medium text-foreground pt-1">{result}</p>
        )}

        {status === 'upcoming' && (
          <div className="pt-1 space-y-1">
            {venue && <p className="text-sm text-muted-foreground">{venue}</p>}
            {dateTime && <p className="text-sm text-muted-foreground">{dateTime}</p>}
          </div>
        )}
      </div>
    </Card>
  );
}
