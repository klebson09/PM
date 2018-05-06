module.exports.cadCliente = function(application, req, res){
	res.render("cadastros/cadastroCliente", {validacao: {}});
}

module.exports.inclCliente = function(application, req, res){
	console.log("CONTROLLER INCLUIR CLIENTE");
	var dadosFormLogin = "0";
	// var dadosFormLogin = req.body;
	// req.assert('email', 'Campo Email vazio').notEmpty();
	// req.assert('senha', 'Campo Senha vazio').notEmpty();
	//
	// // console.log('email: ', req.body.email);
	// var erros = req. validationErrors();
	//
	// if(erros){
	// 	res.render("login/login", {validacao:erros});
	// 	return;
	// }
	var connection = application.config.dbConnection;
	var ClienteDAO = new application.app.models.ClienteDAO(connection);

	ClienteDAO.incluirCliente(dadosFormLogin, req, res);

	// res.send('tudo ok para criar a sessão');
}
