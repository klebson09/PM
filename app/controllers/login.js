module.exports.pagLogin = function(application, req, res){
	// res.render("login/login", {validacao: {}});
	res.render("login/login", {validacao: {}});
}
module.exports.autenticar = function(application, req, res){
	console.log("CONTROLLER AUTENTICAR");
	var dadosFormLogin = req.body;
	req.assert('email', 'Campo Email vazio').notEmpty();
	req.assert('senha', 'Campo Senha vazio').notEmpty();

	console.log('email: ', req.body.email);
	var erros = req. validationErrors();

	if(erros){
		res.render("login/login", {validacao:erros});
		return;
	}
	res.send('tudo ok para criar a sessão');
}
