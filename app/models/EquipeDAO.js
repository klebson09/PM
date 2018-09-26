var sqlValidarEquipeTutor = "SELECT * FROM membrosequipe INNER JOIN conta_usuario ON membrosequipe.conta_usuario_idContaUsuario = conta_usuario.idContaUsuario INNER JOIN equipe ON  membrosequipe.equipe_idEquipe = equipe.idEquipe";

function EquipeDAO(connection){
  this._connection = connection();
}

EquipeDAO.prototype.cadEquipe = function(equipe, callback){
    console.log("INSERT cadastrarEquipe");

    var sqlInsertEquipe = "INSERT INTO equipe (nomeEquipe, descricao)";

    var nomeEquipe = equipe.nomeEquipe;
    var descrEquipe = equipe.descrEquipe;

    sqlInsertEquipe += "VALUES ('"+nomeEquipe+"', '"+descrEquipe+"')";

    this._connection.query(sqlInsertEquipe, callback)
}

EquipeDAO.prototype.cadMembrosEquipe = function(membrosEquipe, idEquipe, callback){
  console.log("Inserindo membros na equipe");

  var sqlInsertMembrosEquipe = "INSERT INTO membrosequipe (conta_usuario_idContaUsuario, equipe_idEquipe) VALUES (";

  var i=0;

  for(i=0;i<membrosEquipe.length;i++){
    if(i!=(membrosEquipe.length-1)){
      sqlInsertMembrosEquipe += "'"+membrosEquipe[i]+"', '"+idEquipe+"'), (";
    } else {
      sqlInsertMembrosEquipe += "'"+membrosEquipe[i]+"', '"+idEquipe+"')";
    }

  }

  console.log(sqlInsertMembrosEquipe);

  this._connection.query(sqlInsertMembrosEquipe, callback)
}

EquipeDAO.prototype.validarEquipeTutor = function(idEquipe, callback){
   sqlValidarEquipeTutor += " WHERE conta_usuario.tipoUsuario = 'T' AND membrosEquipe.equipe_idEquipe ='"+idEquipe+"' AND equipe.status = 'Ativo'";
   this._connection.query(sqlValidarEquipeTutor, callback);
}

module.exports = function(){
  return EquipeDAO;
}
