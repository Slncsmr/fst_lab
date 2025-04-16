const { MongoClient } = require("mongodb");

async function main() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const myDB = client.db("words");
    const collection = myDB.collection("word_stats");

    await findItems(collection);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 3000);
  }
}

async function displayWords(msg, cursor, pretty = 2) {
  try {
    const itemArr = await cursor.toArray();
    const wordList = itemArr.map((item) => item.word);
    console.log("\n" + msg);
    console.log(JSON.stringify(wordList, null, pretty));
  } catch (err) {
    console.error("Display Error:", err);
  }
}

async function findItems(words) {
  await displayWords("Words starting with a, b or c: ", words.find({ first: { $in: ["a", "b", "c"] } }));
  await displayWords("Words longer than 12 characters: ", words.find({ size: { $gt: 12 } }));
  await displayWords("Words with even lengths: ", words.find({ size: { $mod: [2, 0] } }));
  await displayWords("Words with 12 distinct characters: ", words.find({ letters: { $size: 12 } }));
  await displayWords("Words that start and end with a vowel: ", words.find({
    $and: [
      { first: { $in: ["a", "e", "i", "o", "u"] } },
      { last: { $in: ["a", "e", "i", "o", "u"] } },
    ],
  }));
  await displayWords("Words containing 7 or more vowels: ", words.find({ "stats.vowels": { $gt: 6 } }));
  await displayWords("Words with all 5 vowels: ", words.find({ letters: { $all: ["a", "e", "i", "o", "u"] } }));
  await displayWords("Words with non-alphabet characters: ", words.find({ otherChars: { $exists: true } }));
  await displayWords("Words with 2 non-alphabet characters: ", words.find({
    charsets: {
      $elemMatch: {
        $and: [{ type: "other" }, { chars: { $size: 2 } }],
      },
    },
  }));
}

main();
