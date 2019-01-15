module.exports = function(application){
    application.get('/timeLine', function(req, res){    	
	console.log("=====>>>> timeLine");
      application.app.controllers.timeLine.listTimeLineClient(application, req, res);
    });
}
