module.exports.consultarCheckpoints = function(application, req, res){
	console.log("**************************** checkpoint:consultarCheckpoints  *********************************************");
		var connection = application.config.dbConnection;
		var checkpointDAO = new application.app.models.CheckpointDAO(connection);
		var projetosDispDAO = new application.app.models.projetosDispDAO(connection);

		checkpointDAO.consultarCheckpoints(req.session.idProjeto, function(error, resultConsultarCheckpoints){

				console.log("checkpoint:consultarTermoAbertura - resultConsultarCheckpoints = "+JSON.stringify(resultConsultarCheckpoints));

				if(error){
					throw error;
				} else {
					checkpoints = resultConsultarCheckpoints;

					for(var i=0; i<checkpoints.length; i++){
						checkpoints[i].dataInicial = formatarData(new Date(checkpoints[i].dataInicial));
						checkpoints[i].dataFinal = formatarData(new Date(checkpoints[i].dataFinal));
					}

					projetosDispDAO.consultarStatusProjeto(req.session.idProjeto, function(error, resultConsultarStatusProjeto){

						if(error){
							throw error;
						} else {

							var statusProj = resultConsultarStatusProjeto[0].status;
							console.log("checkpoint:consultarTermoAbertura - statusProj = "+statusProj);

							console.log("############# checkpoint:consultarTermoAbertura - checkpoints = "+ JSON.stringify(checkpoints) );
							
							res.render("includes/checkpoint", {
								idProjetoUsuario: req.session.idProjeto,
                  				idEquipeUsuario: req.session.idEquipe,
                  				idTermoAberturaUsuario: req.session.idTermoAbertura,
								sessionNomeUsuario: req.session.nomeUsuario,
								sessionNomeTipoUsuario: req.session.tipoUsuario,
								notificacao: req.session.notificacoes,
								statusProjeto: statusProj,
								dadosCP: checkpoints,
								layout: 'includes/layoutIncludes'
							});			

						}	

					});	

					
				}

		});




}

module.exports.atualizarCheckpointsProjeto = function(application, req, res){
	console.log("**************************** checkpoint:atualizarCheckpointsProjeto  *********************************************");
		var connection = application.config.dbConnection;
		var checkpointDAO = new application.app.models.CheckpointDAO(connection);
		var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
		var timelineDAO = new application.app.models.TimelineDAO(connection);
		var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);
		var checkpoints = req.body;
		var idProjeto = checkpoints.idProjeto;
		var entregaveis = checkpoints.entregaveis;	

		checkpointDAO.deletarCheckpoints(idProjeto, function(error, resultDeletarCheckpoints){

				console.log("checkpoint:atualizarCheckpointsProjeto - resultDeletarCheckpoints = "+JSON.stringify(resultDeletarCheckpoints));

				if(error){
					throw error;
				} else {
					entregaveis = JSON.parse(entregaveis);
					checkpointDAO.criarCheckpoints(entregaveis, idProjeto, function(erro, resultCriarCheckpoints){
						if(erro){
							throw erro;
						} else {
							console.log("checkpoints:criarCheckpoints  result "+ JSON.stringify(resultCriarCheckpoints) );

							console.log("CHECKPOINT DO PROJETO ATUALIZADO COM SUCESSO");
							//res.send("TERMO DE ABERTURA E CHECKPOINTS DO PROJETO CADASTRADOS COM SUCESSO");

							projetosDispDAO.consultarProjetoEquipe(idProjeto, function(error, resultConsultarProjetoEquipe){
								if(error){
									throw error;
								} else {
									var dadosProjetoEquipe = resultConsultarProjetoEquipe[0];
									console.log("checkpoint:atualizarCheckpointsProjeto - nomeProjeto = "+dadosProjetoEquipe.nomeProjeto);
									console.log("checkpoint:atualizarCheckpointsProjeto - nomeEquipe = "+dadosProjetoEquipe.nomeEquipe);
									console.log("checkpoint:atualizarCheckpointsProjeto - idContaUsuario = "+dadosProjetoEquipe.idContaUsuario);
									timelineDAO.timelineAtualizarStatusProjeto(dadosProjetoEquipe.nomeProjeto, req.session.idEquipe, function(error, resultTimelineCriarTermoAbertura){
											if(error){
												throw error;
											} else {
													 timelineDAO.timelineProjetoAtualizado(dadosProjetoEquipe.nomeEquipe, dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.idContaUsuario, function(error, resultTimelineReceberTermoAbertura){
														console.log("checkpoint:atualizarCheckpointsProjeto  resultTimelineReceberTermoAbertura "+ JSON.stringify(resultTimelineReceberTermoAbertura) );

														if(error){
															throw error;
														} else {
															timelineDAO.timelineObterMsgsEquipe(req.session.idEquipe, req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
																console.log("checkpoint:atualizarCheckpointsProjeto  resultTimelineObterMsgs "+ JSON.stringify(resultTimelineObterMsgs));

																if(error){
																	throw error;
																} else {
																	timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
																		req.session.msgsTimeline = msgs;
																		console.log("checkpoint:atualizarCheckpointsProjeto - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
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
							});
						}
			});	
				}

		});
}


module.exports.consultarCheckpointsProjeto = function(application, req, res){
	console.log("**************************** checkpoint:consultarCheckpointsEqp  *********************************************");
		var connection = application.config.dbConnection;
		var checkpointDAO = new application.app.models.CheckpointDAO(connection);

		checkpointDAO.consultarCheckpoints(req.session.idProjeto, function(error, resultConsultarCheckpoints){

				console.log("checkpoint:consultarTermoAbertura - resultConsultarCheckpoints = "+JSON.stringify(resultConsultarCheckpoints));

				if(error){
					throw error;
				} else {
					checkpoints = resultConsultarCheckpoints;

					for(var i=0; i<checkpoints.length; i++){
						checkpoints[i].dataInicial = formatarData(new Date(checkpoints[i].dataInicial));
						checkpoints[i].dataFinal = formatarData(new Date(checkpoints[i].dataFinal));
					}

					console.log("############# checkpoint:consultarTermoAbertura - checkpoints = "+ JSON.stringify(checkpoints) );
							
					res.render("includes/checkpointEdit", {
							idProjetoUsuario: req.session.idProjeto,
							idEquipeUsuario: req.session.idEquipe,
							idTermoAberturaUsuario: req.session.idTermoAbertura,
							sessionNomeUsuario: req.session.nomeUsuario,
							sessionNomeTipoUsuario: req.session.tipoUsuario,
							notificacao: req.session.notificacoes,
							dadosCP: checkpoints,
							layout: 'includes/layoutIncludes'
						});		
				}

		});
}


module.exports.finalizarProjetoDesenvolvedor = function(application, req, res){

	var connection = application.config.dbConnection;
	var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
	var timelineDAO = new application.app.models.TimelineDAO(connection);

	console.log("checkpoint:finalizarProjetoDesenvolvedor - INICIO");

	projetosDispDAO.atualizarStatusProjeto(req.session.idProjeto, req.session.idEquipe, "Teste de Aceitacao", function(error, resultAtualizarStatusProjeto){

		if(error){
			throw error;
		} else {
			console.log("checkpoint:finalizarProjetoDesenvolvedor - resultAtualizarStatusProjeto = "+JSON.stringify(resultAtualizarStatusProjeto));

			projetosDispDAO.consultarProjetoEquipe(req.session.idProjeto, function(error, resultConsultarProjetoEquipe){

				if(error){
					throw error;
				} else {
					var dadosProjetoEquipe = resultConsultarProjetoEquipe[0];
					console.log("checkpoint:finalizarProjetoDesenvolvedor - nomeProjeto = "+dadosProjetoEquipe.nomeProjeto);
					console.log("checkpoint:finalizarProjetoDesenvolvedor - nomeEquipe = "+dadosProjetoEquipe.nomeEquipe);
					console.log("checkpoint:finalizarProjetoDesenvolvedor - idContaUsuario = "+dadosProjetoEquipe.idContaUsuario);

					timelineDAO.timelineFinalizarProjetoEquipe(dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.nomeEquipe, req.session.idEquipe, function(error, resultTimelineFinalizarProjetoEquipe){

						if(error){
							throw error;
						} else {
							console.log("checkpoint:finalizarProjetoDesenvolvedor - resultTimelineFinalizarProjetoEquipe = "+JSON.stringify(resultAtualizarStatusProjeto));							

							timelineDAO.timelineProjetoFinalizadoEquipe(dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.nomeEquipe, dadosProjetoEquipe.idContaUsuario, function(error, resultTimelineProjetoFinalizadoEquipe){

								if(error){
									throw error;
								} else{

									console.log("checkpoint:finalizarProjetoDesenvolvedor - resultTimelineProjetoFinalizadoEquipe = "+JSON.stringify(resultTimelineProjetoFinalizadoEquipe));							

									var data = {
                            			resultado: "1",
                             		   	mensagem: "O projeto foi finalizado pela equipe. Aguardar retorno do cliente"
                             		};	 

                             		console.log("checkpoint:finalizarProjetoDesenvolvedor - ENVIANDO RESPOSTA A VIEW!!!!!!!!!!!!!!!!!!!!!!!")
                      				res.send(data);  
								}

							});

						}

					});

				}

			});
		}

	});

}

module.exports.finalizarProjeto = function(application, req, res){

	var connection = application.config.dbConnection;
	var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
	var timelineDAO = new application.app.models.TimelineDAO(connection);

	console.log("checkpoint:finalizarProjeto - INICIO");

	projetosDispDAO.consultarProjetoEquipe(req.session.idProjeto, function(error, resultConsultarProjetoEquipe){

		if(error){
			throw error;
		} else {
			var dadosProjetoEquipe = resultConsultarProjetoEquipe[0];
			console.log("checkpoint:finalizarProjeto - nomeProjeto = "+dadosProjetoEquipe.nomeProjeto);
			console.log("checkpoint:finalizarProjeto - nomeEquipe = "+dadosProjetoEquipe.nomeEquipe);
			console.log("checkpoint:finalizarProjeto - idContaUsuario = "+dadosProjetoEquipe.idContaUsuario);
			console.log("checkpoint:finalizarProjeto - idEquipe = "+dadosProjetoEquipe.idEquipe);

			projetosDispDAO.atualizarStatusProjeto(req.session.idProjeto, dadosProjetoEquipe.idEquipe, "Finalizado", function(error, resultAtualizarStatusProjeto){

				if(error){
					throw error;
				} else {
					console.log("checkpoint:finalizarProjeto - resultAtualizarStatusProjeto = "+JSON.stringify(resultAtualizarStatusProjeto));

					timelineDAO.timelineEncerrarProjeto(dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.nomeEquipe, dadosProjetoEquipe.idContaUsuario, function(error, resultTimelineEncerrarProjeto){

						if(error){
							throw error;
						} else {
							console.log("checkpoint:finalizarProjeto - resultTimelineEncerrarProjeto = "+JSON.stringify(resultTimelineEncerrarProjeto));							

							timelineDAO.timelineProjetoEncerrado(dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.nomeEquipe, dadosProjetoEquipe.idEquipe, function(error, resultTimelineProjetoEncerrado){

								if(error){
									throw error;
								} else{

									console.log("checkpoint:finalizarProjeto - resultTimelineProjetoEncerrado = "+JSON.stringify(resultTimelineProjetoEncerrado));							
									var data = {
	                        			resultado: "1",
                             			mensagem: "PROJETO FINALIZADO COM SUCESSO"
                       				};	 

                             		console.log("checkpoint:finalizarProjeto - ENVIANDO RESPOSTA A VIEW!!!!!!!!!!!!!!!!!!!!!!!")
                      				res.send(data);  
								}

							});

						}

					});
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

