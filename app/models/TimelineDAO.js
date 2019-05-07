
function TimelineDAO(connection){
	this._connection = connection();
}

/*--------------------------------CLIENTE -------------------------------------*/

TimelineDAO.prototype.timelineIncluirCliente = function(cliente, callback){
	console.log("TimelineDAO:timelineIncluirCliente - INICIO cliente "+cliente);
	var idContaUsuario = cliente.idContaUsuario;
	var usr = cliente.nomeUsuario;
	var titulo = "Bem Vindo!";
	var href = "/modelar_projeto";
	var msg = "Olá <b>"+usr+"</b> seja bem vindo ao portal, aqui você terá a possibilidade de transformar sua ideia em realidade. Varias equipes com conhecimento diverso poderão trabalhar em seu projeto.Você deve MODELAR seu projeto com informações suficiente para que os desenvolvedores tenham uma boa visão do sistema que deverão desenvolver. <b><a href="+href+">Clique aqui para Modelar o projeto</a></b>";
	var icon = "fa fa-envelope bg-blue";

	var sql = "INSERT INTO timeline_msg (idContaUsuario, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idContaUsuario+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelineIncluirCliente ====>> sql "+sql);
	this._connection.query(sql, callback);
  }

TimelineDAO.prototype.timelineCriarProjeto = function(projeto, callback){
	console.log("TimelineDAO:timelineCriarProjeto - INICIO modelarProjeto "+projeto);
	var idContaUsuario = projeto.idContaUsuario;
	var proj = projeto.nomeProjeto;
	var titulo = "Parabéns, você modelou o projeto";
	var msg = "Bom trabalho, você descreveu o projeto <b>"+proj+"</b> e agora ele encontra-se disponível para equipes de desenvolvedores candidate-se para o projeto.Você vai receber notificações por email e por aqui no portal informando se alguma equipe ficou interessado por seu projeto.";
	var icon = "fa fa-envelope bg-blue";

	var sql = "INSERT INTO timeline_msg (idContaUsuario, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idContaUsuario+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelineIncluirCliente ====>> sql "+sql);
	this._connection.query(sql, callback);
}

TimelineDAO.prototype.timelineReceberProposta = function(projeto, idContaUsuario, callback){
	console.log("TimelineDAO:timelineReceberProposta - INICIO projeto "+projeto);
	var nomeProjeto = projeto.nomeProjeto;
	var titulo = "Proposta Recebida";
	var href = "/propostas_projeto"
	var msg = "Boas notícias, você recebeu alguma proposta do projeto <b>"+nomeProjeto+" </b>. Verifique todas as propostas clicando em <b><a href="+href+">VISUALIZAR PROPOSTA(S)</a></b>.";
	var icon = "fa fa-envelope bg-blue";	
	var sql = "INSERT INTO timeline_msg (idContaUsuario, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idContaUsuario+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelineEnviarProposta ====>> sql "+sql);
	this._connection.query(sql, callback);
}

TimelineDAO.prototype.timelineAprovarProposta = function(nomeEquipe, idContaUsuario, callback){
	console.log("TimelineDAO:timelineAprovarProposta - INICIO nomeProjeto "+nomeEquipe);
	var titulo = "Você aprovou a proposta da equipe "+nomeEquipe;
	var msg = "Muito bem, agora a brincadeira vai ficar seria, a equipe de desenvolvimento vai entrar em contato por email para esclarecer alguma eventual dúvida, eles estão trabalhando no desenvolvimento de um documento com as principais funcionalidades do sistema, o <b>TERMO DE ABERTURA</b>";
	var icon = "fa fa-envelope bg-blue";	
	var sql = "INSERT INTO timeline_msg (idContaUsuario, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idContaUsuario+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelineAprovarProposta ====>> sql "+sql);
	this._connection.query(sql, callback);

}


/*--------------------- DESENVOLVEDOR --------------------- */

TimelineDAO.prototype.timelineIncluirDev = function(desenvolvedor, callback){
	console.log("TimelineDAO:timelineIncluirDev - INICIO desenvolvedor "+JSON.stringify(desenvolvedor) );
	var idContaUsuario = desenvolvedor.idContaUsuario;
	var nomeDesenvolvedor = desenvolvedor.nomeUsuario;	
	var titulo = "Boas Vindas!";
	var href = "/criar_equipe";
	var msg = "Olá <b>"+nomeDesenvolvedor+"</b> seja bem vindo ao portal, aqui você terá a oportunidade de aplicar seu conhecimento em desenvolvimento de software e alavancar de vez sua carreira. Nenhum homem é uma ilha, então, você precisa fazer parte de uma equipe, clique em <b><a href="+href+">CRIAR EQUIPE</a></b> para iniciar suas atividades nesse sistema.";
	var icon = "fa fa-envelope bg-blue";

	var sql = "INSERT INTO timeline_msg (idContaUsuario, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idContaUsuario+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelineIncluirCliente ====>> sql "+sql);
	this._connection.query(sql, callback);
}


TimelineDAO.prototype.timelineCriarEquipe = function(equipe, callback){
	console.log("TimelineDAO:timelineCriarEquipe - INICIO equipe "+JSON.stringify(equipe));
	var idEquipe = equipe.idEquipe;
	var nomeEquipe = equipe.nomeEquipe;
	var titulo = "Parabéns, você pertence a equipe "+nomeEquipe+", #partiuprojeto";
	var href = "/projeto_disp";
	var msg = "Você é participante de uma equipe, agora você tem muitas oportunidades para mostrar o seu potencial. Muitos clientes precisam da sua ajuda, clique em <b><a href="+href+">PROJETOS DISPONIVEIS</a></b> e faça uma proposta para um cliente, convença-o de que é capaz de solucionar os seus problemas";
	var icon = "fa fa-envelope bg-blue";	
	var sql = "INSERT INTO timeline_msg (idEquipe, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idEquipe+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelineCriarEquipe ====>> sql "+sql);
	this._connection.query(sql, callback);
}

TimelineDAO.prototype.timelineEnviarProposta = function(projeto, idEquipe, callback){
	console.log("TimelineDAO:timelineEnviarProposta - INICIO projeto "+JSON.stringify(projeto));
	var nomeProjeto = projeto.nomeProjeto;
	var titulo = "Proposta Enviada";
	var msg = "A proposta de sua equipe para o projeto "+nomeProjeto+" foi enviada para analise do cliente, a qualquer momento o cliente pode aceitar sua proposta";
	var icon = "fa fa-envelope bg-blue";	
	var sql = "INSERT INTO timeline_msg (idEquipe, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idEquipe+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelineEnviarProposta ====>> sql "+sql);
	this._connection.query(sql, callback);
}

TimelineDAO.prototype.timelinePropostaAprovada = function(nomeProjeto, idEquipe, callback){
	console.log("TimelineDAO:timelinePropostaAprovada - INICIO nomeProjeto "+nomeProjeto);
	var titulo = "Cliente aprovou sua proposta para o projeto "+nomeProjeto;
	var href = "/termo_abertura";
	var msg = "Boas noticias, o cliente aceitou a proposta inicial de sua equipe para desenvolver o projeto "+nomeProjeto+", vocês devem negociar todos os termos e formaliza-los no Termo de Abertura. Clique em <b><a href="+href+">TERMO DE ABERTURA</a></b> para redigir o termo de abertura para a analise posterior do cliente";
	var icon = "fa fa-envelope bg-blue";	
	var sql = "INSERT INTO timeline_msg (idEquipe, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idEquipe+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelinePropostaAprovada ====>> sql "+sql);
	this._connection.query(sql, callback);
}

/*--------------------- OBTER MENSAGENS TIMELINE --------------*/

TimelineDAO.prototype.timelineObterMsgs = function(idContaUsuario, callback){
	console.log("TimelineDAO:timelineObterMsgs - INICIO cliente "+idContaUsuario);
	var sql = "SELECT * FROM pm.timeline_msg WHERE idContaUsuario = "+idContaUsuario+" ORDER BY dataHora DESC";
	console.log("TimelineDAO:timelineObterMsgs ====>> sql "+sql);
	this._connection.query(sql, callback);
}

TimelineDAO.prototype.timelineObterMsgsEquipe = function(idEquipe, idContaUsuario ,callback){
	console.log("TimelineDAO:timelineObterMsgsEquipe - INICIO idEquipe "+idEquipe);
	var sql = "SELECT * FROM pm.timeline_msg WHERE idEquipe = "+idEquipe+" OR idContaUsuario = "+idContaUsuario+" ORDER BY dataHora DESC";
	console.log("TimelineDAO:timelineObterMsgs ====>> sql "+sql);
	this._connection.query(sql, callback);
}


module.exports = function(){
	return TimelineDAO;	
}