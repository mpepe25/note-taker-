var express = require("express");
var path = require("path")
var router = express.Router();

// Import the model (model.js) to use its database functions.
var model = require("../models/model.js");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Create all our routes and set up logic within those routes where required.
router.get("/api/data", function(req, res) {
  model.all(function(data) {
    res.json(data);
  });
});

router.post("/api/notes", function(req, res) {
  console.log(req.body)
  model.create([
    "title", "body"
  ], [
    req.body.title, req.body.body
  ], function(result) {
    // Send back the ID of the new quote
    res.redirect("/")
  });
});

router.put("/api/notes/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  model.update({
    title: req.body.title
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.post("/api/delete", function(req, res) {
  model.deleteAll(function(result){
    res.redirect("/")
  })
});

router.delete('/api/remove', function(req, res){
  model.delete(function (resp){
    res.end();
  })
})



module.exports = router;
