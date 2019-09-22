module.exports.cadTutor = function(application, req, res){
  console.log("controllers de cadTutor");
	res.render("cadastros/cadastroTutor", {validacao: {}});
}

module.exports.cadastrar = function(application, req, res){
	console.log("------- Controller de cadastrar Tutor ------");
	var dadosFormCadastroTutor = req.body;
	console.log(dadosFormCadastroTutor);
	var connection = application.config.dbConnection;
	var TutorDAO = new application.app.models.TutorDAO(connection);
  var usuarioDAO = new application.app.models.UsuarioDAO(connection);
	var timelineDAO = new application.app.models.TimelineDAO(connection);
	var usuarioDAO = new application.app.models.UsuarioDAO(connection);
	console.log("connection = "+connection);
	console.log("TutorDAO = "+TutorDAO);

	var cryptoPM = new application.app.models.CryptoPM();

	console.log("cadastroTutor:cadastrar - iniciando encriptação...")
  dadosFormCadastroTutor.senha = cryptoPM.crypt(dadosFormCadastroTutor.senha);
  console.log("cadastroTutor:cadastrar - dados encriptados =  "+dadosFormCadastroTutor.senha);

  usuarioDAO.verificarEmailUsuario(dadosFormCadastroTutor.email, function(error, resultVerificarEmailUsuario){

    if(error){
        throw error;
    } else {
      if(resultVerificarEmailUsuario.length > 0){
        //E-mail já existe na base
        var mensagem = [{
             idMsg: 1,
             msg: "E-mail informado já está sendo utilizado"
         }];
         res.render("cadastros/cadastroTutor", {validacao:mensagem});
      } else {
        usuarioDAO.verificarCPFCNPJUsuario(dadosFormCadastroTutor.cpf_cnpj, function(error, resultVerificarCPFCNPJUsuario){

          if(error){
            throw error;
          } else {
            if(resultVerificarCPFCNPJUsuario.length > 0){
                //CPF/CNPJ já existe na base
                var mensagem = [{
                     idMsg: 2,
                     msg: "CPF/CNPJ informado já está sendo utilizado"
                 }];
                 res.render("cadastros/cadastroTutor", {validacao:mensagem});
            } else {
              //OK... pode incluir o Tutor
              TutorDAO.incluirTutor(dadosFormCadastroTutor, req, res, function(error, resultIncluirTutor){

                if(error){
                  throw error;
                } else {
                  var idContaUsuario = resultIncluirTutor.insertId;
                  console.log("cadastroTutor:cadastrar - idContaUsuario =  "+idContaUsuario);
                  console.log("cadastroTutor:cadastrar - dadosFormCadastroTutor =  "+JSON.stringify(dadosFormCadastroTutor));
                  TutorDAO.incluirDadosEducacionaisTutor(idContaUsuario, dadosFormCadastroTutor, function(error, resultDadosEducacionaisTutor){

                    if(error){
                      throw error;
                    } else {
                      console.log("cadastroTutor:cadastrar incluirDadosEducacionaisTutor resultDadosEducacionaisTutor "+JSON.stringify(resultDadosEducacionaisTutor));
                      usuarioDAO.obterContaUsuario(idContaUsuario, function(error, resultObterContaUsuario){

                        if(error){
                          throw error;
                        } else {
                          console.log("cadastroTutor:cadastrar resultObterContaUsuario "+ JSON.stringify(resultObterContaUsuario));
                          timelineDAO.timelineIncluirTutor(resultObterContaUsuario[0], function(error, resultTimelineIncluirTutor){

                            if(error){
                              throw error;
                            } else {
                              console.log("cadastroTutor:cadastrar resultTimelineIncluirTutor = "+ JSON.stringify(resultTimelineIncluirTutor));
                              var mensagem = {
                                        msg: 1
                                    };
                                    res.render("login/login",{validacao:mensagem});
                            }
                          });
                        } 

                    });
                  }
                });

                }
              });
            }
          }

        });
      }
    }

  });

}

module.exports.alterar = function(application, req, res){

  console.log("cadastroTutor:alterar - INICIO");

  var dadosTutor = req.body;
  console.log("cadastroTutor:alterar - dadosTutor = "+JSON.stringify(dadosTutor));
  var connection = application.config.dbConnection;
  var tutorDAO = new application.app.models.TutorDAO(connection);
  var timelineDAO = new application.app.models.TimelineDAO(connection);
  var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);

  console.log("cadastroTutor:alterar - connection = "+connection);
  console.log("cadastroTutor:alterar - tutorDAO = "+tutorDAO);

  tutorDAO.alterarDadosTutor(req.session.idContaUsuario, dadosTutor, function(error, resultAlterarDadosTutor){

    if(error){
      throw error;
    } else {
        console.log("cadastroTutor:alterar - dados educacionais OK ");
        console.log("cadastroTutor:alterar - resultAlterarDadosTutor =  "+JSON.stringify(resultAlterarDadosTutor));
        console.log("cadastroTutor:alterar - Dados do Tutor alterados com sucesso");

        timelineDAO.timelineDadosCadastraisAlterados(req.session.idContaUsuario, function(error, resultTimelineDadosCadastraisAlterados){
          if(error){
            throw error;
          } else{
            console.log("cadastroTutor:alterar - resultTimelineDadosCadastraisAlterados =  "+JSON.stringify(resultTimelineDadosCadastraisAlterados));
            timelineDAO.timelineObterMsgs(req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
              if(error){
                throw error;
              } else {
                timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
                  req.session.msgsTimeline = msgs;
                  console.log("cadastroTutor:alterar - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
                  res.render("includes/timeLine", {
                  	idProjetoUsuario: req.session.idProjeto,
                    idEquipeUsuario: req.session.idEquipe,
                    idTermoAberturaUsuario: req.session.idTermoAbertura,	
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

      });

    }

  });

}