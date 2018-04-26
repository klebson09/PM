module.exports = function(application){
    application.get('/cadastro_cliente', function(req, res){
      application.app.controllers.cadastroCliente.cadCliente(application, req, res);
    });
}
