/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var porta = process.env.PORT || 3000;
// app.listen(porta);
var server = app.listen(porta, function(){
	console.log('Servidor online');
});

process.on("uncaughtException", function(error){
	console.log("UMA EXCEÇÃO FOI CAPTURADA!!!")
	console.log("ERRO = "+error)
});
