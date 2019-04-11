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

var msgsDev = [{"title":"Project Marketplace: Boas Vindas!","msg":"Olá <b><usr></b> seja bem vindo ao portal, aqui você terá a oportunidade de aplicar seu conhecimento em desenvolvimento de software e alavancar de vez sua carreira. Nenhum homem é uma ilha, então, você precisa fazer parte de uma equipe, clique em <b><a href='/criar_equipe'>CRIAR EQUIPE</a></b> para iniciar suas atividades nesse sistema","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: Parabéns, você pertence a equipe <eqp>, partiu projeto","msg":" Você é participante de uma equipe, agora você tem muitas oportunidades para mostrar o seu potencial. Muitos clientes precisam da sua ajuda, clique em <b><a href='/projeto_disp'>PROJETOS DISPONIVEIS</a></b> e faça uma proposta para um cliente, convença-o de que é capaz de solucionar os seus problemas","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: Proposta Enviada para o projeto <proj>","msg":"A proposta de sua equipe para o projeto <proj> foi enviada para analise do cliente, a qualquer momento o cliente pode aceitar sua proposta","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: Cliente aprovou sua proposta para o projeto <proj>","msg":"Boas noticias, o cliente aceitou a proposta inicial de sua equipe para desenvolver o projeto <proj>, vocês devem negociar todos os termos e formaliza-los no Termo de Abertura. Clique em <b><a href='/termo_abertura'>TERMO DE ABERTURA</a></b> para redigir o termo de abertura para a analise posterior do cliente","icon":"fa fa-envelope bg-blue","date":"","time":""}
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

function tratarMsgsProposta(nomeProjeto, indiceMsg){
	msgsDev[indiceMsg].title = msgsDev[indiceMsg].title.replace("<proj>", nomeProjeto);
	msgsDev[indiceMsg].msg = msgsDev[indiceMsg].msg.replace("<proj>", nomeProjeto);	
}


//Substituição do template <proj> pelo nome do projeto
function tratarMsgs(objeto, indiceMsg, tipoCampo){

	console.log("objeto = "+JSON.stringify(objeto));

	if(tipoCampo == "P"){
		msgsCliente[indiceMsg].title = msgsCliente[indiceMsg].title.replace("<proj>", objeto.nomeProjeto);
		msgsCliente[indiceMsg].msg = msgsCliente[indiceMsg].msg.replace("<proj>", objeto.nomeProjeto);	
	} else if(tipoCampo == "D"){
		msgsDev[indiceMsg].title = msgsDev[indiceMsg].title.replace("<eqp>", objeto[0].nomeEquipe);
		msgsDev[indiceMsg].msg = msgsDev[indiceMsg].msg.replace("<eqp>", objeto[0].nomeEquipe);	
	}
	
	//var msgsClienteCopy = sgsCliente[0];

	//var str = "Visit Microsoft!";
	//var res = str.replace("Microsoft", "W3Schools");   
	console.log("msgsCliente[0] "+msgsCliente[indiceMsg]);

	return msgsCliente[indiceMsg];

}

//Tratar a data do cadastro do usuário
function tratarDataCadastro(session, tipoUsuario){
	var date = "";
	var time = "";
	var dataCadastro = session.dataCadastro;

	if(session.dataCadastroExtenso == "" && session.horaCadastroExtenso == ""){
		console.log("dataCadastro "+dataCadastro);
		console.log(Object.keys(dataCadastro));

		if(tipoUsuario == "C"){
			msgsCliente[0].date = dataCadastro.getDate()+" de "+meses[dataCadastro.getMonth()]+" de "+dataCadastro.getFullYear();
			msgsCliente[0].time = (dataCadastro.getHours()<10?'0':'') + dataCadastro.getHours()+":"+(dataCadastro.getMinutes()<10?'0':'') + dataCadastro.getMinutes();	

			console.log("msgsCliente[0].date "+msgsCliente[0].date);
			console.log("msgsCliente[0].time "+msgsCliente[0].time);

			session.dataCadastroExtenso = msgsCliente[0].date;
			session.horaCadastroExtenso = msgsCliente[0].time;
		} else {
			msgsDev[0].date = dataCadastro.getDate()+" de "+meses[dataCadastro.getMonth()]+" de "+dataCadastro.getFullYear();
			msgsDev[0].time = (dataCadastro.getHours()<10?'0':'') + dataCadastro.getHours()+":"+(dataCadastro.getMinutes()<10?'0':'') + dataCadastro.getMinutes();	

			console.log("msgsDev[0].date "+msgsDev[0].date);
			console.log("msgsDev[0].time "+msgsDev[0].time);

			session.dataCadastroExtenso = msgsDev[0].date;
			session.horaCadastroExtenso = msgsDev[0].time;
		}
		
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

function tratarDataEquipe(equipe, indiceMsg){

	console.log("tratarDataEquipe:INICIO");

	console.log(JSON.stringify(equipe));

	var dataEquipe = new Date(equipe[0].dataCriacaoEquipe);

	console.log("dataEquipe: "+dataEquipe);

	msgsDev[indiceMsg].date = dataEquipe.getDate()+" de "+meses[dataEquipe.getMonth()]+" de "+dataEquipe.getFullYear();
	msgsDev[indiceMsg].time = (dataEquipe.getHours()<10?'0':'') + dataEquipe.getHours()+":"+(dataEquipe.getMinutes()<10?'0':'') + dataEquipe.getMinutes();


	console.log("tratarDataEquipe:FIM");


}

function tratarDataProposta(proposta, indiceMsg){

	console.log("tratarDataProposta:INICIO");

	console.log(JSON.stringify(proposta));

	var dataProposta = new Date(proposta[0].dataProposta);

	console.log("dataProposta: "+dataProposta);

	msgsDev[indiceMsg].date = dataProposta.getDate()+" de "+meses[dataProposta.getMonth()]+" de "+dataProposta.getFullYear();
	msgsDev[indiceMsg].time = (dataProposta.getHours()<10?'0':'') + dataProposta.getHours()+":"+(dataProposta.getMinutes()<10?'0':'') + dataProposta.getMinutes();


	console.log("tratarDataProposta:FIM");


}


function processarMensagemCliente(statusProjeto, session, projeto){
	var msgs = [];
	console.log(" ===>> statusProjeto "+JSON.stringify(statusProjeto));
	console.log(" ===>> session.dataCadastro "+session.dataCadastro);
	console.log(" ===>> projeto "+JSON.stringify(projeto));
	tratarDataCadastro(session, "C");
	var indMsg=0;
	if(statusProjeto != null){
		indMsg=1;
		trataMsgsUsuarioCadastrado(msgsCliente[0], session.nomeUsuario, statusProjeto) 
		tratarDataStatus(statusProjeto, 1, "dataModelarProjeto");
		tratarMsgs(projeto, 1, 'P');
		if(statusProjeto.statusProposta != 1){
			if(statusProjeto.statusProposta == 3){ //Propostas pendentes de análise
				indMsg = 2;
				tratarDataStatus(statusProjeto, 2, "dataStatusPropostaRecebido");
				tratarMsgs(projeto, 2, 'P');
			}else{ 
				if(statusProjeto.statusProposta == 2){ //Proposta Aceita
					indMsg = 3;
					tratarDataStatus(statusProjeto, 2, "dataStatusPropostaRecebido");
					tratarDataStatus(statusProjeto, 3, "dataStatusPropostaAprovada");
					tratarMsgs(projeto, 3, 'P');
				}
			}
		}
	}	
	

	for (var i=indMsg; i>= 0; i--){
		msgs.push(msgsCliente[i]);
	}		

	return msgs;

}

function processarMensagemDev(equipe, proposta, propostasAprovadas, session){

	console.log("equipe = "+JSON.stringify(equipe));
	console.log("Proposta = "+JSON.stringify(proposta));
	console.log("propostasAprovadas = "+JSON.stringify(propostasAprovadas));
	console.log("session = "+JSON.stringify(session));



	var msgs = [];
	var indMsg=0;

	tratarDataCadastro(session, "D");

	if(equipe != null && equipe != undefined && equipe.length > 0){
		console.log("TEM EQUIPE");
		tratarDataEquipe(equipe, 1);
		tratarMsgs(equipe, 1, "D");
		if(proposta != null && proposta != undefined && proposta.length > 0){
			console.log("TEM PROPOSTA");
			if(propostasAprovadas != null && propostasAprovadas != undefined && propostasAprovadas.length > 0){
				console.log("PROPOSTA(S) APROVADA");
				indMsg = 3;
				tratarMsgsProposta(propostasAprovadas[0].nomeProjeto, indMsg);

			} else{
				console.log("NENHUMA PROPOSTA APROVADA");
				indMsg = 2;	
				tratarDataProposta(proposta, indMsg);
				tratarMsgsProposta(proposta[0].nomeProjeto, indMsg);
			}
		}else{
			console.log("NENHUMA PROPOSTA");
			indMsg = 1;	
		}
		
	}

	for (var i=indMsg; i>= 0; i--){
		msgs.push(msgsDev[i]);
	}		

	return msgs;
}


// atualizar a sessão toda vez que é atualizado a tabela status projeto 
timeLineAnalisador.prototype.atualizarTimeLineCliente = function(session, projetosDispDAO, statusProjetoDAO, callback){  					

	//var ProjetosDispDAO = new application.app.models.projetosDispDAO(connection);

	projetosDispDAO.verificarProjetosCliente(session.idContaUsuario, function(error, result) {

		if (error) {
			throw error;
		} else {

			//var timeLineAnalisador = new application.app.models.timeLineAnalisador();
			console.log(JSON.stringify(result));
			console.log("result//////////////"+JSON.stringify(result));

			if (result[0] == undefined || result[0] == null) {

				callback(processarMensagemCliente(null, session, null));
				
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

timeLineAnalisador.prototype.atualizarTimeLineDev = function(session, equipeDAO, propostasDAO, statusProjetoDAO, callback){  					

	//var ProjetosDispDAO = new application.app.models.projetosDispDAO(connection);
	console.log("atualizarTimeLineDev:INICIO");


	equipeDAO.verificarUsuarioVinculadoEquipe(session.idContaUsuario, function(error, resultEquipe) {
		console.log("atualizarTimeLineDev:equipeDAO.verificarUsuarioVinculadoEquipe");

		if(error){
			console.log("atualizarTimeLineDev:erro");
			throw error;
		} else {
			if (resultEquipe[0] == undefined || resultEquipe[0] == null) {
				callback(processarMensagemDev(resultEquipe, null,  session));	
			} else {
				propostasDAO.obterPropostasEquipe(resultEquipe[0].idEquipe, function(error, resultProposta){

						if(error){
							throw error;
						} else {
							if (resultProposta[0] != undefined || resultProposta[0] != null) {
								
								console.log("Equipe submeteu propostas");
								console.log("resultProposta = "+JSON.stringify(resultProposta));
								console.log("resultProposta.length = "+resultProposta.length);

								var propostasAprovadas = [];

								for(var i=0; i<resultProposta.length; i++){
									propostasDAO.verificarPropostasProjetoAprovada(resultProposta[i].idProjeto, function(error, resultPropostaAprov){
										console.log("i = "+i);
										console.log("resultPropostaAprov = "+JSON.stringify(resultPropostaAprov));
										if(error){
											throw error;
										} else {
											console.log("@@@@@@Verificando se as propostas foram aprovadas");
											console.log("resultPropostaAprov[0] = "+JSON.stringify(resultPropostaAprov[0]));
											console.log(resultPropostaAprov[0] != undefined || resultPropostaAprov[0] != null);
											if(resultPropostaAprov[0] != undefined || resultPropostaAprov[0] != null){
												console.log("APROVADA");
												propostasAprovadas.push(resultPropostaAprov[0]);

												console.log("propostasAprovadas.length = "+propostasAprovadas.length);	
												
												console.log("Equipe teve algumas de suas propostas aprovadas pelo cliente");

												for(var j=0; j<propostasAprovadas.length; j++){
													console.log("propostasAprovadas[j] = "+JSON.stringify(propostasAprovadas[j]));
													statusProjetoDAO.verificarStatusTermoAbertura(propostasAprovadas[j].idProjeto, function(error, resultTermoAbertura){
													if(error){
														throw error;
													} else {
														if(resultTermoAbertura != undefined || resultTermoAbertura != null){
															console.log("Termo de abertura aprovado, equipe está vinculada ao projeto, que está em processo de desenvolvimento");
															callback(processarMensagemDev(resultEquipe, resultProposta, propostasAprovadas ,session));	
														}	
															}
													});
												}
												
											} else {
												console.log("Equipe não teve qualquer proposta aprovada pelo cliente");
												callback(processarMensagemDev(resultEquipe, resultProposta, propostasAprovadas ,session));
											}
										}
									});
								}


							} else{
								console.log("Equipe não fez nenhuma proposta")
								callback(processarMensagemDev(resultEquipe, resultProposta, null,  session));
							}
						}

					});

			}
		}	

	});	

}




timeLineAnalisador.prototype.processaMensagemTutor = function(statusProjeto, callback){


}

module.exports = function(){
  return timeLineAnalisador;
}

/**

[{"idStatusProjeto":1,"idProjeto":3,"modelarProjeto":2,"disporProjeto":2,"vincularEquipe":1,"criarTermoAbertura":1,"aprovarTermoAbertura":1,"desenvolverProjeto":1,"encerrar":1}]

*/
