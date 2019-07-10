function UsuarioDAO(connection){
  this._connection = connection();
}

UsuarioDAO.prototype.autenticar = function(usuario, callback){

  console.log("USUARIODAO O| O|");
  var emailWhere = usuario.email;
  var senhaWhere = usuario.senha;

  var sql =  'SELECT * FROM conta_usuario WHERE email = "'+emailWhere+'" and senha = "'+senhaWhere+'" ';
  console.log("UsuarioDAO:autenticar - sql = "+sql)

  this._connection.query(sql,callback);

}

UsuarioDAO.prototype.obterMembrosEquipe = function(callback){
  console.log("OBTER MEMBROS DA EQUIPE");
  var sql =  "SELECT idContaUsuario, nomeUsuario, email, tipoUsuario FROM pm.conta_usuario WHERE tipoUsuario = 'D'";
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterTutores = function(callback){
  console.log("OBTER TUTORES");
  var sql =  "SELECT idContaUsuario, nomeUsuario, email, tipoUsuario FROM pm.conta_usuario WHERE tipoUsuario = 'T'";
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterContaUsuario = function(idContaUsuario, callback){
  console.log("UsuarioDAO: obterContaUsuario --> idContaUsuario "+idContaUsuario);
  console.log("UsuarioDAO:obterContaUsuario INICIO")
  var sql = "SELECT * FROM pm.conta_usuario WHERE idContaUsuario = "+idContaUsuario;
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterContaUsuarioEmail = function(email, callback){
  console.log("UsuarioDAO:obterContaUsuarioEmail INICIO")
  var sql = "SELECT email FROM pm.conta_usuario WHERE email = '"+email+"'";
  console.log("UsuarioDAO:obterContaUsuarioEmail - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.alterarSenhaUsuarioEmail = function(novaSenha, email, callback){
  console.log("UsuarioDAO:alterarSenhaUsuarioEmail INICIO")
  var sql = "UPDATE pm.conta_usuario SET senha = '"+novaSenha+"', flagAlteracaoSenha = 0 WHERE email = '"+email+"'";
  console.log("UsuarioDAO:alterarSenhaUsuarioEmail - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.atualizarFlagAlteracaoSenhaUsuario = function(email, callback){
  console.log("UsuarioDAO:atualizarFlagAlteracaoSenhaUsuario INICIO")
  var sql = "UPDATE pm.conta_usuario SET flagAlteracaoSenha = 1 WHERE email = '"+email+"'";
  console.log("UsuarioDAO:atualizarFlagAlteracaoSenhaUsuario - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterFlagAlteracaoSenhaUsuario = function(email, callback){
  console.log("UsuarioDAO:obterFlagAlteracaoSenhaUsuario INICIO")
  var sql = "SELECT flagAlteracaoSenha FROM pm.conta_usuario WHERE email = '"+email+"'";
  console.log("UsuarioDAO:obterFlagAlteracaoSenhaUsuario - sql = "+sql);
  this._connection.query(sql, callback);
}


module.exports = function(){
  return UsuarioDAO;
}
