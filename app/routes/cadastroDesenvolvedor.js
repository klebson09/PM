module.exports = function(application){
    application.get('/cadastro_desenvolvedor', function(req, res){
      console.log("routes de cadcliente");
      application.app.controllers.cadastroDesenvolvedor.cadDesenvolvedor(application, req, res);
    });
}
