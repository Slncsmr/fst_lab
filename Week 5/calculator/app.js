const cal=require('./cal.js')

var a=10;
var b=2;

console.log(a,`+`,b,`=`,cal.add(a,b));
console.log(a,`-`,b,`=`,cal.sub(a,b));
console.log(a,`*`,b,`=`,cal.multiply(a,b));
console.log(a,`/`,b,`=`,cal.divide(a,b));