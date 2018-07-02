module.exports.termoDeAbertura = function(application, req, res){

	        res.render("includes/termoAbertura", {
						sessionNomeUsuario: req.session.nomeUsuario,
            sessionNomeTipoUsuario: req.session.tipoUsuario,
					});
}

module.exports.criarTermoDeAbertura = function(application, req, res){

	       
}
