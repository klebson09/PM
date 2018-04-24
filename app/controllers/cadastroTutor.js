module.exports.cadTutor = function(application, req, res){
  console.log("controllers de cadTutor");
	res.render("cadastros/cadastroTutor", {validacao: {}});
}
