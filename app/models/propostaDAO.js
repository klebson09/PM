function propostaDAO(connection){
  this._connection = connection();
}

propostaDAO.prototype.verificaMembroEqp = function(req, callback){
  var statusEqp  = "Alocado";
  console.log(" ***************ops************ "+ JSON.stringify(req.body.idContaUsuario) );
  var idContaUs = req.body.idContaUsuario;
  idContaUs = idContaUs.replace(/"/g, '');
  console.log("idctus  ***********<<<<< "+idContaUs);
  var sql = 'SELECT idEquipe FROM equipe ';
      sql += 'INNER JOIN membrosequipe on equipe.idEquipe = membrosequipe.equipe_idEquipe ';
      sql += 'WHERE membrosequipe.conta_usuario_idContaUsuario = '+idContaUs;
      sql += ' AND equipe.status = "'+statusEqp+'" ';
      console.log("sql --> "+sql);
    this._connection.query(sql, callback);
}
propostaDAO.prototype.insertProposta = function(req, callback){
  var idEquipe = 0;
  propostaDAO.prototype.verificaMembroEqp(req, function(err, result){
    if (err) throw err;
    else {
      idEquipe = result[0].idEquipe;

    }
  });

  console.log("idEquipe ¨¨¨¨¨¨¨¨::>> "+idEquipe);
  var status  = "Candidato";
console.log("=======> "+req.body.idProjeto);
  var insertProposta = 'INSERT INTO proposta(idProjeto, idEquipe, status)';
      insertProposta += 'VALUES ("'+req.body.idProjeto+'", "'+idEquipe+'", "'+status+'")';

    this._connection.query(insertProposta, function(err, result){

        if (err) throw err;

       console.log("insertProposta ok O/ -->>");

    });
}
module.exports = function(){
  return propostaDAO;
}
