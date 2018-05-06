// module.exports.home = function(application, req, res){
// 	// res.render("login/login", {validacao: {}});
// 	res.render("includes/blank", {validacao: {}});
// }
module.exports.home = function(application, req, res){
	if (req.session.autenticado) {
		res.render("includes/blank", {validacao: {}});
	}else {

		res.render('login/login', {validacao: {}});
	}
}
module.exports.sair = function(application, req, res){
	req.session.destroy( function(err){
		res.render('login/login', {validacao: {}});
	});
}
