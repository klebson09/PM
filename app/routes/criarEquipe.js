module.exports = function(application){
  application.get('/criar_equipe', function(req, res){
    application.app.controllers.criarEquipe.criarEqp(application, req, res);
  });

  application.post('/criar_equipe_post', function(req, res){
    var dadosFormEquipe = req.body; // pega as informações do formulário
    // application.app.controllers.criarEquipe.criarEqp(application, req, res);
    // console.log("ROTA criar equipe POST  <<<---");
    // console.log(req.body.nomeEquipe);// forma de pegar o elemento do input
    // res.send(dadosFormEquipe);
      // application.app.controllers.criarEquipe.criarEqp(application, req, res);
    var connection = application.config.dbConnection();
    var criarEquipeModel = application.app.models.criarEquipeModel;

    criarEquipeModel.cadastrarEquipe(dadosFormEquipe, connection, function(error, result){
      // res.send(result);
      console.log("ROTA criar equipe POST  <<<---");
      res.redirect('/');
      // res.render("includes/criarEqp");
    });

  });
}
