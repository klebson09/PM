function propostaDAO(connection){
  this._connection = connection();
}


propostaDAO.prototype.insertProposta = function(res, req, callback){
  //-----------------------verifica membro eqp ------------------
  var statusEqp  = "Alocado";  //console.log(" ***************ops************ "+ JSON.stringify(req.body.idContaUsuario) );
  var idContaUs = req.session.idContaUsuario;
  console.log("idContaUs @@@@@"+idContaUs);
  var apresentacao = req.body.apresentacao;
  var duvidas = req.body.duvidas;
  //console.log("idctus  ***********<<<<< "+idContaUs);
  //pega a equipe q o usuário logado esta atualmente vinculado
  var sql =  'SELECT idEquipe FROM equipe ';
  sql += 'INNER JOIN membrosequipe on equipe.idEquipe = membrosequipe.equipe_idEquipe ';
  sql += 'WHERE membrosequipe.conta_usuario_idContaUsuario = '+idContaUs;
  // sql += ' AND equipe.status = "'+statusEqp+'" ';
  console.log("sql --> "+sql);
  this._connection.query(sql, function(err, result){
    //obs. implementar a verificação para um candidato não se candidatar duas vezes
    if (err) throw err;
    // -----------------------insert -------------------------
    var status  = "Candidato";
    console.log("idProjeto =======> "+req.body.idProjeto);
    console.log("result =======> "+result);

    if (result == null || result == ""){
      console.log("erro! verifique se vc já possui equipe ativa");
    }else{
      var idEquipe = result[0].idEquipe;
      var insertProposta = 'INSERT INTO proposta(idProjeto, idEquipe, apresentacao, duvidas)';
      insertProposta += ' VALUES ("'+req.body.idProjeto+'", "'+idEquipe+'", "'+status+'","'+apresentacao+'","'+duvidas+'" )';

      this._connection.query(insertProposta, callback);

    }

  });


}

module.exports = function(){
  return propostaDAO;
}
