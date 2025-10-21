import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface PlayerCardProps {
  id: string;
  name: string;
  country: string;
  role: string;
  imageUrl?: string;
  matches: number;
  runs?: number;
  wickets?: number;
  average?: number;
  strikeRate?: number;
}

export default function PlayerCard({
  name,
  country,
  role,
  imageUrl,
  matches,
  runs,
  wickets,
  average,
  strikeRate,
}: PlayerCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="p-6 hover-elevate cursor-pointer" data-testid="card-player">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback className="text-lg font-semibold">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">{country}</span>
              <Badge variant="secondary" className="text-xs">{role}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Matches</p>
              <p className="font-display text-xl font-bold text-foreground mt-1">{matches}</p>
            </div>
            {runs !== undefined && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Runs</p>
                <p className="font-display text-xl font-bold text-foreground mt-1">{runs}</p>
              </div>
            )}
            {wickets !== undefined && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Wickets</p>
                <p className="font-display text-xl font-bold text-foreground mt-1">{wickets}</p>
              </div>
            )}
            {average !== undefined && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Average</p>
                <p className="font-display text-xl font-bold text-foreground mt-1">
                  {average.toFixed(2)}
                </p>
              </div>
            )}
            {strikeRate !== undefined && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">SR</p>
                <p className="font-display text-xl font-bold text-foreground mt-1">
                  {strikeRate.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
