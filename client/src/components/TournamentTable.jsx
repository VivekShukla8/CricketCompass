import { Card } from "@/components/ui/card";

export interface TeamStanding {
  position: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  nrr: string;
  points: number;
}

interface TournamentTableProps {
  title: string;
  standings: TeamStanding[];
}

export default function TournamentTable({ title, standings }: TournamentTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Pos
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Team
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                P
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                W
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                L
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                NRR
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                PTS
              </th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr
                key={team.position}
                className={`border-b border-border last:border-0 hover-elevate ${
                  team.position <= 4 ? 'bg-primary/5' : ''
                }`}
                data-testid={`row-team-${team.position}`}
              >
                <td className="py-3 px-4">
                  <span className="font-semibold text-foreground">{team.position}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-foreground">{team.team}</span>
                </td>
                <td className="py-3 px-4 text-center text-muted-foreground">{team.played}</td>
                <td className="py-3 px-4 text-center text-muted-foreground">{team.won}</td>
                <td className="py-3 px-4 text-center text-muted-foreground">{team.lost}</td>
                <td className="py-3 px-4 text-center text-muted-foreground">{team.nrr}</td>
                <td className="py-3 px-4 text-center">
                  <span className="font-display font-bold text-foreground">{team.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-muted/30 text-xs text-muted-foreground">
        Top 4 teams qualify for playoffs
      </div>
    </Card>
  );
}
