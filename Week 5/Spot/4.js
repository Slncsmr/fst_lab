var fs = require("fs");
fs.readFile('input.txt', (err, data) => {
if (err) return console.error(err);
console.log(data.toString());
});
let i = 1;
while (i <=5) {
console.log("The number is " + i);
i++;
}