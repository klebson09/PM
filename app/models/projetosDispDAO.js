function projetosDispDAO(connection){
  this._connection = connection();
}

projetosDispDAO.prototype.projetosDisponiveis = function(req, callback){
  // const assert = require('assert');

  console.log("************projetosDisponiveis***************");

  var sql =  'SELECT * FROM projeto';
  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sql, callback);
}

module.exports = function(){
  return projetosDispDAO;
}
