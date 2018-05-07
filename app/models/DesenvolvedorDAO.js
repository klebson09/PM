 var sqlContato = "INSERT INTO contato (telefone, celular, hangouts, skype, github)";
 var sqlUsuario = "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, tipoPessoa, dataNascimento, cpf_cnpj)";
 var sqlDadosEducacionaisDev = "INSERT INTO dados_educacionais_desenvolvedor (idContaUsuario, matricula, instituicaoEnsino, curso, turno, periodo, declaracaoMatricula)";

 function DesenvolvedorDAO(connection){	
   this._connection = connection();
   console.log("-> this._connection = "+this._connection);
 }

 DesenvolvedorDAO.prototype.incluirDev = function(usuario, req, res){

   console.log("DESENVOLVEDOR DAO");
   console.log("Inserindo Contato...");

   var cpf = usuario.cpf;
   var nome = usuario.nome;
   var dataNascimento = usuario.dataNascimento;
   var telefone = usuario.Telefone;
   var celular = usuario.celular;
   var hangouts = usuario.Hangouts;
   var skype = usuario.Skype;
   var gitHub = usuario.GitHub;
   var instituicaoEnsino = usuario.instituicaoEnsino;
   var matricula = usuario.matricula;
   var curso = usuario.curso;
   var nivel = usuario.nivel;
   var nivperiodo = usuario.nivperiodo;
   var docDeclaracaoMatricula = usuario.docDeclaracaoMatricula;
   var email = usuario.email;
   var senha = usuario.senha;


   //console.log("telefone = "+telefone+"\ncelular = "+celular+"\nhangouts = "+hangouts+"\nskype = "+skype+
   	//"\ngithub = "+gitHub);

   sqlContato += "VALUES ('"+telefone+"', '"+celular+"', '"+hangouts+"', '"+skype+"',  '"+gitHub+"')";

   this._connection.query(sqlContato, function (err, result) {
     if (err) throw err;

     console.log("insert CONTATO ok O/ -->>");
     var idContato = result.insertId;
     console.log(idContato);

     sqlUsuario += "VALUES ('"+idContato+"', '"+email+"', '"+senha+"', '"+nome+"',  'D', 'F', '"+dataNascimento+"', '"+cpf+"')";
     
     this._connection.query(sqlUsuario, function(err,result){
     	if (err) throw err;

	     console.log("insert USUARIO ok O/ -->>");
	     var idUsuario = result.insertId;
	     console.log(idUsuario);

	     sqlDadosEducacionaisDev += "VALUES ('"+idUsuario+"', '"+matricula+"', '"+instituicaoEnsino+"', '"+curso+"',  '"+nivel+"',  '"+nivperiodo+"',  '"+docDeclaracaoMatricula+"')";

	     this._connection.query(sqlDadosEducacionaisDev, function(err,result){

	     	if (err) throw err;

     			console.log("insert DADOS EDUCACIONAIS DESENVOLVEDOR ok O/ -->>");

     			res.send("TUDO OK, DESENVOLVEDOR CADASTRADO");

	     });
     });

   });

     }
 

 module.exports = function(){
   return DesenvolvedorDAO;
 }
