// var dbConnection = require('../../config/dbConnection');

  module.exports = function(application){
  // application.get('/login', function(req, res){
    application.get('/login', function(req, res){
    application.app.controllers.login.pagLogin(application, req, res);
  });

  application.post('/autenticar', function(req, res){
    console.log("ROTA AUTENTICAÇÃO LOGIN");
    //abrir conexão com o banco de dados -bd Mysql
    // var connection = application.config.dbConnection();
    // var loginModel = application.app.models.loginModel; //localiza o model login
    //
    // loginModel.getLogin(connection, function(error, result){
    //   // res.send(result);
    //   console.log("ROTA AUTENTICAÇÃO LOGIN request in MODEL <<<---");
    //   res.render("login/login", {noticias : result} );
    // });
    application.app.controllers.login.autenticar(application, req, res);
  });

}
