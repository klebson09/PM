function ClienteDAO(connection){
  this._connection = connection();
}

ClienteDAO.prototype.incluirCliente = function(cliente, req, res){
  console.log("DAO incluirCliente O| O|");
  // var tipoPessoa = cliente.tipoPessoa;
  tipoPessoa = "F";
  var cpf_cnpj = cliente.cpf;
  var nomeCliente = cliente.nomeCliente;
  var nomeEmpresa = cliente.nomeEmpresa;
  var telefone = cliente.telefone;
  var celular = cliente.celular;
  var hangouts = cliente.hangouts;
  var skype = cliente.skype;

  //fieldset 2 cadastro conta
  var email = cliente.email;
  var senha = cliente.senha;

  //provisorio
  var idContato = 1;
  var tipoUsuario = 1;
  console.log(idContato+" "+email+" "+senha+" "+nomeCliente+" "+cpf_cnpj+" "+tipoUsuario+" "+tipoPessoa+" " );

  var sql =  "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, cpf_cnpj, tipoPessoa)";
      sql += "VALUES ('"+idContato+"', '"+email+"', '"+senha+"', '"+nomeCliente+"', '"+cpf_cnpj+"', '"+tipoUsuario+"', '"+tipoPessoa+"')"

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
