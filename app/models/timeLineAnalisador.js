/*var sqlSelectStatusProjeto = "SELECT * FROM statusprojeto WHERE ";


function timeLineAnalisador(connection){
  this._connection = connection();
}

timeLineAnalisador.prototype.processaMensagem = function(idProjeto, callback){

  console.log("====>>> timeLineDAO selecionarStatusProjetoTimeLine O| O| ");
  //var emailWhere = usuario.email;

  sqlSelectStatusProjeto += "idProjeto = 3";
  console.log("sqlSelectStatusProjeto = "+sqlSelectStatusProjeto);
  this._connection.query(sqlSelectStatusProjeto, callback);
}

module.exports = function(){
  return timeLineDAO;
}
*/