module.exports.termoDeAbertura = function(application, req, res){

	        res.render("includes/termoAbertura", {
						sessionNomeUsuario: req.session.nomeUsuario,
            sessionNomeTipoUsuario: req.session.tipoUsuario,
					});
}

module.exports.criarTermoDeAbertura = function(application, req, res){
	console.log(req.body);

	var termoAbertura = req.body;
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO();


	termoAberturaDAO.criarTermoAbertura(termoAbertura, function(err, result){
		if(erro){
			throw erro;
		} else {
			console.log("TERMO DE ABERTURA CADASTRADO COM SUCESSO");
		}
	});
}
