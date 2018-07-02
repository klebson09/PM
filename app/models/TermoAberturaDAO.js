var sqlInsertTermoAbertura =  'INSERT INTO termo_abertura (idProjeto, tituloProjeto, objetivo, escopo, escopoNegativo, interfacesOutrosProjetos, prazoEstimado, restricoes)';

function TermoAberturaDAO(connection){
  this._connection = connection();
}

TermoAberturaDAO.prototype.criarTermoAbertura = function(termoAbertura, callback){

  console.log("************criar Termo de Abertura***************");

  var idProjeto = 0
  var tituloProjeto = 0;
  var objetivo = 0;
  var escopo = 0;
  var escopoNegativo = 0;
  var interfacesOutrosProjetos = 0;
  var prazoEstimado = 0;
  var restricoes = 0;

  sqlInsertTermoAbertura += "VALUES ('"+idProjeto+"', '"+tituloProjeto+"', '"+objetivo+"', '"+escopo+"', '"+escopoNegativo+"', '"+interfacesOutrosProjetos+"', '"+prazoEstimado+"', '"+restricoes+"')";

  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
  this._connection.query(sql, callback);
}

module.exports = function(){
  return TermoAberturaDAO;
}
