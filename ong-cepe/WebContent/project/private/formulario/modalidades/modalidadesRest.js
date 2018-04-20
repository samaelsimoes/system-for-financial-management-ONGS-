ONG.modalidadeRest = new Object();

$(document).ready(function(){
	
	ONG.modalidadeRest.inserir = function(config){
		ONG.ajax.post({
			url : ONG.contextPath+"/rest/modalidade/",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.modalidadeRest.pesquisarNome = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/modalidade/nome/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.modalidadeRest.pesquisarId = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/modalidade/id/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.modalidadeRest.excluir = function(config){
		ONG.ajax.delet({
			url : ONG.contextPath+"/rest/modalidade/"+config.data ,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.modalidadeRest.editar = function(config){
		debugger
		ONG.ajax.put({
			
		
			url : ONG.contextPath+"/rest/modalidade",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
});
