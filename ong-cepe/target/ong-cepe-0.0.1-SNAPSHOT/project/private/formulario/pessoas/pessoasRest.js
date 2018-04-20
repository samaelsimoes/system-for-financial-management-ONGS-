ONG.pessoaRest = new Object();

$(document).ready(function(){
	
	ONG.pessoaRest.inserir = function(config){
		ONG.ajax.post({
			url : ONG.contextPath+"/rest/pessoa/",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.pessoaRest.pesquisarNome = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/pessoa/nome/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.pessoaRest.pesquisarTipo = function(config){
		ONG.ajax.get({
			url: ONG.contextPath + "/rest/pessoa/tipo/" + config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.pessoaRest.pesquisarId = function(config){
		ONG.ajax.get({
			url : ONG.contextPath+"/rest/pessoa/id/"+config.data,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.pessoaRest.excluir = function(config){
		ONG.ajax.delet({
			url : ONG.contextPath+"/rest/pessoa/idexcluir/"+config.data ,
			success : config.success,
			error : config.error
		});
	};
	
	ONG.pessoaRest.editar = function(config){
		ONG.ajax.put({
			url : ONG.contextPath+"/rest/pessoa",
			data : config.data,
			success : config.success,
			error : config.error
		});
	};
	
});