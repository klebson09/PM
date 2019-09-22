module.exports.cadCliente = function(application, req, res){
	res.render("cadastros/cadastroCliente", {validacao: {}});
}

module.exports.inclCliente = function(application, req, res){
	console.log("cadastroCliente:inclCliente - INICIO");

	var dadosFormLogin = req.body;

	var connection = application.config.dbConnection;
	var clienteDAO = new application.app.models.ClienteDAO(connection);
	var cryptoPM = new application.app.models.CryptoPM();
	var usuarioDAO = new application.app.models.UsuarioDAO(connection);

	console.log("cadastroCliente:inclCliente - iniciando encriptação...")
  	dadosFormLogin.senha = cryptoPM.crypt(dadosFormLogin.senha);
  	console.log("cadastroCliente:inclCliente - dados encriptados =  "+dadosFormLogin.senha);

  	//Verificando se e-mail informado já existe na base
  	usuarioDAO.verificarEmailUsuario(dadosFormLogin.email, function(error, resultVerificarEmailUsuario){

  		if(error){
  			throw error;
  		} else {

  			if(resultVerificarEmailUsuario.length > 0){
  				//E-mail já existe na base de dados
  				var mensagem = [{
			         idMsg: 1,
			         msg: "E-mail informado já está sendo utilizado"
			     }];
			     res.render("cadastros/cadastroCliente", {validacao:mensagem});
  			} else {
  				//Verificando se CPF/CNPJ informado já existe na base
  				usuarioDAO.verificarCPFCNPJUsuario(dadosFormLogin.cpf_cnpj, function(error, resultVerificarCPFCNPJUsuario){

  					if(error){
  						throw error;
  					} else {

  						if(resultVerificarCPFCNPJUsuario.length > 0){
  							//CPF/CNPJ já existe na base
	  						var mensagem = [{
						         idMsg: 2,
						         msg: "CPF/CNPJ informado já está sendo utilizado"
						     }];
						     res.render("cadastros/cadastroCliente", {validacao:mensagem});
						 } else {
						 	//OK - pode incluir o cliente...
						 	clienteDAO.incluirCliente(dadosFormLogin, function(error, resultIncluirCliente){		
								if(error){
									throw error;
								} else{
									var usuarioDAO = new application.app.models.UsuarioDAO(connection);
									var timelineDAO = new application.app.models.TimelineDAO(connection);
									usuarioDAO.obterContaUsuario(resultIncluirCliente.insertId, function(error, resultObterContaUsuario){
										if(error){
											throw error;
										}else{
											console.log("cadastroCliente:inclCliente resultObterContaUsuario "+ JSON.stringify(resultObterContaUsuario));
											timelineDAO.timelineIncluirCliente(resultObterContaUsuario[0], function(error, resultTimelineIncluirCliente){			
												if(error){
													throw error;
												}else{
									             	console.log("cadastroCliente:inclCliente resultObterContaUsuario 2 "+ JSON.stringify(resultObterContaUsuario));
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
		  			}

  				});
  			}	

  		}

  	});

	// res.send('tudo ok para criar a sessão');
}

module.exports.alterarCliente = function(application, req, res){

  console.log("cadastroCliente:alterarCliente - INICIO");

  var dadosCliente = req.body;
  console.log("cadastroCliente:alterarCliente - dadosCliente = "+JSON.stringify(dadosCliente));
  var connection = application.config.dbConnection;
  var clienteDAO = new application.app.models.ClienteDAO(connection);
  var timelineDAO = new application.app.models.TimelineDAO(connection);
  var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);

  console.log("cadastroCliente:alterarCliente - connection = "+connection);
  console.log("cadastroCliente:alterarCliente - clienteDAO = "+clienteDAO);
  
  clienteDAO.alterarDadosCliente(req.session.idContaUsuario, dadosCliente, function(error, resultAlterarDadosCliente){

    if(error){
      throw error;
    } else {
        console.log("cadastroCliente:alterarCliente - contato OK ");
        console.log("cadastroCliente:alterarCliente - resultAlterarDadosCliente =  "+JSON.stringify(resultAlterarDadosCliente));
        console.log("cadastroCliente:alterarCliente - Dados do Cliente alterados com sucesso");
		
		timelineDAO.timelineDadosCadastraisAlterados(req.session.idContaUsuario, function(error, resultTimelineDadosCadastraisAlterados){

				if(error){
					throw error;
				} else{
					console.log("cadastroCliente:alterarCliente - resultTimelineDadosCadastraisAlterados =  "+JSON.stringify(resultTimelineDadosCadastraisAlterados));
					timelineDAO.timelineObterMsgs(req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
						if(error){
							throw error;
						} else {
							timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
								req.session.msgsTimeline = msgs;
								console.log("cadastroCliente:alterarCliente - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
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
