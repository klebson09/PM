var sqlValidarEquipeTutor = "SELECT * FROM membrosequipe INNER JOIN conta_usuario ON membrosequipe.conta_usuario_idContaUsuario = conta_usuario.idContaUsuario INNER JOIN equipe ON  membrosequipe.equipe_idEquipe = equipe.idEquipe";
var sqlVerificarUsuarioVinculadoEquipe = "SELECT * FROM membrosequipe WHERE conta_usuario_idContaUsuario = ";

function EquipeDAO(connection){
  this._connection = connection();
}

EquipeDAO.prototype.cadEquipe = function(equipe, idAdmEqp ,callback){
    console.log("INSERT cadastrarEquipe");

    console.log("EquipeDAO:cadEquipe: idAdmEqp = "+idAdmEqp);

    var sqlInsertEquipe = "INSERT INTO equipe (nomeEquipe, descricao, idTutor, idAdmEquipe)";

    var nomeEquipe = equipe.nomeEquipe;
    var descrEquipe = equipe.descrEquipe;
    var idTutor = equipe.tutor;

    sqlInsertEquipe += "VALUES ('"+nomeEquipe+"', '"+descrEquipe+"', '"+idTutor+"',  '"+idAdmEqp+"' )";

    console.log("EquipeDAO:cadEquipe - sqlInsertEquipe = "+sqlInsertEquipe);

    this._connection.query(sqlInsertEquipe, callback)
}

EquipeDAO.prototype.cadMembrosEquipe = function(membrosequipe, idEquipe, callback){
  console.log("Inserindo membros na equipe");

  var sqlInsertmembrosequipe = "INSERT INTO membrosequipe (conta_usuario_idContaUsuario, equipe_idEquipe) VALUES (";

  var i=0;

  for(i=0;i<membrosequipe.length;i++){
    if(i!=(membrosequipe.length-1)){
      sqlInsertmembrosequipe += "'"+membrosequipe[i]+"', '"+idEquipe+"'), (";
    } else {
      sqlInsertmembrosequipe += "'"+membrosequipe[i]+"', '"+idEquipe+"')";
    }

  }

  console.log(sqlInsertmembrosequipe);

  this._connection.query(sqlInsertmembrosequipe, callback)
}

EquipeDAO.prototype.validarEquipeTutor = function(idEquipe, callback){
   sqlValidarEquipeTutor += " WHERE conta_usuario.tipoUsuario = 'T' AND membrosequipe.equipe_idEquipe ='"+idEquipe+"' AND equipe.status = 'Ativo'";
   this._connection.query(sqlValidarEquipeTutor, callback);
}

EquipeDAO.prototype.verificarUsuarioVinculadoEquipe = function(idContaUsuario, callback){
  var sqlVerificarUsuarioVinculadoEquipe = "SELECT me.*, eq.* FROM membrosequipe me INNER JOIN equipe eq ON me.equipe_IdEquipe = eq.idEquipe WHERE me.conta_usuario_idContaUsuario = "+idContaUsuario;
   this._connection.query(sqlVerificarUsuarioVinculadoEquipe, callback);
}

EquipeDAO.prototype.obterDadosEquipe = function(idEquipe, callback){
  console.log("EquipeDAO:obterDadosEquipe - INICIO");
  var sqlObterDadosEquipe = "SELECT * FROM equipe WHERE idEquipe = "+idEquipe;
  console.log("EquipeDAO:obterDadosEquipe - sqlObterDadosEquipe = "+sqlObterDadosEquipe);
  this._connection.query(sqlObterDadosEquipe, callback);
}

EquipeDAO.prototype.obtermembrosequipe = function(idEquipe, callback){
  console.log("EquipeDAO:obtermembrosequipe - INICIO");
  var sqlObtermembrosequipe = "SELECT * FROM conta_usuario INNER JOIN membrosequipe ON conta_usuario.idContaUsuario = membrosequipe.conta_usuario_idContaUsuario INNER JOIN projeto ON membrosequipe.equipe_idEquipe = projeto.idEquipe  INNER JOIN equipe ON projeto.idEquipe = equipe.idEquipe WHERE membrosequipe.equipe_idEquipe = '"+idEquipe+"' AND projeto.status != 'Concluído'";   
  console.log("EquipeDAO:obtermembrosequipe - sqlObtermembrosequipe = "+sqlObtermembrosequipe);
  this._connection.query(sqlObtermembrosequipe, callback);
}

EquipeDAO.prototype.obtermembrosequipeTutor = function(idEquipe, callback){
  console.log("EquipeDAO:obtermembrosequipeTutor - INICIO");
  var sqlObtermembrosequipeTutor = "SELECT * FROM conta_usuario INNER JOIN membrosequipe ON conta_usuario.idContaUsuario = membrosequipe.conta_usuario_idContaUsuario INNER JOIN equipe ON membrosequipe.equipe_idEquipe = equipe.idEquipe WHERE membrosequipe.equipe_idEquipe = '"+idEquipe+"'";   
  console.log("EquipeDAO:obtermembrosequipeTutor - sqlObtermembrosequipeTutor = "+sqlObtermembrosequipeTutor);
  this._connection.query(sqlObtermembrosequipeTutor, callback);
}

EquipeDAO.prototype.obterTutorEquipe = function(idEquipe, callback){
  console.log("EquipeDAO:obterTutorEquipe - INICIO");
  var sqlObterTutor = "SELECT * FROM conta_usuario INNER JOIN equipe ON conta_usuario.idContaUsuario = equipe.idTutor WHERE equipe.idEquipe = "+idEquipe;
  console.log("EquipeDAO:obtermembrosequipe - sqlObtermembrosequipe = "+sqlObterTutor);
  this._connection.query(sqlObterTutor, callback);
}
EquipeDAO.prototype.verificarEquipeVinculadoTutor = function(idContaUsuario, callback){
  console.log("EquipeDAO:verificarEquipeVinculadoTutor - INICIO");

  var sqlVerificarEquipeVinculadoTutor = "SELECT idEquipe, conta_usuario.nomeUsuario, conta_usuario.email FROM equipe INNER JOIN conta_usuario ON equipe.idTutor = conta_usuario.idContaUsuario WHERE idTutor = '"+idContaUsuario+"' LIMIT 1";
  console.log("EquipeDAO:verificarEquipeVinculadoTutor - sqlVerificarEquipeVinculadoTutor = "+sqlVerificarEquipeVinculadoTutor);
  this._connection.query(sqlVerificarEquipeVinculadoTutor, callback);
}

module.exports = function(){
  return EquipeDAO;
}
