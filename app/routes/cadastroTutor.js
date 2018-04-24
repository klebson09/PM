module.exports = function(application){
    application.get('/cadastro_tutor', function(req, res){
      console.log("routes de cadcliente");
      application.app.controllers.cadastroTutor.cadTutor(application, req, res);
    });
}
