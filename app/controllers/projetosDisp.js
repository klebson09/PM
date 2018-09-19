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
				//res.render("includes/projetosDisp", { data: JSON.stringify(res) });
				//===>> IMPLEMENTAR UMA PAGINA INFORMANDO Q O A EQUIPE SE CANDIDATOU AO PROJETO
				res.render("includes/projetosDisp", {
					sessionNomeUsuario: req.session.nomeUsuario,
					sessionNomeTipoUsuario: req.session.tipoUsuario,
					data: result

				});
			}
		});
	}else {

		res.render('login/login', {validacao: {}});

	}
}
