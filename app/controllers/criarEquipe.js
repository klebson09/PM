module.exports.criarEqp = function(application, req, res){
  // res.render("includes/criarEquipe", {validacao:{}});
  if (req.session.autenticado) {
    console.log("criarEqp");
    var connection = application.config.dbConnection;
    var UsuarioDAO = new application.app.models.UsuarioDAO(connection);
    var resultadoDEV = [];
    var resultadoTutor = [];

    UsuarioDAO.obterMembrosEquipe(function(erro, resultadoD){
      console.log("callback obter membros equipe");
      if(erro){
        throw erro;
      } else {
          console.log("DEVs - "+JSON.stringify(resultadoD));
          resultadoDEV = resultadoD;
          console.log("Vai pegar o tutor");
          UsuarioDAO.obterTutores(function(erro,resultadoT){
              if(erro){
                throw error;
              } else {
                console.log("Tutores - "+JSON.stringify(resultadoT));
                resultadoTutor = resultadoT;
                console.log("Vai responder");
                res.render("includes/criarEqp3", {
                  sessionNomeUsuario: req.session.nomeUsuario,
                  sessionNomeTipoUsuario: req.session.tipoUsuario,
                  notificacao: req.session.notificacoes,
                  dataDEV: JSON.stringify(resultadoDEV),
                  dataTutor: resultadoTutor,
                  layout: 'includes/layoutIncludes'
                  });
              }
          })
      }
    });


  }else {
    res.render('login/login', {validacao: {}});
  }

}

module.exports.criarEqp2 = function(application, req, res){
  // res.render("includes/criarEquipe", {validacao:{}})

  var connection = application.config.dbConnection;
  var UsuarioDAO = new application.app.models.UsuarioDAO(connection);

  UsuarioDAO.obterMembrosEquipe(function(erro, resultado){
    if(erro){
      throw erro;
    } else {
        console.log(JSON.stringify(resultado));
        res.render("includes/criarEqp2", { data: JSON.stringify(resultado)});
    }
  });
}

module.exports.cadastrarEquipe = function(application, req, res){

    var equipe = req.body;
    var connection = application.config.dbConnection;
    console.log("connection criada");
    var EquipeDAO = new application.app.models.EquipeDAO(connection);


    EquipeDAO.cadEquipe(equipe, req.session.idContaUsuario ,function(erro, resultado){
      if(erro){
        throw erro;
      } else {
          console.log("Equipe cadastrada com sucesso");
          var idEquipe = resultado.insertId;

          EquipeDAO.cadMembrosEquipe(equipe.membrosEquipe, idEquipe, function(erro,resultado){
            if(erro){
              throw erro;
            } else {
              console.log("Membros adicionados a equipe");
              res.send("EQUIPE CADASTRADA COM SUCESSO")
            }
          })
      }

    });

}
