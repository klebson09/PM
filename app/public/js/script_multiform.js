/*
Orginal Page: http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar

*/
//jQuery time
//console.log("ops cheguei no script_multiform");
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating;
var currentTab=0; //flag to prevent quick multi-click glitches

function validarCamposEtapa(current_fs){
	var valido = true;
	var msgs = new Array();
	var currentFieldset = current_fs.get(0);
	var inputs = currentFieldset.getElementsByClassName("validar");
  var i = 0;
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

	if(!valido){
		 exibirMensagemErro(msgs);
	}

	return valido;
}

function validarCampoEstaVazio(input){
	return input.value != '';
}

function exibirMensagemErro(mensagens){
	var divMsg = document.getElementById("msg");
	var ul = document.createElement("ul");
	var msgBox = document.createElement("div");
	var btnClose = document.createElement("button");
	var h4 = document.createElement("h4");
	var i = document.createElement("i");
	var alert = document.createTextNode("Dados Inválidos");
	var close = document.createTextNode("x");

	var j=0;

	for(j=0;j<mensagens.length;j++){
		var li = document.createElement("li");
		var txt = document.createTextNode(mensagens[j]);
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
    $("#msform").css("opacity", 0.4);
		$("#msg").removeAttr('style');
});

}

function fecharMsg(){
	var divMsg = $("msg");
	divMsg.display = 'block';
	$("#msform").css("opacity", 1);
}

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

	var validado = validarCamposEtapa(current_fs);

	if(!validado){
		console.log("preventDefault");
	} else {
		$('#msform').submit();
	}


	return "/criar_equipe_post";
})

function addMembro(){
	var membro = document.getElementById("txtFieldAddMembroEq").value;


	window.alert(membro);
}
