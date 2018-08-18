var sqlContato = "INSERT INTO contato (telefone, celular, hangouts, skype)";
 var sqlUsuario = "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, tipoPessoa, dataNascimento, cpf_cnpj)";
 var sqlDadosEducacionaisTutor = "INSERT INTO dados_educacionais_tutor (idContaUsuario, siape, instituicaoEnsino, formacaoAcademica, cargo)";

 function TutorDAO(connection){
   this._connection = connection();
   console.log("-> this._connection = "+this._connection);
 }

 TutorDAO.prototype.incluirTutor = function(usuario, req, res){

   console.log("TUTOR DAO");
   console.log("Inserindo Contato...");

   var cpf = usuario.cpf_cnpj;
   var nome = usuario.nome;
   var dataNascimento = usuario.dataNascimento;
   var telefone = usuario.Telefone;
   var celular = usuario.celular;
   var hangouts = usuario.Hangouts;
   var skype = usuario.Skype;
   var instituicaoEnsino = usuario.instituicaoEnsino;
   var siape = usuario.siape;
   var formacaoAcademica = usuario.formacaoAcademica;
   var cargo = usuario.cargo;
   var email = usuario.email;
   var senha = usuario.senha;


   //console.log("telefone = "+telefone+"\ncelular = "+celular+"\nhangouts = "+hangouts+"\nskype = "+skype+
   	//"\ngithub = "+gitHub);

   sqlContato += "VALUES ('"+telefone+"', '"+celular+"', '"+hangouts+"', '"+skype+"')";

   this._connection.query(sqlContato, function (err, result) {
     if (err) throw err;

     console.log("insert CONTATO ok O/ -->>");
     var idContato = result.insertId;
     console.log(idContato);

     sqlUsuario += "VALUES ('"+idContato+"', '"+email+"', '"+senha+"', '"+nome+"',  'T', 'F', '"+dataNascimento+"', '"+cpf+"')";

     this._connection.query(sqlUsuario, function(err,result){
     	if (err) throw err;

	     console.log("insert USUARIO ok O/ -->>");
	     var idUsuario = result.insertId;
	     console.log(idUsuario);

	     sqlDadosEducacionaisTutor += "VALUES ('"+idUsuario+"', '"+siape+"', '"+instituicaoEnsino+"', '"+formacaoAcademica+"',  '"+cargo+"')";

	     this._connection.query(sqlDadosEducacionaisTutor, function(err,result){

	     	if (err) throw err;

     			console.log("insert DADOS EDUCACIONAIS TUTOR ok O/ -->>");

     			res.send("TUDO OK, TUTOR CADASTRADO");

	     });
     });

   });

     }//


 module.exports = function(){
   return TutorDAO;
 }
