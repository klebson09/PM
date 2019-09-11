
function ClienteDAO(connection){
  this._connection = connection();
}

ClienteDAO.prototype.incluirCliente = function(cliente, callback){
  console.log("DAO incluirCliente O| O|");
  var tipoPessoa = cliente.tipoPessoa;
  var cpf_cnpj = cliente.cpf_cnpj;
  var nomeCliente = cliente.nomeCliente;
  var nomeEmpresa = cliente.nomeEmpresa;
  var telefone = cliente.telefone;
  var celular = cliente.celular;
  // var hangouts = cliente.hangouts;
  // var skype = cliente.skype;
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
  var sqlContato = "INSERT INTO contato (telefone, celular)";
  sqlContato += " VALUES ('"+telefone+"', '"+celular+"')";

  console.log(sqlContato);


  this._connection.query(sqlContato, function (err, result) {
    if (err) throw err;
    console.log("contato - "+result);
    var idContato = result.insertId;
    var sqlUsuario = "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, cpf_cnpj, tipoPessoa)";
    sqlUsuario += " VALUES ('"+idContato+"', '"+email+"', '"+senha+"', '"+nomeCliente+"',  'C', '"+cpf_cnpj+"', '"+tipoPessoa+"')";

    this._connection.query(sqlUsuario, callback);
  });
}

ClienteDAO.prototype.alterarDadosCliente = function(idContaUsuario, usuario, callback){

  console.log("ClienteDAO: alterarDadosCliente - INICIO");
  console.log("ClienteDAO: alterarDadosCliente - idContaUsuario = "+idContaUsuario);
  console.log("ClienteDAO: alterarDadosCliente - usuario = "+JSON.stringify(usuario))

  //Dados da Conta
   var nome = usuario.nomeUsuario;
   var email = usuario.email;
   var tipoPessoa = usuario.tipoPessoa;
   var cpf_cnpj = "";
   if(tipoPessoa == 'F'){
      cpf_cnpj = usuario.cpf;
   } else{
      cpf_cnpj = usuario.cnpj;
   }

   //Dados de Contato
   var idContato = usuario.idContato;
   var telefone = usuario.telefone;
   var celular = usuario.celular;
   var github = usuario.github;

   //Consultas
   var sqlAtualizarContaUsuario = "UPDATE conta_usuario SET nomeUsuario='"+nome+"', cpf_cnpj='"+cpf_cnpj+"', email='"+email+"', tipoPessoa='"+tipoPessoa+"' WHERE idContaUsuario = "+idContaUsuario;   
   var sqlAtualizarContato = "UPDATE contato SET telefone='"+telefone+"', celular='"+celular+"', gitHub='"+github+"' WHERE idContato = "+idContato;   

   console.log("ClienteDAO: alterarDadosCliente - sqlAtualizarContaUsuario = "+sqlAtualizarContaUsuario);
   console.log("ClienteDAO: alterarDadosCliente - sqlAtualizarContato = "+sqlAtualizarContato);

   //Executando update conta do usuário
  this._connection.query(sqlAtualizarContaUsuario, function(error, resultContaUsuario){
     if(error){
       throw error;
     } else{
       console.log("ClienteDAO: alterarDadosDesenvolvedor - conta do usuario OK ");
       this._connection.query(sqlAtualizarContato, callback);
     }
   });

}


module.exports = function(){
  return ClienteDAO;
}
