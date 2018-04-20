ONG.fluxoCaixa = new Object();
$(document).ready(function(){
	
	ONG.fluxoCaixa.buscarFluxo = function(listFluxo){
		var html = "<table id='tabela' class='tablesorter table table-responsive custom-table-margin-b'>";
		html += "<thead class='table table-striped '>" +
					"<tr>" +					
						"<th> Centro de Custo </th> " +
						"<th> Tipo </th>" +
						"<th> Data </th>" +
						"<th> Classificação </th>" +
						"<th> Pessoa </th>" +
						"<th> Evento </th>" +
						"<th> Destino </th>" +
						"<th class='col-md-2'> Descrição </th>" +
						"<th> Valor </th>" +
						"<th actions col-md-2> Ações</th>" +
					"</tr>" +
				"</thead>"+
				"<tbody>";
		    if ( listFluxo != undefined && listFluxo.length > 0 && listFluxo[0].id != undefined ) {
			  	for(var i = 0; i < listFluxo.length; i++){
					html += "<tr>";					
					html += "<td>" + listFluxo[i].centroCusto.nome + "</td>";
					
						if(listFluxo[i].tipo == 0){			//TIPO
							html += "<td>Entrada</td>";
						}else if(listFluxo[i].tipo == 1){
							html += "<td>Saída</td>";
						}else if(listFluxo[i].tipo == 2){
							html += "<td>Transferência</td>";
						}
						
						html += "<td>" + listFluxo[i].data.substring(0,10) + "</td>";
						
						if(listFluxo[i].classificacao == 0){ //CLASSIFICAÇÃO
							html += "<td>Compra</td>";
						}else if(listFluxo[i].classificacao == 1){
							html += "<td>Venda</td>";
						}else if(listFluxo[i].classificacao == 2){
							html += "<td>Doação</td>";
						}else if(listFluxo[i].classificacao == 3){
							html += "<td>Custo Operacional</td>";
						}else if(listFluxo[i].classificacao == 4){
							html += "<td>Patrocínio</td>";
						}
						
						if(listFluxo[i].pessoa == null || listFluxo[i].pessoa == undefined){
							html += "<td></td>";
						}else if(listFluxo[i].pessoa != null && listFluxo[i].pessoa != undefined){
							html += "<td>" + listFluxo[i].pessoa.nome + "</td>";
						}
						
						if(listFluxo[i].evento == null || listFluxo[i].evento == undefined){
							html += "<td></td>";
						}else if(listFluxo[i].evento != null && listFluxo[i].evento != undefined){
							html += "<td>" + listFluxo[i].evento.nome + "</td>";
						}
						
						if(listFluxo[i].centroCustoDestino == null || listFluxo[i].centroCustoDestino == undefined){
							html += "<td></td>";
						}else if(listFluxo[i].centroCustoDestino != null && listFluxo[i].centroCustoDestino != undefined){
							html += "<td>" + listFluxo[i].centroCustoDestino.nome + "</td>";
						}
						
						html += "<td><p class='small'>" + listFluxo[i].descricao + "</p></td>";
						html += "<td>" + "R$ " + parseFloat(listFluxo[i].valor).toFixed(2).replace('.',',') + "</td>";
						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.fluxoCaixa.modaledit("+listFluxo[i].id+")'>Editar</button>"+
//									"<button type='button'class='btn btn-trash' onclick='ONG.fluxoCaixa.confExcluir("+listFluxo[i].id+")'>Excluir</button>"+
								"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listFluxo == undefined || (listFluxo != undefined && listFluxo.length > 0)){
			    	ONG.fluxoCaixaRest.pesquisarNome({
						data : "*",
						success: function(listFluxo){													
							ONG.fluxoCaixa.buscarFluxo(listFluxo);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar informações de Fluxo de caixa, entrar em contato com o Administrador se o problema persistir!");
						}
					});						    
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		    }
		html +="</tbody>";		    
		html +="</table>";
		$("#resuAllEvents").html(html);
		$(function(){$.tablesorter.addParser({id:'datetime',is:function(s){return false;},format:function(s,table){s=s.replace(/\-/g,"/");s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");return $.tablesorter.formatFloat(new Date(s).getTime());},type:'numeric'});
		$('#tabela').tablesorter({
			headers:{
				7:{sorter:false},
				2:{sorter:'datetime'},
				9:{sorter: false}
			},
			dateFormat:'dd/mm/yyyy'
		});
	});
	};
	ONG.fluxoCaixa.buscarFluxo(undefined);

	ONG.fluxoCaixa.pesquisar = function(){
		var cc = $("#tipoCC").val();
		var de = $("#datade").val();
		var ate = $("#dataate").val();
		
		
		if(cc == "" && de == "" && ate == ""){
			ONG.fluxoCaixa.buscarFluxo(undefined);
		} else if(cc != "" && de == "" && ate == ""){
	    	ONG.fluxoCaixaRest.pesquisarCC({
				data : cc,
				success: function(listPesq){													
				    ONG.fluxoCaixa.buscarFluxo(listPesq);
				},
				error: function(err){							
					bootbox.alert("Erro ao pesquisar, entrar em contato com o Administrador se o problema persistir!");
				}
	    	});
		} else if(cc != "" || de != "" || ate != ""){
			if(de == "" || ate == ""){
				bootbox.alert("Informe o Período (De e Até)");
				return false;
			}
			
			var d = new Date(de.split("-").join("/"));
			de = d.getTime();
			d = new Date(ate.split("-").join("/"));
			ate = d.getTime();
			
	    	ONG.fluxoCaixaRest.pesquisarPeriodoCC({
				data : de+"/"+ate+"/"+parseInt(cc),
				success: function(listPesq){													
				    ONG.fluxoCaixa.buscarFluxo(listPesq);
				},
				error: function(err){							
					bootbox.alert("Erro ao pesquisar, entrar em contato com o Administrador se o problema persistir!");
				}
			});	
		}
	};
	
    //CHANGE DO FILTRO CENTRO DE CUSTO
	$(document).on('change','#tipoCC',function(){
		var idCC = $("#tipoCC").val();
		var de = $("#datade").val();
		var ate = $("#dataate").val();
		
		if (de != "" || ate != "" ){
			ONG.fluxoCaixa.pesquisar();
			return false;
		}
		
		if(idCC == ""){
		    ONG.fluxoCaixa.buscarFluxo(undefined);
		}else{
	    	ONG.fluxoCaixaRest.pesquisarCC({
				data : idCC,
				success: function(listPesq){													
				    ONG.fluxoCaixa.buscarFluxo(listPesq);
				},
				error: function(err){							
					bootbox.alert("Erro ao pesquisar, entrar em contato com o Administrador se o problema persistir!");
				}
			});
		}
    });
	
	ONG.fluxoCaixa.addFluxo = function () {
		var msg = "";
		msg += ONG.fluxoCaixa.validaVazio("Tipo: ", $("#tipofluxoadd").val());
		msg += ONG.fluxoCaixa.validaVazio("Centro Custo: ", $("#centrocusto2").val());		
		msg += ONG.fluxoCaixa.validaVazio("Data: ", $("#data").val());
		msg += ONG.fluxoCaixa.validaVazio("Classificação: ", $("#classificacao").val());
		msg += ONG.fluxoCaixa.validaVazio("Valor: ", $("#valor").val());
		msg += ONG.fluxoCaixa.validaVazio("Descricao: ", $("#descricao").val());
		if($("#tipofluxoadd").val() == 2){
			msg += ONG.fluxoCaixa.validaVazio("Destino Centro de Custo: ", $("#centrodecusto3").val());
		}
		
		if ( msg == "") {
			if($("#centrocusto2").val() == $("#centrodecusto3").val()){
				bootbox.alert("Centro de Custo Destino é igual ao Origem");
				return false;
			}
			var date = $("#data").val();
			var d = new Date(date.split("-").join("/"));
			var dadosFluxo = {
				data: d.getTime(),
	            tipo: $("#tipofluxoadd").val(),
	            classificacao: $("#classificacao").val(),
	            valor: $("#valor").val(),
	            descricao: $("#descricao").val(),
	            centroCusto:{
	            	id: parseInt($("#centrocusto2").val())
	            },
	            usuario:{
	            	id: parseInt(getCookie("id"))
	            }
			};
			debugger;
			if(dadosFluxo.tipo == parseInt(2)){
				if($("#centrodecusto3").val() != ""){
					dadosFluxo.centroCustoDestino = {id: parseInt($("#centrodecusto3").val())};
				}
			}else {
				dadosFluxo.centroCustoDestino = null;
			}
			if($("#evento").val() != ""){
				dadosFluxo.evento = {id: parseInt($("#evento").val())};
			}else {
				dadosFluxo.evento = null;
			}			
			if($("#pessoa").val() != ""){
				dadosFluxo.pessoa = {id: parseInt($("#pessoa").val())};
			}else {
				dadosFluxo.pessoa = null;
			}
			
			ONG.fluxoCaixaRest.inserir({
				data : dadosFluxo,
				success: function(msg){	
					bootbox.alert(msg);
					ONG.fluxoCaixa.pesquisar();
					$('input').val('');
					$('textarea').val('');					
					$('#modaladd').modal('toggle');
				},
				error: function(err){							
					bootbox.alert("Erro" + err);
				}
			});			
		}else{
			bootbox.alert(msg);
		}
	}
	
	ONG.fluxoCaixa.validaVazio = function ( campo, valor ) {
        var msg = "";
        if(valor == null || valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
    ONG.fluxoCaixa.validaCampos = function(){
    	var exp = "";
        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
    	return exp;
    };
        
    ONG.fluxoCaixa.buscacustofiltro = function() {
    	ONG.centrocustoRest.pesquisarNome({
			data : "*",
			success: function(lcenter){							
				ONG.fluxoCaixa.montaSelect(lcenter);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca do centro de custo:"+err.responseText);
			}
		});
    }
    
    ONG.fluxoCaixa.montaSelect = function(listaCentroCusto) {
    	if(listaCentroCusto != undefined && listaCentroCusto.length > 0 && listaCentroCusto[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCentroCusto.length; i++) {
				var option = $( "<option></option>" ).appendTo($('#tipoCC'));
				option.attr( "value", listaCentroCusto[i].id );
				option.html( listaCentroCusto[i].nome );
			}

			var itemsedit2 = document.querySelector('#tipoCC');
			itemsedit2.addEventListener('change', function(){
				var valor2 =	this.value // o valo
			});
		}
    }


    ONG.fluxoCaixa.buscaCusto = function() {
    	ONG.centrocustoRest.pesquisarNome({
			data : "*",
			success: function(lcenter){							
				ONG.fluxoCaixa.montaSelectcentrocust(lcenter);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca do centro de custo:"+err.responseText);
			}
		});
    }
    ONG.fluxoCaixa.montaSelectcentrocust = function(listaCentroCusto){
    	var option = '';
    	$('#centrocusto2').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#centrocusto2')); 
    	if(listaCentroCusto != undefined && listaCentroCusto.length > 0 && listaCentroCusto[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCentroCusto.length; i++) {
				option = $( "<option></option>" ).appendTo($('#centrocusto2'));
				option.attr( "value", listaCentroCusto[i].id );
				option.html( listaCentroCusto[i].nome );
			}

			var item1 = document.querySelector('#centrocusto2');
			item1.addEventListener('change', function(){
				var valor1 = this.value // o valo
			});
			
	    	var option = '';
	    	$('#centrodecusto3').find('option').remove();
			option = $( "<option value=''>Selecione</option>" ).appendTo($('#centrodecusto3')); 
			for(var i = 0; i < listaCentroCusto.length; i++) {
				option = $( "<option></option>" ).appendTo($('#centrodecusto3'));
				option.attr( "value", listaCentroCusto[i].id );
				option.html( listaCentroCusto[i].nome );
			}

			var item2 = document.querySelector('#centrodecusto3');
			item2.addEventListener('change', function(){
				var item2 =	this.value // o valo
			});
		}
    }
    ONG.fluxoCaixa.buscaEventos = function() {
    	var cfg = {
			url: ONG.contextPath + "/rest/evento/nome/*",
			success: function(bevento){							
				ONG.fluxoCaixa.montaselectevento(bevento);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de evento:"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxoCaixa.montaselectevento = function(listevn) {
    	var option = '';
    	$('#evento').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#evento'));
    	if(listevn != undefined && listevn.length > 0 && listevn[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listevn.length; i++) {
				option = $( "<option></option>" ).appendTo($('#evento'));
				option.attr( "value", listevn[i].id );
				option.html( listevn[i].nome );
			}

			var item1 = document.querySelector('#evento');
			item1.addEventListener('change', function(){
				var valor1 = this.value // o valo
			});
    	}
    }
    ONG.fluxoCaixa.buscaPes = function() {
    	
    	var cfg = {
			url: ONG.contextPath + "/rest/pessoa/nome/*",
			success: function(listapessoa){							
				ONG.fluxoCaixa.montaselectpessoas(listapessoa);
			},
			error: function(err){	
				bootbox.alert("Erro ao buscar Pessoas"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxoCaixa.montaselectpessoas = function(listapessoa) {
    	var option = '';
    	$('#pessoa').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#pessoa'));
    	if(listapessoa != undefined && listapessoa.length > 0 && listapessoa[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listapessoa.length; i++) {
				option = $( "<option></option>" ).appendTo($('#pessoa'));
				option.attr( "value", listapessoa[i].id );
				option.html( listapessoa[i].nome );
			}

			var item1 = document.querySelector('#pessoa');  
			item1.addEventListener('change', function(){
				var valor1 = this.value // o valo
			});
			
    	}
    }
    
    //Excluir    
    ONG.fluxoCaixa.confExcluir = function(id){
		ONG.fluxoCaixaRest.excluir({
			data : id,
			success: function(msg){							
				bootbox.alert(msg);
				setTimeout(function(){
   	    	         location.reload();
   	    	    }, 2000);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de pessoas:"+err.responseText);
			}
		});
    }
    
    // ---------------------------------= = = = = = EDITAR
    
    ONG.fluxoCaixa.buscID = function(id){
		ONG.fluxoCaixaRest.pesquisarId({
			data : id,
			success: function(dados){									
	    		ONG.fluxoCaixa.preencheedit(dados);
			},
			error: function(err){							
				bootbox.alert("Erro ao pesquisar Operação por ID"+err.responseText);
			}
		});
    }
    
    ONG.fluxoCaixa.buscaCustoedit = function(){
    	ONG.centrocustoRest.pesquisarNome({
    		data : "*",
    		success: function(lcenter){							
    			ONG.fluxoCaixa.montaselectedcentrocustoedit(lcenter);
    		},
    		error: function(err){	
    			bootbox.alert("Erro ao buscar Centro de Custo"+err.responseText);
    		}
    	});
    }
    ONG.fluxoCaixa.montaselectedcentrocustoedit = function(listCentroCusto){
    	var option = '';
    	$('#centrocustoedit1').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#centrocustoedit1'));
    	if(listCentroCusto != undefined && listCentroCusto.length > 0 && listCentroCusto[0].id != undefined) { // montando meus estados
    		for(var i = 0; i < listCentroCusto.length; i++) {
    			var option = $( "<option></option>" ).appendTo($('#centrocustoedit1'));
    			option.attr( "value", listCentroCusto[i].id );
    			option.html( listCentroCusto[i].nome );
    		}
    		var item1 = document.querySelector('#centrocustoedit1');
    		item1.addEventListener('change', function(){
    			var valor1 = this.value // o valo
    		});   
    		
        	var option = '';
        	$('#centrodecustoedit2').find('option').remove();
    		option = $( "<option value=''>Selecione</option>" ).appendTo($('#centrodecustoedit2'));
    		for(var i = 0; i < listCentroCusto.length; i++) {
    			option = $( "<option></option>" ).appendTo($('#centrodecustoedit2'));
    			option.attr( "value", listCentroCusto[i].id );
    			option.html( listCentroCusto[i].nome );
    		}
    		var item2 = document.querySelector('#centrodecustoedit2');
    		item2.addEventListener('change', function(){
    			var item2 =	this.value // o valo
    		});
    	}
    }
    ONG.fluxoCaixa.buscaEventosEdit = function(){
    	var cfg = {
    			
			url: ONG.contextPath + "/rest/evento/nome/*",
		
			success: function(bevento){							
				ONG.fluxoCaixa.montaselecteventoEdit(bevento);
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de evento:"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxoCaixa.montaselecteventoEdit = function(listevn){
    	var option = '';
    	$('#eventoedit').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#eventoedit'));
    	if(listevn != undefined && listevn.length > 0 && listevn[0].id != undefined) { // montando meus estados
    		for(var i = 0; i < listevn.length; i++) {
    			option = $( "<option></option>" ).appendTo($('#eventoedit'));
    			option.attr( "value", listevn[i].id );
    			option.html( listevn[i].nome );
    		}

    		var item1 = document.querySelector('#eventoedit');
    		item1.addEventListener('change', function(){
    			var valor1 = this.value // o valo
    		});
    	}
    }
    ONG.fluxoCaixa.buscaPesEdit = function(callback){
    	var cfg = {
    			
			url: ONG.contextPath + "/rest/pessoa/nome/*",
		
			success: function(listapessoa){							
				ONG.fluxoCaixa.montaselectpessoaEdit(listapessoa);
				if(callback != undefined)
					callback();
			},
			error: function(err){	
				bootbox.alert("Erro ao realizar busca de pessoas:"+err.responseText);
			}
		};
		ONG.ajax.get(cfg);
    }
    ONG.fluxoCaixa.montaselectpessoaEdit = function(listapessoa){
    	var option = '';
    	$('#pessoaedit').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#pessoaedit'));
    	if(listapessoa != undefined && listapessoa.length > 0 && listapessoa[0].id != undefined) { // montando meus estados
    		for(var i = 0; i < listapessoa.length; i++) {
    			option = $( "<option></option>" ).appendTo($('#pessoaedit'));
    			option.attr( "value", listapessoa[i].id );
    			option.html( listapessoa[i].nome );
    		}

    		var item1 = document.querySelector('#pessoaedit');  
    		item1.addEventListener('change', function(){
    			var valor1 = this.value // o valo
    		});    		
    	}
    }
    ONG.fluxoCaixa.editarFluxo = function(){
    	
    	var msg = "";
		msg += ONG.fluxoCaixa.validaVazio("Tipo: ", $("#tipofluxoedit").val());
		msg += ONG.fluxoCaixa.validaVazio("Centro Custo: ", $("#centrocustoedit1").val());		
		msg += ONG.fluxoCaixa.validaVazio("Data: ", $("#dataedit").val());
		msg += ONG.fluxoCaixa.validaVazio("Classificação: ", $("#classificacaoedit").val());
		msg += ONG.fluxoCaixa.validaVazio("Valor: ", $("#valoredit").val());
		msg += ONG.fluxoCaixa.validaVazio("Descricao: ", $("#descricaoedit").val());
		if($("#tipofluxoadd").val() == 2)
			msg += ONG.fluxoCaixa.validaVazio("Destino Centro de Custo: ", $("#centrodecustoedit2").val());
		
		if(msg == ""){
			if($("#centrocustoedit1").val() == $("#centrodecustoedit2").val()){
				bootbox.alert("Centro de Custo Destino é igual ao Origem");
				return false;
			}
			var date = $("#dataedit").val();
			var d = new Date(date.split("-").join("/"));

			if($("#dataedit").val() != ""){
				eventoedit = $("#evento").val();
			}else {
				eventoedit = null;
			}
			var editFluxo = {
				id: $("#id").val(),					
				data: d.getTime(),
	            tipo: $("#tipofluxoedit").val(),
	            classificacao: $("#classificacaoedit").val(),
	            valor: $("#valoredit").val(),
	            descricao: $("#descricaoedit").val(),
	            centroCusto:{
	            	id: parseInt($("#centrocustoedit1").val())
	            },
	            usuario:{
	            	id: parseInt(getCookie("id"))
	            }
			};
			if(editFluxo.tipo == parseInt(2)){
				if($("#centrodecustoedit2").val() != ""){
					editFluxo.centroCustoDestino = {id: parseInt($("#centrodecustoedit2").val())};
				}
			}else {
				editFluxo.centroCustoDestino = null;
			}
			if($("#eventoedit").val() != ""){
				editFluxo.evento = {id: parseInt($("#eventoedit").val())};
			}else {
				editFluxo.evento = null;
			}			
			if($("#pessoaedit").val() != ""){
				editFluxo.pessoa = {id: parseInt($("#pessoaedit").val())};
			}else {
				editFluxo.pessoa = null;
			}
			ONG.fluxoCaixaRest.editar({
				data : editFluxo,
				success: function(msg){	
					bootbox.alert(msg);
					ONG.fluxoCaixa.pesquisar();
					$('input').val('');
					$('textarea').val('');										
					$('#modaledit').modal('toggle');
				},
				error: function(err){							
					bootbox.alert("Erro ao editar o Fluxo de Caixa");
					console.log(err);
				}
			});
		}else{
			bootbox.alert(msg);
		}
    };
    
    
    
    ONG.fluxoCaixa.modaladd = function(){
    	ONG.fluxoCaixa.buscaCusto();
		ONG.fluxoCaixa.buscaEventos();
		ONG.fluxoCaixa.buscaPes();
    };
    
    ONG.fluxoCaixa.modaledit = function(idFluxo){
		ONG.fluxoCaixa.buscaCustoedit();
		ONG.fluxoCaixa.buscaEventosEdit();
		ONG.fluxoCaixa.buscaPesEdit(function(){
    		ONG.fluxoCaixa.buscID(idFluxo);
    	});
    };
    
    
    ONG.fluxoCaixa.preencheedit = function (dados){
			$("#id").val(dados.id);
			$("#tipofluxoedit").val(dados.tipo);
			$("#centrocustoedit1").val(dados.centroCusto.id);
			$("#dataedit").val(dados.data.substring(0,10).split("/").reverse().join("-"));
			$("#classificacaoedit").val(dados.classificacao);
			$("#valoredit").val(parseFloat(dados.valor).toFixed(2));
			$("#descricaoedit").val(dados.descricao);	

			if(dados.evento != null )
				$("#eventoedit").val(dados.evento.id);
			if(dados.pessoa != null )
				$("#pessoaedit").val(dados.pessoa.id);
			if(dados.centroCustoDestino != null )
				$("#centrodecustoedit2").val(dados.centroCustoDestino.id);
			if(dados.tipo == 2){
				$('#centrodecustoedit2').prop("disabled", false);
			} else {
				$('#centrodecustoedit2').prop("disabled", true);
			} 
			//Conforme alinhado com o prof. Daniel, não pode editar o tipo de Operação
			$('#tipofluxoedit').prop("disabled", true);
			
    };
    
    
 	
    //CHANGE MODAL ADICIONAR
    $(document).on('change','#tipofluxoadd',function(){
		if(parseInt($("#tipofluxoadd").val()) == 2){
			$('#centrodecusto3').prop("disabled", false);
		} else {
			$('#centrodecusto3').prop("disabled", true);
		}    
	});
    $(document).on('change','#valor',function(){
    	var s = String($('#valor').val());
    	if(s.indexOf(",") != -1){
    		$('#valor').val(s.replace(",","."));
    	}
    	$('#valor').val(parseFloat($('#valor').val()).toFixed(2));	
	});
    //CHANGE MODAL EDITAR
    $(document).on('change','#tipofluxoedit',function(){
		if(parseInt($("#tipofluxoedit").val()) == 2){
			$('#centrodecustoedit2').prop("disabled", false);
		} else {
			$('#centrodecustoedit2').prop("disabled", true);
		}    
	});
    $(document).on('change','#valoredit',function(){
    	var s = String($('#valoredit').val());
    	if(s.indexOf(",") != -1){
    		$('#valoredit').val(s.replace(",","."));
    	}
    	$('#valoredit').val(parseFloat($('#valoredit').val()).toFixed(2));	
	});
    
	function getCookie(c_name) {
		//função para pegar o id do usuário logado. O cookie é criado na classe LoginServlet.java
	    if (document.cookie.length > 0) {
	        c_start = document.cookie.indexOf(c_name + "=");
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1;
	            c_end = document.cookie.indexOf(";", c_start);
	            if (c_end == -1) {
	                c_end = document.cookie.length;
	            }
	            console.log(document.cookie.substring(c_start, c_end));
	            return unescape(document.cookie.substring(c_start, c_end));
	        }
	    }
	    bootbox.alert("Erro ao carregar o id do usuário");
	    return false;
	}
    
});