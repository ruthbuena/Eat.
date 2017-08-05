
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var tableData = require("./js/tables.js");
var waitlistData = require("./js/waitingList.js");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/", function(req, res) {
	console.log(path.join(__dirname, "/SiteFiles/booking.html"));
  res.sendFile(path.join(__dirname, "/SiteFiles/booking.html"));

});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/SiteFiles/tables.html"));
});

//API get/post code
app.get("/api/tables", function(req, res) {
    res.json(tableData);
});

app.get("/api/waitList", function(req, res) {
    res.json(waitinglistData);
});
  
// Create a new reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
	var newReservation = req.body;
   
    if (tableArray.length < 5) {
		tableData.push(newReservation);
		res.json(newReservation);
    } else {
		waitinglistData.push(newReservation);
		res.json(newReservation);
    }
});

//Logs the status of the connection
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
