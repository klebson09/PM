module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/login', function(req, res){
      application.app.controllers.login.pagLogin(application, req, res);
    });
}
