function UsuarioDAO(connection){
  this._connection = connection();
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
  console.log("USUARIODAO O| O|");
  var emailWhere = usuario.email;
  var senhaWhere = usuario.senha;
  console.log(emailWhere);
  var sql =  'SELECT * FROM conta_usuario WHERE email = "'+emailWhere+'" ';
  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sql, function (err, result) {
      if (err) throw err;
      if (result[0] != undefined) {
        console.log(result[0].noticia);
        req.session.autenticado = true;
        req.session.tipoUsuario = result[0].id_noticia;
        req.session.nomeUsuario = result[0].titulo;
      }
      if (req.session.autenticado) {
        console.log("AUTORIZADO");
        res.send("Usuário autenticado");
      }else {
        // res.send("Acesso negado");
        console.log("NEGADO");
        res.render("login/login", {validacao: {} });
      }

    });
}

module.exports = function(){
  return UsuarioDAO;
}
