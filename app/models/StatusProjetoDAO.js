var sqlAtualizarStatus = "UPDATE statusProjeto SET";

//var sqlProjeto = "INSERT INTO projeto (idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade, mobile, web, desktop)";

function StatusProjetoDAO(connection){
  this._connection = connection();
}

StatusProjetoDAO.prototype.atualizarStatus = function(idProjeto, campoStatus, status, callback){

  sqlAtualizarStatus += " "+campoStatus+" VALUES("+status+") WHERE idProjeto = "+idProjeto;
  console.log("sqlAtualizarStatus = "+sqlAtualizarStatus);
  this._connection.query(sqlAtualizarStatus, callback);
}

module.exports = function(){
  return StatusProjetoDAO;
}
