module.exports.cadDesenvolvedor = function(application, req, res){
  console.log("controllers de cadDesenvolvedor");
	res.render("cadastros/cadastroDesenvolvedor", {validacao: {}});
}

module.exports.cadastrar = function(application, req, res){
	console.log("cadastroDesenvolvedor:cadastrar");

  var dadosFormCadastroDesenvolvedor = req.body;
	console.log(dadosFormCadastroDesenvolvedor);
	var connection = application.config.dbConnection;
	var DesenvolvedorDAO = new application.app.models.DesenvolvedorDAO(connection);
  var cryptoPM = new application.app.models.CryptoPM();
	console.log("connection = "+connection);
	console.log("DesenvolvedorDAO = "+DesenvolvedorDAO);
  console.log("cryptoPM = "+cryptoPM);

  console.log("cadastroDesenvolvedor:cadastrar - iniciando encriptação...")
  dadosFormCadastroDesenvolvedor.senha = cryptoPM.crypt(dadosFormCadastroDesenvolvedor.senha);
  console.log("cadastroDesenvolvedor:cadastrar - dados encriptados =  "+dadosFormCadastroDesenvolvedor.senha);


	 DesenvolvedorDAO.incluirDev(dadosFormCadastroDesenvolvedor, function(error, resultIncluirDev){  
    var usuarioDAO = new application.app.models.UsuarioDAO(connection);
    var timelineDAO = new application.app.models.TimelineDAO(connection);
    var idContaUsuario = resultIncluirDev.insertId;
    console.log("cadastroDesenvolvedor:incluirDev idContaUsuario "+idContaUsuario);



    if(error){
        throw error;
      }else{       
        DesenvolvedorDAO.incluirDadosEducacionaisDev(idContaUsuario, dadosFormCadastroDesenvolvedor, function(error, resultDadosEducacionaisDev){
          if(error){
            throw error;
          }else{
            console.log("cadastroDesenvolvedor:incluirDev incluirDadosEducacionaisDev resultDadosEducacionaisDev "+JSON.stringify(resultDadosEducacionaisDev) );
            usuarioDAO.obterContaUsuario(idContaUsuario, function(error, resultObterContaUsuario){      
              if(error){
                throw error;
              }else{
                console.log("cadastroDesenvolvedor:inclCliente resultObterContaUsuario "+ JSON.stringify(resultObterContaUsuario));
                timelineDAO.timelineIncluirDev(resultObterContaUsuario[0], function(error, resultTimelineIncluirDev){     
                  if(error){
                    throw error;
                  }else{
                    console.log("cadastroDesenvolvedor:timelineIncluirDev resultTimelineIncluirDev "+ JSON.stringify(resultTimelineIncluirDev));
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

      }//fim else incluirDev   

  });
}

module.exports.alterar = function(application, req, res){

  console.log("cadastroDesenvolvedor:alterar - INICIO");

  var dadosDesenvolvedor = req.body;
  console.log("cadastroDesenvolvedor:alterar - dadosDesenvolvedor = "+JSON.stringify(dadosDesenvolvedor));
  var connection = application.config.dbConnection;
  var desenvolvedorDAO = new application.app.models.DesenvolvedorDAO(connection);
  var timelineDAO = new application.app.models.TimelineDAO(connection);
  var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);
  
  console.log("cadastroDesenvolvedor:alterar - connection = "+connection);
  console.log("cadastroDesenvolvedor:alterar - desenvolvedorDAO = "+desenvolvedorDAO);

  desenvolvedorDAO.alterarDadosDesenvolvedor(req.session.idContaUsuario, dadosDesenvolvedor, function(error, resultAlterarDadosDesenvolvedor){

    if(error){
      throw error;
    } else {
        console.log("cadastroDesenvolvedor:alterar - dados educacionais OK ");
        console.log("cadastroDesenvolvedor:alterar - resultAlterarDadosDesenvolvedor =  "+JSON.stringify(resultAlterarDadosDesenvolvedor));
        console.log("cadastroDesenvolvedor:alterar - Dados do Desenvolvedor alterados com sucesso");7

        timelineDAO.timelineDadosCadastraisAlterados(req.session.idContaUsuario, function(error, resultTimelineDadosCadastraisAlterados){
          if(error){
            throw error;
          } else{
            console.log("cadastroDesenvolvedor:alterar - resultTimelineDadosCadastraisAlterados =  "+JSON.stringify(resultTimelineDadosCadastraisAlterados));
            timelineDAO.timelineObterMsgs(req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
              if(error){
                throw error;
              } else {
                timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
                  req.session.msgsTimeline = msgs;
                  console.log("cadastroDesenvolvedor:alterar - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
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

      });
    }

  });


}