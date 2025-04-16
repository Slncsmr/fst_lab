//Create a class named Events
var events = require('events');                                                                                                                                

//Create a class named Account                                                                                                                                                               
function Account()                                                                                                                                                                                                                                                                                                          
{
    this.balance = 0;
    //Object Instantiation
    events.EventEmitter.call(this);                                                                                                                   
    this.deposit = function(amount)                                                                                                                   
    {                                                                                                                                                 
        this.balance += amount;
        //Updates the change                                                                                                          
        this.emit('balanceChanged');                                                                                                      
    };                                                                                                                                    
                                                                                                                                                               
    this.withdraw = function(amount)
    {
        this.balance -= amount;                                                                                                           
        //Updates the change 
        this.emit('balanceChanged');                                                                                                      
    };                                                                                                                                    
                                                                                                                                                               
}                                                                                                                                                    
//Object Prototype                                                                                                                                                               
Account.prototype.__proto__ = events.EventEmitter.prototype;                                                                                                  
                                                                                                                                                               
function displayBalance()                                                                                                                                     
{
    console.log("Account balance: $%d", this.balance);                                                                                                
}                                                                                                                                                    
                                                                                                                                                               
function checkOverdraw()                                                                                                                                      
{
    if (this.balance < 0)
    {
        console.log("Account overdrawn!!!");                                                                                      
    }                                                                                                                             
}                                                                                                                                                    
                                                                                                                                                               
function checkGoal(acc, goal)                                                                                                                                 
{
    if (acc.balance > goal)                                                                                                                           
    {
        console.log("Goal Achieved!!!");                                                                                          
    }                                                                                                                             
}                                                                                                                                                             
                                                                                                                                                               
var account = new Account();
//WHEN balanceChanged runs the following function code runs
account.on("balanceChanged", displayBalance);                                                                                                                  
account.on("balanceChanged", checkOverdraw);                                                                                                                   
account.on("balanceChanged", function()                                                                                                                        
{
    checkGoal(this, 1000);                                                                                                                     
});

//Actual code 
account.deposit(220);                                                                                                                                                                                                                                                                                                        
account.deposit(320);                                                                                                                                         
account.deposit(600);                                                                                                                                                                                                                                                                                         
account.withdraw(1200);                                                                                                                                        