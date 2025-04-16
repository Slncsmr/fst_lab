const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const users = {
  user1: "password123",
  admin: "adminpass"
};


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login", "login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (users[username] && users[username] === password) {
    res.send(`<h2>Welcome, ${username}!</h2> <a href="/">Logout</a>`);
  } else {
    res.send(`<h2>Invalid credentials!</h2> <a href="/">Try again</a>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});