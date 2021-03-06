module.exports = function(application){
    application.get('/checkpoint', function(req, res){    	
	console.log("**************************** checkpoint:rota  *********************************************");
      application.app.controllers.checkpoint.consultarCheckpoints(application, req, res);
    });
    application.get('/consultar_checkpoints', function(req, res){    	
	console.log("**************************** checkpoint:rota - consultar_checkpoints  *********************************************");
      application.app.controllers.checkpoint.consultarCheckpointsProjeto(application, req, res);
    });

    application.post('/atualizar_checkpoints', function(req, res){    	
	  console.log("**************************** checkpoint:rota - atualizar_checkpoints  *********************************************");
      application.app.controllers.checkpoint.atualizarCheckpointsProjeto(application, req, res);
    });

    application.post('/finalizar_projeto_dev', function(req, res){     
    console.log("**************************** checkpoint:rota - finalizar_projeto_dev  *********************************************");
      application.app.controllers.checkpoint.finalizarProjetoDesenvolvedor(application, req, res);
    });

    application.post('/finalizar_projeto', function(req, res){     
    console.log("**************************** checkpoint:rota - finalizar_projeto  *********************************************");
      application.app.controllers.checkpoint.finalizarProjeto(application, req, res);
    });

    
     
}
