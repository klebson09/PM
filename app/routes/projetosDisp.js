module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/projeto_disp', function(req, res){
      application.app.controllers.projetosDisp.projDisp(application, req, res);
    });
}
