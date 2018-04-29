module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/login', function(req, res){
      application.app.controllers.login.pagLogin(application, req, res);
    });

  application.post('/autenticar', function(req, res){
    console.log("ROTA AUTENTICAÇÃO LOGIN");
    application.app.controllers.login.autenticar(application, req, res);
  });

}
