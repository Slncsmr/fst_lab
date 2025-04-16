function simpleTimeout(consoleTimer)                                                                                                                           
{                                                                                                                                                              
    console.timeEnd(consoleTimer);                                                                                                                    
}                                                                                                                                                              
//Runs after 2 seconds                                                                                                                                                               
console.time("twoSecond");                                                                                                                                     
setTimeout(simpleTimeout, 2000, "twoSecond");                                                                                                                  
//Runs after 1 seconds                                                                                                                                                                 
console.time("oneSecond");                                                                                                                                     
setTimeout(simpleTimeout, 1000, "oneSecond");                                                                                                                  
//Runs after 5 seconds                                                                                                                                                                  
console.time("fiveSecond");                                                                                                                                    
setTimeout(simpleTimeout, 5000, "fiveSecond");                                                                                                                 
//Runs after 50 Milliseconds                                                                                                                                                                 
console.time("50MilliSecond");                                                                                                                                 
setTimeout(simpleTimeout, 50, "50MilliSecond");                                                                                                                