module.exports = function(application){
    // application.get('/login', function(req, res){
    application.get('/modelar_projeto', function(req, res){
      application.app.controllers.modelarProjeto.modelarProj(application, req, res);
    });

    application.post('/criar_projeto', function(req, res){
      console.log("criar projeto")
      application.app.controllers.modelarProjeto.criarProj(application, req, res);
    });
}
