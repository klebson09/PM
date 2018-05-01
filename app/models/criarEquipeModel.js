module.exports = function(){
  this.getCadastroEquipe = function(connection, callback){
    connection.query("SELECT * FROM noticias", callback);
    console.log("MODEL CRIAR EQUIPE O/");
  }

  this.cadastrarEquipe = function(dadosFormEquipe, connection, callback){
    console.log("INSERT cadastrarEquipe");
    console.log(dadosFormEquipe);
    connection.query('INSERT INTO noticias VALUES SET ?',dadosFormEquipe, callback);
    // console.log(ver);
  }
  return this;
}
