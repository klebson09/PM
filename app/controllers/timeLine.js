module.exports.viewTimeLine = function(application, req, res){
	console.log("=====>>>> timeLine controller fora");
	if (req.session.autenticado) {
		console.log("=====>>>> timeLine controller no if");
		res.render("includes/timeLine", {
	        	sessionNomeUsuario: req.session.nomeUsuario,
            	sessionNomeTipoUsuario: req.session.tipoUsuario,
            	notificacao: req.session.notificacoes,
				layout: 'includes/layoutIncludes'
				});
	}else {

		res.render('login/login', {validacao: {}});
	}
}


module.exports.listTimeLineClient = function(application, req, res){
	//var entregaveis = JSON.parse(req.body.entregaveis);
	console.log("timeline req.body  = "+req.body);
	//console.log("Entregaveis:\n\n"+JSON.stringify(entregaveis));

  	var connection = application.config.dbConnection;
	var timeLine = req.body;
	var statusProjetoDAO = new application.app.models.StatusProjetoDAO(connection);

	statusProjetoDAO.selecionarStatusProjeto(req, function(erro, result){
				if(erro){
					throw erro;
				} else {
					console.log("SELECT DA TABELA selecionarStatusProjeto");
					req.session.notificacoes = [];

					console.log(JSON.stringify(result));
					console.log("+++++++++ FIMMMM ++++++");
					//res.render("includes/projetosDisp", { data: JSON.stringify(res) });

					res.render("includes/timeLine", {
						sessionNomeUsuario: req.session.nomeUsuario,
						sessionNomeTipoUsuario: req.session.tipoUsuario,
						notificacao: req.session.notificacoes,
						data: result,
						layout: 'includes/layoutIncludes'

					});




				}
			});

}

module.exports.atualizaStatus = function function_name(argument) {
	// body...
}