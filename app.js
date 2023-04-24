const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];

app.post("/api/v1/people", (req, res) => {
  const { name, age } = req.body;
  if (name && age) {
    if (age > 0) {
      people.push({ name, age });
      res.status(201).json({
        message: "a person entry was added",
        index: people.length - 1,
      });
    } else {
      res.status(400).json({
        message: "the age must be non negative",
      });
    }
  } else if (age) {
    res.status(400).json({
      error: "Please enter a name.",
    });
  }
});

app.get("/api/v1/people", (req, res) => {
  res.status(200).json({
    data: people,
  });
});

app.get("/api/v1/people/:id", (req, res) => {
  const id = req.params.id;
  const person = people[id];
  if (id >= people.length) {
    res.status(404).json({
      message: "out of range",
    });
  } else {
    res.status(200).json({
      person,
    });
  }
});

app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

let server;
if (require.main === module) {
  server = app.listen(3000, () => {
    console.log("listening on port 3000...");
  });
}
module.exports = { app, server, people };
