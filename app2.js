/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var porta = process.env.PORT || 3000;

var cluster = require('cluster');


if(cluster.isMaster) 
{
   cluster.fork();
   cluster.fork();

   cluster.on('disconnect', function(worker) 
   {
       console.error('disconnect!');
       cluster.fork();
   });
} 
else 
{
	console.log('Escutando...');

 	var server = app.listen(porta, function(){
		console.log('Servidor online');
	});

} 

process.on("uncaughtException", function(error){
	console.log("Exceção em tempo de execução lançada pela aplicação")
	console.log("Mensagem de erro = "+error)
	console.log("Pilha de chamada:\n"+error.stack);
	process.exit(1);
});
