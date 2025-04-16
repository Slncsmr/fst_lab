const { MongoClient } = require("mongodb");

async function seedDatabase() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("words");
    const collection = db.collection("word_stats");

    // Clear existing data
    await collection.deleteMany({});

    const sampleWords = [
      {
        word: "apple",
        first: "a",
        last: "e",
        size: 5,
        letters: ["a", "p", "l", "e"],
        stats: { vowels: 2 },
        charsets: [],
      },
      {
        word: "banana",
        first: "b",
        last: "a",
        size: 6,
        letters: ["b", "a", "n"],
        stats: { vowels: 3 },
        charsets: [],
      },
      {
        word: "encyclopedia",
        first: "e",
        last: "a",
        size: 13,
        letters: ["e", "n", "c", "y", "l", "o", "p", "d", "i", "a"],
        stats: { vowels: 6 },
        charsets: [],
      },
      {
        word: "rhythm",
        first: "r",
        last: "m",
        size: 6,
        letters: ["r", "h", "y", "t", "m"],
        stats: { vowels: 0 },
        charsets: [{ type: "other", chars: ["1", "!"] }],
        otherChars: true,
      },
      {
        word: "education",
        first: "e",
        last: "n",
        size: 9,
        letters: ["e", "d", "u", "c", "a", "t", "i", "o", "n"],
        stats: { vowels: 5 },
        charsets: [],
      },
      {
        word: "unquestionably",
        first: "u",
        last: "y",
        size: 14,
        letters: [
          "u", "n", "q", "e", "s", "t", "i", "o", "a", "b", "l", "y"
        ],
        stats: { vowels: 6 },
        charsets: [],
      }
    ];

    await collection.insertMany(sampleWords);
    console.log("✅ Sample data inserted successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seedDatabase();
