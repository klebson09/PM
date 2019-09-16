module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/projeto_disp', function(req, res){
      application.app.controllers.projetosDisp.projDisp(application, req, res);
    });
    application.get('/validar_equipe_tutor', function(req, res){
      application.app.controllers.projetosDisp.validarEquipeTutor(application, req, res);
    });
    application.post('/candidatarse_projeto', function(req, res){
      //console.log("idProjeto -+-+-+-+>>>??"+JSON.stringify(req.body) );
      application.app.controllers.projetosDisp.candidatarse(application, req, res);
    });
     application.get('/encerrar_negociacao', function(req, res){
      //console.log("idProjeto -+-+-+-+>>>??"+JSON.stringify(req.body) );
      application.app.controllers.projetosDisp.encerrarNegociacaoProjeto(application, req, res);
    });

      application.post('/encerrar_negociacao_projeto', function(req, res){
      //console.log("idProjeto -+-+-+-+>>>??"+JSON.stringify(req.body) );
      application.app.controllers.projetosDisp.encerrarNegociacaoProjetoDefinitivo(application, req, res);
    });
}
