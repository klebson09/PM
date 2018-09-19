var sqlIniciarStatus = "INSERT INTO statusprojeto (idProjeto, modelarProjeto, disporProjeto) ";
var sqlAtualizarStatus = "UPDATE statusprojeto SET";
var sqlSelectStatusProjeto = "SELECT * FROM statusprojeto WHERE "

//var sqlProjeto = "INSERT INTO projeto (idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade, mobile, web, desktop)";

function StatusProjetoDAO(connection){
  this._connection = connection();
}

StatusProjetoDAO.prototype.atualizarStatus = function(idProjeto, campoStatus, status, callback){

  sqlAtualizarStatus += " "+campoStatus+" VALUES("+status+") WHERE idProjeto = "+idProjeto;
  console.log("sqlAtualizarStatus = "+sqlAtualizarStatus);
  this._connection.query(sqlAtualizarStatus, callback);
}

StatusProjetoDAO.prototype.inicializarStatusProjeto = function(idProjeto, callback){

  sqlIniciarStatus += "VALUES ('"+idProjeto+"', '2', '2')";
  console.log("sqlIniciarStatus = "+sqlIniciarStatus);
  this._connection.query(sqlIniciarStatus, callback);
}

module.exports = function(){
  return StatusProjetoDAO;
}
