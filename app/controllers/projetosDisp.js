module.exports.projDisp = function(application, req, res){
	// res.render("includes/projetosDisp", {validacao: {}});
	if (req.session.autenticado) {
		res.render("includes/projetosDisp", {validacao: {}});
	}else {

		res.render('login/login', {validacao: {}});
	}
}
