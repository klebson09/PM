module.exports.modelarProj = function(application, req, res){
		res.render('includes/modelarProj',{
			sessionNomeUsuario: req.session.nomeUsuario,
			sessionNomeTipoUsuario: req.session.tipoUsuario,
			notificacao: req.session.notificacoes,
			layout: 'includes/layoutIncludes'
	 });
}

module.exports.criarProj = function(application, req, res){

			console.log("CRIAR PROJETO");

		  var dadosProjeto = req.body;
			var idUsuario = req.session.idContaUsuario;
			var dataCad = req.session.dataCadastro;
			console.log("DATA CAD"+dataCad);

			var connection = application.config.dbConnection;
			var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
			projetosDispDAO.criarProjeto(dadosProjeto, idUsuario ,function(error, result){
				console.log("+++++++++callback++++++");
				if(error){
					throw error;
				} else {

					console.log(JSON.stringify(result));
					console.log("+++++++++ PROJETO CADASTRADO COM SUCESSO ++++++");
					//res.render("includes/projetosDisp", { data: JSON.stringify(res) });

					var statusProjetoDAO =  new application.app.models.StatusProjetoDAO(connection);
					var idProjeto = result.insertId;


					statusProjetoDAO.inicializarStatusProjeto(idProjeto, function(error, result){

						if(error){
							throw error;
						} else {
							console.log("+++++++++ PROJETO INICIALIZADO COM SUCESSO ++++++");

							var notifProjetoSucesso = '[{ "mensagem":"Você precisa disponibilizar o projeto '+dadosProjeto.tituloProjeto+'", "link":"#", "tipo":"fa-warning text-yellow"}]';

							var notif = JSON.parse(notifProjetoSucesso);

							req.session.notificacoes = new Array();

							req.session.notificacoes.push(notif);

							var ProjetosDispDAO = new application.app.models.projetosDispDAO(connection);

							ProjetosDispDAO.verificarProjetosCliente(req.session.idContaUsuario, function(error, result) {
								if (error) {
									throw error;
								} else {
									var timeLineAnalisador = new application.app.models.timeLineAnalisador();
									console.log(JSON.stringify(result));
									console.log("result//////////////"+JSON.stringify(result));

									statusProjetoDAO.selecionarStatusProjeto(result[0].idProjeto, function(erro, resultado){
										if(erro){
											throw erro;
										} else {

											timeLineAnalisador.processaMensagemCliente(resultado[0], req.session, result[0], function(msgs){
											
											req.session.msgsTimeline = msgs;

											res.render("includes/timeLine", {
												sessionNomeUsuario: req.session.nomeUsuario,
												sessionNomeTipoUsuario: req.session.tipoUsuario,
												notificacao: req.session.notificacoes,
												data: req.session.msgsTimeline,
												layout: 'includes/layoutIncludes'
											});
										});	
									}

								})
								
						}		
					});	

								/*res.render("includes/content", {
									sessionNomeUsuario: req.session.nomeUsuario,
									sessionNomeTipoUsuario: req.session.tipoUsuario,
									notificacao: req.session.notificacoes,
									layout: 'includes/layoutIncludes'

								});*/

				}

			});

		}
	});

}
