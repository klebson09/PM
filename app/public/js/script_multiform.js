//jQuery time

//console.log("ops cheguei no script_multiform");

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating;
var currentTab=0;
var msgs = new Array();//flag to prevent quick multi-click glitches
//verifica cpf_cnpj se são validos ou não

function validarCamposEtapa(current_fs){
	var valido = true;
	var currentFieldset = current_fs.get(0);
	var inputs = currentFieldset.getElementsByClassName("validar");
	var inputEmail = document.getElementById("email");
	var cpf_cnpj = currentFieldset.getElementsByClassName("cpf_cnpj")[0];
	var senha = currentFieldset.getElementsByClassName("validarSenha");
	var csenha = currentFieldset.getElementsByClassName("validarSenha");
	var i = 0;
	var j = 0;

	//Validando se os campos obrigatórios estão vazios
	for(i=0;i<inputs.length;i++){
		if(!validarCampoEstaVazio(inputs[i])){
			valido = false;
			invalidarCampo(inputs[i]);
			msgs.push(inputs[i].getAttribute("placeholder")+" está vazio!");
		} else {
			validarCampo(inputs[i]);
		}
		console.log(inputs[i].name+" --> "+inputs[i].value);
	}
	//Validando se o usuário preencheu pelo menos um email e se o email é valido

	//	if(inputsEmail[0] != undefined && inputsEmail[1] != undefined){
	if(naoTemEmail(inputEmail)){
			valido = false;
		msgs.push("É necessário informar o email");
	} else{
		if(!validarEmail(inputEmail)){
			valido = false;
			msgs.push("Email inválido");
		}
	}


//Validando CPF_CNPJ

if(cpf_cnpj != undefined){
	if(cpf_cnpj.value != ''){
		console.log('@@@@@ ----cpf_cnpj.value -- @@@@@@ '+ cpf_cnpj.value);
		if (!valida_cpf_cnpj(cpf_cnpj.value) ){
			valido = false;
			msgs.push(cpf_cnpj.getAttribute("placeholder")+" está inválido!");
		}
	}
}


if(!valido){
	exibirMensagemErro();
}
return valido;
}

function validarCampoEstaVazio(input){
	return input.value != '';
}


function naoTemEmail(inputEmail){
	return inputEmail.value == '';
}

function validarSenha(senha, csenha){

	if(senha != undefined && csenha != undefined){
		if(senha.value != csenha.value){
			msgs.push("Senha não corresponde ao valor da senha confirmada!");
			return false;
		} else {
			return true;
		}
	}
}

// Validar CPF

$('.cpf_cnpj').blur(function(){

	// O CPF ou CNPJ

	var cpf_cnpj = $(this).val();

	// Testa a validação

	if (valida_cpf_cnpj(cpf_cnpj) ){

		if($(this).hasClass("error")){

			$(this).removeClass("error");

		}

	}else{

		if(cpf_cnpj == ''){

			//alert("deu bronca aqui era pra exibir");

			msgs.push($(this).attr("placeholder")+" está vazio!");

			exibirMensagemErro();

		}else{

			//var erro_valida_cpf_cnpj = 'CPF ou CNPJ inválido!';

			msgs.push($(this).attr("placeholder")+" está inválido!");

			//msgs.push(inputs[i].getAttribute("placeholder")+" está vazio!");

			exibirMensagemErro();

		}



		$(this).addClass("error");

	}

});



//Validar email

function validarEmail(field){
	var usuario = field.value.substring(0, field.value.indexOf("@"));
	var dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);

	if(usuario != '' && dominio != ''){

		if ((usuario.length >=1) &&
		(dominio.length >=3) &&
		(usuario.search("@")==-1) &&
		(dominio.search("@")==-1) &&
		(usuario.search(" ")==-1) &&
		(dominio.search(" ")==-1) &&
		(dominio.search(".")!=-1) &&
		(dominio.indexOf(".") >=1) &&
		(dominio.lastIndexOf(".") < dominio.length - 1)) {
			return true;
		}
		else{
			return false;
		}
	} else{
		return false;
	}
}



//Validar se pelo menos um email está preenchido



function exibirMensagemErro(){

	var divMsg = document.getElementById("msg");
	var ul = document.createElement("ul");
	var msgBox = document.createElement("div");
	var btnClose = document.createElement("button");
	var h4 = document.createElement("h4");
	var i = document.createElement("i");
	var alert = document.createTextNode("Dados Inválidos");
	var close = document.createTextNode("x");

	var j=0;

	//Lista de erros

	for(j=0;j<msgs.length;j++){
		var li = document.createElement("li");
		var txt = document.createTextNode(msgs[j]);
		li.append(txt)
		ul.append(li);
	}



	msgBox.classList.add("alert");
	msgBox.classList.add("alert-danger");
	msgBox.classList.add("alert-dismissable");
	msgBox.classList.add("slider");
	msgBox.style.zIndex = "1";
	msgBox.style.width = "400px";
	msgBox.style.position = "absolute";

	msgBox.style.marginLeft = "40%";



	btnClose.classList.add("close");

	btnClose.setAttribute("data-dismiss","alert");

	btnClose.setAttribute("aria-hidden","true");

	btnClose.setAttribute("onclick","fecharMsg()");





	i.classList.add("icon");

	i.classList.add("fa");

	i.classList.add("fa-ban");



	h4.append(i);

	h4.append(alert);



	btnClose.append(close);



	msgBox.append(btnClose);

	msgBox.append(h4);



	msgBox.append(ul);



	divMsg.append(msgBox);



	$("#msg").animate({bottom:75}, 250, function() {

		$("#msg").css("display", "block");

		$("#msform").css("opacity", 0.4);

		$("#msg").removeAttr('style');

	});



}



function fecharMsg(){
	$("#msg").css("display", "none");
	$("#msform").css("opacity", 1);
	msgs = [];
}

//borda vermelha em cada campo

function invalidarCampo(campo){
	campo.classList.add("error");
}



function validarCampo(campo){
	if(campo.classList.contains("error")){
		campo.classList.remove("error");
	}
}

$(".next").click(function(){
	console.log("OPAAAA O/");
	//	if(animating) return false;
	animating = true;
	current_fs = $(this).parent();
	console.log(current_fs);
	next_fs = $(this).parent().next();
	console.log(next_fs);
	var validado = validarCamposEtapa(current_fs);

	if(validado){
		console.log("Validado");
		document.getElementById("emailLabel").setAttribute("value", document.getElementById("email").value);
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		//show the next fieldset

		next_fs.show();
		//hide the current fieldset with style

		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";

				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;

				current_fs.css({'transform': 'scale('+scale+')'});
				next_fs.css({'left': left, 'opacity': opacity});
			},
			duration: 800,
			complete: function(){
				current_fs.hide();
				animating = false;
			},

			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
		currentTab++;
	} else {
		console.log("Inválido");
	}

});
$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();

	previous_fs = $(this).parent().prev();



	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");



	//show the previous fieldset

	previous_fs.show();

	//hide the current fieldset with style

	current_fs.animate({opacity: 0}, {

		step: function(now, mx) {

			//as the opacity of current_fs reduces to 0 - stored in "now"

			//1. scale previous_fs from 80% to 100%

			scale = 0.8 + (1 - now) * 0.2;

			//2. take current_fs to the right(50%) - from 0%

			left = ((1-now) * 50)+"%";

			//3. increase opacity of previous_fs to 1 as it moves in

			opacity = 1 - now;

			current_fs.css({'left': left});

			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});

		},

		duration: 800,

		complete: function(){

			current_fs.hide();

			animating = false;

		},

		//this comes from the custom easing plugin

		easing: 'easeInOutBack'

	});



	currentTab--;



	//de-activate current step on progressbar



});



$(".submit").click(function(){

	console.log("estou perturbando auqi mo vei o/o/o/o");



	current_fs = $(this).parent();



	var senha = document.getElementById("senha")

	var csenha = document.getElementById("csenha")



	var validado = validarSenha(senha, csenha);



	if(!validado){

		console.log("preventDefault");

		exibirMensagemErro();

	} else {

		$('#msform').submit();

	}





	return "/criar_equipe_post";

})


function addMembro(){

	var membro = document.getElementById("txtFieldAddMembroEq").value;


}
