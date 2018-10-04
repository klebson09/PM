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

								res.render("includes/content", {
									sessionNomeUsuario: req.session.nomeUsuario,
									sessionNomeTipoUsuario: req.session.tipoUsuario,
									notificacao: req.session.notificacoes,
									layout: 'includes/layoutIncludes'

								});

							}

					});

				}
			});

}
