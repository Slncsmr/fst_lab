const { MongoClient } = require("mongodb");

async function main() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    await client.connect();
    const myDB = client.db("words");
    const collection = myDB.collection("word_stats");

    await distinctValues(collection);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    setTimeout(() => {
      client.close();
    }, 3000);
  }
}

async function distinctValues(words) {
  try {
    const sizes = await words.distinct("size");
    console.log("\nSizes of words:");
    console.log(sizes);

    const firstLetters = await words.distinct("first", { last: "u" });
    console.log("\nFirst letters of words ending in 'u':");
    console.log(firstLetters);

    const vowelsCounts = await words.distinct("stats.vowels");
    console.log("\nNumbers of vowels contained in words:");
    console.log(vowelsCounts);
  } catch (err) {
    console.error("Error in distinctValues:", err);
  }
}

main();
