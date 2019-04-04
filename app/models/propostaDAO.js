  function propostaDAO(connection){
  this._connection = connection();
}


propostaDAO.prototype.obterPropostasEquipe = function(idEquipe, callback){
  var sqlPropostasEquipe = 'SELECT proposta.idProjeto, proposta.idProposta, proposta.idEquipe, equipe.nomeEquipe, proposta.apresentacao, proposta.duvidas, proposta.feedback FROM proposta INNER JOIN equipe  ON proposta.idEquipe = equipe.idEquipe WHERE proposta.idEquipe = '+idEquipe;
  console.log("sqlPropostasEquipe = "+sqlPropostasEquipe);
  this._connection.query(sqlPropostasEquipe, callback);
}

propostaDAO.prototype.insertProposta = function(res, req, callback){
  //-----------------------verifica membro eqp ------------------
  var statusEqp  = "Aberto";  //console.log(" ***************ops************ "+ JSON.stringify(req.body.idContaUsuario) );
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
      var insertProposta = 'INSERT INTO proposta(idProjeto, idEquipe, apresentacao, duvidas)';
      insertProposta += ' VALUES ("'+idProjeto+'", "'+idEquipe+'", "'+apresentacao+'","'+duvidas+'" )';
      console.log("insertProposta"+insertProposta);
      this._connection.query(insertProposta, callback);

    }

  });


}

propostaDAO.prototype.obterPropostasProjeto = function(idProjeto, callback){

  var sqlPropostasProjeto = 'SELECT proposta.idProjeto, proposta.idProposta, proposta.idEquipe, equipe.nomeEquipe, proposta.apresentacao, proposta.duvidas, proposta.feedback FROM proposta INNER JOIN equipe  ON proposta.idEquipe = equipe.idEquipe WHERE proposta.idProjeto = '+idProjeto;
  console.log("sqlPropostasProjeto = "+sqlPropostasProjeto);
  this._connection.query(sqlPropostasProjeto, callback);

}

propostaDAO.prototype.verificarPropostasProjeto = function(idProjeto, callback){

  var sqlVerificarPropostasProjeto = 'SELECT proposta.idProposta, proposta.idEquipe, proposta.apresentacao, proposta.duvidas, proposta.feedback FROM proposta WHERE proposta.idProjeto = "'+idProjeto+'" AND proposta.status = "Aberta" AND proposta.status = "Aprovada"';
  console.log("sqlPropostasProjeto = "+sqlVerificarPropostasProjeto);
  this._connection.query(sqlVerificarPropostasProjeto, callback);

}

propostaDAO.prototype.verificarPropostasProjetoAprovada = function(idProjeto, callback){

  var sqlVerificarPropostasProjetoAprovada = 'SELECT proposta.idProposta, proposta.idEquipe, proposta.apresentacao, proposta.duvidas, proposta.feedback FROM proposta WHERE proposta.idProjeto = "'+idProjeto+'" AND proposta.status = "Aprovada"';
  console.log("sqlVerificarPropostasProjetoAprovada = "+sqlVerificarPropostasProjetoAprovada);
  this._connection.query(sqlVerificarPropostasProjetoAprovada, callback);

}

propostaDAO.prototype.enviarRespostaProp = function(req, callback){
  var respostaMsg = req.body.respostaMsg;
//  var resposta = req.body.resposta;
  var idProposta = req.body.idProposta;
  // var status = "Recusado";
  console.log("@@enviarRespostaProp==>"+respostaMsg+"idProposta==>"+idProposta);
  // if(resposta == "Aceito"){
  //   status = "Aceito";
  // }

  // var updatePropostaSql = "UPDATE proposta SET status,feedback VALUES('"+status+"', '"+respostaMsg+"') WHERE idProposta ='"+idProposta+"')";
  var updatePropostaSql = "UPDATE `proposta` SET `feedback` = '"+respostaMsg+"' WHERE (`idProposta` ='"+idProposta+"')";
  console.log("@@enviarRespostaProp@@"+updatePropostaSql);
  this._connection.query(updatePropostaSql, callback);
}

propostaDAO.prototype.aprovarProp = function(req, callback){
  var status = req.body.status;
//  var resposta = req.body.resposta;DSSDA
  var idProposta = req.body.idProposta;
  // var status = "Recusado";
  console.log("@@status==>"+status+"idProposta==>"+idProposta);

  // var updatePropostaSql = "UPDATE proposta SET status,feedback VALUES('"+status+"', '"+respostaMsg+"') WHERE idProposta ='"+idProposta+"')";
  var updatePropostaSql = "UPDATE `proposta` SET `status` = '"+status+"' WHERE (`idProposta` ='"+idProposta+"')";
  console.log("@@updatePropostaSql@@"+updatePropostaSql);
  this._connection.query(updatePropostaSql, callback);
}

module.exports = function(){
  return propostaDAO;
}
