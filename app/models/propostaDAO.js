function propostaDAO(connection){
  this._connection = connection();
}


propostaDAO.prototype.insertProposta = function(res, req, callback){
  //-----------------------verifica membro eqp ------------------
  var statusEqp  = "Livre";  //console.log(" ***************ops************ "+ JSON.stringify(req.body.idContaUsuario) );
  var idContaUs = req.session.idContaUsuario;
  console.log("idContaUs @@@@@"+idContaUs);
  var apresentacao = req.body.apresentacao;
  var duvidas = req.body.duvidas;
  var idProjeto = req.body.idProjeto;
  console.log("apresentacao  ***********<<<<< "+apresentacao);
  console.log("idProjeto  ***********<<<<< "+idProjeto);
  //pega a equipe q o usuário logado esta atualmente vinculado
  var sql =  'SELECT idEquipe FROM equipe ';
  sql += 'INNER JOIN membrosequipe on equipe.idEquipe = membrosequipe.equipe_idEquipe ';
  sql += 'WHERE membrosequipe.conta_usuario_idContaUsuario = '+idContaUs;
  sql += ' AND equipe.status = "'+statusEqp+'" ';
  console.log("sql --> "+sql);
  this._connection.query(sql, function(err, result){
    //obs. implementar a verificação para um candidato não se candidatar duas vezes
    if (err) throw err;
    // -----------------------insert -------------------------
    var status  = "Candidato";
    //console.log("idProjeto =======> "+req.body.idProjeto);
    console.log("result[0].idEquipe; =======> "+result[0].idEquipe);
    //console.log("result[0].idProjeto; =======> "+res.idProjeto);

    if (result == null || result == ""){
      console.log("erro! verifique se vc já possui equipe ativa");
    }else{
      var idEquipe = result[0].idEquipe;
      console.log("insertProposta"+insertProposta);
      var insertProposta = 'INSERT INTO proposta(idProjeto, idEquipe, apresentacao, duvidas)';
      insertProposta += ' VALUES ("1", "'+idEquipe+'", "'+apresentacao+'","'+duvidas+'" )';

      this._connection.query(insertProposta, callback);

    }

  });


}

propostaDAO.prototype.obterPropostasProjeto = function(idProjeto, callback){

  var sqlPropostasProjeto = 'SELECT proposta.idProposta, proposta.idEquipe, equipe.nomeEquipe, proposta.apresentacao, proposta.duvidas FROM proposta INNER JOIN equipe  ON proposta.idEquipe = equipe.idEquipe WHERE proposta.idProjeto = '+idProjeto;
  this._connection.query(sqlPropostasProjeto, callback);

}

propostaDAO.prototype.enviarRespostaProp = function(req, callback){

  var respostaMsg = req.body.respostaMsg;
  var resposta = req.body.resposta;
  var idProposta = req.body.idProposta;
  var status = "Recusado";

  if(resposta == "Aceito"){
    status = "Aceito";
  }

  var updatePropostaSql = "UPDATE proposta SET status,feedback VALUES('"+status+"', '"+respostaMsg+"') WHERE idProposta = "+idProposta;
  this._connection.query(updatePropostaSql, callback);

}


module.exports = function(){
  return propostaDAO;
}
