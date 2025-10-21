import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LiveIndicator from "./LiveIndicator";

interface Batsman {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  onStrike?: boolean;
}

interface Bowler {
  name: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

interface LiveScoreboardProps {
  team1: string;
  team2: string;
  battingTeam: string;
  score: string;
  overs: string;
  target?: string;
  runRate: string;
  requiredRate?: string;
  batsmen: Batsman[];
  bowler: Bowler;
  partnership: {
    runs: number;
    balls: number;
  };
}

export default function LiveScoreboard({
  team1,
  team2,
  battingTeam,
  score,
  overs,
  target,
  runRate,
  requiredRate,
  batsmen,
  bowler,
  partnership,
}: LiveScoreboardProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {team1} vs {team2}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">3rd ODI • MCG, Melbourne</p>
        </div>
        <LiveIndicator />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">{battingTeam}</p>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-5xl font-bold text-foreground">{score}</span>
            <span className="text-2xl text-muted-foreground">({overs})</span>
          </div>
          {target && (
            <p className="text-sm text-muted-foreground mt-2">{target}</p>
          )}
        </div>

        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">CRR: </span>
            <span className="font-semibold text-foreground">{runRate}</span>
          </div>
          {requiredRate && (
            <div>
              <span className="text-muted-foreground">RRR: </span>
              <span className="font-semibold text-foreground">{requiredRate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Batsmen
        </h3>
        <div className="space-y-2">
          {batsmen.map((batsman, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{batsman.name}</span>
                {batsman.onStrike && (
                  <Badge variant="secondary" className="text-xs">*</Badge>
                )}
              </div>
              <div className="flex gap-4 text-sm">
                <span className="font-display font-bold text-foreground w-8 text-right">
                  {batsman.runs}
                </span>
                <span className="text-muted-foreground w-8 text-right">({batsman.balls})</span>
                <span className="text-muted-foreground hidden sm:inline">
                  {batsman.fours}x4, {batsman.sixes}x6
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Bowler
        </h3>
        <div className="flex items-center justify-between py-2">
          <span className="font-medium text-foreground">{bowler.name}</span>
          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground">{bowler.overs} Ov</span>
            <span className="text-muted-foreground">{bowler.runs} R</span>
            <span className="font-display font-bold text-foreground">{bowler.wickets} W</span>
            <span className="text-muted-foreground">Eco: {bowler.economy}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Partnership: <span className="font-semibold text-foreground">{partnership.runs}</span> runs
          ({partnership.balls} balls)
        </p>
      </div>
    </Card>
  );
}
