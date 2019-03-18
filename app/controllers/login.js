module.exports.pagLogin = function(application, req, res) {
	// res.render("login/login", {validacao: {}});
	console.log("CONTROLLER LOGIN");
	res.render("login/login", {
		validacao: {}
	});
}

module.exports.autenticar = function(application, req, res) {
	console.log("CONTROLLER AUTENTICAR");
	var dadosFormLogin = req.body;
	console.log("********");
	console.log(dadosFormLogin);
	req.assert('email', 'Campo Email vazio').notEmpty();
	req.assert('senha', 'Campo Senha vazio').notEmpty();
	req.assert('email', 'Email inválido').isEmail();

	// console.log('email: ', req.body.email);
	var erros = req.validationErrors();

	if (erros) {
		console.log(erros);
		console.log("break");
		res.render("login/login", {
			validacao: erros
		});
		return;
	}
	var connection = application.config.dbConnection;
	var UsuarioDAO = new application.app.models.UsuarioDAO(connection);

	UsuarioDAO.autenticar(dadosFormLogin, function(error, result) {

		if (error) {
			throw error;
		} else {

			console.log("RESULT ==>>> " + result);
			if (result[0] != undefined) {
				console.log(result[0].nomeUsuario);

				req.session.autenticado = true;
				req.session.idContaUsuario = result[0].idContaUsuario;
				req.session.tipoUsuario = result[0].tipoUsuario;
				req.session.nomeUsuario = result[0].nomeUsuario;
				req.session.email = result[0].email;
				req.session.equipe = result[0].equipe;
				req.session.dataCadastro = new Date(result[0].dataCadastro);
				req.session.dataCadastroExtenso =  "";
				req.session.horaCadastroExtenso =  "";
				req.session.notificacoes = [{
					mensagem: "Nenhuma notificação",
					link: "#",
					tipo: "#"
				}];
				req.session.msgsTimeline = [];


				

			}

			console.log("tipoUsuario = "+req.session.tipoUsuario);
			console.log("nomeUsuario = "+req.session.nomeUsuario);
			console.log("dataCadastroJS = "+req.session.dataCadastro);
			console.log("dataCadastroDATA = "+req.session.dataCadastro.getDate());
			console.log("dataCadastroMES = "+req.session.dataCadastro.getMonth());
			console.log("dataCadastroANO = "+req.session.dataCadastro.getFullYear());

			var notifModelarProj = null;

			if (req.session.autenticado) {
				console.log("AUTORIZADO");
				if (req.session.tipoUsuario == 'D' || req.session.tipoUsuario == 'T') {
					res.render("includes/content", {
						sessionNomeUsuario: req.session.nomeUsuario,
						sessionNomeTipoUsuario: req.session.tipoUsuario,
						notificacao: req.session.notificacoes,
						layout: 'includes/layoutIncludes'

					});
				} else if (req.session.tipoUsuario == 'C') {

					console.log("Verificando se o usuário cliente tem um projeto associado");

					var projetosDispDAO = new application.app.models.projetosDispDAO(connection);
					var statusProjetoDAO = new application.app.models.StatusProjetoDAO(connection);
					var timeLineAnalisador = new application.app.models.timeLineAnalisador(connection);

					timeLineAnalisador.atualizarTimeLine(req.session, projetosDispDAO, statusProjetoDAO, function(msgs){
						req.session.msgsTimeline = msgs;

						res.render("includes/timeLine", {
							sessionNomeUsuario: req.session.nomeUsuario,
							sessionNomeTipoUsuario: req.session.tipoUsuario,
							notificacao: req.session.notificacoes,
							data: req.session.msgsTimeline,
							layout: 'includes/layoutIncludes'
						});
					});	

				}

			}else {
				console.log("NEGADO");
				console.log("************* ");
				var erros = {
					location: 'body',
					param: 'senha',
					msg: 'Campo Email ou Senha incorreto',
					value: ''
				}
				console.log(JSON.stringify(erros));
				res.render("login/login", {
					validacao: erros
				});
			}
		}
	});

	// res.send('tudo ok para criar a sessão');
}