module.exports.listarPropostasProjeto = function(application, req, res){

  console.log("CONTROLLER - OBTER A LISTA DE PROPOSTAS POR PROJETO");

  var connection = application.config.dbConnection;
  var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
  var projetosPropostas = [];

  projetosDispDAO.projetosDisponiveis(req, function(error, result){
    console.log("CALLBACK projetosDispDAO.projetosDisponiveis");


    if(error){
      throw err;
    } else {
      var i=0;
      var propostaDAO = new application.app.models.propostaDAO(connection);
      console.log("PROJETO(S) RESGATADO(S) COM SUCESSO");
      console.log(JSON.stringify(result));

      for(i=0; i<result.length; i++){
        var idProjeto = result[i][0];
        var nomeProjeto = result[i][4];
        console.log("idProjeto = "+idProjeto);
        var projeto = JSON.parse('{"idProjeto": "'+idProjeto+'", "nomeProjeto": "'+nomeProjeto+'"   "propostas": "null" }');

        propostaDAO.obterPropostasProjeto(idProjeto, function(error,result){

          if(error){
            throw error;
          } else {
            console.log("PROPOSTA(S) DO PROJETO RESGATADA(S) COM SUCESSO");
            console.log(JSON.stringify(result));
            projeto.propostas = result;
            projetosPropostas.push(projeto);
          }

        });

      }

      res.render("includes/propostasEqp", {
        sessionNomeUsuario: req.session.nomeUsuario,
        sessionNomeTipoUsuario: req.session.tipoUsuario,
        data: projetosPropostas,
        notificacao: req.session.notificacoes,
        layout: 'includes/layoutIncludes'
      });

    }
  });

}

module.exports.enviarRespostaProposta = function(application, req, res){

  var connection = application.config.dbConnection;
  var propostaDAO = new application.app.models.propostaDAO(connection);

  propostaDAO.enviarRespostaProp(req, function(error, result){

    if(error){
      throw error;
    } else {
      console.log("RESPOSTA ENVIADA COM SUCESSO!");

      res.send("RESPOSTA ENVIADA COM SUCESSO!");

    }

  });


}