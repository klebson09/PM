module.exports = function(){
  this.getCadastroEquipe = function(connection, callback){
    connection.query("SELECT * FROM noticias", callback);
    console.log("MODEL O/");
    
  }
  return this;
}
