module.exports = function(application){
    application.get('/cadastro_desenvolvedor', function(req, res){
      console.log("routes de cadcliente");
      application.app.controllers.cadastroDesenvolvedor.cadDesenvolvedor(application, req, res);
    });

    application.post('/cadastrar_dev', function(req,res){
    	console.log("cheguei em /cadastrar_dev");
    	var dadosForm = req.body;
    	console.log(dadosForm);
    	application.app.controllers.cadastroDesenvolvedor.cadastrar(application, req, res);
    });
}


