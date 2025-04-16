const { MongoClient } = require('mongodb');                                                                                                             
                                                                                                                                                        
async function groupItems(collection) {                                                                                                                 
  // 1. 'O' words grouped by first and last letter that end with a vowel                                                                                
  const oVowelGroup = await collection.aggregate([                                                                                                      
    {                                                                                                                                                   
      $match: {                                                                                                                                         
        first: 'o',                                                                                                                                     
        last: { $in: ['a', 'e', 'i', 'o', 'u'] }                                                                                                        
      }                                                                                                                                                 
    },                                                                                                                                                  
    {                                                                                                                                                   
      $group: {                                                                                                                                         
        _id: { first: "$first", last: "$last" },                                                                                                        
        count: { $sum: 1 }                                                                                                                              
      }                                                                                                                                                 
    }                                                                                                                                                   
  ]).toArray();                                                                                                                                         
                                                                                                                                                        
  console.log("\n'O' words grouped by first and last letter that end with a vowel:");                                                                   
  console.log(oVowelGroup);                                                                                                                             
                                                                                                                                                        
  // 2. Words grouped by first letter where size > 13, summing vowels                                                                                   
  const largeWordsVowelStats = await collection.aggregate([                                                                                             
    { $match: { size: { $gt: 13 } } },                                                                                                                  
    {                                                                                                                                                   
      $group: {                                                                                                                                         
        _id: "$first",                                                                                                                                  
        count: { $sum: 1 },                                                                                                                             
        totalVowels: { $sum: "$stats.vowels" }                                                                                                          
      }                                                                                                                                                 
    }                                                                                                                                                   
  ]).toArray();                                                                                                                                         
                                                                                                                                                        
  console.log("\nWords grouped by first letter larger than 13:");                                                                                       
  console.log(largeWordsVowelStats);                                                                                                                    
                                                                                                                                                        
  // 3. Words grouped by first letter with vowel/consonant totals                                                                                       
  const vowelConsonantTotals = await collection.aggregate([                                                                                             
    {                                                                                                                                                   
      $group: {                                                                                                                                         
        _id: "$first",                                                                                                                                  
        count: { $sum: 1 },                                                                                                                             
        vowels: { $sum: "$stats.vowels" },                                                                                                              
        consonants: { $sum: "$stats.consonants" }                                                                                                       
      }                                                                                                                                                 
    },                                                                                                                                                  
    {                                                                                                                                                   
      $addFields: {                                                                                                                                     
        total: { $add: ["$vowels", "$consonants"] }                                                                                                     
      }                                                                                                                                                 
    }                                                                                                                                                   
  ]).toArray();                                                                                                                                         
                                                                                                                                                        
  console.log("\nWords grouped by first letter with totals:");                                                                                          
  console.log(vowelConsonantTotals);                                                                                                                    
}                                                                                                                                                       
                                                                                                                                                        
async function main() {                                                                                                                                 
  const client = new MongoClient("mongodb://localhost/");                                                                                               
  try {                                                                                                                                                 
    await client.connect();                                                                                                                             
    const db = client.db("words");                                                                                                                      
    const collection = db.collection("word_stats");                                                                                                     
                                                                                                                                                        
    await groupItems(collection);                                                                                                                       
  } catch (err) {                                                                                                                                       
    console.error("Error:", err);                                                                                                                       
  } finally {                                                                                                                                           
    await client.close(); // Always clean up                                                                                                            
  }                                                                                                                                                     
}                                                                                                                                                       
                                                                                                                                                        
main();    