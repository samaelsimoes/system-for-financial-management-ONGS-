ONG.fluxoCaixaRest = new Object();

$(document).ready(function(){
	
	ONG.fluxoCaixaRest.inserir = function(config){
		ONG.ajax.post({
			url : ONG.contextPath+"/rest/operacao/",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.fluxoCaixaRest.pesquisarNome = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/operacao/nome/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.fluxoCaixaRest.pesquisarId = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/operacao/id/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.fluxoCaixaRest.excluir = function(config){
		ONG.ajax.delet({
			url : ONG.contextPath+"/rest/operacao/id/"+config.data ,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.fluxoCaixaRest.editar = function(config){
		ONG.ajax.put({
			url : ONG.contextPath+"/rest/operacao",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.fluxoCaixaRest.pesquisarPeriodoCC = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/operacao/periodo/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	ONG.fluxoCaixaRest.pesquisarCC = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/operacao/centroCusto/"+config.data,
			success : config.success,
			error : config.error
		});
	};
});
