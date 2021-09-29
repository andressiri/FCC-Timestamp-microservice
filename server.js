// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// request to /api with an empty parameter
app.get("/api/:date?", function (req, res) {
  const date = new Date();
  const reqDate = req.params.date;
  if (reqDate) {
    const isAUnixTimestamp = Number(reqDate);
    console.log(isAUnixTimestamp);
    if ((isNaN(isAUnixTimestamp) == false) && 
       (isAUnixTimestamp >= -8.64e12 && isAUnixTimestamp <= 8.64e12)) {
        date.setTime(isAUnixTimestamp);
    } else if (isNaN(Date.parse(reqDate)) == true) {
      return res.json({"error":"Invalid Date"});
    } else {
      date.setTime(Date.parse(reqDate));
    };
  };
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
