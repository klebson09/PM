module.exports.cadCliente = function(application, req, res){
	res.render("cadastros/cadastroCliente", {validacao: {}});
}

module.exports.inclCliente = function(application, req, res){
	console.log("CONTROLLER INCLUIR CLIENTE");
	// var dadosFormLogin = "0";
	var dadosFormLogin = req.body;
	 
	 //Validando campos obrigatórios
	 
	 req.assert('nomeCliente', 'Campo Nome obrigatório').notEmpty();
	 req.assert('cpf_cnpj', 'Campo CPF obrigatório').notEmpty();
	 req.assert('nomeProjeto', 'Campo Nome do Projeto obrigatório').notEmpty();
	 req.assert('descrProjeto', 'Campo Descrição do Projeto obrigatório').notEmpty();
	 req.assert('descrProjetoModelarSistema', 'Campo Finalidade do Sistema obrigatório').notEmpty();
	 req.assert('areaAtuacao', 'Campo Area de Atuaçao obrigatório').notEmpty();
	 req.assert('email', 'Campo Email obrigatório').notEmpty();
	 req.assert('senha', 'Campo Senha obrigatório').notEmpty();
	 
	 //Validando campos email
	 req.assert('email', 'Email Inválido').isEmail();
	 req.assert('hangouts', 'Hangouts Inválido').isEmail();
	 
	 //Validando senha
	 req.assert('csenha', 'Confirmação de senha inválida').equals(dadosFormLogin.senha);
	 
	 //Validando plataforma
	 

	 console.log('email: ', req.body.email);
	 var erros = req. validationErrors();
	//
	if(erros){
	 	res.render("cadastros/cadastroCliente", {validacao:erros});
		return;
	}
	var connection = application.config.dbConnection;
	var ClienteDAO = new application.app.models.ClienteDAO(connection);

	ClienteDAO.incluirCliente(dadosFormLogin, req, res);

	// res.send('tudo ok para criar a sessão');
}
