const { MongoClient } = require("mongodb");

async function main() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const myDB = client.db("words");
    const collection = myDB.collection("word_stats");

    await pagedResults(collection, 0, 10);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 3000);
  }
}

async function displayWords(msg, itemArr, pretty = 2) {
  const wordList = itemArr.map((item) => item.word);
  console.log(`\n${msg}`);
  console.log(JSON.stringify(wordList, null, pretty));
}

async function pagedResults(collection, startIndex, pageSize) {
  const cursor = collection.find({ first: "v" })
    .sort({ word: 1 })
    .skip(startIndex)
    .limit(pageSize);

  const items = await cursor.toArray();
  await displayWords(`Page starting at index ${startIndex}`, items);

  if (items.length === pageSize) {
    await pagedResults(collection, startIndex + pageSize, pageSize);
  }
}

main();
