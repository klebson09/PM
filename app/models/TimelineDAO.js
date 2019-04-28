
function TimelineDAO(connection){
	this._connection = connection();
}

TimelineDAO.prototype.timelineIncluirCliente = function(cliente, callback){
	console.log("TimelineDAO:timelineIncluirCliente - INICIO cliente "+cliente);
	var idContaUsuario = cliente.idContaUsuario;
	var usr = cliente.nomeUsuario;
	var titulo = "Bem Vindo!";
	var href = "/modelar_projeto";
	var msg = "Olá "+usr+" seja bem vindo ao portal, aqui você terá a possibilidade de transformar sua ideia em realidade. Varias equipes com conhecimento diverso poderão trabalhar em seu projeto.Você deve MODELAR seu projeto com informações suficiente para que os desenvolvedores tenham uma boa visão do sistema que deverão desenvolver. <b><a href="+href+">Clique aqui para Modelar o projeto</a></b>";
	var icon = "fa fa-envelope bg-blue";

	var sql = "INSERT INTO timeline_msg (idContaUsuario, tituloMensagem, mensagem, icon)";
	sql += " VALUES ('"+idContaUsuario+"', '"+titulo+"', '"+msg+"', '"+icon+"')";
	console.log("TimelineDAO:timelineIncluirCliente ====>> sql "+sql);
	this._connection.query(sql, callback);
  }

TimelineDAO.prototype.timelineObterMsgs = function(idContaUsuario, callback){
	console.log("TimelineDAO:timelineObterMsgs - INICIO cliente "+idContaUsuario);
	var sql = "SELECT * FROM pm.timeline_msg WHERE idContaUsuario = "+idContaUsuario;
	console.log("TimelineDAO:timelineObterMsgs ====>> sql "+sql);
	this._connection.query(sql, callback);
}

module.exports = function(){
	return TimelineDAO;	
}