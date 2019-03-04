
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//Create instance of express and instantiate bodyParser and cors.
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

//GET call returning JSON object representing date and time.
app.get('/api/timestamp/:date?', (req, res, next) =>{
  //Create date object from parameter.
  var d = new Date(req.params.date);

  //If parameter is left out, JSON representing today's date returned.
  if(req.params.date===undefined){
    //Today's date
    d = new Date();
    //Expressed "naturally"
    let dateStr = d.toUTCString();
    //Expressed in unix.
    let dateUnix = d.getTime()/1000;
    res.json({unix : dateUnix, natural : dateStr});
  }
  //Handles case where d is a standard date, e.g. (.../api/timestamp/2019-01-01)
  else if(d instanceof Date && !isNaN(d)){
    console.log("in correct if statement");
    let dateStr = d.toUTCString();
    let dateUnix = d.getTime()/1000;
    res.json({unix : dateUnix, natural : dateStr});
  }
  //Handles case where unix value is passed
  else if (!isNaN(new Date(parseFloat(req.params.date)))){
    d = new Date(parseFloat(req.params.date));
    let dateStr = d.toUTCString();
    let dateUnix = d.getTime()/1000;
    res.json({unix : dateUnix, natural : dateStr});
  }
  //Otherwise date is invalid.
  else {
    res.json({"unix": null, "utc" : "Invalid Date" })
  }



});






app.listen(3000, () => {
  
});
