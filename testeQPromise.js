var q =  require('q');
var mysql = require('mysql');
var idContatoUsuario = null;
var idUsuarioCadastrado = null;

var connection =  function(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pm'
  });
}
console.log(connection);
var sqlContato = "INSERT INTO contato (telefone, celular, hangouts, skype, github)";
   sqlContato += "VALUES ('3010-0330', '995114738', 'matheuslevibarouh@gmail.com', 'matheuslevisantos',  'mlbs1994')";
var sqlUsuario =  "INSERT INTO conta_usuario (idContato, email, senha, nomeUsuario, tipoUsuario, cpf_cnpj, tipoPessoa)";
      sqlUsuario += "VALUES ('"+idContatoUsuario+"', 'matheuslevibarouh@gmail.com', '1234', 'Matheus', '41215849885', 'D', 'F')"

function cadastrarContato(){
	var deferred = q.defer();
	connection.query(sqlContato, function (err, result) {
     if (err) throw err;

     console.log("insert CONTATO ok O/ -->>");
     var idContato = result.insertId;
     console.log(idContato);
     deferred.resolve(idContato);
   });
   return deferred.promise;
}

function cadastrarUsuario(){
	var deferred = q.defer();
	connection.query(sqlUsuario, function (err, result) {
      if (err) throw err;
      console.log("insert ClienteDAO ok O/ -->>");
      idUsuario = result.insertId;
      console.log(idUsuario);
      deferred.resolve(idUsuario);
    });
	return deferred.promise;
}

cadastrarContato().then(function(idContato){
	idContatoUsuario = idContato;
	console.log(idContatoUsuario);
	return cadastrarUsuario();
}).then(function(idUsuario){
	idUsuarioCadastrado = idUsuario;
	console.log(idUsuarioCadastrado);
	if(idUsuarioCadastrado!=null){
		console.log("tudo ok");
	}
})