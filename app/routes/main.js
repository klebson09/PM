// var dbConnection = require('../../config/dbConnection');

  module.exports = function(application){
  // application.get('/login', function(req, res){
    application.get('/main', function(req, res){
    application.app.controllers.main.pagMain(application, req, res);
  });



}
