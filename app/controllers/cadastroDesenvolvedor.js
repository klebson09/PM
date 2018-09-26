module.exports.cadDesenvolvedor = function(application, req, res){
  console.log("controllers de cadDesenvolvedor");
	res.render("cadastros/cadastroDesenvolvedor", {validacao: {}});
}

module.exports.cadastrar = function(application, req, res){
	console.log("------- Controller de cadastrar Desenvolvedor ------");
  var dadosFormCadastroDesenvolvedor = req.body;
	console.log(dadosFormCadastroDesenvolvedor);
	var connection = application.config.dbConnection;
	var DesenvolvedorDAO = new application.app.models.DesenvolvedorDAO(connection);
	console.log("connection = "+connection);
	console.log("DesenvolvedorDAO = "+DesenvolvedorDAO);
	DesenvolvedorDAO.incluirDev(dadosFormCadastroDesenvolvedor, req, function(error, result){

    if(error){
      throw error;
    } else {
      console.log("TUDO OK, DESENVOLVEDOR CADASTRADO");
      res.render("main/main",{mensagem:"Usuário Cadastrado com sucesso!"})
    }

  });
}
