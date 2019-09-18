/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/*importar o módulo do mysql*/
var mysql = require('mysql');

/*importar o módulo nativo do EventEmitter*/
const EventEmitter = require('events').EventEmitter;
const myEventEmitter = new EventEmitter;

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-session */
var expressSession = require('express-session');

/* importar o módulo do express ejs layouts*/
var expressLayouts = require('express-ejs-layouts');

/* iniciar o objeto do express */
var app = express();

var moment = require('moment');

var formatoData = ('dateFormat');

app.use(expressLayouts);

/* setar as variáveis 'view engine' e 'views' do express */
// autoload das rotas --> ONDE É ENCONTRADO
app.set('view engine', 'ejs');//setar ou criar objetos na engine
app.set('views', './app/views'); //indica onde as wiews estão


/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true})); // quando tiver um post em alguma das requisições é recuperado a informação via json da propriedade body do request

/*configurar o middleware express-validator */
app.use(expressValidator());

var cluster = require('cluster');
var domain = require('domain');



/*configurar o middleware express-session */
app.use(expressSession({
  secret: 'kdiacljfowmnsiel',
  resave: false,
  saveUninitialized: false
}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .then('app/util')
    .then('config/dbConnection.js')
    .then('config/mailConfig.js')
    .into(app);

/* exportar o objeto app */
module.exports = app;
