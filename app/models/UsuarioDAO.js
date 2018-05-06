function UsuarioDAO(connection){
  this._connection = connection();
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
  // const assert = require('assert');

  console.log("USUARIODAO O| O|");
  var emailWhere = usuario.email;
  var senhaWhere = usuario.senha;
  console.log(emailWhere);
  var sql =  'SELECT * FROM conta_usuario WHERE email = "'+emailWhere+'" ';
  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sql, function (err, result) {
      if (err) throw err;
      if (result[0] != undefined) {
        console.log(result[0].nomeUsuario);
        req.session.autenticado = true;
        req.session.tipoUsuario = result[0].tipoUsuario;
        req.session.nomeUsuario = result[0].nomeUsuario;
        req.session.email       = result[0].email;
      }
      if (req.session.autenticado) {
        console.log("AUTORIZADO");
        res.render("includes/blank", {validacao: {}});
      }else {
        // res.send("Acesso negado");
        console.log("NEGADO");

        // assert.fail('acessoNegado', 'Senha ou Email incorreto');
        // req.fail('acessoNegado', 'Senha ou Email incorreto');
        // var erros = req.validationErrors();
        // console.log(erros);
        // var erros = JSON.parse("[ { 'location': body, 'param': senha, 'msg': Campo Email ou Senha incorreto, 'value':  } ]");
        // "[ { location: 'body', param: 'senha', msg: 'Campo Email ou Senha incorreto', value: '' } ]";
        // console.log(erros);
        res.render("login/login", {validacao:{}});
      }

    });
}

module.exports = function(){
  return UsuarioDAO;
}
