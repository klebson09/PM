module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/includes', function(req, res){
      console.log("ROUTERS BLANK <---");
      application.app.controllers.index.home(application, req, res);
    });
}
