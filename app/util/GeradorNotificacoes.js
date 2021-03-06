
/**
  NOTIFICAÇÕES DO CLIENTE
**/
var modelarProjeto = '[{ "mensagem":"Você precisa modelar um projeto", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var disporProjeto = '[{ "mensagem":"Você precisa disponibilizar o projeto <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var equipeCandidata = '[{ "mensagem":"Equipe <> se candidatou ao seu projeto <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var analisarTermoAbertura = '[{ "mensagem":"Você precisa analisar o Termo de Abertura do projeto <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var recusarTermoAbertura = '[{ "mensagem":"Você recusou o Termo de Abertura do projeto da equipe <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var aprovarTermoAbertura = '[{ "mensagem":"Você aprovou o termo de abertura, projeto <> está em andamento", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var desenvolverProjeto = '[{ "mensagem":"Você precisa modelar um projeto", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';

/**
  NOTIFICAÇÕES DO DESENVOLVEDOR

**/
var semEquipe = '[{ "mensagem":"Você precisa se vincular a uma equipe", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var conviteRecebido = '[{ "mensagem":"Equipe <> te convidou para ser membro", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var solicitacaoEnviada = '[{ "mensagem":"Equipe <> recebeu sua solicitação", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var vinculoEquipe = '[{ "mensagem":"Agora, você é membro da equipe <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var solicitacaoRecusada = '[{ "mensagem":"Equipe <> recusou sua solicitação", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var conviteRecusado =  '[{ "mensagem":"Você recusou a solicitação da equipe <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var tutorVinculado =  '[{ "mensagem":"Tutor <> está vinculado a sua equipe <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';

/**
  NOTIFICAÇÕES DO TUTOR

**/

var semEquipeTutor = '[{ "mensagem":"Você precisa se vincular a uma equipe", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var conviteRecebidoTutor = '[{ "mensagem":"Equipe <> te convidou para ser tutor", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var solicitacaoEnviadaTutor = '[{ "mensagem":"Equipe <> recebeu sua solicitação", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var vinculoEquipeTutor = '[{ "mensagem":"Agora, você é tutor da equipe <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var solicitacaoRecusadaTutor = '[{ "mensagem":"Equipe <> recusou sua solicitação", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';
var conviteRecusadoTutor =  '[{ "mensagem":"Você recusou a solicitação da equipe <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';


/**
  ARRAY DE NOTIFICAÇÕES DO PROJETO
**/

var notificacoesProjeto = '[{ "mensagem":"Você precisa disponibilizar o projeto <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"},{ "mensagem":Equipe <> vinculada ao projeto <>", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"},{ "mensagem":"É preciso acordar o termo de abertura com a equipe", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"},{ "mensagem":"Termo de abertura aprovado", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}, { "mensagem":"Projeto <> está em desenvolvimento", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}, { "mensagem":"Projeto encerrado", "link":"/modelar_projeto", "tipo":"fa-warning text-yellow", "novo":"true"}]';

function GeradorNotificacoes(){

}

GeradorNotificacoes.prototype.obterNotificacaoModelarProjeto = function(callback){
  callback(JSON.parse(modelarProjeto));
}

GeradorNotificacoes.prototype.gerarNotificacoesStatusProjeto = function(projetos, callback){

    var notificacoes = [];
    var pendencia = false;

    for(var i=0; i<projetos.length; i++){
      var projeto = projetos[i];
      for(var j=0; j<notificacoes.length; j++){
        var campoProjeto = projeto[j];
        if(campoProjeto == 1){
          notificacoes.push(notificacoesProjeto[j]);
          pendencia = true;
          break;
        } else if(campoProjeto === 3){

        }
      }
      if(pendencia){
        break;
      }

    }

    return notificacoes;
}

module.exports = function(){
  return GeradorNotificacoes;
}
