ONG.login = new Object();
ONG.entrada = {};

$(document).ready(function(){
	$(document).keypress(function(e) {
		if(e.which == 13) {
			ONG.login.entrada();
		}
	});
		
	ONG.login.entrada = function() {

		// do something in the background			

		var msg= "";
		
		msg += ONG.login.valida("Campo Login ", $("#login").val());
		msg += ONG.login.valida("Campo Senha ", $("#senha").val());
		
		var criptbase64=btoa($("#senha").val());
		$("#passwordhidden").val(criptbase64);
		
		msg += ONG.login.valida("Campo Senha ", $("#passwordhidden").val());
		
		if(msg == "") {
			
			var dialog = bootbox.dialog({
			    title: 'Verificando informações',
			    message: '<p><i class="fa fa-spin fa-spinner"></i> Carregando...</p>'
			});
			
			$.ajax({	
                type:"POST",				
                url: ONG.contextPath + "/LoginServlet",  
                data: $("#formularioLogin").serialize(),
                
                success: function(msg){
                	
                	dialog.init(function(){
                	    setTimeout(function(){
                	        dialog.find('.bootbox-body').html('Login Realizado com sucesso!');
                	    }, 3000);
                	});       			

                	var intervalo = window.setInterval(function() {	}, 50);

                	window.setTimeout(function() {	
                	    clearInterval(intervalo);
            			$(location).attr('href', '..' + msg.acesso );
                	}, 4000);
                },
                
                error: function(err){
                	
                	dialog.init(function(){
                	    setTimeout(function(){
                	        dialog.find('.bootbox-body').html('Login Invalido!');
                	    }, 3000);
                	});                	
                	
                }
        	});	
		}else{
			bootbox.alert(msg);
		}
	}
	
	ONG.login.valida = function(campo, valor){
		var msg = "";
		if(valor == null ||  valor.trim() == ""){
			msg += " O campo: " + campo + " Está Vazio. </br>";
		}
		return msg;
	};
});
