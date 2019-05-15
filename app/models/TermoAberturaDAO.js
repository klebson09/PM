var sqlInsertTermoAbertura =  'INSERT INTO termo_abertura (idProjeto, tituloProjeto, objetivo, escopo, escopoNegativo, interfacesOutrosProjetos, prazoEstimado, orcamento, restricoes)';

function TermoAberturaDAO(connection){
  this._connection = connection();
}

TermoAberturaDAO.prototype.criarTermoAbertura = function(termoAbertura, callback){

  console.log("************criar Termo de Abertura***************");

  var idProjeto = termoAbertura.idProjeto;
  var tituloProjeto = termoAbertura.tituloProjeto;
  var objetivo = termoAbertura.objetivoProjeto;
  var escopo = termoAbertura.escopoProjeto;
  var escopoNegativo = termoAbertura.escopoNegativoProjeto;
  var interfacesOutrosProjetos = termoAbertura.interfaceOutrosSistemasProjeto;
  var prazoEstimado = termoAbertura.prazosEstimadosProjeto;
  var orcamento = termoAbertura.orcamentoEstimado;
  var restricoes = termoAbertura.restricoesProjeto;

  console.log("prazoEstimado --------------------> "+prazoEstimado);

  sqlInsertTermoAbertura += "VALUES ("+idProjeto+", '"+tituloProjeto+"', '"+objetivo+"', '"+escopo+"', '"+escopoNegativo+"', '"+interfacesOutrosProjetos+"', '"+prazoEstimado+"', "+orcamento+", '"+restricoes+"')";
  console.log(sqlInsertTermoAbertura);
  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
  this._connection.query(sqlInsertTermoAbertura, callback);
}

module.exports = function(){
  return TermoAberturaDAO;
}
