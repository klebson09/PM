module.exports.criarEqp = function(application, req, res){
  // res.render("includes/criarEquipe", {validacao:{}});
  if (req.session.autenticado) {
    console.log("criarEqp");
    var connection = application.config.dbConnection;
    var UsuarioDAO = new application.app.models.UsuarioDAO(connection);
    var resultadoDEV = [];
    var resultadoTutor = [];

    UsuarioDAO.obterMembrosEquipe(function(erro, resultadoD){
      console.log("callback obter membros equipe");
      if(erro){
        throw erro;
      } else {
          console.log("DEVs - "+JSON.stringify(resultadoD));
          resultadoDEV = resultadoD;
          console.log("Vai pegar o tutor");
          UsuarioDAO.obterTutores(function(erro,resultadoT){
              if(erro){
                throw error;
              } else {
                console.log("Tutores - "+JSON.stringify(resultadoT));
                resultadoTutor = resultadoT;
                console.log("Vai responder");
                res.render("includes/criarEqp3", {
                  sessionNomeUsuario: req.session.nomeUsuario,
                  sessionNomeTipoUsuario: req.session.tipoUsuario,
                  notificacao: req.session.notificacoes,
                  dataDEV: JSON.stringify(resultadoDEV),
                  dataTutor: resultadoTutor,
                  layout: 'includes/layoutIncludes'
                  });
              }
          })
      }
    });


  }else {
    res.render('login/login', {validacao: {}});
  }

}

module.exports.criarEqp2 = function(application, req, res){
  // res.render("includes/criarEquipe", {validacao:{}})

  var connection = application.config.dbConnection;
  var UsuarioDAO = new application.app.models.UsuarioDAO(connection);

  UsuarioDAO.obterMembrosEquipe(function(erro, resultado){
    if(erro){
      throw erro;
    } else {
        console.log(JSON.stringify(resultado));
        res.render("includes/criarEqp2", { data: JSON.stringify(resultado)});
    }
  });
}

module.exports.cadastrarEquipe = function(application, req, res){

    var equipe = req.body;
    var connection = application.config.dbConnection;
    console.log("criarEquipe:CadEquipe - connection criada");
    var equipeDAO = new application.app.models.EquipeDAO(connection);
    var usuarioDAO = new application.app.models.UsuarioDAO(connection);


    equipeDAO.cadEquipe(equipe, req.session.idContaUsuario ,function(erro, resultado){
      if(erro){
        throw erro;
      } else {
          console.log("criarEquipe:CadEquipe - Equipe cadastrada com sucesso");
          var idEquipe = resultado.insertId;
          var idTutor = equipe.tutor;
          req.session.idEquipe = idEquipe;

          equipeDAO.cadMembrosEquipe(equipe.membrosEquipe, idEquipe, function(erro,resultado){
            if(erro){
              throw erro;
            } else {
              console.log("criarEquipe:CadEquipe - Membros adicionados a equipe");

              var timelineDAO = new application.app.models.TimelineDAO(connection);
              var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);

              //Obtendo dados do tutor
              console.log("criarEquipe:CadEquipe - Obtendo dados do tutor");
              usuarioDAO.obterContaUsuario(idTutor, function(error, resultObterContaUsuario){

                if(error){
                  throw error;
                } else {
                  console.log("criarEquipe:CadEquipe - resultObterContaUsuario "+ JSON.stringify(resultObterContaUsuario));
                  timelineDAO.timelineEquipeVinculadaTutor(resultObterContaUsuario[0], equipe, function(error, resultTimelineEquipeVinculadaTutor){
                    if(error){
                      throw error;
                    } else {
                      console.log("criarEquipe:CadEquipe - mensagem para tutor criada com sucesso ");
                      equipeDAO.obterDadosEquipe(idEquipe, function(error, resultObterDadosEquipe){

                        if(error){
                          throw error;
                        } else {
                          console.log("Dados de equipe obtidos com sucesso");

                          timelineDAO.timelineCriarEquipe(resultObterDadosEquipe[0], function(error, resultTimelineCriarEquipe){
                            if(error){
                              throw error;
                            } else {
                              timelineDAO.timelineObterMsgsEquipe(req.session.idEquipe, req.session.idContaUsuario, function(error, resultTimelineObterMsgsEquipe){
                                if(error){
                                  throw error;
                                } else {              
                                   timeLineAnalisador.tratarMsgs(resultTimelineObterMsgsEquipe, function(msgs){
                                   req.session.msgsTimeline = msgs;
                                   console.log("criarEquipe.js:cadastrarEquipe - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))



                                    res.render("includes/timeLine", {
                                      sessionNomeUsuario: req.session.nomeUsuario,
                                      sessionNomeTipoUsuario: req.session.tipoUsuario,
                                      notificacao: req.session.notificacoes,
                                      data: req.session.msgsTimeline,
                                      layout: 'includes/layoutIncludes'
                                   });

                                });             
                              }
                            });
                            }
                          })

                        }

                      });
                    }
                  });
                }

              });
            }
          })
      }

    });

}
