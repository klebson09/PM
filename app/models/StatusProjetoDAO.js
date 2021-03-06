


//var sqlProjeto = "INSERT INTO projeto (idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade, mobile, web, desktop)";

function StatusProjetoDAO(connection){
  this._connection = connection();
}

StatusProjetoDAO.prototype.atualizarStatus = function(idProjeto, campoStatus, campoStatusData ,status, callback){
  var sqlAtualizarStatus = "UPDATE statusprojeto SET";
  var dataStatus = new Date();
  console.log("dataStatus.getTime()"+dataStatus.getTime());
  dataStatus.setTime( dataStatus.getTime() - new Date().getTimezoneOffset()*60*1000 );
  var dataStatusString = dataStatus.toISOString().slice(0, 19).replace('T', ' ');
  sqlAtualizarStatus += " "+campoStatus+" =  '"+status+"', "+campoStatusData+" = '"+dataStatusString+"' WHERE idProjeto = "+idProjeto;
  console.log("sqlAtualizarStatus = "+sqlAtualizarStatus);
  this._connection.query(sqlAtualizarStatus, callback);
}

StatusProjetoDAO.prototype.inicializarStatusProjeto = function(idProjeto, callback){
  var sqlIniciarStatus = "INSERT INTO statusprojeto (idProjeto, modelarProjeto, dataStatus) ";
  var dataStatus = new Date();
  console.log("dataStatus.getTime()"+dataStatus.getTime());
  dataStatus.setTime( dataStatus.getTime() - new Date().getTimezoneOffset()*60*1000 );
  var dataStatusString = dataStatus.toISOString().slice(0, 19).replace('T', ' ');
  sqlIniciarStatus += "VALUES ('"+idProjeto+"', '2', '"+dataStatusString+"')";
  console.log("sqlIniciarStatus = "+sqlIniciarStatus);
  this._connection.query(sqlIniciarStatus, callback); 
}


StatusProjetoDAO.prototype.selecionarStatusProjeto = function(idProjeto, callback){
  var sqlSelectStatusProjeto = "SELECT * FROM statusprojeto WHERE idProjeto = "+idProjeto;
  console.log("sqlSelecionarStatusProjeto = "+sqlSelectStatusProjeto);
  this._connection.query(sqlSelectStatusProjeto, callback);
}

StatusProjetoDAO.prototype.verificarStatusTermoAbertura = function(idProjeto, callback){
  var sqlVerificarStatusTermoAbertura = "SELECT * FROM statusprojeto WHERE idProjeto = "+idProjeto+ " AND termoAbertura = 2";
  console.log("sqlVerificarStatusTermoAbertura = "+sqlVerificarStatusTermoAbertura);
  this._connection.query(sqlVerificarStatusTermoAbertura, callback);
}

module.exports = function(){
  return StatusProjetoDAO;
}
