module.exports = function(application){
    application.get('/cadastro_tutor', function(req, res){
      console.log("routes de cadcliente");
      application.app.controllers.cadastroTutor.cadTutor(application, req, res);
    });

    application.post('/cadastrar_tutor', function(req,res){
    	console.log("cheguei em /cadastrar_tutor");
    	var dadosForm = req.body;
    	console.log(dadosForm);
    	application.app.controllers.cadastroTutor.cadastrar(application, req, res);
    });

    application.post('/alterar_dados_tutor', function(req,res){
        console.log("cheguei em /alterar_dados_tutor");
        var dadosForm = req.body;
        console.log(dadosForm);
        application.app.controllers.cadastroTutor.alterar(application, req, res);
    });
}
