module.exports.cadTutor = function(application, req, res){
  console.log("controllers de cadTutor");
	res.render("cadastros/cadastroTutor", {validacao: {}});
}

module.exports.cadastrar = function(application, req, res){
	console.log("------- Controller de cadastrar Tutor ------");
	var dadosFormCadastroTutor = req.body;
	console.log(dadosFormCadastroTutor);
	var connection = application.config.dbConnection;
	var TutorDAO = new application.app.models.TutorDAO(connection);
	console.log("connection = "+connection);
	console.log("TutorDAO = "+TutorDAO);

	var cryptoPM = new application.app.models.CryptoPM();

	console.log("cadastroTutor:cadastrar - iniciando encriptação...")
  	dadosFormCadastroTutor.senha = cryptoPM.crypt(dadosFormCadastroTutor.senha);
  	console.log("cadastroCliente:inclCliente - dados encriptados =  "+dadosFormCadastroTutor.senha);

	TutorDAO.incluirTutor(dadosFormCadastroTutor, req, res, function(error, resultIncluirTutor){

		if(error){
			throw error;
		} else {
			console.log("cadastroTutor:cadastrar resultIncluirTutor = "+ JSON.stringify(resultIncluirTutor));
			var mensagem = {
                msg: 1
            };
            res.render("login/login",{validacao:mensagem});
		}

	});
}
