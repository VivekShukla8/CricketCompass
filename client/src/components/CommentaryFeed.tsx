import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

export interface CommentaryItem {
  id: string;
  over: string;
  ball: string;
  runs: number;
  isWicket?: boolean;
  isBoundary?: boolean;
  isSix?: boolean;
  commentary: string;
  batsman: string;
  bowler: string;
}

interface CommentaryFeedProps {
  items: CommentaryItem[];
}

export default function CommentaryFeed({ items }: CommentaryFeedProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Live Commentary</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 pb-4 border-b border-border last:border-0"
            data-testid={`commentary-${item.id}`}
          >
            <div className="flex flex-col items-center gap-1 min-w-[60px]">
              <span className="text-sm font-semibold text-foreground">{item.over}</span>
              <div className="flex items-center gap-1">
                {item.isWicket && (
                  <Badge variant="destructive" className="text-xs font-bold">W</Badge>
                )}
                {item.isSix && (
                  <Badge className="text-xs font-bold bg-primary">6</Badge>
                )}
                {item.isBoundary && !item.isSix && (
                  <Badge className="text-xs font-bold bg-primary">4</Badge>
                )}
                {!item.isWicket && !item.isBoundary && !item.isSix && (
                  <span className="font-display font-bold text-lg text-foreground">
                    {item.runs}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-sm text-foreground leading-relaxed">{item.commentary}</p>
              <p className="text-xs text-muted-foreground">
                {item.batsman} to {item.bowler}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
