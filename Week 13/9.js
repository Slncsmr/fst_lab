const { MongoClient } = require("mongodb");                                                                                                             
                                                                                                                                                        
async function aggregateItems(collection) {                                                                                                             
  // 1. Largest and smallest word sizes for words beginning with a vowel                                                                                
  const vowelStats = await collection.aggregate([                                                                                                       
    { $match: { first: { $in: ['a', 'e', 'i', 'o', 'u'] } } },                                                                                          
    {                                                                                                                                                   
      $group: {                                                                                                                                         
        _id: "$first",                                                                                                                                  
        largest: { $max: "$size" },                                                                                                                     
        smallest: { $min: "$size" },                                                                                                                    
        total: { $sum: 1 }                                                                                                                              
      }                                                                                                                                                 
    },                                                                                                                                                  
    { $sort: { _id: 1 } }                                                                                                                               
  ]).toArray();                                                                                                                                         
                                                                                                                                                        
  console.log("\nLargest and smallest word sizes for words beginning with a vowel:");                                                                   
  console.log(vowelStats);                                                                                                                              
                                                                                                                                                        
  // 2. Stats for 5 four-letter words                                                                                                                   
  const fourLetterStats = await collection.aggregate([                                                                                                  
    { $match: { size: 4 } },                                                                                                                            
    { $limit: 5 },                                                                                                                                      
    { $project: { _id: "$word", stats: 1 } }                                                                                                            
  ]).toArray();                                                                                                                                         
                                                                                                                                                        
  console.log("\nStats for 5 four-letter words:");                                                                                                      
  console.log(fourLetterStats);                                                                                                                         
                                                                                                                                                        
  // 3. Letters with largest average word size                                                                                                          
  const largestAverages = await collection.aggregate([                                                                                                  
    { $group: { _id: "$first", average: { $avg: "$size" } } },                                                                                          
    { $sort: { average: -1 } },                                                                                                                         
    { $limit: 5 }                                                                                                                                       
  ]).toArray();                                                                                                                                         
                                                                                                                                                        
  console.log("\nLetters with largest average word size:");                                                                                             
  console.log(largestAverages);                                                                                                                         
}                                                                                                                                                       
                                                                                                                                                        
async function main() {                                                                                                                                 
  const client = new MongoClient("mongodb://localhost/");                                                                                               
  try {                                                                                                                                                 
    await client.connect();                                                                                                                             
    const db = client.db("words");                                                                                                                      
    const collection = db.collection("word_stats");                                                                                                     
                                                                                                                                                        
    await aggregateItems(collection);                                                                                                                   
  } catch (err) {                                                                                                                                       
    console.error("Error:", err);                                                                                                                       
  } finally {                                                                                                                                           
    await client.close(); // Safely close the connection when everything is done                                                                        
  }                                                                                                                                                     
}                                                                                                                                                       
                                                                                                                                                        
main();                                             