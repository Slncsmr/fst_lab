function add(a,b)
{
    return a+b;
}

function sub(a,b)
{
    return a-b;
}

function multiply(a,b)
{
    return a*b;
}

function divide(a,b)
{
    if(b==0)
    {
        comsole.log("The value can't be 0")
    }
    else
    {
        return a/b;
    }
}

module.exports={add,sub,multiply,divide}
