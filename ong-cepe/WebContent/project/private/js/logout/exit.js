logout = new Object();
saindo = {};

$(document).ready(function(){
	logout.sair = function() {
		$.getScript("../resource/js/ajax.js", function(){
			logout.saindo();
		});
	};
	
	logout.saindo = function() {		
		logout.saindo();
	};

	logout.saindo = function() {
		
	   logout.saindo();
	};

	logout.saindo = function() {
		
		$.ajax({	
            type:"POST",				
            url: ONG.contextPath + "/LogoutServlet",              
            success: function(msg){
            	var dialog = bootbox.dialog({
    			    title: 'Saindo do sistema',
    			    message: '<p><i class="fa fa-spin fa-spinner"></i> Carregando...</p>'
    			});
            	dialog.init(function(){
    	            setTimeout(function(){
    	            	dialog.find('.bootbox-body').html("Saindo do sistema");  
    	            }, 3000);
    	        });
            	
            	var intervalo = window.setInterval(function() {	}, 50);
            	window.setTimeout(function() {	
            	    clearInterval(intervalo);
        			$(location).attr('href', '../../' );
            	}, 5000);
            },       
            error: function(err){
        		console.log(err);
            	bootbox.alert("Login Invalido ! " );
            }
    	});	
	};
});
