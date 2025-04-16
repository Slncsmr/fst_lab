const express = require('express');                                                                                                                            
const bodyParser = require('body-parser');
const http = require('http');                                                                                                                     

const app = express();                                                                                                                                         
const port = 8000;                                                                                                                                             

app.use(bodyParser.json());                                                                                                                                    
app.use(bodyParser.urlencoded({extended: true}));                                                                                                              

app.get("/", (req, res) => {                                                                                                                                   
    res.sendFile('/home/fullstacklab/Desktop/FST - 2023103034/Week 8/lab/k.html');                                                                                     
    console.log('get');                                                                                                                                        
});
app.get("/lab1", (req, res) => {                                                                                                                                   
    res.json("/home/fullstacklab/Desktop/FST - 2023103034/Week 8/lab/data1.json")                                                                                  
    console.log('get');                                                                                                                                        
});

app.listen(port, () => {                                                                                                                                       
    console.log(`test listening on port ${port}`);                                                                                                             
});