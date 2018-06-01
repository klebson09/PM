module.exports.criarEqp = function(application, req, res){
  // res.render("includes/criarEquipe", {validacao:{}});
  if (req.session.autenticado) {
    res.render("includes/criarEquipe");
  }else {

    res.render('login/login', {validacao: {}});
  }

}

module.exports.criarEqp2 = function(application, req, res){
  // res.render("includes/criarEquipe", {validacao:{}})
    res.render("includes/criarEqp2");

}
