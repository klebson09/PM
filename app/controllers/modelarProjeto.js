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

					var notifProjetoSucesso = '[{ "mensagem":"Você criou o projeto '+dadosProjeto.tituloProjeto+'", "link":"#", "tipo":"fa-warning text-yellow"}]';

					var notif = JSON.parse(notifProjetoSucesso);

					req.session.notificacoes = notif;

					res.render("includes/content", {
						sessionNomeUsuario: req.session.nomeUsuario,
						sessionNomeTipoUsuario: req.session.tipoUsuario,
						notificacao: req.session.notificacoes,
						layout: 'includes/layoutIncludes'

					});
				}
			});

}
