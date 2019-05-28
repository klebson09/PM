module.exports.termoDeAbertura = function(application, req, res){

	console.log("termoAbertura.js:termoDeAbertura INICIO");
	
	var connection = application.config.dbConnection;	
	var equipeDAO = new application.app.models.EquipeDAO(connection);

	equipeDAO.obterMembrosEquipe(req.session.idEquipe, function(error, resultObterDadosEquipe){

		if(error){
			throw error;
		} else{
			var dados = {"idProjeto":req.session.idProjeto,"equipe":resultObterDadosEquipe};

			res.render("includes/termoAbertura", {
	        	sessionNomeUsuario: req.session.nomeUsuario,
            	sessionNomeTipoUsuario: req.session.tipoUsuario,
            	notificacao: req.session.notificacoes,
            	dadosTermoAbertura: dados,
				layout: 'includes/layoutIncludes'
			});
		}
	});	       
}

module.exports.criarTermoDeAbertura = function(application, req, res){
	var entregaveis = JSON.parse(req.body.entregaveis);
	console.log(req.body);
	console.log("Entregaveis:\n\n"+JSON.stringify(entregaveis));

  var connection = application.config.dbConnection;
	var termoAbertura = req.body;
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO(connection);
	var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
	var timelineDAO = new application.app.models.TimelineDAO(connection);
	var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);


	termoAberturaDAO.criarTermoAbertura(termoAbertura, function(erro, result){
		if(erro){
			throw erro;
		} else {		
			console.log("TERMO DE ABERTURA CADASTRADO COM SUCESSO");
			console.log("Cadastrando Checkpoints....");

			var idProjeto = termoAbertura.idProjeto
			var checkpointDAO = new application.app.models.CheckpointDAO(connection);

			checkpointDAO.criarCheckpoints(entregaveis, idProjeto, function(erro, result){
				if(erro){
					throw erro;
				} else {
					console.log("termoAbertura.js:criarCheckpoints  result "+ JSON.stringify(result) );

					console.log("CHECKPOINT DO PROJETO CADASTRADO COM SUCESSO");
					//res.send("TERMO DE ABERTURA E CHECKPOINTS DO PROJETO CADASTRADOS COM SUCESSO");

					projetosDispDAO.consultarProjetoEquipe(idProjeto, function(error, resultConsultarProjetoEquipe){
						if(error){
							throw error;
						} else {
							var dadosProjetoEquipe = resultConsultarProjetoEquipe[0];
							console.log("propostasEqp:criarTermoAbertura - nomeProjeto = "+dadosProjetoEquipe.nomeProjeto);
							console.log("propostasEqp:criarTermoAbertura - nomeEquipe = "+dadosProjetoEquipe.nomeEquipe);
							console.log("propostasEqp:criarTermoAbertura - nomeEquipe = "+dadosProjetoEquipe.idContaUsuario);
								timelineDAO.timelineCriarTermoAbertura(dadosProjetoEquipe.nomeProjeto, req.session.idEquipe, function(error, resultTimelineCriarTermoAbertura){
									if(error){
										throw error;
									} else {
											timelineDAO.timelineReceberTermoAbertura(dadosProjetoEquipe.nomeEquipe, dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.idContaUsuario, function(error, resultTimelineReceberTermoAbertura){
												console.log("termoAbertura.js:timelineReceberTermoAbertura  resultTimelineReceberTermoAbertura "+ JSON.stringify(resultTimelineReceberTermoAbertura) );

												if(error){
													throw error;
												} else {
													timelineDAO.timelineObterMsgsEquipe(req.session.idEquipe, req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
														console.log("termoAbertura.js:timelineObterMsgsEquipe  resultTimelineObterMsgs "+ JSON.stringify(resultTimelineObterMsgs));

														if(error){
															throw error;
														} else {
															timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
																req.session.msgsTimeline = msgs;
																console.log("propostasEqp:criarTermoAbertura - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
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
		}
	});	
}

module.exports.consultarTermoDeAbertura = function(application, req, res){


	console.log("**************************** termoAbertura:consultarTermoDeAbertura  *********************************************")

	var connection = application.config.dbConnection;
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO(connection);
	var checkpointDAO = new application.app.models.CheckpointDAO(connection);
	var equipeDAO = new application.app.models.EquipeDAO(connection);
	var termoAbertura = null;
	var checkpoints = [];
	var membrosEquipe = [];

	termoAberturaDAO.consultarTermoAbertura(req.session.idProjeto, function(error, resultConsultarTermoAbertura){

		console.log("termoAbertura:consulconsultarTermoAberturatarTermoDeAbertura - resultConsultarTermoAbertura = "+JSON.stringify(resultConsultarTermoAbertura));



		if(error){
			throw error;
		} else {

			termoAbertura = resultConsultarTermoAbertura[0];
			var dataPrazoEstimado = new Date(termoAbertura.prazoEstimado);
			termoAbertura.prazoEstimado = formatarData(dataPrazoEstimado);
			console.log("termoAbertura:consulconsultarTermoAbertura - termoAbertura.prazoEstimado = "+termoAbertura.prazoEstimado);

			checkpointDAO.consultarCheckpoints(req.session.idProjeto, function(error, resultConsultarCheckpoints){

				console.log("termoAbertura:consultarTermoAbertura - resultConsultarCheckpoints = "+JSON.stringify(resultConsultarCheckpoints));

				if(error){
					throw error;
				} else {

					checkpoints = resultConsultarCheckpoints;

					for(var i=0; i<checkpoints.length; i++){
						checkpoints[i].dataInicial = formatarData(new Date(checkpoints[i].dataInicial));
						checkpoints[i].dataFinal = formatarData(new Date(checkpoints[i].dataFinal));
					}

					equipeDAO.obterMembrosEquipe(termoAbertura.idEquipe, function(error, resultObterMembrosEquipe){

						console.log("termoAbertura:consultarTermoAbertura - resultObterMembrosEquipe = "+JSON.stringify(resultObterMembrosEquipe));

						if(error){
							throw error;
						} else {
							membrosEquipe = resultObterMembrosEquipe;

							res.render("includes/termoAberturaCliente", {
								sessionNomeUsuario: req.session.nomeUsuario,
								sessionNomeTipoUsuario: req.session.tipoUsuario,
								notificacao: req.session.notificacoes,
								dadosTA: termoAbertura,
								dadosCP: checkpoints,
								dadosEQP: membrosEquipe,
								layout: 'includes/layoutIncludes'
							});
						}	

					});

					

				}

			});

		}

	});
}

module.exports.respostaTermoDeAbertura = function(application, req, res){

	var status = req.body.status;
	var respostaCliente = req.body.respostaCliente;
	var connection = application.config.dbConnection;	
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO(connection);
	var timelineDAO = new application.app.models.TimelineDAO(connection);
	var projetosDispDAO = new application.app.models.projetosDispDAO(connection);

	console.log("termoAbertura:respostaTermoDeAbertura - INICIO");

	console.log("termoAbertura:respostaTermoDeAbertura - status = "+status);
	console.log("termoAbertura:respostaTermoDeAbertura - respostaCliente = "+respostaCliente);

	termoAberturaDAO.atualizarStatusTermoAbertura(status, respostaCliente, req.session.idProjeto, function(error, resultAtualizarTermoAbertura){
		if(error){
			throw error;
		} else {
			console.log("termoAbertura:respostaTermoDeAbertura - resultAtualizarTermoAbertura = "+JSON.stringify(resultAtualizarTermoAbertura));

			projetosDispDAO.consultarProjetoEquipe(req.session.idProjeto, function(error, resultConsultarProjetoEquipe){

				if(error){
					throw error;
				} else {
					console.log("termoAbertura:respostaTermoDeAbertura - resultConsultarProjetoEquipe = "+JSON.stringify(resultConsultarProjetoEquipe));	
					var dadosProjetoEquipe = resultConsultarProjetoEquipe[0];

					if(status = 'A'){ //Termo de Abertura aprovado
						timelineDAO.timelineAprovarTermoAbertura(dadosProjetoEquipe.nomeEquipe, dadosProjetoEquipe.nomeProjeto, req.session.idContaUsuario, function(error, resultTimelineAprovarTermoAbertura){
							if(error){
								throw error;
							} else {
								console.log("termoAbertura:respostaTermoDeAbertura - resultTimelineAprovarTermoAbertura = "+JSON.stringify(resultTimelineAprovarTermoAbertura));		
								timelineDAO.timelineTermoAberturaAprovado(dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.idEquipe, function(error, resultTimelineTermoAberturaAprovado){
									if(error){
										throw error;
									} else {
										console.log("termoAbertura:respostaTermoDeAbertura - resultTimelineTermoAberturaAprovado = "+JSON.stringify(resultTimelineTermoAberturaAprovado));		
										 var data = {
                            				 resultado: "2",
                             				 mensagem: "TERMO DE ABERTURA APROVADO"
                             			 };	 

                             			console.log("termoAbertura:respostaTermoDeAbertura - APROVADO - ENVIANDO RESPOSTA A VIEW!!!!!!!!!!!!!!!!!!!!!!!")
                      					res.send(data);  
									}
								});			
							}
						});
					} else { //Termo de Abertura reprovado
						timelineDAO.timelineReprovarTermoAbertura(dadosProjetoEquipe.nomeEquipe, dadosProjetoEquipe.nomeProjeto, req.session.idContaUsuario, function(error, resultTimelineReprovarTermoAbertura){
							if(error){
								throw error;
							} else {
								console.log("termoAbertura:respostaTermoDeAbertura - resultTimelineReprovarTermoAbertura = "+JSON.stringify(resultTimelineReprovarTermoAbertura));		
								timelineDAO.timelineTermoAberturaReprovado(dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.idEquipe, function(error, resultTimelineTermoAberturaReprovado){
									if(error){
										throw error;
									} else {
										console.log("termoAbertura:respostaTermoDeAbertura - resultTimelineTermoAberturaReprovado = "+JSON.stringify(resultTimelineTermoAberturaReprovado));		
										 var data = {
                            				 resultado: "3",
                             				 mensagem: "TERMO DE ABERTURA REPROVADO"
                             			 };	 

                             			console.log("termoAbertura:respostaTermoDeAbertura - REPROVADO - ENVIANDO RESPOSTA A VIEW!!!!!!!!!!!!!!!!!!!!!!!")
                      					res.send(data);  
									}
								});
							}
						});
					}

				}

			});
		}
	});
}

function formatarData(dataPrazoEstimado){
	var dia  = dataPrazoEstimado.getDate().toString().padStart(2, '0');
    var mes  = (dataPrazoEstimado.getMonth()+1).toString().padStart(2, '0'); 
    var ano  = dataPrazoEstimado.getFullYear();
	console.log("termoAbertura:formatarData - dataPrazoEstimado = "+dataPrazoEstimado);
	return dia+"/"+mes+"/"+ano;
}
