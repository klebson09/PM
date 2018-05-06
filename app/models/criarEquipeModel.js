module.exports = function(){
  this.getCadastroEquipe = function(connection, callback){
    connection.query("SELECT * FROM noticias", callback);
    console.log("MODEL CRIAR EQUIPE O/");
  }

  this.cadastrarEquipe = function(dadosFormEquipe, connection, callback){
    console.log("INSERT cadastrarEquipe");
    console.log(dadosFormEquipe.titulo);
    var queryInsert = 'INSERT INTO noticias (titulo, noticia) VALUES ("'+dadosFormEquipe.titulo+'", "'+dadosFormEquipe.noticia+'")';
    connection.query(queryInsert ,dadosFormEquipe,callback);
    // connection.query(queryInsert ,dadosFormEquipe, function(error) {
    //     if (error) {
    //       console.log(queryInsert);
    //         console.log(error.message);
    //     } else {
    //       console.log(queryInsert);
    //         console.log('success');
    //     }
    // });
  }
  return this;
}
