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
	var timelineDAO = new application.app.models.TimelineDAO(connection);
	var usuarioDAO = new application.app.models.UsuarioDAO(connection);
	console.log("connection = "+connection);
	console.log("TutorDAO = "+TutorDAO);

	var cryptoPM = new application.app.models.CryptoPM();

	console.log("cadastroTutor:cadastrar - iniciando encriptação...")
  	dadosFormCadastroTutor.senha = cryptoPM.crypt(dadosFormCadastroTutor.senha);
  	console.log("cadastroTutor:cadastrar - dados encriptados =  "+dadosFormCadastroTutor.senha);

	TutorDAO.incluirTutor(dadosFormCadastroTutor, req, res, function(error, resultIncluirTutor){

		if(error){
			throw error;
		} else {
			var idContaUsuario = resultIncluirTutor.insertId;
			console.log("cadastroTutor:cadastrar - idContaUsuario =  "+idContaUsuario);
			console.log("cadastroTutor:cadastrar - dadosFormCadastroTutor =  "+JSON.stringify(dadosFormCadastroTutor));
			TutorDAO.incluirDadosEducacionaisTutor(idContaUsuario, dadosFormCadastroTutor, function(error, resultDadosEducacionaisTutor){

				if(error){
					throw error;
				} else {
					console.log("cadastroTutor:cadastrar incluirDadosEducacionaisTutor resultDadosEducacionaisTutor "+JSON.stringify(resultDadosEducacionaisTutor));
					usuarioDAO.obterContaUsuario(idContaUsuario, function(error, resultObterContaUsuario){

						if(error){
							throw error;
						} else {
							console.log("cadastroTutor:cadastrar resultObterContaUsuario "+ JSON.stringify(resultObterContaUsuario));
							timelineDAO.timelineIncluirTutor(resultObterContaUsuario[0], function(error, resultTimelineIncluirTutor){

								if(error){
									throw error;
								} else {
									console.log("cadastroTutor:cadastrar resultTimelineIncluirTutor = "+ JSON.stringify(resultTimelineIncluirTutor));
									var mensagem = {
						                msg: 1
						            };
						            res.render("login/login",{validacao:mensagem});
								}
							});
						}	

				});
			}
		});

		}
	});

}
