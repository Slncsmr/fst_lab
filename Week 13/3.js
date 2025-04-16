const { MongoClient } = require("mongodb");

async function main() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const myDB = client.db("words");
    const collection = myDB.collection("word_stats");

    await limitFind(collection);
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

async function limitFind(words) {
  try {
    const count = await words.countDocuments({ first: "p" });
    console.log("Count of words starting with p: " + count);

    const allCursor = words.find({ first: "p" });
    await displayWords("Words starting with p:", allCursor);

    const limitedCursor = words.find({ first: "p" }).limit(5);
    await displayWords("Limiting words starting with p:", limitedCursor);
  } catch (err) {
    console.error("Query error:", err);
  }
}

main();
