module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/termo_abertura', function(req, res){
      application.app.controllers.termoAbertura.termoDeAbertura(application, req, res);
    });

    application.post('/criar_termo_abertura', function(req, res){
      application.app.controllers.termoAbertura.criarTermoDeAbertura(application, req, res);
    });

     application.get('/consultar_termo_abertura', function(req, res){
      application.app.controllers.termoAbertura.consultarTermoDeAbertura(application, req, res);
    });

     application.post('/resposta_termo_abertura', function(req, res){
      application.app.controllers.termoAbertura.respostaTermoDeAbertura(application, req, res);
    });



     
}
