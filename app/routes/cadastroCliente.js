module.exports = function(application){
    application.get('/cadastro_cliente', function(req, res){
      console.log("routes de cadcliente");
      application.app.controllers.cadastroCliente.cadCliente(application, req, res);
    });
}
