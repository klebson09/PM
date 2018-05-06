function ClienteDAO(connection){
  this._connection = connection();
}

ClienteDAO.prototype.incluirCliente = function(usuario, req, res){
  console.log("DAO incluirCliente O| O|");

  var sql =  "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, tipoPessoa, dataNascimento)";
      sql += "VALUES ('1', 'cliente_ssocial@gmail.com', '654321', 'joelma', '1', '1', '1990-09-02')"

  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sql, function (err, result) {
      if (err) throw err;

      // if (req.session.autenticado) {
      //   console.log("AUTORIZADO");
      //   res.send("Usuário autenticado");
      // }else {
      //   // res.send("Acesso negado");
      //   console.log("NEGADO");
      //   res.render("login/login", {validacao: {} });
      // }
      console.log("insert ClienteDAO ok O/ -->>");
      console.log(result[0]);
      res.send("===>>insert ClienteDAO ok<<==");

    });
}

module.exports = function(){
  return ClienteDAO;
}
