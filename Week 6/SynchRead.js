const fs = require('fs');                                                                                                                                                      
fd = fs.openSync('veggie.txt', 'r');                                                                                                                           
var veggies = "";                                                                                                                                              
do 
{                                                                                                                                                           
    var buf = new Buffer(5);                     // A buffer 5 is created                                                                                                          
    buf.fill();                                  // Fills the buffer upto 5 characters                                                                                                          
    var bytes = fs.readSync(fd, buf, null, 5);   // Returns no of bytes read                                                                                                          
    console.log("read %d bytes", bytes);                                                                                                                    
    veggies += buf.toString();                   //Stores the value IN THE BUFFER                                                                                                         
                                                                                                                                                               
} while (bytes > 0);                                                                                                                                           
fs.closeSync(fd);                                                                                                                                              
console.log("Veggies: " + veggies);                                                                                                    