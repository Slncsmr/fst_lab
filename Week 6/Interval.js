var x=0, y=0, z=0;                                                                                                                                             
function displayValues()                                                                                                                                      
{
    console.log("X=%d; Y=%d; Z=%d", x, y, z);                                                                                                         
}                                                                                                                                                             
function updateX()                                                                                                                                            
{                                                                                                                                                             
    x += 1;                                                                                                                                           
}                                                                                                                                                             
function updateY()                                                                                                                                            
{                                                                                                                                                              
    y += 1;                                                                                                                                            
}                                                                                                                                                              
function updateZ()                                                                                                                                            
{                                                                                                                                                             
    z += 1;                                                                                                                                              
    displayValues();                                                                                                                                     
}
//Updates every 0.5 sec                                                                                                                                                            
setInterval(updateX, 500);
//Updates every 1 sec                                                                                                                                    
setInterval(updateY, 1000);
//Updates every 0.2 sec                                                                                                                                     
setInterval(updateZ, 200); 

//Prints values every time when z updates