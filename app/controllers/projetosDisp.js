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
	          data: result

					});
		    }
			});
	}else {

		res.render('login/login', {validacao: {}});

	}
}
