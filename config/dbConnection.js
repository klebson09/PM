/* importar o Mysql */
var mysql = require('mysql');
// Conexão com o banco myslq
var connMysql =function(){
  return mysql.createConnection({
    host: 'xxx',
    user: 'xxx',
    password: 'xxx',
    database: 'xxx'
  });
}

module.exports = function(){
  console.log("modulo dbConnection disponibilizado");
	return connMysql;
}

// db.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
