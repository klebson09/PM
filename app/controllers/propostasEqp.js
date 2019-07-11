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
              nomeProj: nomeProjeto,
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
 console.log("IDPROJETOOOOOOO!!!!@@@"+req.body.idProjeto);
 console.log("IDEQUIPE!!!!@@@"+req.body.idEquipe);
 var nomeEquipe = req.body.nomeEquipe;
 var nomeProjeto = req.body.nomeProjeto;
 propostaDAO.aprovarProp(req, function(error, result){

    if(error){
      throw error;
    } else {
      console.log("RESPOSTA ENVIADA COM SUCESSO!");
      //res.send("RESPOSTA ENVIADA COM SUCESSO!");

      var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
      var timelineDAO = new application.app.models.TimelineDAO(connection);
      var timelineAnalisador = new application.app.models.timeLineAnalisador(connection);

      console.log("propostasEqp:aprovarProposta - atualizando status do projeto...");

      if(req.body.status == "Aprovada"){
        console.log("propostasEqp:aprovarProposta - PROPOSTA APROVADA - STATUS DO PROJETO SERA ATUALIZADO");
        projetosDispDAO.atualizarStatusProjeto(req.body.idProjeto, req.body.idEquipe ,"Em Negociação" ,function(error, resultAtualizarStatusProjeto){

          if(error){
            throw error;
          } else {

             console.log("propostasEqp:aprovarProposta - Status do projeto atualizado com sucesso!");

             projetosDispDAO.consultarProjetoEquipe(req.body.idProjeto, function(error, resultConsultarProjetoEquipe){

                if(error){
                  throw error;
                } else {
                  var dadosProjetoEquipe = resultConsultarProjetoEquipe[0];
                  console.log("propostasEqp:aprovarProposta - PROPOSTA APROVADA nomeProjeto = "+dadosProjetoEquipe.nomeProjeto);
                  console.log("propostasEqp:aprovarProposta - PROPOSTA APROVADA nomeEquipe = "+dadosProjetoEquipe.nomeEquipe);

                  timelineDAO.timelineAprovarProposta(dadosProjetoEquipe.nomeEquipe, req.session.idContaUsuario, function(error, resultTimelineAprovarProposta){

                    if(error){
                      throw error;
                    } else {
                      timelineDAO.timelinePropostaAprovada(dadosProjetoEquipe.nomeProjeto, req.body.idEquipe, function(error, resultTimelinePropostaAprovada){

                        if(error){
                          throw error;
                        } else{
                           var data = {
                             resultado: "2",
                             mensagem: "PROPOSTA APROVADA COM SUCESSO"
                        }

                      console.log("APROVADA - ENVIANDO RESPOSTA A VIEW!!!!!!!!!!!!!!!!!!!!!!!")
                      res.send(data);     
                         /* timelineDAO.  timelineObterMsgs(req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
                            if(error){
                              throw error;
                            } else {
                              var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);
                              timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
                                req.session.msgsTimeline = msgs;
                                console.log("propostasEqp.js:aprovarProposta - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
                                res.render("includes/timeLine", {
                                  sessionNomeUsuario: req.session.nomeUsuario,
                                  sessionNomeTipoUsuario: req.session.tipoUsuario,
                                  notificacao: req.session.notificacoes,
                                  data: req.session.msgsTimeline,
                                  layout: 'includes/layoutIncludes'
                                });
                              });
                            }
                          });*/
                        }

                      });
                    }

                  });


                }

             })

          }

        });
      } else {
        console.log("propostasEqp:aprovarProposta - PROPOSTA RECUSADA - STATUS DO PROJETO NÃO SERA ATUALIZADO");
      
        console.log("propostasEqp:aprovarProposta - PROPOSTA RECUSADA nomeProjeto = "+nomeProjeto);
        console.log("propostasEqp:aprovarProposta - PROPOSTA RECUSADA nomeEquipe = "+nomeEquipe);

        timelineDAO.timelineRecusarProposta(nomeEquipe, req.session.idContaUsuario, function(error, resultTimelineAprovarProposta){
            if(error){
                 throw error;
               } else {
                 timelineDAO.timelinePropostaRecusada(nomeProjeto, req.body.idEquipe, function(error, resultTimelinePropostaAprovada){

                   if(error){
                     throw error;
                   } else{
                    var data = {
                        resultado: "3",
                        mensagem: "PROPOSTA RECUSADA"
                    }
  
                      console.log("RECUSADO - ENVIANDO RESPOSTA A VIEW!!!!!!!!!!!!!!!!!!!!!!!")
                      res.send(data);  
                   /*
                     timelineDAO.timelineObterMsgs(req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
                       if(error){
                         throw error;
                       } else {
                         var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);
                         timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
                           req.session.msgsTimeline = msgs;
                           console.log("propostasEqp.js:aprovarProposta - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
                           res.render("includes/timeLine", {
                             sessionNomeUsuario: req.session.nomeUsuario,
                             sessionNomeTipoUsuario: req.session.tipoUsuario,
                             notificacao: req.session.notificacoes,
                             data: req.session.msgsTimeline,
                             layout: 'includes/layoutIncludes'
                           });
                         });
                       }
                     });*/
                   }

                 });
               }

             });


           

        


      }
    }
  });
}
