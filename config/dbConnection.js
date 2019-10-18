/* importar o Mysql */
var mysql = require('mysql');
// Conexão com o banco myslq
var connMysql =function(){
  return mysql.createConnection({
    host: 'mysql.projectmarketplace.kinghost.net',
    user: 'projectmar_add2',
    password: 'Mlbs321',
    database: 'projectmarketp'
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
