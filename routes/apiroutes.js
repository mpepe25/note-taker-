var router = require('express').Router();
var connection = require('../config/connection');

router.get("/api/getnotes", function(req, res){
   console.log("step 1")

   connection.connect(function(err){
       if (err) throw err;
       console.log("step 2")
       connection.query("SELECT * FROM notes", function(err, result){
           if (err) throw err;
           console.log("step 3")
           console.log("serverside", result)
           res.send(result)
       })
   })
})

router.post("/api/submit", function(req, res){
   console.log(req.body);
   res.json(req.body)
})

module.exports = router;
