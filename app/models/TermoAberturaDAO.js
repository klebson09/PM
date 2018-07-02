function TermoAberturaDAO(connection){
  this._connection = connection();
}

TermoAberturaDAO.prototype.criarTermoAbertura = function(req, callback){
  // const assert = require('assert');

  console.log("************criar Termo de Abertura***************");

  var sql =  'INSERT INTO termo_abertura (idTermoAbertura, idEquipe, idProjeto, tituloProjeto, objetivo, escopo, escopoNegativo, interfacesOutrosProjetos, prazoEstimado, restricoes)';
  va
  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sql, callback);
}

module.exports = function(){
  return TermoAberturaDAO;
}
