 function TutorDAO(connection){
   this._connection = connection();
   console.log("-> this._connection = "+this._connection);
 }

 TutorDAO.prototype.incluirDadosEducacionaisTutor = function(idContaUsuario, usuario, callback){
      console.log("TutorDAO: incluirDadosEducacionaisTutor - idContaUsuario = "+idContaUsuario);
      console.log("TutorDAO: incluirDadosEducacionaisTutor - usuario  = "+JSON.stringify(usuario));

      var instituicaoEnsino = usuario.instituicaoEnsino;
      var siape = usuario.siape;
      var formacaoAcademica = usuario.formacaoAcademica;
      var cargo = usuario.cargo;

      var sqlDadosEducacionaisTutor = "INSERT INTO dados_educacionais_tutor (idContaUsuario, siape, instituicaoEnsino, formacaoAcademica, cargo)";
      sqlDadosEducacionaisTutor += "VALUES ('"+idContaUsuario+"', '"+siape+"', '"+instituicaoEnsino+"', '"+formacaoAcademica+"', '"+cargo+"')";
      console.log("TutorDAO: incluirDadosEducacionaisTutor - sqlDadosEducacionaisTutor "+sqlDadosEducacionaisTutor);
      this._connection.query(sqlDadosEducacionaisTutor, callback);
 }

 TutorDAO.prototype.incluirTutor = function(usuario, req, res, callback){

   var sqlContato = "INSERT INTO contato (telefone, celular, hangouts, skype)";
    var sqlUsuario = "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, tipoPessoa, cpf_cnpj)";
    var sqlDadosEducacionaisTutor = "INSERT INTO dados_educacionais_tutor (idContaUsuario, siape, instituicaoEnsino, formacaoAcademica, cargo)";

   console.log("TUTOR DAO");
   console.log("Inserindo Contato...");

   var cpf = usuario.cpf_cnpj;
   var nome = usuario.nome;
   var telefone = usuario.telefone;
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

     sqlUsuario += "VALUES ('"+idContato+"', '"+email+"', '"+senha+"', '"+nome+"',  'T', 'F', '"+cpf+"')";

     this._connection.query(sqlUsuario, callback);

   });

}//

TutorDAO.prototype.alterarDadosTutor = function(idContaUsuario, usuario, callback){
   console.log("TutorDAO: alterarDadosTutor - INICIO");
   console.log("TutorDAO: alterarDadosTutor - idContaUsuario = "+idContaUsuario);
   console.log("TutorDAO: alterarDadosTutor - usuario = "+JSON.stringify(usuario));


   //Dados da Conta
   var nome = usuario.nomeUsuario;
   var cpf = usuario.cpf_cnpj
   var email = usuario.email;

   //Dados de Contato
   var idContato = usuario.idContato;
   var telefone = usuario.telefone;
   var celular = usuario.celular;
   var github = usuario.github;

   //Dados Educacionais
   var idDadosEducacionaisTutor = usuario.idDadosEducacionaisTutor;
   var instituicaoEnsino = usuario.instituicaoEnsino;
   var siape = usuario.siape;
   var formacaoAcademica = usuario.formacaoAcademica;
   var cargo = usuario.cargo;

   //Consultas
   var sqlAtualizarContaUsuario = "UPDATE conta_usuario SET nomeUsuario='"+nome+"', cpf_cnpj='"+cpf+"', email='"+email+"' WHERE idContaUsuario = "+idContaUsuario;   
   var sqlAtualizarContato = "UPDATE contato SET telefone='"+telefone+"', celular='"+celular+"', gitHub='"+github+"' WHERE idContato = "+idContato;   
   var sqlAtualizarDadosEducacionaisTutor = "UPDATE dados_educacionais_tutor SET instituicaoEnsino='"+instituicaoEnsino+"', siape='"+siape+"', formacaoAcademica='"+formacaoAcademica+"', cargo='"+cargo+"' WHERE idDadosEducacionaisTutor = "+idDadosEducacionaisTutor;   

   console.log("TutorDAO: alterarDadosTutor - sqlAtualizarContaUsuario = "+sqlAtualizarContaUsuario);
   console.log("TutorDAO: alterarDadosTutor - sqlAtualizarContato = "+sqlAtualizarContato);
   console.log("TutorDAO: alterarDadosTutor - sqlAtualizarDadosEducacionaisTutor = "+sqlAtualizarDadosEducacionaisTutor);

   //Executando update conta do usuário
    this._connection.query(sqlAtualizarContaUsuario, function(error, resultContaUsuario){
      if(error){
        throw error;
      } else{
        console.log("TutorDAO: alterarDadosTutor - conta do usuario OK ");
         this._connection.query(sqlAtualizarContato, function(error, resultContato){
           if(error){
              throw error;
            } else{
              console.log("TutorDAO: alterarDadosTutor - contato OK ");
              this._connection.query(sqlAtualizarDadosEducacionaisTutor, callback);  
            }
         }); 
      }
    });

}


 module.exports = function(){
   return TutorDAO;
 }
