ONG.centrocustoRest = new Object();

$(document).ready(function(){
	
	ONG.centrocustoRest.inserir = function(config){
		ONG.ajax.post({
			url : ONG.contextPath+"/rest/centroCusto/",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.centrocustoRest.pesquisarNome = function(config){
//		url : "rest/pessoas/pesquisarNome?nome="+config.data.valor1 + "&tipo=" + config.data.valor2 ,
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/centroCusto/nome/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.centrocustoRest.pesquisarId = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/centroCusto/id/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.centrocustoRest.excluir = function(config){
		ONG.ajax.delet({
			url : ONG.contextPath+"/rest/centroCusto/id/"+config.data ,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.centrocustoRest.editar = function(config){
		ONG.ajax.put({
			url : ONG.contextPath+"/rest/centroCusto",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
});
