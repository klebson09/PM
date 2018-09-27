module.exports = function(application){
  application.get('/propostas_projeto', function(req, res){
    application.app.controllers.propostasEqp.listarPropostasProjeto(application, req, res);
  });

  application.post('/enviar_resposta_proposta', function(req, res){
    application.app.controllers.propostasEqp.enviarRespostaProposta(application, req, res);
  });

}
