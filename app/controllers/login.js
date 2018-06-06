module.exports.pagLogin = function(application, req, res){
	// res.render("login/login", {validacao: {}});
	  console.log("CONTROLLER LOGIN");
	res.render("login/login", {validacao: {}});
}
module.exports.autenticar = function(application, req, res){
	console.log("CONTROLLER AUTENTICAR");
	var dadosFormLogin = req.body;
	console.log("********");
	console.log(dadosFormLogin);
	req.assert('email', 'Campo Email vazio').notEmpty();
	req.assert('senha', 'Campo Senha vazio').notEmpty();
	req.assert('email', 'Email inválido').isEmail();

	// console.log('email: ', req.body.email);
	var erros = req.validationErrors();

	if(erros){
		console.log(erros);
		console.log("break");
		res.render("login/login", {validacao:erros});
		return;
	}
	var connection = application.config.dbConnection;
	var UsuarioDAO = new application.app.models.UsuarioDAO(connection);

	UsuarioDAO.autenticar(dadosFormLogin, req, res);

	// res.send('tudo ok para criar a sessão');
}
