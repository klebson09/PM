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
	console.log("connection = "+connection);
	console.log("DesenvolvedorDAO = "+DesenvolvedorDAO);


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
                    res.render("main/main",{mensagem:"Usuário Cadastrado com sucesso!"});
                  }
                });

              }
          
            });
          }
        });

      }//fim else incluirDev   

  });
}
