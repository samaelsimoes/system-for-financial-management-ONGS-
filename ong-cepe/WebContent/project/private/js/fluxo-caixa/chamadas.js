$(document).ready(function(){
	
	$('#header').load('header.html');
	
	$('#fluxoCaixa').load('formulario/fluxo-caixa/gridFluxoCaixa.html');

	
	$('#footer').load('footer.html');
});
//var items = document.querySelector('#tipoCC');

//items.addEventListener('change', function(){
//	
//	var valor =	this.value // o valor que procuras é: this.value
//	console.log(valor);
//	if(valor == 0) {	
//		
//		$('#fluxoCaixa').load('formulario/fluxo-caixa/gridFluxoCaixa.html');
//	}/* else if(valor == 1 ) {
//		
//		$('#eventos').load('formulario/eventos/');
//	}else if( valor == 2){
//		$('#eventos').load('formulario/eventos/');
//	}*/
//});