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

	UsuarioDAO.autenticar(dadosFormLogin, function(error, result){

		if(error){
			throw error;
		} else {

			console.log("RESULT ==>>> " +result);
      if (result[0] != undefined) {
      	console.log(result[0].nomeUsuario);

        req.session.autenticado = true;
        req.session.idContaUsuario = result[0].idContaUsuario;
        req.session.tipoUsuario = result[0].tipoUsuario;
        req.session.nomeUsuario = result[0].nomeUsuario;
        req.session.email       = result[0].email;
        req.session.equipe      = result[0].equipe;
				req.session.notificacoes = [{mensagem: "Nenhuma notificação", link:"#", tipo:"#" }];


        console.log(req.session.tipoUsuario);
        console.log(req.session.nomeUsuario);

      }

      if (req.session.autenticado) {

				var  notifModelarProj = null;

        console.log("AUTORIZADO");
				if(req.session.tipoUsuario == 'C'){
					console.log("Verificando se o usuário cliente tem um projeto associado");

					var ProjetosDispDAO = new application.app.models.projetosDispDAO(connection);

					ProjetosDispDAO.verificarProjetosCliente(req.session.idContaUsuario, function(error, result){

							if(error){
								throw error;
							} else {
								console.log(JSON.stringify(result));
								if (result[0] == undefined || result[0] == null) {
									console.log("Sem projetos associados/pendentes");

									req.session.notificacoes = [];

									 notifModelarProj = '{ "mensagem":"Você precisa modelar um projeto", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow"}';


									 // notifModelarProj =  { mensagem: 'Olá '+req.session.nomeUsuario+' seja bem vindo! Você ainda não tem um projeto modelado, por favor crie seu projeto ',
										// 								 				link: '/modelarProjeto'
										// 								     };

								 console.log(notifModelarProj);

								 var notif = JSON.parse(notifModelarProj);

								 req.session.notificacoes.push(notif);

								 console.log("notif "+notif);


								 console.log("notificacao = "+notifModelarProj);



							 }

								res.render("includes/content", {
									sessionNomeUsuario: req.session.nomeUsuario,
									sessionNomeTipoUsuario: req.session.tipoUsuario,
									notificacao: req.session.notificacoes,
									layout: 'includes/layoutIncludes'

							 });

							}

					});

				}




      } else {

        console.log("NEGADO");
        console.log("************* ");
         var erros =  { location: 'body',
                            param: 'senha',
                            msg: 'Campo Email ou Senha incorreto',
                            value: ''  }
        console.log(JSON.stringify(erros) );
        res.render("login/login", {validacao:erros});
      }
		}
	});

	// res.send('tudo ok para criar a sessão');
}
