function propostaDAO(connection){
  this._connection = connection();
}

propostaDAO.prototype.verificaMembroEqp = function(req, callback){
  var statusEqp  = Alocado;
  console.log("***************************");

  var sql_eqp = 'SELECT idEquipe FROM equipe';
      sql_eqp += 'INNER JOIN membrosequipe on equipe.idEquipe = membrosequipe.equipe_idEquipe';
      sql_eqp += 'WHERE membrosequipe.conta_usuario_idContaUsuario = "'+req.idContaUsuario+'" AND equipe.status = "'+statusEqp+'" ';
    this._connection.query(sql_eqp, callback);
}
propostaDAO.prototype.insertProposta = function(req, callback){
  var statusEqp  = Alocado;
  console.log("***************************");

  var insertProposta = 'INSERT INTO proposta(idProjeto, idEquipe, status)';
      insertProposta += 'VALUES ("'+idProjeto+'", "'+idEquipe+'", "'+status+'")';

    this._connection.query(insertProposta, function(err, result){

        if (err) throw err;

       console.log("insertProposta ok O/ -->>");            

    });
}



module.exports = function(){
  return projetosDispDAO;
}
