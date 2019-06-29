// var dbConnection = require('../../config/dbConnection');

  module.exports = function(application){
    application.get('/login', function(req, res){
    console.log("**************************** login:rota - login  *********************************************");
    application.app.controllers.login.pagLogin(application, req, res);
  });

  application.post('/autenticar', function(req, res){
    console.log("**************************** login:rota - autenticar  *********************************************");
    application.app.controllers.login.autenticar(application, req, res);
  });

   application.get('/recuperar_senha', function(req, res){
      console.log("**************************** login:rota - recuperar_senha  *********************************************");
      application.app.controllers.login.recuperarSenha(application, req, res);
   });

   application.post('/recuperacao_senha', function(req, res){
    console.log("**************************** login:rota - recuperacao_senha  *********************************************");
    application.app.controllers.login.recuperacaoSenha(application, req, res);
   });

  application.get('/alterar_senha', function(req, res){
      console.log("**************************** login:rota - alterar_senha  *********************************************");
      application.app.controllers.login.alterarSenha(application, req, res);
   });

   application.post('/alteracao_senha', function(req, res){
    console.log("**************************** login:rota - alteracao_senha  *********************************************");
    application.app.controllers.login.alteracaoSenha(application, req, res);
   });

}
