module.exports = function(){
  this.getLogin = function(connection, callback){
    //busca no banco de dados
    console.log("chegando na query o/o/o/o/o");
    connection.query('SELECT * FROM noticias', callback);

  }
  return this;
}
