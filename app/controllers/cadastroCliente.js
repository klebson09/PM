module.exports.cadCliente = function(application, req, res){
  console.log("controllers de cadcliente");
	res.render("cadastros/cadastroCliente", {validacao: {}});
}
