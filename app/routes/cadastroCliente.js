module.exports = function(application){
  application.get('/cadastro_cliente', function(req, res){
    application.app.controllers.cadastroCliente.cadCliente(application, req, res);
  });

  application.post('/cadastro_cliente', function(req, res){
    console.log("ROTA AUTENTICAÇÃO LOGIN");
    console.log(req.body);
    application.app.controllers.cadastroCliente.inclCliente(application, req, res);
  });

  application.post('/alterar_dados_cliente', function(req, res){
    console.log("ROTA AUTENTICAÇÃO alterar_dados_cliente");
    console.log(req.body);
    application.app.controllers.cadastroCliente.alterarCliente(application, req, res);
  });
}
