module.exports.termoDeAbertura = function(application, req, res){

	        res.render("includes/termoAbertura", {
	        	sessionNomeUsuario: req.session.nomeUsuario,
            	sessionNomeTipoUsuario: req.session.tipoUsuario,
            	notificacao: req.session.notificacoes,
				layout: 'includes/layoutIncludes'
				});
}

module.exports.criarTermoDeAbertura = function(application, req, res){
	var entregaveis = JSON.parse(req.body.entregaveis);
	console.log(req.body);
	console.log("Entregaveis:\n\n"+JSON.stringify(entregaveis));

  var connection = application.config.dbConnection;
	var termoAbertura = req.body;
	var termoAberturaDAO = new application.app.models.TermoAberturaDAO(connection);


	termoAberturaDAO.criarTermoAbertura(termoAbertura, function(erro, result){
		if(erro){
			throw erro;
		} else {

		}
			console.log("TERMO DE ABERTURA CADASTRADO COM SUCESSO");
			console.log("Cadastrando Checkpoints....");

			var idProjeto = termoAbertura.idProjeto
			var checkpointDAO = new application.app.models.CheckpointDAO(connection);

			checkpointDAO.criarCheckpoints(entregaveis, idProjeto, function(erro, result){
				if(erro){
					throw erro;
				} else {
					console.log("CHECKPOINT DO PROJETO CADASTRADO COM SUCESSO");
					res.send("TERMO DE ABERTURA E CHECKPOINTS DO PROJETO CADASTRADOS COM SUCESSO")
				}
			})
	});
}
