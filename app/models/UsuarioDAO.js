function UsuarioDAO(connection){
  this._connection = connection();
}

UsuarioDAO.prototype.autenticar = function(usuario, callback){

  console.log("USUARIODAO O| O|");
  var emailWhere = usuario.email;
  var senhaWhere = usuario.senha;

  var sql =  'SELECT * FROM conta_usuario WHERE email = "'+emailWhere+'" and senha = "'+senhaWhere+'" ';

  this._connection.query(sql,callback);
  
}

UsuarioDAO.prototype.obterMembrosEquipe = function(callback){
  console.log("OBTER MEMBROS DA EQUIPE");
  var sql =  "SELECT idContaUsuario, nomeUsuario, email, tipoUsuario FROM pm.conta_usuario WHERE tipoUsuario != 'C'";
  this._connection.query(sql, callback);
}

module.exports = function(){
  return UsuarioDAO;
}
