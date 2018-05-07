 var sqlContato = "INSERT INTO contato (telefone, celular, hangouts, skype, github)";
 var sqlUsuario = "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, tipoPessoa, cpf_cnpj)";
 var sqlProjeto = "INSERT INTO projeto (idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade, mobile, web, desktop)";


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
  var mobile = cliente.mobile;
  var web = cliente.web;
  var desktop = cliente.desktop; 
  var nomeProjeto = cliente.nomeProjeto;
  var areaAtuacao = cliente.areaAtuacao;
  var descrProjeto = cliente.descrProjeto;
  var descrProjetoModelarSistema = descrProjetoModelarSistema;
  var mobile = cliente.mobile;
  var web = cliente.web;
  var desktop = cliente.desktop;

  if(mobile == undefined){
    mobile = 0;
  }
  if(web == undefined){
    web = 0;
  }
  if(desktop == undefined){
    desktop = 0;
  }



  //provisorio
  var idContato = 1;
  var tipoUsuario = 'C';
  console.log(idContato+" "+email+" "+senha+" "+nomeCliente+" "+cpf_cnpj+" "+tipoUsuario+" "+tipoPessoa+" "+mobile+" "
    +web+" "+desktop );

  sqlContato += "VALUES ('"+telefone+"', '"+celular+"', '"+hangouts+"', '"+skype+"',  '"+gitHub+"')";

  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sqlContato, function (err, result) {
      if (err) throw err;

      // if (req.session.autsdsdfsdfdsenticado) {
      //   console.log("AUTORIZADO");
      //   res.send("Usuário aufsdfsdtendsadticado");
      // }else {vbhjvnbcgfxvgfxdfmhsrzvxcvxcvxcvxcvxcvsdfs
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

         sqlProjeto += "VALUES ('"+idUsuario+"', '"+nomeProjeto+"', '"+areaAtuacao+"', '"+descrProjeto+"',  '"+descrProjetoModelarSistema+"', '"+mobile+"', '"+web+"', '"+desktop+"')";

         this._connection.query(sqlProjeto, function(err, result){

             if (err) throw err;

            console.log("insert PROJETO ok O/ -->>");            

         });

      });

      res.send("===>>insert ClienteDAO ok<<==");

    });
}

module.exports = function(){
  return ClienteDAO;
}
