// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var model = {
  all: function(cb) {
    orm.all("notes", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("notes", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("notes", objColVals, condition, function(res) {
      cb(res);
    });
  },

  // delete: function(condition, cb) {
  //   orm.delete("notes", condition, function(res) {
  //     cb(res);
    // });

    delete: function(cb){
      orm.deletecurrent(function (res){
        cb(res)
      })
    },
  
  deleteAll: function(cb){
    orm.deleteAll("notes", function(res){
      cb(res)
    })
  }
};

// Export the database functions for the controller (notescontroller.js).
module.exports = model;
