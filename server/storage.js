// Storage implementation using PostgreSQL - see blueprint:javascript_database and blueprint:javascript_log_in_with_replit
import {
  users,
  polls,
  pollOptions,
  pollVotes,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
export class DatabaseStorage {
  // User operations
  async getUser(id) {
    const [user] = await db().select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData) {
    const [user] = await db()
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Poll operations
  async createPoll(pollData, optionsData) {
    const [poll] = await db().insert(polls).values(pollData).returning();

    const optionsWithPollId = optionsData.map((opt) => ({
      ...opt,
      pollId: poll.id,
    }));

    await db().insert(pollOptions).values(optionsWithPollId);

    return poll;
  }

  async getAllPolls() {
    const allPolls = await db()
      .select()
      .from(polls)
      .where(eq(polls.isActive, true))
      .orderBy(desc(polls.createdAt));

    const pollsWithOptions = await Promise.all(
      allPolls.map(async (poll) => {
        const options = await db()
          .select()
          .from(pollOptions)
          .where(eq(pollOptions.pollId, poll.id));

        return {
          ...poll,
          options,
        };
      })
    );

    return pollsWithOptions;
  }

  async getPollById(id) {
    const [poll] = await db().select().from(polls).where(eq(polls.id, id));

    if (!poll) return undefined;

    const options = await db()
      .select()
      .from(pollOptions)
      .where(eq(pollOptions.pollId, id));

    return {
      ...poll,
      options,
    };
  }

  async vote(voteData) {
    // Check if user has already voted
    const existingVote = await db()
      .select()
      .from(pollVotes)
      .where(
        and(
          eq(pollVotes.pollId, voteData.pollId),
          eq(pollVotes.userId, voteData.userId)
        )
      );

    if (existingVote.length > 0) {
      throw new Error("User has already voted on this poll");
    }

    // Record the vote
    await db().insert(pollVotes).values(voteData);

    // Increment the vote count
    const [option] = await db()
      .select()
      .from(pollOptions)
      .where(eq(pollOptions.id, voteData.optionId));

    await db()
      .update(pollOptions)
      .set({ votes: (option.votes || 0) + 1 })
      .where(eq(pollOptions.id, voteData.optionId));
  }

  async hasUserVoted(pollId, userId) {
    const votes = await db()
      .select()
      .from(pollVotes)
      .where(
        and(eq(pollVotes.pollId, pollId), eq(pollVotes.userId, userId))
      );

    return votes.length > 0;
  }
}

export const storage = new DatabaseStorage();
