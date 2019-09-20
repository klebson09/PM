
/*http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node\n');
}).listen(process.env.PORT_APP);
console.log('Server running at :'+process.env.PORT_APP);
*/

/* importar as configurações do servidor */
var app = require('./config/server');

var server = require('http').createServer(app, function(req, res){
	console.log('Servidor http criado');
});



/* parametrizar a porta de escuta */
//var porta = process.env.PORT || 3000;
var porta = process.env.PORT_APP;
// app.listen(porta);
//var server = app.listen(porta, function(){
server.listen(porta, function(){
	console.log('Server running at :'+process.env.PORT_APP);
	console.log('Servidor online');
})

