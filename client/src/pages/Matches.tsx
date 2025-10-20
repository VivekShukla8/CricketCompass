import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/MatchCard";

export default function Matches() {
  const [activeTab, setActiveTab] = useState("live");

  // Mock match data //todo: remove mock functionality
  const liveMatches = [
    {
      id: "1",
      team1: "India",
      team2: "Australia",
      team1Score: "287/6",
      team2Score: "145/3",
      team1Overs: "50.0",
      team2Overs: "28.4",
      status: "live" as const,
      matchInfo: "3rd ODI • MCG, Melbourne",
      result: "Australia need 143 runs in 128 balls",
    },
    {
      id: "2",
      team1: "Sri Lanka",
      team2: "Bangladesh",
      team1Score: "156/8",
      team2Score: "89/2",
      team1Overs: "20.0",
      team2Overs: "12.3",
      status: "live" as const,
      matchInfo: "T20I • Colombo",
      result: "Bangladesh need 68 runs in 45 balls",
    },
  ];

  const recentMatches = [
    {
      id: "3",
      team1: "England",
      team2: "Pakistan",
      team1Score: "178",
      team2Score: "182/4",
      team1Overs: "20.0",
      team2Overs: "18.2",
      status: "recent" as const,
      matchInfo: "2nd T20I • Karachi",
      result: "Pakistan won by 6 wickets",
    },
    {
      id: "4",
      team1: "West Indies",
      team2: "Ireland",
      team1Score: "245",
      team2Score: "198",
      team1Overs: "50.0",
      team2Overs: "47.1",
      status: "recent" as const,
      matchInfo: "1st ODI • Bridgetown",
      result: "West Indies won by 47 runs",
    },
    {
      id: "5",
      team1: "Afghanistan",
      team2: "Zimbabwe",
      team1Score: "312/5",
      team2Score: "289",
      team1Overs: "50.0",
      team2Overs: "50.0",
      status: "recent" as const,
      matchInfo: "3rd ODI • Harare",
      result: "Afghanistan won by 23 runs",
    },
  ];

  const upcomingMatches = [
    {
      id: "6",
      team1: "South Africa",
      team2: "New Zealand",
      status: "upcoming" as const,
      matchInfo: "1st Test",
      venue: "Newlands, Cape Town",
      dateTime: "Tomorrow, 10:00 AM",
    },
    {
      id: "7",
      team1: "India",
      team2: "Australia",
      status: "upcoming" as const,
      matchInfo: "4th ODI",
      venue: "SCG, Sydney",
      dateTime: "Jan 25, 2:30 PM",
    },
    {
      id: "8",
      team1: "England",
      team2: "Pakistan",
      status: "upcoming" as const,
      matchInfo: "3rd T20I",
      venue: "National Stadium, Karachi",
      dateTime: "Jan 26, 7:00 PM",
    },
  ];

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
