module.exports = function(application){
  application.get('/criar_equipe', function(req, res){
    application.app.controllers.criarEquipe.criarEqp(application, req, res);
  });
}
