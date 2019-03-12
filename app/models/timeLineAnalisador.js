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




var msgsCliente = [{"msg":"Olá <usr> seja bem vindo ao portal, aqui você terá a possibilidade de transformar sua ideia em realidade.Varias equipes com conhecimento diverso poderão trabalhar em seu projeto.Você deve MODELAR seu projeto com informação suficiente para que os desenvolvedores tenham uma boa visão do sistema que deverão desenvolver. <a href='/modelarProjeto'>Clique aqui para Modelar o projeto"},
				   {"msg":" Bom trabalho, você descreveu o projeto e agora ele encontra-se disponível para equipes de desenvolvedores candidate-se para o projeto.Você vai receber notificações por email e por aqui no portal informando se alguma equipe ficou interessado por seu projeto."},
				   {"msg":"Tenho boas notícias você recebeu alguma proposta. Verifique todas as propostas clicando aqui <a href='/propostas_projeto'>VISUALIZAR PROPOSTA(S)</a> e tome as devidas ações."},
				   {"msg":"Muito bem, agora a brincadeira vai ficar seria, a equipe de desenvolvimento vai entrar em contato por email para esclarecer alguma eventual dúvida, eles estão trabalhando no desenvolvimento de um documento com as principais funcionalidades do sistema, o <b>TERMO DE ABERTURA</b>"}
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

/*function timeLineAnalisador(connection){
  this._connection = connection();
}*/

function timeLineAnalisador(){
 
}

function trataMsgsUsuarioCadastrado(msg, nomeUsuario){
	var msgReplaced = msgsCliente[0].msg.replace("<usr>", nomeUsuario);
	//var msgsClienteCopy = sgsCliente[0];

	//var str = "Visit Microsoft!";
	//var res = str.replace("Microsoft", "W3Schools");   
	return JSON.parse(JSON.stringify(msgReplaced));


}



timeLineAnalisador.prototype.processaMensagemCliente = function(statusProjeto, session, callback){

	var msgs = [];
	console.log(" ===>> statusProjeto "+statusProjeto);
	
	if(statusProjeto == null){

		msgs.push(trataMsgsUsuarioCadastrado(msgsCliente[0], session.nomeUsuario) );
	}else{
		msgs.push(msgsCliente[1]);
	}

/*for (var i=0; msgsCliente[i] != 1; i++){
	var posicão = 2;
}
*/
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
