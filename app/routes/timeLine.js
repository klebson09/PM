module.exports = function(application){
    application.get('/timeLine', function(req, res){    	
	console.log("=====>>>> timeLine");
      application.app.controllers.timeLine.listTimeLineClient(application, req, res);
    });

     application.get('/homeTimeLine', function(req, res){
     console.log("=====>>>> homeTimeLine");
      application.app.controllers.timeLine.exibirTimeLine(application, req, res);
    });
}
