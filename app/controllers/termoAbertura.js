module.exports.termoDeAbertura = function(application, req, res){

	        res.render("includes/termoAbertura", {
						sessionNomeUsuario: req.session.nomeUsuario,
            sessionNomeTipoUsuario: req.session.tipoUsuario,
					});
}

module.exports.criarTermoDeAbertura = function(application, req, res){
	console.log(req.body);

  var connection = application.config.dbConnection;
	var termoAbertura = req.body;
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO(connection);


	termoAberturaDAO.criarTermoAbertura(termoAbertura, function(erro, result){
		if(erro){
			throw erro;
		} else {
			console.log("TERMO DE ABERTURA CADASTRADO COM SUCESSO");
		}
	});
}
