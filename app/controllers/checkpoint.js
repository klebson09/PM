module.exports.consultarCheckpoints = function(application, req, res){
	console.log("**************************** checkpoint:consultarCheckpoints  *********************************************");
		var connection = application.config.dbConnection;
		var checkpointDAO = new application.app.models.CheckpointDAO(connection);

		checkpointDAO.consultarCheckpoints(req.session.idProjeto, function(error, resultConsultarCheckpoints){

				console.log("checkpoint:consultarTermoAbertura - resultConsultarCheckpoints = "+JSON.stringify(resultConsultarCheckpoints));

				if(error){
					throw error;
				} else {
					checkpoints = resultConsultarCheckpoints;

					for(var i=0; i<checkpoints.length; i++){
						checkpoints[i].dataInicial = formatarData(new Date(checkpoints[i].dataInicial));
						checkpoints[i].dataFinal = formatarData(new Date(checkpoints[i].dataFinal));
					}

					console.log("############# checkpoint:consultarTermoAbertura - checkpoints = "+ JSON.stringify(checkpoints) );
							
						res.render("includes/checkpoint", {
							sessionNomeUsuario: req.session.nomeUsuario,
							sessionNomeTipoUsuario: req.session.tipoUsuario,
							notificacao: req.session.notificacoes,
							dadosCP: checkpoints,
							layout: 'includes/layoutIncludes'
						});		
				}

		});




}

module.exports.consultarCheckpointsEqp = function(application, req, res){
	console.log("**************************** checkpoint:consultarCheckpointsEqp  *********************************************");
		var connection = application.config.dbConnection;
		var checkpointDAO = new application.app.models.CheckpointDAO(connection);

		checkpointDAO.consultarCheckpoints(req.session.idProjeto, function(error, resultConsultarCheckpoints){

				console.log("checkpoint:consultarTermoAbertura - resultConsultarCheckpoints = "+JSON.stringify(resultConsultarCheckpoints));

				if(error){
					throw error;
				} else {
					checkpoints = resultConsultarCheckpoints;

					for(var i=0; i<checkpoints.length; i++){
						checkpoints[i].dataInicial = formatarData(new Date(checkpoints[i].dataInicial));
						checkpoints[i].dataFinal = formatarData(new Date(checkpoints[i].dataFinal));
					}

					console.log("############# checkpoint:consultarTermoAbertura - checkpoints = "+ JSON.stringify(checkpoints) );
							
						res.render("includes/checkpointEdit", {
							sessionNomeUsuario: req.session.nomeUsuario,
							sessionNomeTipoUsuario: req.session.tipoUsuario,
							notificacao: req.session.notificacoes,
							dadosCP: checkpoints,
							layout: 'includes/layoutIncludes'
						});		
				}

		});




}


function formatarData(dataPrazoEstimado){
	var dia  = dataPrazoEstimado.getDate().toString().padStart(2, '0');
    var mes  = (dataPrazoEstimado.getMonth()+1).toString().padStart(2, '0'); 
    var ano  = dataPrazoEstimado.getFullYear();
	console.log("termoAbertura:formatarData - dataPrazoEstimado = "+dataPrazoEstimado);
	return dia+"/"+mes+"/"+ano;
}

