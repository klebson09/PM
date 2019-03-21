/**
1 - Pendente
2 - Concluído
3 - ?

*/
function timeLineAnalisador(connection){
 this._connection = connection();
}

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
				   {"title":"Project Marketplace: [<proj>] Parabéns, você modelou o seu projeto <proj>","msg":" Bom trabalho, você descreveu o projeto <b><proj></b> e agora ele encontra-se disponível para equipes de desenvolvedores candidate-se para o projeto.Você vai receber notificações por email e por aqui no portal informando se alguma equipe ficou interessado por seu projeto.","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: [<proj>] Propostas Recebidas","msg":"Boas notícias, você recebeu alguma proposta do projeto <b><proj></b>. Verifique todas as propostas clicando em <b><a href='/propostas_projeto'>VISUALIZAR PROPOSTA(S)</a></b>.","icon":"fa fa-envelope bg-blue","date":"","time":""},
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



function trataMsgsUsuarioCadastrado(msg, nomeUsuario,  statusProjeto){
	msgsCliente[0].msg = msgsCliente[0].msg.replace("<usr>", nomeUsuario);
	//var msgsClienteCopy = sgsCliente[0];

	//var str = "Visit Microsoft!";
	//var res = str.replace("Microsoft", "W3Schools");   
	console.log("msgsCliente[0] "+msgsCliente[0]);

	return msgsCliente[0];

}

//Substituição do template <proj> pelo nome do projeto
function trataMsgsProjeto(projeto, indiceMsg){
	msgsCliente[indiceMsg].title = msgsCliente[indiceMsg].title.replace("<proj>", projeto.nomeProjeto);
	msgsCliente[indiceMsg].msg = msgsCliente[indiceMsg].msg.replace("<proj>", projeto.nomeProjeto);
	//var msgsClienteCopy = sgsCliente[0];

	//var str = "Visit Microsoft!";
	//var res = str.replace("Microsoft", "W3Schools");   
	console.log("msgsCliente[0] "+msgsCliente[indiceMsg]);

	return msgsCliente[indiceMsg];

}

//Tratar a data do cadastro do usuário
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

//Tratar a data do status do projeto
function tratarDataStatus(statusProjeto, indiceMsg, campoData){

	console.log("tratarDataStatus:"+JSON.stringify(statusProjeto));

	var dataStatus = new Date(statusProjeto[campoData]);

	var date = "";
	var time = "";
 
	msgsCliente[indiceMsg].date = dataStatus.getDate()+" de "+meses[dataStatus.getMonth()]+" de "+dataStatus.getFullYear();
	msgsCliente[indiceMsg].time = (dataStatus.getHours()<10?'0':'') + dataStatus.getHours()+":"+(dataStatus.getMinutes()<10?'0':'') + dataStatus.getMinutes();
}


function processarMensagemCliente(statusProjeto, session, projeto){
	var msgs = [];
	console.log(" ===>> statusProjeto "+JSON.stringify(statusProjeto));
	console.log(" ===>> session.dataCadastro "+session.dataCadastro);
	console.log(" ===>> projeto "+JSON.stringify(projeto));
	tratarDataCadastro(session);
	var indMsg=0;
	if(statusProjeto != null){
		indMsg=1;
		trataMsgsUsuarioCadastrado(msgsCliente[0], session.nomeUsuario, statusProjeto) 
		tratarDataStatus(statusProjeto, 1, "dataModelarProjeto");
		trataMsgsProjeto(projeto, 1);
		if(statusProjeto.statusProposta != 1){
			if(statusProjeto.statusProposta == 3){ //Propostas pendentes de análise
				indMsg = 2;
				tratarDataStatus(statusProjeto, 2, "dataStatusPropostaRecebido");
				trataMsgsProjeto(projeto, 2);
			}else{ 
				if(statusProjeto.statusProposta == 2){ //Proposta Aceita
					indMsg = 3;
					tratarDataStatus(statusProjeto, 2, "dataStatusPropostaRecebido");
					tratarDataStatus(statusProjeto, 3, "dataStatusPropostaAprovada");
					trataMsgsProjeto(projeto, 3);
				}
			}
		}
	}	
	

	for (var i=indMsg; i>= 0; i--){
		msgs.push(msgsCliente[i]);
	}		

	return msgs;

}



timeLineAnalisador.prototype.processaMensagemCliente = function(statusProjeto, session, projeto, callback){

	

	callback(processarMensagemCliente(statusProjeto, session, projeto) );

}

// atualizar a sessão toda vez que é atualizado a tabela status projeto 
timeLineAnalisador.prototype.atualizarTimeLine = function(session, projetosDispDAO, statusProjetoDAO, callback){ 					

	//var ProjetosDispDAO = new application.app.models.projetosDispDAO(connection);

	projetosDispDAO.verificarProjetosCliente(session.idContaUsuario, function(error, result) {

		if (error) {
			throw error;
		} else {

			//var timeLineAnalisador = new application.app.models.timeLineAnalisador();
			console.log(JSON.stringify(result));
			console.log("result//////////////"+JSON.stringify(result));

			if (result[0] == undefined || result[0] == null) {
				timeLineAnalisador.processaMensagemCliente(null, req.session, null, function(msgs){
					callback(msgs);

				});
			}else {
				//var statusProjetoDAO = new application.app.models.StatusProjetoDAO();

				statusProjetoDAO.selecionarStatusProjeto(result[0].idProjeto, function(erro, resultado){
					if(erro){
						throw erro;
					} else {
						
						callback(processarMensagemCliente(resultado[0], session, result[0]) );
					}

				});
			}			
			
		}		
	});	

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
