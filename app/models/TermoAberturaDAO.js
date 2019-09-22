var sqlInsertTermoAbertura =  'INSERT INTO termo_abertura (idProjeto, tituloProjeto, objetivo, escopo, escopoNegativo, interfacesOutrosProjetos, prazoEstimado, orcamento, restricoes)';

function TermoAberturaDAO(connection){
  this._connection = connection();
}

TermoAberturaDAO.prototype.criarTermoAbertura = function(termoAbertura, callback){

  console.log("************criar Termo de Abertura***************");

  console.log("TermoAberturaDAO:criarTermoAbertura - termoAbertura = "+JSON.stringify(termoAbertura))

  var idProjeto = termoAbertura.idProjeto; 
  var tituloProjeto = termoAbertura.nomeProjeto;
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

TermoAberturaDAO.prototype.consultarTermoAbertura = function(idProjeto, callback){
    
  console.log("************consultar Termo de Abertura***************");   

  var sqlConsultarTermoAbertura = "SELECT termo_abertura.*, projeto.*, plataforma.* FROM termo_abertura INNER JOIN projeto ON termo_abertura.idProjeto = projeto.idProjeto INNER JOIN plataforma ON projeto.idPlataforma = plataforma.idPlataforma WHERE termo_abertura.idProjeto = "+idProjeto;

  console.log("TermoAberturaDAO:consultarTermoAbertura - sqlConsultarTermoAbertura = "+sqlConsultarTermoAbertura);

  this._connection.query(sqlConsultarTermoAbertura, callback);


}

TermoAberturaDAO.prototype.atualizarStatusTermoAbertura = function(status, respostaCliente, idProjeto, callback){

  console.log("************atualizarStatusTermoAbertura***************");  
  console.log("TermoAberturaDAO:atualizarStatusTermoAbertura - status =@@& 33 "+status); 
  var sqlAtualizarStatusTermoAbertura = "UPDATE termo_abertura SET status='"+status+"', respostaCliente='"+respostaCliente+"' WHERE idProjeto = "+idProjeto;    
  console.log("TermoAberturaDAO:atualizarStatusTermoAbertura - sqlAtualizarStatusTermoAbertura = "+sqlAtualizarStatusTermoAbertura);
  this._connection.query(sqlAtualizarStatusTermoAbertura, callback);

}

TermoAberturaDAO.prototype.atualizarTermoAbertura = function(termoAbertura, callback){
     
     console.log("************atualizarTermoAbertura***************"); 
     console.log("TermoAberturaDAO:atualizarTermoAbertura - status =@@& 33 "); 

  var idProjeto = termoAbertura.idProjeto;
  var tituloProjeto = termoAbertura.tituloProjeto;
  var objetivo = termoAbertura.objetivo;
  var escopo = termoAbertura.escopo;
  var escopoNegativo = termoAbertura.escopoNegativoProjeto;
  var interfacesOutrosProjetos = termoAbertura.interfaceOutrosSistemasProjeto;
  var prazoEstimado = termoAbertura.prazosEstimadosProjeto;
  var orcamento = termoAbertura.orcamentoEstimado;
  var restricoes = termoAbertura.restricoesProjeto;  
  var status = termoAbertura.status;  
    
  var atualizarTermoAbertura = "UPDATE termo_abertura SET tituloProjeto = '"+tituloProjeto+"', objetivo = '"+objetivo+"', escopo = '"+escopo+"', escopoNegativo = '"+escopoNegativo+"', interfacesOutrosProjetos = '"+interfacesOutrosProjetos+"', prazoEstimado = '"+prazoEstimado+"', orcamento = '"+orcamento+"', restricoes = '"+restricoes+"', status = '"+status+"' WHERE idProjeto ="+idProjeto;

  console.log("TermoAberturaDAO:atualizarTermoAbertura - atualizarTermoAbertura = "+atualizarTermoAbertura);
  this._connection.query(atualizarTermoAbertura, callback);
}

TermoAberturaDAO.prototype.deletarTermoAbertura = function(idTermoAbertura, callback){

  console.log("TermoAberturaDAO:deletarTermoAbertura - INICIO");
  console.log("TermoAberturaDAO:deletarTermoAbertura - idTermoAbertura = "+idTermoAbertura);

  var sqlDeletarTermoAbertura = "DELETE FROM termo_abertura WHERE idTermoAbertura = "+idTermoAbertura;

  console.log("TermoAberturaDAO:deletarTermoAbertura - sqlDeletarTermoAbertura = "+sqlDeletarTermoAbertura);

  this._connection.query(sqlDeletarTermoAbertura, callback);  
}

module.exports = function(){
  return TermoAberturaDAO;
}
