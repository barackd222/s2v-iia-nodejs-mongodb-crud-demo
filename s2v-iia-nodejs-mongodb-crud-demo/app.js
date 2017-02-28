var express = require('express');  
var app = express();

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/myTestDB');


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


require('./router')(app); 


var port = 3000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
});


module.exports = app;