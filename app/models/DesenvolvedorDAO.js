// function DesenvolvedorDAO(connection){
//   this._connection = connection();
// }
//
// DesenvolvedorDAO.prototype.incluirDev = function(usuario, req, res){
//   console.log("USUARIODAO O| O|");
//   var tituloWhere = usuario.email;
//   console.log(tituloWhere);
//   var sql =  'SELECT * FROM noticias WHERE titulo = "'+tituloWhere+'" ';
//   // sql = sql.concat(tituloWhere);
//     // this._connection.query(sql, [tituloWhere], function (err, result) {
//     this._connection.query(sql, function (err, result) {
//       if (err) throw err;
//
//       // if (req.session.autenticado) {
//       //   console.log("AUTORIZADO");
//       //   res.send("Usuário autenticado");
//       // }else {
//       //   // res.send("Acesso negado");
//       //   console.log("NEGADO");
//       //   res.render("login/login", {validacao: {} });
//       // }
//       console.log("DesenvolvedorDAO O/ -->>");
//       console.log(result[0]);
//
//     });
// }
//
// module.exports = function(){
//   return UsuarioDAO;
// }
