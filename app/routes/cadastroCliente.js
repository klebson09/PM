module.exports = function(application){
    application.get('/cadastro_cliente', function(req, res){
      application.app.controllers.cadastroCliente.cadCliente(application, req, res);
    });

    application.post('/cadastro_cliente', function(req, res){
    console.log("ROTA AUTENTICAÇÃO LOGIN");
    console.log(req.body);
    application.app.controllers.cadastroCliente.inclCliente(application, req, res);
  });
}
