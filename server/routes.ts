// Routes implementation - see blueprint:javascript_log_in_with_replit
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertPollVoteSchema } from "@shared/schema";
import { WebSocketServer } from "ws";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication middleware
  await setupAuth(app);

  // Auth routes - returns null if not authenticated for graceful frontend handling
  app.get("/api/auth/user", async (req: any, res) => {
    try {
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.json(null);
      }
      
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Poll routes
  app.get("/api/polls", async (req, res) => {
    try {
      const polls = await storage.getAllPolls();
      
      // Calculate total votes for each poll
      const pollsWithTotals = polls.map((poll) => {
        const totalVotes = poll.options.reduce(
          (sum, opt) => sum + (opt.votes || 0),
          0
        );
        return {
          id: poll.id,
          question: poll.question,
          options: poll.options.map((opt) => ({
            id: opt.id,
            text: opt.text,
            votes: opt.votes || 0,
          })),
          totalVotes,
        };
      });

      res.json(pollsWithTotals);
    } catch (error) {
      console.error("Error fetching polls:", error);
      res.status(500).json({ message: "Failed to fetch polls" });
    }
  });

  app.post("/api/polls/:pollId/vote", isAuthenticated, async (req: any, res) => {
    try {
      const { pollId } = req.params;
      const { optionId } = req.body;
      const userId = req.user.claims.sub;

      // Validate request body
      const validationResult = insertPollVoteSchema.safeParse({
        pollId,
        userId,
        optionId,
      });

      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid vote data",
          errors: validationResult.error.errors,
        });
      }

      // Verify poll exists
      const poll = await storage.getPollById(pollId);
      if (!poll) {
        return res.status(404).json({ message: "Poll not found" });
      }

      // Verify option belongs to this poll
      const optionBelongsToPoll = poll.options.some(opt => opt.id === optionId);
      if (!optionBelongsToPoll) {
        return res.status(400).json({ 
          message: "Invalid option for this poll" 
        });
      }

      // Check if user has already voted
      const hasVoted = await storage.hasUserVoted(pollId, userId);
      if (hasVoted) {
        return res.status(400).json({ message: "You have already voted on this poll" });
      }

      // Record the vote
      await storage.vote({
        pollId,
        userId,
        optionId,
      });

      // Get updated poll data
      const updatedPoll = await storage.getPollById(pollId);
      if (!updatedPoll) {
        return res.status(500).json({ message: "Failed to retrieve updated poll" });
      }

      const totalVotes = updatedPoll.options.reduce(
        (sum, opt) => sum + (opt.votes || 0),
        0
      );

      res.json({
        id: updatedPoll.id,
        question: updatedPoll.question,
        options: updatedPoll.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
          votes: opt.votes || 0,
        })),
        totalVotes,
      });
    } catch (error: any) {
      console.error("Error voting:", error);
      if (error.message === "User has already voted on this poll") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to record vote" });
    }
  });

  // Matches routes (mock data for now - will integrate with cricket API later)
  app.get("/api/matches", async (req, res) => {
    try {
      const { status } = req.query;

      // Mock match data - TODO: Replace with cricket API integration
      const mockMatches = {
        live: [
          {
            id: "1",
            team1: "India",
            team2: "Australia",
            team1Score: "287/6",
            team2Score: "145/3",
            team1Overs: "50.0",
            team2Overs: "28.4",
            status: "live",
            matchInfo: "3rd ODI • MCG, Melbourne",
            result: "Australia need 143 runs in 128 balls",
          },
        ],
        recent: [
          {
            id: "3",
            team1: "England",
            team2: "Pakistan",
            team1Score: "178",
            team2Score: "182/4",
            team1Overs: "20.0",
            team2Overs: "18.2",
            status: "recent",
            matchInfo: "2nd T20I • Karachi",
            result: "Pakistan won by 6 wickets",
          },
        ],
        upcoming: [
          {
            id: "6",
            team1: "South Africa",
            team2: "New Zealand",
            status: "upcoming",
            matchInfo: "1st Test",
            venue: "Newlands, Cape Town",
            dateTime: "Tomorrow, 10:00 AM",
          },
        ],
      };

      if (status && typeof status === "string") {
        res.json(mockMatches[status as keyof typeof mockMatches] || []);
      } else {
        res.json(Object.values(mockMatches).flat());
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  // Players route (mock data)
  app.get("/api/players", async (req, res) => {
    try {
      // Mock player data - TODO: Replace with cricket API integration
      const mockPlayers = [
        {
          id: "1",
          name: "Virat Kohli",
          country: "India",
          role: "Batsman",
          matches: 262,
          runs: 12427,
          average: 57.32,
          strikeRate: 93.17,
        },
        {
          id: "2",
          name: "Jasprit Bumrah",
          country: "India",
          role: "Bowler",
          matches: 72,
          wickets: 121,
          average: 24.43,
          strikeRate: 32.1,
        },
      ];

      res.json(mockPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ message: "Failed to fetch players" });
    }
  });

  // Tournaments route (mock data)
  app.get("/api/tournaments", async (req, res) => {
    try {
      // Mock tournament data - TODO: Replace with cricket API integration
      const mockTournaments = [
        {
          id: "1",
          title: "IPL 2025 Points Table",
          standings: [
            { position: 1, team: "Mumbai Indians", played: 14, won: 10, lost: 4, nrr: "+0.456", points: 20 },
            { position: 2, team: "Chennai Super Kings", played: 14, won: 9, lost: 5, nrr: "+0.321", points: 18 },
          ],
        },
      ];

      res.json(mockTournaments);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({ message: "Failed to fetch tournaments" });
    }
  });

  const httpServer = createServer(app);

  // Setup WebSocket for live score updates
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    // Send initial mock live score data
    const sendLiveUpdate = () => {
      const liveData = {
        type: "score_update",
        matchId: "1",
        team1: "India",
        team2: "Australia",
        battingTeam: "Australia",
        score: "145/3",
        overs: "28.4",
        batsmen: [
          {
            name: "S Smith",
            runs: 67,
            balls: 82,
            fours: 6,
            sixes: 1,
            strikeRate: 81.71,
            onStrike: true,
          },
          {
            name: "M Labuschagne",
            runs: 34,
            balls: 45,
            fours: 3,
            sixes: 0,
            strikeRate: 75.56,
          },
        ],
        bowler: {
          name: "J Bumrah",
          overs: "6.4",
          maidens: 1,
          runs: 28,
          wickets: 2,
          economy: 4.20,
        },
      };

      ws.send(JSON.stringify(liveData));
    };

    // Send initial data
    sendLiveUpdate();

    // Simulate live updates every 10 seconds (for demo purposes)
    const interval = setInterval(sendLiveUpdate, 10000);

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      clearInterval(interval);
    });
  });

  return httpServer;
}
