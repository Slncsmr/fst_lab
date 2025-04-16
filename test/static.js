const express = require("express");
const path = require("path");

const app = express();
const PORT = 3500;

app.use(express.static("public1"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "static.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});