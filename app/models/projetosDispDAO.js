 var sqlProjeto = "INSERT INTO projeto (idPlataforma, idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade)";

function projetosDispDAO(connection){
  this._connection = connection();
}

projetosDispDAO.prototype.projetosDisponiveis = function(req, callback){
  // const assert = require('assert');

  console.log("************projetosDisponiveis***************");

  var sql =  'SELECT * FROM projeto INNER JOIN statusprojeto ON projeto.idProjeto = statusprojeto.idProjeto WHERE statusprojeto.disporProjeto = "2"';
  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sql, callback);
}

projetosDispDAO.prototype.verificarProjetosCliente = function(idUsuario, callback){
  console.log("OBTER PROJETOS ASSOCIADOS AO CLIENTE");
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



module.exports = function(){
  return projetosDispDAO;
}
