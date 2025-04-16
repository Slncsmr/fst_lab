const { MongoClient } = require("mongodb");

async function main() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const myDB = client.db("words");
    const collection = myDB.collection("word_stats");

    await sortItems(collection);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 3000);
  }
}

async function displayWords(msg, cursor, pretty = 2) {
  const itemArr = await cursor.toArray();
  const wordList = itemArr.map((item) => item.word);
  console.log("\n" + msg);
  console.log(JSON.stringify(wordList, null, pretty));
}

async function sortItems(words) {
  await displayWords("Words ending in w: ", words.find({ last: "w" }));

  await displayWords(
    "Words ending in w sorted ascending: ",
    words.find({ last: "w" }).sort({ word: 1 })
  );

  await displayWords(
    "Words ending in w sorted descending: ",
    words.find({ last: "w" }).sort({ word: -1 })
  );

  await displayWords(
    "B words sorted by size then by last letter: ",
    words.find({ first: "b" }).sort({ size: -1, last: 1 })
  );

  await displayWords(
    "B words sorted by last letter then by size: ",
    words.find({ first: "b" }).sort({ last: 1, size: -1 })
  );
}

main();
