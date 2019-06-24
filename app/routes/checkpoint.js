module.exports = function(application){
    application.get('/checkpoint', function(req, res){    	
	console.log("**************************** checkpoint:rota  *********************************************");
      application.app.controllers.checkpoint.consultarCheckpoints(application, req, res);
    });
    application.get('/consultar_checkpoints', function(req, res){    	
	console.log("**************************** checkpoint:rota - consultar_checkpoints  *********************************************");
      application.app.controllers.checkpoint.consultarCheckpointsEqp(application, req, res);
    });

     
}
