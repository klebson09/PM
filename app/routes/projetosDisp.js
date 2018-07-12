module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/projeto_disp', function(req, res){
      application.app.controllers.projetosDisp.projDisp(application, req, res);
    });
    application.post('/candidatarse_projeto', function(req, res){
      //console.log("idProjeto -+-+-+-+>>>??"+JSON.stringify(req.body) );
      application.app.controllers.projetosDisp.candidatarse(application, req, res);
    });
}
