var sqlContato = "INSERT INTO contato (telefone, celular, hangouts, skype)";
var sqlUsuario = "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, cpf_cnpj, tipoPessoa)";
//var sqlProjeto = "INSERT INTO projeto (idContaUsuario, nomeProjeto, areaAtuacao, descricao, finalidade, mobile, web, desktop)";


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
//  console.log(idContato+" "+email+" "+senha+" "+nomeCliente+" "+tipoUsuario+" "+cpf_cnpj+" "+tipoPessoa+");

  sqlContato += "VALUES ('"+telefone+"', '"+celular+"', '"+hangouts+"', '"+skype+"')";


  this._connection.query(sqlContato, function (err, result) {
    if (err) throw err;
    console.log("contato - "+result);
    var idContato = result.insertId;
    sqlUsuario += "VALUES ('"+idContato+"', '"+email+"', '"+senha+"', '"+nomeCliente+"',  'C', '"+cpf_cnpj+"', '"+tipoPessoa+"')";

    this._connection.query(sqlUsuario, function(err, result){
      if (err) throw err;
      /*console.log("insert USUARIO ok O/ -->>");
      var idUsuario = result.insertId;
      sqlProjeto += "VALUES ('"+idUsuario+"', '"+nomeProjeto+"', '"+areaAtuacao+"', '"+descrProjeto+"',  '"+descrProjetoModelarSistema+"', '"+mobile+"', '"+web+"', '"+desktop+"')";

      this._connection.query(sqlProjeto, function(err, result){
        if (err) throw err;
        console.log("insert PROJETO ok O/ -->>");
      });*/

    });
    res.send("===>>insert ClienteDAO ok<<==");

  });
}

module.exports = function(){
  return ClienteDAO;
}
