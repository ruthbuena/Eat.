
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var tableData = require("/js/tables.js");
var waitListData = require("/js/waitingList.js");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

//API get/post code
app.get("/api/tables", function(req, res) {
    res.json(tableArray);
});

app.get("/api/waitList", function(req, res) {
    res.json(waitingList);
});
  
// Create a new reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
	var newReservation = req.body;
   
    if (tableArray.length < 5) {
		tableArray.push(newReservation);
		res.json(newReservation);
    } else {
		waitingList.push(newReservation);
		res.json(newReservation);
    }
});

//Logs the status of the connection
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
