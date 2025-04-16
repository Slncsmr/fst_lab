const { MongoClient } = require("mongodb");

async function main() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const myDB = client.db("words");
    const collection = myDB.collection("word_stats");

    await countItems(collection);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 3000);
  }
}

async function countItems(words) {
  try {
    console.log("Words starting with a, b or c: " + await words.countDocuments({ first: { $in: ["a", "b", "c"] } }));
    console.log("Words longer than 12 characters: " + await words.countDocuments({ size: { $gt: 12 } }));
    console.log("Words with even lengths: " + await words.countDocuments({ size: { $mod: [2, 0] } }));
    console.log("Words with 12 distinct characters: " + await words.countDocuments({ letters: { $size: 12 } }));
    console.log("Words that start and end with a vowel: " +
      await words.countDocuments({
        $and: [
          { first: { $in: ["a", "e", "i", "o", "u"] } },
          { last: { $in: ["a", "e", "i", "o", "u"] } },
        ],
      })
    );
    console.log("Words containing 7 or more vowels: " +
      await words.countDocuments({ "stats.vowels": { $gt: 6 } }));
    console.log("Words with all 5 vowels: " +
      await words.countDocuments({ letters: { $all: ["a", "e", "i", "o", "u"] } }));
    console.log("Words with non-alphabet characters: " +
      await words.countDocuments({ otherChars: { $exists: true } }));
    console.log("Words with 2 non-alphabet characters: " +
      await words.countDocuments({
        charsets: {
          $elemMatch: {
            $and: [
              { type: "other" },
              { chars: { $size: 2 } },
            ],
          },
        },
      })
    );
  } catch (err) {
    console.error("Count error:", err);
  }
}

main();
