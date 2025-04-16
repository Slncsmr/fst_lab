var http = require("http");
var url = require("url");

var messages = [
  "We have Lab 1 on Monday",
  "We have Lab 2 on Tuesday",
  "We have Lab 3 on Wednesday",
  "Lab Home Page",
];

http
  .createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);

    var parsedurl = url.parse(req.url);
    var path = parsedurl.pathname;
    if (path == "/") {
      res.write("<html><head><title>Lab Home Page</title></head>");
      res.write("<body>");
      res.write("<h2>" + messages[3] + "</h2>");
      res.write(
        '<button onclick="fetchlab1()" name="Lab1" id="Lab1">Lab1</button>'
      );
      res.write(
        '<button onclick="fetchlab2()" name="Lab2" id="Lab1">Lab2</button>'
      );
      res.write(
        '<button onclick="fetchlab3()" name="Lab3" id="Lab1">Lab3</button>'
      );
      res.write(
        `<script> async function fetchlab1() { const response1 = await fetch('/lab1');}`
      );
      res.write(
        `async function fetchlab2() { const response1 = await fetch('/lab2');}`
      );
      res.write(
        `async function fetchlab3() { const response1 = await fetch('/lab3');}`
      );
      res.write("\n</body></html>");
    }
    if (path == "/lab1") {
      res.write("<html><head><title>Lab 1</title></head>");
      res.write("<body>");
      res.write("<h2>" + messages[0] + "</h2>");
      res.write("\n</body></html>");
    }
    if (path == "/lab2") {
      res.write("<html><head><title>Lab 2</title></head>");
      res.write("<body>");
      res.write("<h2>" + messages[1] + "</h2>");
      res.write("\n</body></html>");
    }
    if (path == "/lab3") {
      res.write("<html><head><title>Lab 3</title></head>");
      res.write("<body>");
      res.write("<h2>" + messages[2] + "</h2>");
      res.write("\n</body></html>");
    }
  })
  .listen(8080);
