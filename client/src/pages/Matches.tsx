import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/MatchCard";
import { useQuery } from "@tanstack/react-query";

export default function Matches() {
  const [activeTab, setActiveTab] = useState("live");

  const { data: liveMatches = [], isLoading: liveLoading } = useQuery<any[]>({
    queryKey: ["/api/matches", "live"],
    queryFn: async () => {
      const res = await fetch("/api/matches?status=live");
      if (!res.ok) throw new Error("Failed to fetch live matches");
      return res.json();
    },
  });

  const { data: recentMatches = [], isLoading: recentLoading } = useQuery<any[]>({
    queryKey: ["/api/matches", "recent"],
    queryFn: async () => {
      const res = await fetch("/api/matches?status=recent");
      if (!res.ok) throw new Error("Failed to fetch recent matches");
      return res.json();
    },
  });

  const { data: upcomingMatches = [], isLoading: upcomingLoading } = useQuery<any[]>({
    queryKey: ["/api/matches", "upcoming"],
    queryFn: async () => {
      const res = await fetch("/api/matches?status=upcoming");
      if (!res.ok) throw new Error("Failed to fetch upcoming matches");
      return res.json();
    },
  });

  const isLoading = liveLoading || recentLoading || upcomingLoading;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">All Matches</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="live" data-testid="tab-live">
              Live
            </TabsTrigger>
            <TabsTrigger value="recent" data-testid="tab-recent">
              Recent
            </TabsTrigger>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            {liveLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading live matches...</p>
              </div>
            ) : liveMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No live matches at the moment</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            {recentLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading recent matches...</p>
              </div>
            ) : recentMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No recent matches</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming">
            {upcomingLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading upcoming matches...</p>
              </div>
            ) : upcomingMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming matches</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
