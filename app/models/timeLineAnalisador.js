/**
1 - Pendente
2 - Concluído
3 - ?

*/
module.exports = function(){
  this.getstatusProjeto = function(connection, callback){
    //busca no banco de dados
    console.log("chegando na query o/o/o/o/o");
    var sqlSelectStatusProjeto = "SELECT * FROM statusprojeto WHERE idProjeto =";
    connection.query(sqlSelectStatusProjeto, callback);

  }
  return this;
}




var msgsCliente = [{"title":"Project Marketplace: Boas Vindas!","msg":"Olá <b><usr></b> seja bem vindo ao portal, aqui você terá a possibilidade de transformar sua ideia em realidade.Varias equipes com conhecimento diverso poderão trabalhar em seu projeto.Você deve MODELAR seu projeto com informação suficiente para que os desenvolvedores tenham uma boa visão do sistema que deverão desenvolver. <b><a href='/modelar_projeto'>Clique aqui para Modelar o projeto</a></b>","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: Parabéns, você modelou o seu projeto <proj>","msg":" Bom trabalho, você descreveu o projeto <b><proj></b> e agora ele encontra-se disponível para equipes de desenvolvedores candidate-se para o projeto.Você vai receber notificações por email e por aqui no portal informando se alguma equipe ficou interessado por seu projeto.","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: Propostas Recebidas pelo Projeto <proj>","msg":"Tenho boas notícias você recebeu alguma proposta. Verifique todas as propostas clicando aqui <a href='/propostas_projeto'>VISUALIZAR PROPOSTA(S)</a> e tome as devidas ações.","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: [<proj>] Desenvolvimento","msg":"Muito bem, agora a brincadeira vai ficar seria, a equipe de desenvolvimento vai entrar em contato por email para esclarecer alguma eventual dúvida, eles estão trabalhando no desenvolvimento de um documento com as principais funcionalidades do sistema, o <b>TERMO DE ABERTURA</b>","icon":"fa fa-envelope bg-blue","date":"","time":""}
				  ]

var msgsDev = [{"msg":"Olá <usr> seja bem vindo ao portal, aqui você terá a possibilidade de transformar sua ideia em realidade.Varias equipes com conhecimento diverso poderão trabalhar em seu projeto.Você deve MODELAR seu projeto com informação suficiente para que os desenvolvedores tenham uma boa visão do sistema que deverão desenvolver. <a href='/modelarProjeto'>Clique aqui para Modelar o projeto"},
			   {"msg":" Bom trabalho, você descreveu o projeto e agora ele encontra-se disponível para equipes de desenvolvedores candidate-se para o projeto.Você vai receber notificações por email e por aqui no portal informando se alguma equipe ficou interessado por seu projeto."},
			   {"msg":"Tenho boas notícias você recebeu alguma proposta.Verifique todas as propostas clicando aqui <a href='/propostas_projeto'>VISUALIZAR PROPOSTA(S)</a> e tome as devidas ações."},
			   {"msg":"Muito bem, agora a brincadeira vai ficar seria, a equipe de desenvolvimento vai entrar em contato por email para esclarecer alguma eventual dúvida, eles estão trabalhando no desenvolvimento de um documento com as principais funcionalidades do sistema, o <b>TERMO DE ABERTURA</b>"}
			  ]

var msgsTutor = [{"msg":"Olá <usr> seja bem vindo ao portal, aqui você terá a possibilidade de transformar sua ideia em realidade.Varias equipes com conhecimento diverso poderão trabalhar em seu projeto.Você deve MODELAR seu projeto com informação suficiente para que os desenvolvedores tenham uma boa visão do sistema que deverão desenvolver. <a href='/modelarProjeto'>Clique aqui para Modelar o projeto"},
				 {"msg":" Bom trabalho, você descreveu o projeto e agora ele encontra-se disponível para equipes de desenvolvedores candidate-se para o projeto.Você vai receber notificações por email e por aqui no portal informando se alguma equipe ficou interessado por seu projeto."},
				 {"msg":"Tenho boas notícias você recebeu alguma proposta.Verifique todas as propostas clicando aqui <a href='/propostas_projeto'>VISUALIZAR PROPOSTA(S)</a> e tome as devidas ações."},
				 {"msg":"Muito bem, agora a brincadeira vai ficar seria, a equipe de desenvolvimento vai entrar em contato por email para esclarecer alguma eventual dúvida, eles estão trabalhando no desenvolvimento de um documento com as principais funcionalidades do sistema, o <b>TERMO DE ABERTURA</b>"}
				]

var meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];							  

/*function timeLineAnalisador(connection){
  this._connection = connection();
}*/

function timeLineAnalisador(){
 
}

function trataMsgsUsuarioCadastrado(msg, nomeUsuario,  statusProjeto){
	msgsCliente[0].msg = msgsCliente[0].msg.replace("<usr>", nomeUsuario);
	//var msgsClienteCopy = sgsCliente[0];

	//var str = "Visit Microsoft!";
	//var res = str.replace("Microsoft", "W3Schools");   
	console.log("msgsCliente[0] "+msgsCliente[0]);

	return msgsCliente[0];

}

function trataMsgsProjeto(projeto){
	msgsCliente[1].title = msgsCliente[1].title.replace("<proj>", projeto.nomeProjeto);
	msgsCliente[1].msg = msgsCliente[1].msg.replace("<proj>", projeto.nomeProjeto);
	//var msgsClienteCopy = sgsCliente[0];

	//var str = "Visit Microsoft!";
	//var res = str.replace("Microsoft", "W3Schools");   
	console.log("msgsCliente[0] "+msgsCliente[0]);

	return msgsCliente[1];

}

function tratarDataCadastro(session){
	var date = "";
	var time = "";
	var dataCadastro = session.dataCadastro;

	if(session.dataCadastroExtenso == "" && session.horaCadastroExtenso == ""){
		console.log("dataCadastro "+dataCadastro);
		console.log(Object.keys(dataCadastro));

		msgsCliente[0].date = dataCadastro.getDate()+" de "+meses[dataCadastro.getMonth()]+" de "+dataCadastro.getFullYear();
		msgsCliente[0].time = (dataCadastro.getHours()<10?'0':'') + dataCadastro.getHours()+":"+(dataCadastro.getMinutes()<10?'0':'') + dataCadastro.getMinutes();

		console.log("msgsCliente[0].date "+msgsCliente[0].date);
		console.log("msgsCliente[0].time "+msgsCliente[0].time);

		session.dataCadastroExtenso = msgsCliente[0].date;
		session.horaCadastroExtenso = msgsCliente[0].time;
	} else{
		msgsCliente[0].date = session.dataCadastroExtenso;
		msgsCliente[0].time = session.horaCadastroExtenso;
	}

}

function tratarDataStatus(statusProjeto){

	var dataModelarProjeto = new Date(statusProjeto.dataModelarProjeto);

	var date = "";
	var time = "";
 
	msgsCliente[1].date = dataModelarProjeto.getDate()+" de "+meses[dataModelarProjeto.getMonth()]+" de "+dataModelarProjeto.getFullYear();
	msgsCliente[1].time = (dataModelarProjeto.getHours()<10?'0':'') + dataModelarProjeto.getHours()+":"+(dataModelarProjeto.getMinutes()<10?'0':'') + dataModelarProjeto.getMinutes();
}



timeLineAnalisador.prototype.processaMensagemCliente = function(statusProjeto, session, projeto, callback){

	var msgs = [];
	console.log(" ===>> statusProjeto "+JSON.stringify(statusProjeto));
	console.log(" ===>> session.dataCadastro "+session.dataCadastro);
	console.log(" ===>> projeto "+JSON.stringify(projeto));
	tratarDataCadastro(session);
	var indMsg=0;
	if(statusProjeto != null){
		indMsg=1;
		trataMsgsUsuarioCadastrado(msgsCliente[0], session.nomeUsuario, statusProjeto) 
		tratarDataStatus(statusProjeto);
		trataMsgsProjeto(projeto);
		if(statusProjeto.statusProposta != 1){
			if(statusProjeto.statusProposta == 3){ //Propostas pendentes de análise
				indMsg = 2;
			}else{ //Proposta Aceita
				//Em desenvolvimento...
			}
		}
	}	
	

	for (var i=indMsg; i>= 0; i--){
		msgs.push(msgsCliente[i]);
	}	

	callback(msgs);

}


timeLineAnalisador.prototype.processaMensagemDev = function(statusProjeto, callback){

}

timeLineAnalisador.prototype.processaMensagemTutor = function(statusProjeto, callback){


}

module.exports = function(){
  return timeLineAnalisador;
}

/**

[{"idStatusProjeto":1,"idProjeto":3,"modelarProjeto":2,"disporProjeto":2,"vincularEquipe":1,"criarTermoAbertura":1,"aprovarTermoAbertura":1,"desenvolverProjeto":1,"encerrar":1}]

*/
