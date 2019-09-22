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

UsuarioDAO.prototype.verificarEmailUsuario = function(email, callback){
  console.log("UsuarioDAO:verificarEmailUsuario - INICIO");
  var sql =  "SELECT * FROM conta_usuario WHERE conta_usuario.email = '"+email+"'";
  console.log("UsuarioDAO:verificarEmailUsuario - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.verificarCPFCNPJUsuario = function(cpf_cnpj, callback){
  console.log("UsuarioDAO:verificarCPFCNPJUsuario - INICIO");
  var sql =  "SELECT * FROM conta_usuario WHERE conta_usuario.cpf_cnpj = '"+cpf_cnpj+"'";
  console.log("UsuarioDAO:verificarCPFCNPJUsuario - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterMembrosEquipe = function(callback){
  console.log("OBTER MEMBROS DA EQUIPE");
  var sql =  "SELECT idContaUsuario, nomeUsuario, email, tipoUsuario FROM conta_usuario LEFT JOIN membrosequipe ON conta_usuario.idContaUsuario = membrosequipe.conta_usuario_idContaUsuario WHERE tipoUsuario = 'D' AND NOT EXISTS (SELECT * FROM membrosequipe WHERE membrosequipe.conta_usuario_idContaUsuario = conta_usuario.idContaUsuario)";
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterTutores = function(callback){
  console.log("OBTER TUTORES");
  var sql =  "SELECT idContaUsuario, nomeUsuario, email, tipoUsuario FROM conta_usuario WHERE tipoUsuario = 'T'";
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterContaUsuario = function(idContaUsuario, callback){
  console.log("UsuarioDAO: obterContaUsuario --> idContaUsuario "+idContaUsuario);
  console.log("UsuarioDAO:obterContaUsuario INICIO")
  var sql = "SELECT * FROM conta_usuario WHERE idContaUsuario = "+idContaUsuario;
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterContaUsuarioEmail = function(email, callback){
  console.log("UsuarioDAO:obterContaUsuarioEmail INICIO")
  var sql = "SELECT email FROM conta_usuario WHERE email = '"+email+"'";
  console.log("UsuarioDAO:obterContaUsuarioEmail - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.alterarSenhaUsuarioEmail = function(novaSenha, email, callback){
  console.log("UsuarioDAO:alterarSenhaUsuarioEmail INICIO")
  var sql = "UPDATE conta_usuario SET senha = '"+novaSenha+"', flagAlteracaoSenha = 0 WHERE email = '"+email+"'";
  console.log("UsuarioDAO:alterarSenhaUsuarioEmail - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.atualizarFlagAlteracaoSenhaUsuario = function(email, callback){
  console.log("UsuarioDAO:atualizarFlagAlteracaoSenhaUsuario INICIO")
  var sql = "UPDATE conta_usuario SET flagAlteracaoSenha = 1 WHERE email = '"+email+"'";
  console.log("UsuarioDAO:atualizarFlagAlteracaoSenhaUsuario - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterFlagAlteracaoSenhaUsuario = function(email, callback){
  console.log("UsuarioDAO:obterFlagAlteracaoSenhaUsuario INICIO")
  var sql = "SELECT flagAlteracaoSenha FROM conta_usuario WHERE email = '"+email+"'";
  console.log("UsuarioDAO:obterFlagAlteracaoSenhaUsuario - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterDadosCliente = function(idContaUsuario, callback){
  console.log("UsuarioDAO: obterDadosCliente --> idContaUsuario "+idContaUsuario);
  console.log("UsuarioDAO:obterDadosCliente INICIO")
  var sql = "SELECT conta_usuario.*, contato.* FROM conta_usuario INNER JOIN contato ON conta_usuario.idContato = contato.idContato WHERE conta_usuario.idContaUsuario = "+idContaUsuario;
  console.log("UsuarioDAO:obterDadosCliente - sql = "+sql);
  this._connection.query(sql, callback);
}

UsuarioDAO.prototype.obterDadosDesenvolvedor = function(idContaUsuario, callback){
  console.log("UsuarioDAO: obterDadosDesenvolvedor --> idContaUsuario "+idContaUsuario);
  console.log("UsuarioDAO:obterDadosDesenvolvedor INICIO")
  var sql = "SELECT conta_usuario.*, contato.*, dados_educacionais_desenvolvedor.* FROM conta_usuario INNER JOIN contato ON conta_usuario.idContato = contato.idContato INNER JOIN dados_educacionais_desenvolvedor ON conta_usuario.idContaUsuario = dados_educacionais_desenvolvedor.idContaUsuario WHERE conta_usuario.idContaUsuario = "+idContaUsuario;
  console.log("UsuarioDAO:obterDadosDesenvolvedor - sql = "+sql);
  this._connection.query(sql, callback); 
}

UsuarioDAO.prototype.obterDadosTutor = function(idContaUsuario, callback){
  console.log("UsuarioDAO: obterDadosTutor --> idContaUsuario "+idContaUsuario);
  console.log("UsuarioDAO:obterDadosTutor INICIO")
  var sql = "SELECT conta_usuario.*, contato.*, dados_educacionais_tutor.* FROM conta_usuario INNER JOIN contato ON conta_usuario.idContato = contato.idContato INNER JOIN dados_educacionais_tutor ON conta_usuario.idContaUsuario = dados_educacionais_tutor.idContaUsuario WHERE conta_usuario.idContaUsuario = "+idContaUsuario;
  console.log("UsuarioDAO:obterDadosTutor - sql = "+sql);
  this._connection.query(sql, callback); 
}


module.exports = function(){
  return UsuarioDAO;
}
