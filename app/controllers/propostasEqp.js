module.exports.listarPropostasProjeto = function(application, req, res){

  console.log("CONTROLLER - OBTER A LISTA DE PROPOSTAS POR PROJETO");

  var connection = application.config.dbConnection;
  var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
  var projetosPropostas = [];

  projetosDispDAO.verificarProjetosCliente(req.session.idContaUsuario, function(error, result){
    console.log("CALLBACK projetosDispDAO.verificarProjetosCliente");


    if(error){
      throw error;
    } else {
      var i=0;
      var propostaDAO = new application.app.models.propostaDAO(connection);
      console.log("PROJETO(S) RESGATADO(S) COM SUCESSO");
      console.log(JSON.stringify(result));

      for(i=0; i<result.length; i++){
        var idProjeto = result[i].idProjeto;
        var nomeProjeto = result[i].nomeProjeto;
        console.log("%%%%%%%%%%%%%%% idProjeto = "+idProjeto);
        var projeto = JSON.parse('{"idProjeto": "'+idProjeto+'", "nomeProjeto": "'+nomeProjeto+'", "propostas": "null" }');

        propostaDAO.obterPropostasProjeto(idProjeto, function(error,result){

          if(error){
            throw error;
          } else {
            console.log("PROPOSTA(S) DO PROJETO RESGATADA(S) COM SUCESSO");
            console.log(JSON.stringify(result));
            projeto.propostas = result;
            console.log("result = "+JSON.stringify(result)+"\n");
            console.log("projeto.propostas = "+JSON.stringify(projeto.propostas)+"\n");
            projetosPropostas.push(projeto);

            console.log("projetosPropostas = "+JSON.stringify(projetosPropostas));

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



    }
  });

}

module.exports.enviarRespostaProposta = function(application, req, res){
  console.log("===req.body==>>>"+req.body);
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
module.exports.aprovarProposta = function(application, req, res){
  var connection = application.config.dbConnection;
  var propostaDAO = new application.app.models.propostaDAO(connection);
  console.log("==@@@@@@@@@@@2req  "+JSON.stringify(req.body));
  console.log("IDPROJETOOOOOOO!!!!@@@"+res.idProjeto);
  propostaDAO.aprovarProp(req, function(error, result){

    if(error){
      throw error;
    } else {
      console.log("RESPOSTA ENVIADA COM SUCESSO!");
      res.send("RESPOSTA ENVIADA COM SUCESSO!");
    }
  });
}
