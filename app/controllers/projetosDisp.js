module.exports.projDisp = function(application, req, res){
	console.log("####SESSION#####");
	console.log(req.session.email);
	// res.render("includes/projetosDisp", {validacao: {}});
	if (req.session.autenticado) {
		//res.render("includes/projetosDisp", {validacao: {}});

		// res.render("includes/projetosDisp", {
		// 	sessionNomeUsuario: 'USUARIO PROVISÓRIO',
		// 	sessionNomeTipoUsuario: '1',
		// 	});
		console.log("*******CONTROLLER projetosDisp++++++");
		var connection = application.config.dbConnection;
		var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
		projetosDispDAO.projetosDisponiveis(req, function(err, result){
			console.log("+++++++++callback++++++");
			if(err){
				throw err;
			} else {

				req.session.notificacoes = [];

				console.log(JSON.stringify(result));
				console.log("+++++++++ FIMMMM ++++++");
				//res.render("includes/projetosDisp", { data: JSON.stringify(res) });

				res.render("includes/projetosDisp", {
					sessionNomeUsuario: req.session.nomeUsuario,
					sessionNomeTipoUsuario: req.session.tipoUsuario,
					notificacao: req.session.notificacoes,
					data: result,
					layout: 'includes/layoutIncludes'

				});
			}
		});
	}else {

		res.render('login/login', {validacao: {}});

	}
}

module.exports.candidatarse = function(application, req, res){

	// res.render("includes/projetosDisp", {validacao: {}});
	if (req.session.autenticado) {

		var idProjeto = req.body.idProjeto;
		// res.render("includes/projetosDisp", {
		// 	sessionNomeUsuario: 'USUARIO PROVISÓRIO',
		// 	sessionNomeTipoUsuario: '1',
		// 	});
		console.log("*******candidatarse++++++");
		var connection = application.config.dbConnection;
		var propostaDAO = new application.app.models.propostaDAO(connection);
		propostaDAO.insertProposta(res, req, function(err, result){
			if(err){
				throw err;
			} else {

				console.log(JSON.stringify(result));
				
				console.log("projetosDisp: candidatarse - Obtendo dados do projeto");

				var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
				var timelineDAO = new application.app.models.TimelineDAO(connection);
				var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);

				projetosDispDAO.consultarProjeto(idProjeto, function(error, resultConsultarProjeto){

					if(error){
						throw error;
					} else{

						var dadosProjeto = resultConsultarProjeto[0];

						console.log("projetosDisp: candidatarse - Dados do projeto obtidos com sucesso");

						timelineDAO.timelineEnviarProposta(dadosProjeto, req.session.idEquipe, function(error, resultTimelineEnviarProposta){

							if(error){
								throw error;
							} else {
								timelineDAO.timelineReceberProposta(dadosProjeto, dadosProjeto.idContaUsuario, function(error, resultTimelineReceberProposta){

									if(error){
										throw error;
									} else {
										console.log("Proposta enviada com sucesso");

										timelineDAO.timelineObterMsgsEquipe(req.session.idEquipe, req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
					                        if(error){
					                          throw error;
					                        } else {              
					                           timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
					                           req.session.msgsTimeline = msgs;
					                           console.log("projetosDisp.js:candidatarse - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))

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

				});




			}
		});
	}else {

		res.render('login/login', {validacao: {}});

	}
}

module.exports.validarEquipeTutor = function(application, req, res){

	var data = {
		resultado: "1",
		mensagem: "Equipe precisa se vincular a um tutor para se candidatar aos projetos"
	};

	var connection = application.config.dbConnection;
	var equipeDAO = new application.app.models.EquipeDAO(connection);

	equipeDAO.validarEquipeTutor(req.session.equipe, function(error, resultado){
		if(error){
			throw error;
			data.mensagem = "ERRO INTERNO";
		} else {
			if(resultado[0] != undefined){
				data.resultado = "1";
				data.mensagem = "OK";
			}
		}
	})

	res.send(data);

}
