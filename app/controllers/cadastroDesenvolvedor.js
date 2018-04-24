module.exports.cadDesenvolvedor = function(application, req, res){
  console.log("controllers de cadDesenvolvedor");
	res.render("cadastros/cadastroDesenvolvedor", {validacao: {}});
}
