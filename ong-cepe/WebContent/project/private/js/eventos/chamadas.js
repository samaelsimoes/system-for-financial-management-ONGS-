$(document).ready(function(){
	
	$('#header').load('header.html');
	$('#footer').load('footer.html');
	$('#eventos').load('formulario/eventos/searchAll/gridEvento.html');
});

/*var items = document.querySelector('#tipoevento');

items.addEventListener('change', function(){
	
	var valor =	this.value // o valor que procuras é: this.value

	if(valor == 0) {	
		
		$('#eventos').load('formulario/eventos/gridEvento');
	}/* else if(valor == 1 ) {
		
		$('#eventos').load('formulario/eventos/');
	}else if( valor == 2){
		$('#eventos').load('formulario/eventos/');
	}
});*/
/*
var items = document.querySelector('#typeevent');

items.addEventListener('change', function(){
	
	var valor =	this.value // o valor que procuras é: this.value
	
	if(valor != 1){
		$('#remove').val().removeClass('custom-remove')
	}else{
		$('#remove').val().addClass('custom-remove')
	}
});*/