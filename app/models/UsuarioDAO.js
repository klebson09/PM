function UsuarioDAO(connection){
  this._connection = connection();
}

UsuarioDAO.prototype.autenticar = function(usuario){
  console.log("USUARIODAO O| O|");
  console.log(usuario);
  var tituloWhere = usuario.email;
  var sql =  'SELECT * FROM noticias WHERE titulo = ?'
    this._connection.query(sql, [tituloWhere], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
}

module.exports = function(){
  return UsuarioDAO;
}
