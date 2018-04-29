/* importar o Mysql */
var mysql = require('mysql');
// Conexão com o banco myslq
var connMysql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portal_noticias'
});


module.exports = function(){
	return connMysql;
}

// db.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
