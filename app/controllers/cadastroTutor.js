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
	TutorDAO.incluirTutor(dadosFormCadastroTutor, req, res);
}
