 var sqlContato = "INSERT INTO contato (telefone, celular, hangouts, skype, github)";
 var sqlUsuario = "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, tipoPessoa, cpf_cnpj)";
 var sqlProjeto = "INSERT INTO projeto (idPlataforma, idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade)";


function ClienteDAO(connection){
  this._connection = connection();
}

ClienteDAO.prototype.incluirCliente = function(cliente, req, res){
  console.log("DAO incluirCliente O| O|");
  var tipoPessoa = cliente.tipoPessoa;
  var cpf_cnpj = cliente.cpf_cnpj;
  var nomeCliente = cliente.nomeCliente;
  var nomeEmpresa = cliente.nomeEmpresa;
  var telefone = cliente.telefone;
  var celular = cliente.celular;
  var hangouts = cliente.hangouts;
  var gitHub = cliente.gitHub;
  var skype = cliente.skype;
  var email = cliente.email;
  var senha = cliente.senha;

  //provisorio
  var idContato = 1;
  var tipoUsuario = 'C';
  console.log(idContato+" "+email+" "+senha+" "+nomeCliente+" "+cpf_cnpj+" "+tipoUsuario+" "+tipoPessoa+" " );

  sqlContato += "VALUES ('"+telefone+"', '"+celular+"', '"+hangouts+"', '"+skype+"',  '"+gitHub+"')";

  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sqlContato, function (err, result) {
      if (err) throw err;

      // if (req.session.autenticado) {
      //   console.log("AUTORIZADO");
      //   res.send("Usuário autenticado");
      // }else {
      //   // res.send("Acesso negado");ffsdsddsfsd
      //   console.log("NEGADO");
      //   res.render("login/login", {validacao: {} });
      // }
      console.log("insert ClienteDAO ok O/ -->>");
      console.log(result[0]);

      var idContato = result.insertId;

      sqlUsuario += "VALUES ('"+idContato+"', '"+email+"', '"+senha+"', '"+nomeCliente+"',  'C', '"+tipoPessoa+"', '"+cpf_cnpj+"')";

      this._connection.query(sqlUsuario, function(err, result){

          if (err) throw err;

         console.log("insert USUARIO ok O/ -->>");
         var idUsuario = result.insertId;
         console.log(idUsuario);

      });

      res.send("===>>insert ClienteDAO ok<<==");

    });
}

module.exports = function(){
  return ClienteDAO;
}
