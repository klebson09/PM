 var sqlProjeto = "INSERT INTO projeto (idPlataforma, idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade)";

function projetosDispDAO(connection){
  this._connection = connection();
}

projetosDispDAO.prototype.projetosDisponiveis = function(req, callback){
  // const assert = require('assert');

  console.log("************projetosDisponiveis***************");

  var sql =  'SELECT * FROM projeto WHERE status = "Modelado"';
  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sql, callback);
}

projetosDispDAO.prototype.verificarProjetosCliente = function(idUsuario, callback){
  console.log("projetosDispDAO: verificarProjetosCliente - OBTER PROJETOS ASSOCIADOS AO CLIENTE");
  var sql =  "SELECT * FROM projeto WHERE idContaUsuario ="+idUsuario;
  console.log("sql = "+sql);
  this._connection.query(sql, callback);
}

projetosDispDAO.prototype.criarProjeto = function(dadosProjeto, idUsuario, callback){
  console.log("CRIANDO PROJETO...");
  var idPlataforma = dadosProjeto.plataforma;
  var nomeProjeto = dadosProjeto.tituloProjeto;
  var areaAtuacao = dadosProjeto.areaAtuacao;
  var descricao = dadosProjeto.descricaoProjeto;
  var finalidade = dadosProjeto.finalidade;

  sqlProjeto +=  " VALUES ('"+idPlataforma+"', '"+idUsuario+"', '"+nomeProjeto+"', '"+areaAtuacao+"',  '"+descricao+"', '"+finalidade+"')";
  console.log("sql = "+sqlProjeto);
  this._connection.query(sqlProjeto, callback);
}

projetosDispDAO.prototype.consultarProjeto = function(idProjeto, callback){
  console.log("projetosDispDAO: consultarProjeto - ");
  var sql = "SELECT * FROM pm.projeto INNER JOIN plataforma ON projeto.idPlataforma = plataforma.idPlataforma WHERE idProjeto = "+idProjeto;
  console.log("sql = "+sql);
  this._connection.query(sql, callback);
}

projetosDispDAO.prototype.consultarProjetoEquipe = function(idProjeto, callback){
  console.log("projetosDispDAO: consultarProjeto - ");
  var sql = "SELECT projeto.nomeProjeto, equipe.nomeEquipe, equipe.idEquipe, equipe.idTutor, projeto.idContaUsuario FROM projeto INNER JOIN equipe ON projeto.idEquipe = equipe.IdEquipe WHERE projeto.idProjeto = "+idProjeto;
  console.log("sql = "+sql);
  this._connection.query(sql, callback);
}

projetosDispDAO.prototype.atualizarStatusProjeto = function(idProjeto, idEquipe, status, callback){
  console.log("projetosDispDAO:atualizarStatusProjeto - INICIO");
  var sql = "UPDATE projeto SET status = '"+status+ "', idEquipe = "+idEquipe+" WHERE idProjeto = "+idProjeto;
  console.log("sql = "+sql);
  this._connection.query(sql, callback);
}

projetosDispDAO.prototype.projetoAndamentoCliente = function(idContaUsuario, callback){
  console.log("projetosDispDAO:projetoAndamentoCliente - INICIO");
  var sql = "SELECT idProjeto FROM projeto WHERE idContaUsuario = "+idContaUsuario+" AND status != 'Concluído'";
  console.log("sql = "+sql);
  this._connection.query(sql, callback);
}

projetosDispDAO.prototype.projetoAndamentoDev = function(idEquipe, callback){
  console.log("projetosDispDAO:projetoAndamentoDev - INICIO");
  var sql = "SELECT idProjeto FROM projeto WHERE idEquipe = "+idEquipe+" AND status != 'Concluído'";
  console.log("sql = "+sql);
  this._connection.query(sql, callback);
}

projetosDispDAO.prototype.projetoAndamentoTutor = function(idContaUsuario, callback){
  console.log("projetosDispDAO:projetoAndamentoTutor - INICIO");
  var sql = "SELECT projeto.idProjeto, equipe.* FROM projeto INNER JOIN equipe ON projeto.idEquipe = equipe.idEquipe WHERE equipe.idTutor = "+idContaUsuario+"  AND projeto.status = 'Em andamento'";
  console.log("projetosDispDAO:projetoAndamentoTutor - sql = "+sql);
  this._connection.query(sql, callback);
}

projetosDispDAO.prototype.consultarStatusProjeto = function(idProjeto, callback){
  console.log("projetosDispDAO:consultarStatusProjeto - INICIO");
  var sql = "SELECT status FROM projeto WHERE idProjeto = "+idProjeto;
  console.log("sql = "+sql);
  this._connection.query(sql, callback);
}


module.exports = function(){
  return projetosDispDAO;
}
