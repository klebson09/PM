module.exports = function(application){
  application.get('/criar_equipe', function(req, res){
    application.app.controllers.criarEquipe.criarEqp(application, req, res);
  });

  application.get('/criarEqp2', function(req, res){
    application.app.controllers.criarEquipe.criarEqp2(application, req, res);
  });

  application.post('/criar_equipe_post', function(req, res){
    console.log(req.body);
    application.app.controllers.criarEquipe.cadastrarEquipe(application, req, res);
  });

    application.get('/visualizar_equipe', function(req, res){
      console.log("**************************** rota criarEquipe:visualizar_equipe  *********************************************");
    application.app.controllers.criarEquipe.visualizarEquipe(application, req, res);
  });

}
