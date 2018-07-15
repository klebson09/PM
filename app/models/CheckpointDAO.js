var sqlInsertCheckpoints = "";

function CheckpointDAO(connection){
  this._connection = connection();
}

CheckpointDAO.prototype.criarCheckpoints = function(entregaveis, idProjeto, callback){

  console.log("************criar Checkpoints***************");

  var i=0;

  for(i=0;i<entregaveis.length;i++){



    var descricao = entregaveis[i].descricao;
    var dataInicial = entregaveis[i].dataInicial;
    var dataFinal = entregaveis[i].dataFinal;
    var status = entregaveis[i].status;
    var observacoes = entregaveis[i].observacoes;

    console.log("idProjeto = "+idProjeto);

    console.log("descricao = "+descricao);
    console.log("dataInicial = "+dataInicial);
    console.log("dataFinal = "+dataFinal);
    console.log("status = "+status);
    console.log("observacoes = "+observacoes);

    sqlInsertCheckpoints =  "INSERT INTO checkpoint (idProjeto, descricao, dataInicial, dataFinal, status, observacoes) VALUES ("+idProjeto+", '"+descricao+"', '"+dataInicial+"', '"+dataFinal+"', '"+status+"', '"+observacoes+"')";

    console.log("SQL\n\n"+sqlInsertCheckpoints+"\n\n");

  this._connection.query(sqlInsertCheckpoints, callback);
  }

}

module.exports = function(){
  return CheckpointDAO;
}
