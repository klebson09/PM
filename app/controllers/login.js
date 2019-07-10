module.exports.pagLogin = function(application, req, res) {
	// res.render("login/login", {validacao: {}});
	console.log("CONTROLLER LOGIN");
	res.render("login/login", {
		validacao: {}
	});
}

module.exports.autenticar = function(application, req, res) {
	console.log("login.js:autenticar - INICIO");
	var dadosFormLogin = req.body;
	var connection = application.config.dbConnection;
	var UsuarioDAO = new application.app.models.UsuarioDAO(connection);
	var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
	var statusProjetoDAO = new application.app.models.StatusProjetoDAO(connection);
	var timelineDAO = new application.app.models.TimelineDAO(connection);
	var cryptoPM = new application.app.models.CryptoPM();
	var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);
	var notifModelarProj = null;

	req.session.autenticado = false;

	console.log(dadosFormLogin);
	req.assert('email', 'Campo Email vazio').notEmpty();
	req.assert('senha', 'Campo Senha vazio').notEmpty();
	req.assert('email', 'Email inválido').isEmail();

	var erros = req.validationErrors();

	console.log("login.js:autenticar - erros = "+JSON.stringify(erros));

	if (erros) {
		console.log(erros);
		console.log("break");
		res.render("login/login", {
			validacao: erros
		});
		return;
	}

	console.log("login:autenticar - iniciando encriptação...")
  	dadosFormLogin.senha = cryptoPM.crypt(dadosFormLogin.senha);
  	console.log("login:autenticar - dados encriptados =  "+dadosFormLogin.senha);

	UsuarioDAO.autenticar(dadosFormLogin, function(error, result) {

		if (error) {
			throw error;
		} else {

			console.log("login.js:autenticar - RESULT ==>>> " + result);
			if (result[0] != undefined) {
				console.log(result[0].nomeUsuario);

				req.session.autenticado = true;
				req.session.idContaUsuario = result[0].idContaUsuario;
				req.session.tipoUsuario = result[0].tipoUsuario;
				req.session.nomeUsuario = result[0].nomeUsuario;
				req.session.email = result[0].email;
				req.session.idEquipe = 0;
				req.session.idProjeto = 0;
				req.session.dataCadastro = new Date(result[0].dataCadastro);
				req.session.dataCadastroExtenso =  "";
				req.session.horaCadastroExtenso =  "";
				req.session.notificacoes = [{
					mensagem: "Nenhuma notificação",
					link: "#",
					tipo: "#"
				}];
				req.session.msgsTimeline = [];

				console.log("tipoUsuario = "+req.session.tipoUsuario);
				console.log("nomeUsuario = "+req.session.nomeUsuario);
				console.log("dataCadastroJS = "+req.session.dataCadastro);


				console.log("dataCadastroDATA = "+req.session.dataCadastro.getDate());
				console.log("dataCadastroMES = "+req.session.dataCadastro.getMonth());
				console.log("dataCadastroANO = "+req.session.dataCadastro.getFullYear());
			}

			if (req.session.autenticado) {

				console.log("AUTORIZADO");
				if (req.session.tipoUsuario == 'D' || req.session.tipoUsuario == 'T'){

					var equipeDAO = new application.app.models.EquipeDAO(connection);

					equipeDAO.verificarUsuarioVinculadoEquipe(req.session.idContaUsuario, function(error, resultObterEquipeUsr){
						if(error){
							throw error;
						} else {
							if(resultObterEquipeUsr[0] != undefined && resultObterEquipeUsr[0] != null && resultObterEquipeUsr.length > 0){
								req.session.idEquipe = resultObterEquipeUsr[0].idEquipe;

								projetosDispDAO.projetoAndamentoDev(req.session.idEquipe, function(error, resultProjetoAndamentoDev){
									if(error){
										throw error;
									} else {

										if(resultProjetoAndamentoDev[0] != undefined && resultProjetoAndamentoDev[0] != null){

											req.session.idProjeto = resultProjetoAndamentoDev[0].idProjeto;

											console.log("login.js:autenticar - req.session.idProjeto DEV = "+req.session.idProjeto);

										}
										

										timelineDAO.timelineObterMsgsEquipe(req.session.idEquipe, req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
											if(error){
												throw error;
											} else {							
												timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
													req.session.msgsTimeline = msgs;
													console.log("login.js:autenticar - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
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

							} else {
								timelineDAO.timelineObterMsgs(req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
									if(error){
										throw error;
									} else {							
										timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
											req.session.msgsTimeline = msgs;
											console.log("login.js:autenticar - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
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
						}
							
					});

				}else if (req.session.tipoUsuario == 'C'){
					console.log("Verificando se o usuário cliente tem um projeto associado");

					projetosDispDAO.projetoAndamentoCliente(req.session.idContaUsuario, function(error, resultProjetoAndamentoCliente){
						if(error){
							throw error;
						} else {
							if(resultProjetoAndamentoCliente[0] != undefined && resultProjetoAndamentoCliente[0] != null){
								req.session.idProjeto = resultProjetoAndamentoCliente[0].idProjeto;

								console.log("login.js:autenticar - req.session.idProjeto CLIENTE = "+req.session.idProjeto);
							}
							
							timelineDAO.timelineObterMsgs(req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
								if(error){
									throw error;
								} else {
							
									timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){

										req.session.msgsTimeline = msgs;

										console.log("login.js:autenticar - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))

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

					/*timeLineAnalisador.atualizarTimeLineCliente(req.session, projetosDispDAO, statusProjetoDAO, function(msgs){
						req.session.msgsTimeline = msgs;

						res.render("includes/timeLine", {
							sessionNomeUsuario: req.session.nomeUsuario,
							sessionNomeTipoUsuario: req.session.tipoUsuario,
							notificacao: req.session.notificacoes,
							data: req.session.msgsTimeline,
							layout: 'includes/layoutIncludes'
						});
					});	*/

				}

			}else {
				console.log("NEGADO");
				console.log("************* ");
				var erros = [{
					location: 'body',
					param: 'senha',
					msg: 'Campo Email ou Senha incorreto',
					value: ''
				}];

				console.log(JSON.stringify(erros));
				res.render("login/login", {
					validacao: erros
				});
			}
		}
	});

	// res.send('tudo ok para criar a sessão');
}

module.exports.recuperarSenha = function(application, req, res) {
	console.log("login.js:autenticar - INICIO ");
	res.render("login/recuperarSenha", {
		validacao: []
	});
}

module.exports.recuperacaoSenha = function(application, req, res) {
	
	var email = req.body.email;	
	var connection = application.config.dbConnection;
	var usuarioDAO = new application.app.models.UsuarioDAO(connection);
	var transporter = new application.config.mailConfig;
	var cryptoPM = new application.app.models.CryptoPM();

	req.assert('email', 'Campo Email vazio').notEmpty();
	req.assert('email', 'Email inválido').isEmail();

	var erros = req.validationErrors();

	console.log("login.js:autenticar - req.body = "+JSON.stringify(req.body));
	console.log("login.js:autenticar - erros = "+JSON.stringify(erros));
	console.log("login.js:autenticar - email = "+email);

	if (erros) {
		console.log(erros);
		console.log("break");
		res.render("login/recuperarSenha", {
			validacao: erros
		});
		return;
	}

	usuarioDAO.atualizarFlagAlteracaoSenhaUsuario(email, function(error, resultAtualizarFlagAlteracaoSenhaUsuario){
		if(error){
			throw error;
		} else {
			usuarioDAO.obterContaUsuarioEmail(email, function(error, resultObterContaUsuarioEmail){
				if(error){
					throw error;
				} else {
					console.log("login:recuperacaoSenha - resultObterContaUsuarioEmail = "+resultObterContaUsuarioEmail[0].email);
					var emailUsuario = resultObterContaUsuarioEmail[0].email;


					console.log("login:recuperacaoSenha - iniciando encriptação...")
				    var token =  cryptoPM.crypt(emailUsuario);
				  	console.log("login:recuperacaoSenha - dados encriptados =  "+token);


					if(emailUsuario != undefined){
						console.log("login:recuperacaoSenha - email recuperado com sucesso");

						var mailOptions = {
						  from: 'pmn0reply19@outlook.com',
						  to: emailUsuario,
						  subject: 'Recuperação da senha',
						  html: '<h1>Recuperação da Senha - Project Marketplace</h1><p>Segue <a href = "http://localhost:3000/alterar_senha?id='+token+'" style = "color: # 000; text-decoration: none"> link </a> para recuperação de sua senha.</p>'
						};

						transporter.sendMail(mailOptions, function(error, info){
						  if (error) {
							    console.log('error =====>>>>'+error);
							    console.log('info =====>>>>'+info);
						  } else {
							  console.log('login:recuperacaoSenha - Email enviado: ' + info.response);

							  res.send("LINK DE ALTERAÇÃO DE SENHA ENVIADO COM SUCESSO PARA "+emailUsuario);
						  }
						});

					} else {
						console.log("login:recuperacaoSenha - email não existe na base de dados");

						var erros = [{
							location: 'body',
							param: 'email',
							msg: 'Email não cadastrado.',
							value: ''
						}];

						console.log(JSON.stringify(erros));
						res.render("login/recuperarSenha", {
							validacao: erros
						});
					}			
				}
			});
		}
	});
}

module.exports.alterarSenha = function(application, req, res) {
	
	var id = req.query.id;
	var connection = application.config.dbConnection;
	var usuarioDAO = new application.app.models.UsuarioDAO(connection);
	var cryptoPM = new application.app.models.CryptoPM();	
	var emailUsuario = cryptoPM.decrypt(id);

  	console.log("login:alterarSenha - dados descriptografados =  "+emailUsuario);	

  	usuarioDAO.obterFlagAlteracaoSenhaUsuario(emailUsuario, function(error, resultObterFlagAlteracaoSenhaUsuario){
  		if(error){
  			throw error;	
  		} else {
  				console.log("login:alterarSenha - resultObterFlagAlteracaoSenhaUsuario =  "+JSON.stringify(resultObterFlagAlteracaoSenhaUsuario));	
  				console.log("login:alterarSenha - resultObterFlagAlteracaoSenhaUsuario[0].flagAlteracaoSenha =  "+resultObterFlagAlteracaoSenhaUsuario[0].flagAlteracaoSenha);	
  			if(resultObterFlagAlteracaoSenhaUsuario[0].flagAlteracaoSenha == 1){
  				res.render("login/alterarSenha", {
					validacao: [],
					token: id
				});	
  			} else {
  				res.send("REQUISIÇÃO NÃO PERMITIDA - ALTERAÇÃO DE SENHA FOI FINALIZADA OU NÃO FOI SOLICITADA")
  			}
  		}
  	});			

}

module.exports.alteracaoSenha = function(application, req, res) {

	console.log("login:alteracaoSenha - INICIO")

	var cryptoPM = new application.app.models.CryptoPM();
	var connection = application.config.dbConnection;
	var usuarioDAO = new application.app.models.UsuarioDAO(connection);
	var token = req.body.token;

	req.assert('novaSenha', 'Campo Nova Senha vazio').notEmpty();
	req.assert('confirmarNovaSenha', 'Campo Confirmar Nova Senha vazio').notEmpty();

	//req.check('confirmarNovaSenha', 'Senha divergente').equals('novaSenha');
	
	var erros = req.validationErrors();

	console.log("login.js:alteracaoSenha - erros = "+JSON.stringify(erros));

	if (erros) {
		console.log(erros);
		console.log("break");
		res.render("login/alterarSenha", {
			validacao: erros
		});
		return;
	}

	console.log("login:alteracaoSenha - iniciando encriptação...")
  	var senha = cryptoPM.crypt(req.body.novaSenha);
  	console.log("login:alteracaoSenha - dados encriptados =  "+senha);

  	var emailUsuario = cryptoPM.decrypt(token);
  	console.log("login:alteracaoSenha - dados descriptografados =  "+emailUsuario);

  	usuarioDAO.alterarSenhaUsuarioEmail(senha, emailUsuario, function(error, resultAlterarSenhaUsuarioEmail){
  		if(error){
  			throw error;
  		} else {
			console.log("login:alteracaoSenha - senha alterada com sucesso  ");  			

			res.send("SENHA ALTERADA COM SUCESSO, CLIQUE NESSE <a href='/login'>link</a> para login");
  		}
  	})
	 



}

