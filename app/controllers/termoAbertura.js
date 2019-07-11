module.exports.termoDeAbertura = function(application, req, res){

	console.log("termoAbertura.js:termoDeAbertura INICIO");
	
	var connection = application.config.dbConnection;	
	var equipeDAO = new application.app.models.EquipeDAO(connection);
	var projetosDispDAO = new application.app.models.projetosDispDAO(connection);

	equipeDAO.obterMembrosEquipe(req.session.idEquipe, function(error, resultObterDadosEquipe){
		console.log("--------------------------------------------------------------");
		console.log("termoAbertura.js: obterMembrosEquipe - "+JSON.stringify(resultObterDadosEquipe) );

		if(error){
			throw error;
		} else{
			var dados = {"idProjeto":req.session.idProjeto,"equipe":resultObterDadosEquipe};

			projetosDispDAO.consultarProjeto(req.session.idProjeto, function(error, resultConsultarProjeto){
				console.log("--------------------------------------------------------------");
				console.log("termoAbertura.js: resultConsultarProjeto - "+JSON.stringify(resultConsultarProjeto) );

				if(error){
					throw error;
				}else{	
					var dadosPj = resultConsultarProjeto[0];

					res.render("includes/termoAbertura", {
			        	sessionNomeUsuario: req.session.nomeUsuario,
		            	sessionNomeTipoUsuario: req.session.tipoUsuario,
		            	notificacao: req.session.notificacoes,
		            	dadosTermoAbertura: dados,
		            	dadosProjeto: dadosPj,
						layout: 'includes/layoutIncludes'
					});
				}
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
	var statusTermoAbertura = "";

	termoAberturaDAO.consultarTermoAbertura(req.session.idProjeto, function(error, resultConsultarTermoAbertura){

		console.log("termoAbertura:consultarTermoAbertura - resultConsultarTermoAbertura = "+JSON.stringify(resultConsultarTermoAbertura));

		if(error){
			throw error;
		} else {
			termoAbertura = resultConsultarTermoAbertura[0];
			statusTermoAbertura = termoAbertura.status;
			var dataPrazoEstimado = new Date(termoAbertura.prazoEstimado);
			termoAbertura.prazoEstimado = formatarData(dataPrazoEstimado);
			console.log("termoAbertura:consulconsultarTermoAbertura - termoAbertura.prazoEstimado = "+termoAbertura.prazoEstimado+ " statusTermoAbertura =>>> "+statusTermoAbertura);

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
							console.log("#############3termoAbertura:consultarTermoAbertura - statusTermoAbertura = "+statusTermoAbertura);

							var dados = {"idProjeto":req.session.idProjeto,"equipe":resultObterMembrosEquipe};
							membrosEquipe = resultObterMembrosEquipe;
							
								res.render("includes/termoAberturaCliente", {
									sessionNomeUsuario: req.session.nomeUsuario,
									sessionNomeTipoUsuario: req.session.tipoUsuario,
									notificacao: req.session.notificacoes,
									dadosTA: termoAbertura,
									dadosCP: checkpoints,
									dadosEQP: membrosEquipe,
									dadosTermoAbertura: dados,
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

	var statusTA = req.body.status;
	var respostaCliente = req.body.respostaCliente;
	var connection = application.config.dbConnection;	
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO(connection);
	var timelineDAO = new application.app.models.TimelineDAO(connection);
	var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
	console.log("**************************** termoAbertura:respostaTermoDeAbertura  *********************************************")

	console.log("termoAbertura:respostaTermoDeAbertura - statusTA = "+statusTA);
	console.log("termoAbertura:respostaTermoDeAbertura - respostaCliente = "+respostaCliente);

	termoAberturaDAO.atualizarStatusTermoAbertura(statusTA, respostaCliente, req.session.idProjeto, function(error, resultAtualizarTermoAbertura){
		if(error){
			throw error;
		} else {
			console.log("termoAbertura:respostaTermoDeAbertura - statusTA =@@& "+statusTA);
			console.log("termoAbertura:respostaTermoDeAbertura - resultAtualizarTermoAbertura = "+JSON.stringify(resultAtualizarTermoAbertura));

			projetosDispDAO.consultarProjetoEquipe(req.session.idProjeto, function(error, resultConsultarProjetoEquipe){

				if(error){
					throw error;
				} else {
					console.log("termoAbertura:respostaTermoDeAbertura - resultConsultarProjetoEquipe = "+JSON.stringify(resultConsultarProjetoEquipe));	
					var dadosProjetoEquipe = resultConsultarProjetoEquipe[0];
					console.log("termoAbertura:consultarProjetoEquipe - statusTA =@@& 22 "+statusTA);
				
					if(statusTA == "A"){ //Termo de Abertura aprovado
						console.log("termoAbertura:respostaTermoDeAbertura - statusTA =@@& Aprovado "+statusTA);

						projetosDispDAO.atualizarStatusProjeto(req.session.idProjeto, dadosProjetoEquipe.idEquipe, "Em andamento", function(error, resultAtualizarStatusProjeto){

							if(error){
								throw error;
							} else {
								console.log("termoAbertura:respostaTermoDeAbertura - resultAtualizarStatusProjeto = "+JSON.stringify(resultAtualizarStatusProjeto));	

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

							}

						});	

					} else { //Termo de Abertura reprovado
						console.log("termoAbertura:respostaTermoDeAbertura - statusTA =@@& RECUSADO "+statusTA);
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


module.exports.consultarEdicaoTermoDeAbertura = function(application, req, res){


	console.log("**************************** termoAbertura:consultarEdicaoTermoDeAbertura  *********************************************");

	var connection = application.config.dbConnection;
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO(connection);
	var checkpointDAO = new application.app.models.CheckpointDAO(connection);
	var equipeDAO = new application.app.models.EquipeDAO(connection);
	var termoAbertura = null;
	var checkpoints = [];
	var membrosEquipe = [];
	var statusTermoAbertura = "";

	termoAberturaDAO.consultarTermoAbertura(req.session.idProjeto, function(error, resultConsultarTermoAbertura){

		console.log("termoAbertura:consultarEdicaoTermoDeAbertura - resultConsultarTermoAbertura = "+JSON.stringify(resultConsultarTermoAbertura));

		if(error){
			throw error;
		} else {
			termoAbertura = resultConsultarTermoAbertura[0];
			statusTermoAbertura = termoAbertura.status;
			var dataPrazoEstimado = new Date(termoAbertura.prazoEstimado);
			termoAbertura.prazoEstimado = formatarData(dataPrazoEstimado);
			console.log("termoAbertura:consultarEdicaoTermoDeAbertura - termoAbertura.prazoEstimado = "+termoAbertura.prazoEstimado+ " statusTermoAbertura =>>> "+statusTermoAbertura);

			checkpointDAO.consultarCheckpoints(req.session.idProjeto, function(error, resultConsultarCheckpointsEdit){

				console.log("termoAbertura:consultarEdicaoTermoDeAbertura - resultConsultarCheckpointsEdit = "+JSON.stringify(resultConsultarCheckpointsEdit));

				if(error){
					throw error;
				} else {

					checkpoints = resultConsultarCheckpointsEdit;

					for(var i=0; i<checkpoints.length; i++){
						checkpoints[i].dataInicial = formatarData(new Date(checkpoints[i].dataInicial));
						checkpoints[i].dataFinal = formatarData(new Date(checkpoints[i].dataFinal));
					}

					equipeDAO.obterMembrosEquipe(termoAbertura.idEquipe, function(error, resultObterMembrosEquipeEdit){

						console.log("termoAbertura:consultarEdicaoTermoDeAbertura - resultObterMembrosEquipeEdit = "+JSON.stringify(resultObterMembrosEquipeEdit));
						console.log("#############3termoAbertura:consultarTermoAbertura - statusTermoAbertura = "+statusTermoAbertura);

						
						if(error){
							throw error;
						} else {
							var dados = {"idProjeto":req.session.idProjeto,"equipe":resultObterMembrosEquipeEdit};
							membrosEquipe = resultObterMembrosEquipeEdit;

							
								res.render("includes/termoAberturaClienteEditar", {
									sessionNomeUsuario: req.session.nomeUsuario,
									sessionNomeTipoUsuario: req.session.tipoUsuario,
									notificacao: req.session.notificacoes,
									dadosTA: termoAbertura,
									dadosCP: checkpoints,
									dadosEQP: membrosEquipe,
									dadosTermoAbertura: dados,
									layout: 'includes/layoutIncludes'
								});


							
						}	

					});

					

				}

			});

		}

	});
}
module.exports.editarTermoDeAbertura = function(application, req, res){
console.log("************termoAbertura.js:editarTermoDeAbertura INICIO***************");


  var connection = application.config.dbConnection;
	var termoAbertura = req.body;
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO(connection);
	var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
	var timelineDAO = new application.app.models.TimelineDAO(connection);
	var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);
	var entregaveis = termoAbertura.entregaveis;	


	console.log(req.body);
	console.log("Entregaveis:\n\n"+JSON.stringify(termoAbertura));

	termoAberturaDAO.atualizarTermoAbertura(termoAbertura, function(erro, result){
		if(erro){
			throw erro;
		} else {		
			console.log("termoAbertura.js:atualizarTermoAbertura ATUALIZADO COM SUCESSO");

			var idProjeto = termoAbertura.idProjeto
			var checkpointDAO = new application.app.models.CheckpointDAO(connection);

				checkpointDAO.deletarCheckpoints(idProjeto, function(error, resultDeletarCheckpoints){
					console.log("termoAbertura.js:atualizarTermoAbertura - resultDeletarCheckpoints = "+JSON.stringify(resultDeletarCheckpoints));

					if(error){
						throw error;
					} else {
						checkpointDAO.criarCheckpoints(entregaveis, idProjeto, function(erro, resultCriarCheckpoints){
							if(erro){
								throw erro;
							} else {
								console.log("termoAbertura.js:atualizarTermoAbertura  resultCriarCheckpoints "+ JSON.stringify(resultCriarCheckpoints) );

								console.log("CHECKPOINT DO PROJETO ATUALIZADO COM SUCESSO");

								projetosDispDAO.consultarProjetoEquipe(idProjeto, function(error, resultConsultarProjetoEquipe){
									if(error){
										throw error;
									} else {
										var dadosProjetoEquipe = resultConsultarProjetoEquipe[0];
										console.log("termoAbertura.js:atualizarTermoAbertura - nomeProjeto = "+dadosProjetoEquipe.nomeProjeto);
										console.log("termoAbertura.js:atualizarTermoAbertura - nomeEquipe = "+dadosProjetoEquipe.nomeEquipe);
										console.log("termoAbertura.js:atualizarTermoAbertura - idContaUsuario = "+dadosProjetoEquipe.idContaUsuario);
											timelineDAO.timelineAtualizarTermoAbertura(dadosProjetoEquipe.nomeProjeto, req.session.idEquipe, function(error, resultTimelineCriarTermoAbertura){
												if(error){
													throw error;
												} else {
														timelineDAO.timelineReceberTermoAberturaAtualizado(dadosProjetoEquipe.nomeEquipe, dadosProjetoEquipe.nomeProjeto, dadosProjetoEquipe.idContaUsuario, function(error, resultTimelineReceberTermoAbertura){
															console.log("termoAbertura.js:atualizarTermoAbertura  resultTimelineReceberTermoAbertura "+ JSON.stringify(resultTimelineReceberTermoAbertura) );

															if(error){
																throw error;
															} else {
																timelineDAO.timelineObterMsgsEquipe(req.session.idEquipe, req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
																	console.log("termoAbertura.js:atualizarTermoAbertura  resultTimelineObterMsgs "+ JSON.stringify(resultTimelineObterMsgs));

																	if(error){
																		throw error;
																	} else {
																		timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
																			req.session.msgsTimeline = msgs;
																			console.log("termoAbertura.js:atualizarTermoAbertura - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
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
		
	});	
}

module.exports.consultarCheckpointsTermoDeAbertura = function(application, req, res){

	var idProjeto = req.body.idProjeto;
	var connection = application.config.dbConnection;
	var checkpointDAO = new application.app.models.CheckpointDAO(connection);

	checkpointDAO.consultarCheckpoints(idProjeto, function(error, resultConsultarCheckpoints){

		if(error){
			throw error;
		} else {
			var checkpoints = resultConsultarCheckpoints[0];
			console.log("termoAbertura:consultarCheckpointsTermoDeAbertura checkpoints = "+JSON.stringify(checkpoints));

			res.send(checkpoints);
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

