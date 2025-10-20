import { db } from "./db";
import { polls, pollOptions } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const pollData = [
    {
      question: "Who will win the India vs Australia ODI series?",
      options: ["India", "Australia", "Draw/Tie"],
    },
    {
      question: "Best T20 batsman in the world currently?",
      options: ["Virat Kohli", "Babar Azam", "Jos Buttler", "Suryakumar Yadav"],
    },
    {
      question: "Which team will win IPL 2025?",
      options: ["Mumbai Indians", "Chennai Super Kings", "Royal Challengers", "Other"],
    },
  ];

  try {
    for (const pollItem of pollData) {
      const [poll] = await db()
        .insert(polls)
        .values({ question: pollItem.question })
        .returning();

      const optionsData = pollItem.options.map((text) => ({
        pollId: poll.id,
        text,
      }));

      await db().insert(pollOptions).values(optionsData);

      console.log(`Created poll: "${pollItem.question}"`);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
