module.exports.consultarCheckpoints = function(application, req, res){
	console.log("**************************** checkpoint:consultarCheckpoints  *********************************************");
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
							
						res.render("includes/checkpoint", {
							sessionNomeUsuario: req.session.nomeUsuario,
							sessionNomeTipoUsuario: req.session.tipoUsuario,
							notificacao: req.session.notificacoes,
							dadosCP: checkpoints,
							layout: 'includes/layoutIncludes'
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
							sessionNomeUsuario: req.session.nomeUsuario,
							sessionNomeTipoUsuario: req.session.tipoUsuario,
							notificacao: req.session.notificacoes,
							dadosCP: checkpoints,
							layout: 'includes/layoutIncludes'
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

