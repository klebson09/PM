 function DesenvolvedorDAO(connection){
   this._connection = connection();
   console.log("-> this._connection = "+this._connection);
 }

 DesenvolvedorDAO.prototype.incluirDev = function(usuario, callback){
   console.log("DesenvolvedorDAO: incluirDev - usuario "+JSON.stringify(usuario) );
   var cpf = usuario.cpf;
   var nome = usuario.nome;
   var dataNascimento = usuario.dataNascimento;
   var telefone = usuario.Telefone;
   var celular = usuario.celular;
   var hangouts = usuario.Hangouts;
   var skype = usuario.Skype;
   var gitHub = usuario.GitHub;   
   var email = usuario.email;
   var senha = usuario.senha;


   //console.log("telefone = "+telefone+"\ncelular = "+celular+"\nhangouts = "+hangouts+"\nskype = "+skype+
    //"\ngithub = "+gitHub);
   var sqlContato = "INSERT INTO contato (telefone, celular, hangouts, skype, github)";
   sqlContato += "VALUES ('"+telefone+"', '"+celular+"', '"+hangouts+"', '"+skype+"',  '"+gitHub+"')";
   console.log("DesenvolvedorDAO: incluirDev - sqlContato "+sqlContato);

   this._connection.query(sqlContato, function (err, resultContato) {
    if (err) throw err;
    var idContato = resultContato.insertId;
    console.log("DesenvolvedorDAO: incluirDev - idContato "+idContato );

    var sqlUsuario = "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, tipoPessoa, dataNascimento, cpf_cnpj)";
    sqlUsuario += "VALUES ('"+idContato+"', '"+email+"', '"+senha+"', '"+nome+"',  'D', 'F', '"+dataNascimento+"', '"+cpf+"')";
    console.log("DesenvolvedorDAO: incluirDev - sqlUsuario "+sqlUsuario);

    this._connection.query(sqlUsuario, callback);
   });

}

DesenvolvedorDAO.prototype.incluirDadosEducacionaisDev = function(idContaUsuario, usuario, callback){
  console.log("DesenvolvedorDAO: incluirDadosEducacionaisDev - "+idContaUsuario);
  console.log("DesenvolvedorDAO: incluirDadosEducacionaisDev - "+JSON.stringify(usuario) );

  var instituicaoEnsino = usuario.instituicaoEnsino;
  var matricula = usuario.matricula;
  var curso = usuario.curso;
  var nivel = usuario.nivel;
  var nivperiodo = usuario.nivperiodo;
  var docDeclaracaoMatricula = usuario.docDeclaracaoMatricula; 

  var sqlDadosEducacionaisDev = "INSERT INTO dados_educacionais_desenvolvedor (idContaUsuario, matricula, instituicaoEnsino, curso, turno, periodo, declaracaoMatricula)";
  sqlDadosEducacionaisDev += "VALUES ('"+idContaUsuario+"', '"+matricula+"', '"+instituicaoEnsino+"', '"+curso+"',  '"+nivel+"',  '"+nivperiodo+"',  '"+docDeclaracaoMatricula+"')";
  console.log("DesenvolvedorDAO: incluirDadosEducacionaisDev - sqlDadosEducacionaisDev "+sqlDadosEducacionaisDev);
  this._connection.query(sqlDadosEducacionaisDev, callback);

}

 module.exports = function(){
   return DesenvolvedorDAO;
 }