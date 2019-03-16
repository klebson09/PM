


//var sqlProjeto = "INSERT INTO projeto (idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade, mobile, web, desktop)";

function StatusProjetoDAO(connection){
  this._connection = connection();
}

StatusProjetoDAO.prototype.atualizarStatus = function(idProjeto, campoStatus, status, callback){
  var sqlAtualizarStatus = "UPDATE statusprojeto SET";
  var dataPropostaProjeto = new Date();
  console.log("dataPropostaProjeto.getTime()"+dataPropostaProjeto.getTime());
  dataPropostaProjeto.setTime( dataPropostaProjeto.getTime() - new Date().getTimezoneOffset()*60*1000 );
  var dataPropostaProjetoString = dataPropostaProjeto.toISOString().slice(0, 19).replace('T', ' ');
  sqlAtualizarStatus += " "+campoStatus+" =  '"+status+"', dataStatusProposta = '"+dataPropostaProjetoString+"' WHERE idProjeto = "+idProjeto;
  console.log("sqlAtualizarStatus = "+sqlAtualizarStatus);
  this._connection.query(sqlAtualizarStatus, callback);
}

StatusProjetoDAO.prototype.inicializarStatusProjeto = function(idProjeto, callback){
  var sqlIniciarStatus = "INSERT INTO statusprojeto (idProjeto, modelarProjeto, dataModelarProjeto) ";
  var dataModelarProjeto = new Date();
  console.log("dataModelarProjeto.getTime()"+dataModelarProjeto.getTime());
  dataModelarProjeto.setTime( dataModelarProjeto.getTime() - new Date().getTimezoneOffset()*60*1000 );
  var dataModelarProjetoString = dataModelarProjeto.toISOString().slice(0, 19).replace('T', ' ');
  sqlIniciarStatus += "VALUES ('"+idProjeto+"', '2', '"+dataModelarProjetoString+"')";
  console.log("sqlIniciarStatus = "+sqlIniciarStatus);
  this._connection.query(sqlIniciarStatus, callback); 
}


StatusProjetoDAO.prototype.selecionarStatusProjeto = function(idProjeto, callback){
  var sqlSelectStatusProjeto = "SELECT * FROM statusprojeto WHERE idProjeto = "+idProjeto;
  console.log("sqlSelecionarStatusProjeto = "+sqlSelectStatusProjeto);
  this._connection.query(sqlSelectStatusProjeto, callback);
}

module.exports = function(){
  return StatusProjetoDAO;
}
