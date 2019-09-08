var sqlInsertCheckpoints = "";

function CheckpointDAO(connection){
  this._connection = connection();
}

CheckpointDAO.prototype.criarCheckpoints = function(entregaveis, idProjeto, callback){

  console.log("************criar Checkpoints***************");
  console.log("CheckpointDAO:criarCheckpoints - entregaveis = "+entregaveis);

  console.log("CheckpointDAO:criarCheckpoints - idProjeto = "+idProjeto);
  sqlInsertCheckpoints =  "INSERT INTO checkpoint (idProjeto, descricao, dataInicial, dataFinal, status, observacoes) VALUES ?";
  var values = [];
  var i=0;

  //entregaveis = JSON.parse(entregaveis);
  console.log("CheckpointDAO:criarCheckpoints - entregaveis.length = "+JSON.stringify(entregaveis));
  console.log("CheckpointDAO:criarCheckpoints @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ");
  for(i=0;i<entregaveis.length;i++){

    var descricao = entregaveis[i].descricao;
    var dataInicial = entregaveis[i].dataInicial;
    var dataFinal = entregaveis[i].dataFinal;
    var status = entregaveis[i].status;
    var observacoes = entregaveis[i].observacoes;
    console.log("-------------------------------------------------------------------------");
    console.log("CheckpointDAO:criarCheckpoints - idProjeto["+i+"] = "+idProjeto);
    console.log("CheckpointDAO:criarCheckpoints - descricao["+i+"] = "+descricao);
    console.log("CheckpointDAO:criarCheckpoints - dataInicial["+i+"] = "+dataInicial);
    console.log("CheckpointDAO:criarCheckpoints - dataFinal["+i+"] = "+dataFinal);
    console.log("CheckpointDAO:criarCheckpoints - status["+i+"] = "+status);
    console.log("CheckpointDAO:criarCheckpoints - observacoes["+i+"] = "+observacoes);

    values.push([idProjeto, descricao, dataInicial, dataFinal, status, observacoes]);
  
  }
  console.log("-------------------------------------------------------------------------");
  console.log("CheckpointDAO:criarCheckpoints - sqlInsertCheckpoints\n\n"+sqlInsertCheckpoints+"\n\n");
  this._connection.query(sqlInsertCheckpoints, [values], callback);

}

CheckpointDAO.prototype.consultarCheckpoints = function(idProjeto, callback){
  console.log("********************** CheckpointDAO.consultarCheckpoints ***********************************");

  var sqlConsultarCheckpoints = "SELECT * FROM checkpoint WHERE idProjeto = "+idProjeto;

  console.log("CheckpointDAO.consultarCheckpoints - sqlConsultarCheckpoints = "+sqlConsultarCheckpoints);

  this._connection.query(sqlConsultarCheckpoints, callback);
}

CheckpointDAO.prototype.deletarCheckpoints = function(idProjeto, callback){
  console.log("********************** CheckpointDAO.deletarCheckpoints ***********************************");

  var sqlDeletarCheckpoints = "DELETE FROM checkpoint WHERE idProjeto = "+idProjeto;

  console.log("CheckpointDAO.deletarCheckpoints - sqlDeletarCheckpoints = "+sqlDeletarCheckpoints);

  this._connection.query(sqlDeletarCheckpoints, callback);
}

module.exports = function(){
  return CheckpointDAO;
}
