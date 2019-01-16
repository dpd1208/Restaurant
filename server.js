// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var openTables = [];
var waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(openTables);
});

// Displays a single character, or returns false
app.get("/api/waitlist", function(req, res) {
    return res.json(waitList);
});

// Create New Table - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

  console.log(newReservation);
  if (openTables.length <= 4) {
  openTables.push(newReservation);
  } else {waitList.push(newReservation);
  }

  res.json(newReservation);
});

app.post("/api/clear", function(req, res) {
openTables = [];
waitList = [];
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
