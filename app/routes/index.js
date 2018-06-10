module.exports = function(application){

    var sess;
    // application.get('/login', function(req, res){
    application.get('/', function(req, res){
      application.app.controllers.index.home(application, req, res);
    });

    application.get('/sair', function(req, res){
      application.app.controllers.index.sair(application, req, res);
    });

}
