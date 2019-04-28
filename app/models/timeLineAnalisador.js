var meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];	

function timeLineAnalisador(connection){
 this._connection = connection();
}

timeLineAnalisador.prototype.tratarMsgs = function(msgs, callback){ 

	/*[{"title":"Project Marketplace: Boas Vindas!","msg":"Olá <b><usr></b> seja bem vindo ao portal, aqui você terá a possibilidade de transformar sua ideia em realidade.Varias equipes com conhecimento diverso poderão trabalhar em seu projeto.Você deve MODELAR seu projeto com informação suficiente para que os desenvolvedores tenham uma boa visão do sistema que deverão desenvolver. <b><a href='/modelar_projeto'>Clique aqui para Modelar o projeto</a></b>","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: [<proj>] Parabéns, você modelou o seu projeto <proj>","msg":" Bom trabalho, você descreveu o projeto <b><proj></b> e agora ele encontra-se disponível para equipes de desenvolvedores candidate-se para o projeto.Você vai receber notificações por email e por aqui no portal informando se alguma equipe ficou interessado por seu projeto.","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: [<proj>] Propostas Recebidas","msg":"Boas notícias, você recebeu alguma proposta do projeto <b><proj></b>. Verifique todas as propostas clicando em <b><a href='/propostas_projeto'>VISUALIZAR PROPOSTA(S)</a></b>.","icon":"fa fa-envelope bg-blue","date":"","time":""},
				   {"title":"Project Marketplace: [<proj>] Desenvolvimento","msg":"Muito bem, agora a brincadeira vai ficar seria, a equipe de desenvolvimento vai entrar em contato por email para esclarecer alguma eventual dúvida, eles estão trabalhando no desenvolvimento de um documento com as principais funcionalidades do sistema, o <b>TERMO DE ABERTURA</b>","icon":"fa fa-envelope bg-blue","date":"","time":""}
				  ]*/


	var msgsTimeline = [];

	var titulo = null;
	var msg = null;
	var icon = null;
	var date = null;
	var time = null;
	var dataMsg = null;

	for(var i=0; i<msgs.length; i++){
		var titulo = msgs[i].tituloMensagem
		var msg = msgs[i].mensagem;
		var icon = msgs[i].icon;
		dataMsg = new Date(msgs[i].dataHora)
		var date = dataMsg.getDate()+" de "+meses[dataMsg.getMonth()]+" de "+dataMsg.getFullYear();
		var time = (dataMsg.getHours()<10?'0':'') + dataMsg.getHours()+":"+(dataMsg.getMinutes()<10?'0':'') + dataMsg.getMinutes();;

		var msgTimeline = {"title":titulo,"msg":msg,"icon":icon,"date":date,"time":time};

		msgsTimeline.push(msgTimeline);

	}

	callback(msgsTimeline);

}


module.exports = function(){
  return timeLineAnalisador;
}