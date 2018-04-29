var dbConnection = require('../../config/dbConnection');

module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/login', function(req, res){
      application.app.controllers.login.pagLogin(application, req, res);
    });

  application.post('/autenticar', function(req, res){
    console.log("ROTA AUTENTICAÇÃO LOGIN");
    var connection = dbConnection();
    //busca no banco de dados
    connection.query('SELECT * FROM noticias', function(error, result){
      res.send(result);
      res.render("login/login", {noticias : result});
    });
    // application.app.controllers.login.autenticar(application, req, res);
  });

}
