// var connection = require('./db/connection')
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

 var routes = require("./controller/notescontroller.js");
 app.use(routes);

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT)
});


  
  

