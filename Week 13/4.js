const { MongoClient } = require("mongodb");

async function main() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const myDB = client.db("words");
    const collection = myDB.collection("word_stats");

    await limitFields(collection);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 3000);
  }
}

async function limitFields(words) {
  try {
    // Exclude 'charsets' field
    const excluded = await words.findOne(
      { word: "the" },
      { projection: { charsets: 0 } }
    );
    console.log("Excluding fields object:");
    console.log(JSON.stringify(excluded, null, 2));

    // Include only 'word', 'size', and 'stats' fields
    const included = await words.findOne(
      { word: "the" },
      { projection: { word: 1, size: 1, stats: 1 } }
    );
    console.log("Including fields object:");
    console.log(JSON.stringify(included, null, 2));
  } catch (err) {
    console.error("Query error:", err);
  }
}

main();
