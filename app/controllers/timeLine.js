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

module.exports.exibirTimeLine = function(application, req, res){

	console.log("timeLine.js:exibirTimeLine - INICIO");

	var connection = application.config.dbConnection;
	var timelineDAO = new application.app.models.TimelineDAO(connection);
	var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);

  if(req.session.tipoUsuario == 'C'){
		timelineDAO.timelineObterMsgs(req.session.idContaUsuario, function(error, resultTimelineObterMsgs){
			if(error){
				throw error;
			} else {
				timeLineAnalisador.tratarMsgs(resultTimelineObterMsgs, function(msgs){
					req.session.msgsTimeline = msgs;
					console.log("timeLine.js:exibirTimeLine - req.session.msgsTimeline = "+JSON.stringify(req.session.msgsTimeline))
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
	} else {
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


}

module.exports.listTimeLineClient = function(application, req, res){
	//var entregaveis = JSON.parse(req.body.entregaveis);
	console.log("timeline req.body  = "+req.body);
	//console.log("Entregaveis:\n\n"+JSON.stringify(entregaveis));

  	var connection = application.config.dbConnection;
	var timeLine = req.body;
	var statusProjetoDAO = new application.app.models.StatusProjetoDAO(connection);

	statusProjetoDAO.selecionarStatusProjeto(req.session.idProjeto, function(erro, result){
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
						data: req.session.notificacoes,
						layout: 'includes/layoutIncludes'

					});




				}
			});

}

module.exports.atualizaStatus = function function_name(argument) {
	// body...
}
