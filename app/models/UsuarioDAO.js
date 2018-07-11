function UsuarioDAO(connection){
  this._connection = connection();
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
  // const assert = require('assert');

  console.log("USUARIODAO O| O|");
  var emailWhere = usuario.email;
  var senhaWhere = usuario.senha;
  

  var sql =  'SELECT * FROM conta_usuario WHERE email = "'+emailWhere+'" and senha = "'+senhaWhere+'" ';


  // sql = sql.concat(tituloWhere);
    // this._connection.query(sql, [tituloWhere], function (err, result) {
    this._connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("RESULT ==>>> " +result);
      if (result[0] != undefined) {
        console.log(result[0].nomeUsuario);

        req.session.autenticado = true;
        req.session.idContaUsuario = result[0].idContaUsuario;
        req.session.tipoUsuario = result[0].tipoUsuario;
        req.session.nomeUsuario = result[0].nomeUsuario;
        req.session.email       = result[0].email;
        req.session.equipe      = result[0].equipe;


        console.log(req.session.tipoUsuario);
        console.log(req.session.nomeUsuario);
      }
      if (req.session.autenticado) {
        console.log("AUTORIZADO");
        res.render("includes/blank", {
          sessionNomeUsuario: req.session.nomeUsuario,
          sessionNomeTipoUsuario: req.session.tipoUsuario,
          });


      }else {
        // res.send("Acesso negado");
        console.log("NEGADO");

      //assert.fail('acessoNegado', 'Senha ou Email incorreto');
        //req.fail('acessoNegado', 'Senha ou Email incorreto');

        // console.log("erros --->>> " +erros);
        // var erros = JSON.parse("[ { 'location': body, 'param': senha, 'msg': Campo Email ou Senha incorreto, 'value':  } ]");
        //erros = req.validationErrors();
        console.log("************* ");
        // res.render("login/login", {validacao:erros});
         var erros =  { location: 'body',
                            param: 'senha',
                            msg: 'Campo Email ou Senha incorreto',
                            value: ''  }
        //var resultado = "[ { location: 'body',param: 'senha', msg: 'Campo Senha vazio', value: '' } ] break";
        //var resultado2 = JSON.stringify("[ { location: 'body',param: 'senha', msg: 'Campo Senha vazio', value: '' } ] break") ;
        // console.log( JSON.stringify("[ { location: 'body',param: 'senha', msg: 'Campo Senha vazio', value: '' } ] break") );
        //resultado = req.validationErrors();
        console.log(JSON.stringify(erros) );
        res.render("login/login", {validacao:erros});
      }

    });
}
UsuarioDAO.prototype.obterMembrosEquipe = function(callback){
  console.log("OBTER MEMBROS DA EQUIPE");
  var sql =  "SELECT idContaUsuario, nomeUsuario, email, tipoUsuario FROM pm.conta_usuario WHERE tipoUsuario != 'C'";
  this._connection.query(sql, callback);
}
module.exports = function(){
  return UsuarioDAO;
}
