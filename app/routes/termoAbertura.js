module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/termo_abertura', function(req, res){
      application.app.controllers.termoAbertura.termoDeAbertura(application, req, res);
    });

    application.get('/criar_termo_abertura', function(req, res){
      application.app.controllers.termoAbertura.criarTermoDeAbertura(application, req, res);
    });
}
