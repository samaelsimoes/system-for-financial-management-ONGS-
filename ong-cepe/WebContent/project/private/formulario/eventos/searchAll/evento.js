ONG.evento = new Object();
$(document).ready(function(){
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	ONG.evento.searchAllEvent();
	    }
	});
	ONG.evento.searchAllEvent=function(){ 	
	    var busca=$("#consuev").val();	  	
	    ONG.evento.searchEvent(undefined,busca);
	}; 	
	ONG.evento.searchEvent = function(listEvent, busca){
		var html = "<table id='tabela' class='tablesorter table table-responsive custom-table-margin-b'>";
		html += 
			"<thead class='table table-striped '>" +
				"<tr>" +
					"<th> Nome </th> " +
					"<th> Modalidade </th>" +
					"<th> Tipo </th>" +
					"<th> Data </th>" +
					"<th class='col-md-2'> Descrição </th>" +
//					"<th> Estado </th>" +
					"<th> Cidade </th>" +
					"<th> Bairro </th>" +
//					"<th> Rua </th>" +
//					"<th> Número </th>" +
//					"<th> Complemento </th>" +
					"<th style='width: 15%;'> Ações</th>" +
				"</tr>" +
			"</thead>" +
			"<tbody>";					
		    if(listEvent != undefined && listEvent.length > 0 && listEvent[0].id != undefined){
			  	for(var i = 0; i < listEvent.length; i++){
					html += "<tr>";					
						html += "<td>" + listEvent[i].nome + "</td>";
						html += "<td>" + listEvent[i].modalidade.nome + "</td>";
						
						if(listEvent[i].tipo == 1){
							html += "<td>"+	 
											"Beneficiente" +
									"</td>";
						}else if(listEvent[i].tipo == 2){
							html += "<td>"
										+"Sessão"+
									"</td>"
						}else if( listEvent[i].tipo == 3){
							html += "<td>"
										+"Viagem"+
									"</td>"
						}else if( listEvent[i].tipo == 4){
							html += "<td>"
										+"Competição"+
									"</td>"
						}
						html += "<td>" + listEvent[i].data.split("-").reverse().join("/") + "</td>";
						html += "<td><p class='small'>" + listEvent[i].descricao + "</p></td>";
//						html += "<td>" + listEvent[i].cidade.estado.nome + "</td>";
						html += "<td>" + listEvent[i].cidade.estado.sigla + "-" +listEvent[i].cidade.nome+ "</td>";
						html += "<td>" + listEvent[i].bairro + "</td>";
//						html += "<td>" + listEvent[i].rua + "</td>";
//						html += "<td>" + listEvent[i].numero + "</td>";
//						html += "<td>" + listEvent[i].complemento + "</td>";
						html += "<td>"+
									"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.evento.modaledit("+listEvent[i].id+")'>Editar</button>"+ " " + " " +
									"<button type='button'class='btn btn-trash' onclick='ONG.evento.confExcluir("+listEvent[i].id+")'>Excluir</button>"+
								"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listEvent == undefined || (listEvent != undefined && listEvent.length > 0)){
			    	var buscaEvento;
			    	if ( busca != "" ) {
			    		buscaEvento = busca;
			    	}else if (busca == "") {
			    		buscaEvento = "*"
			    	}
			    	
					var cfg = {
						url: ONG.contextPath + "/rest/evento/nome/" + buscaEvento,
						success: function(listEvent,busca){													
							ONG.evento.searchEvent(listEvent,busca);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar Eventos, entrar em contato com o Administrador se o problema persistir!");
						}
					};					
					ONG.ajax.get(cfg);
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
					4:{sorter:false},
					1:{sorter:'datetime'},
					8:{sorter: false}
				},
				dateFormat:'dd/mm/yyyy'
			});
		});
	}
	
	ONG.evento.searchEvent(undefined, "");

	ONG.evento.addevent = function(){

		var msg  = "";
		
		msg += ONG.evento.validaVazio("Nome: ", $("#nome").val());
		msg += ONG.evento.validaVazio("Tipo evento: ", $("#typeevent").val());		
		msg += ONG.evento.validaVazio("Cep: ", $("#cep").val());
		msg += ONG.evento.validaVazio("Data: ", $("#data").val());
//		msg += ONG.evento.validaVazio("Hora: ", $("#horario").val());
		msg += ONG.evento.validaVazio("Estado: ", $("#addestado").val());
		msg += ONG.evento.validaVazio("Cidade: ", $("#addcidade").val());
//		msg += ONG.evento.validaVazio("Bairro: ", $("#bairro").val());			
//		msg += ONG.evento.validaVazio("Rua: ", $("#rua").val());
//		msg += ONG.evento.validaVazio("Complemento: ", $("#complemento").val());
		msg += ONG.evento.validaVazio("Descrição: ", $("#descricao").val());
		//msg += validaVazio("Modalidade: ", $("#modalidade").val());

		if(msg == ""){
			var exp = ONG.evento.validaCampos();
			
			var date = $("#data").val();
			var d = new Date(date.split("-").join("/"));
            if(exp==""){
            	
            	var dadosEvent = {
	            	nome: $("#nome").val(),
					tipo: $("#typeevent").val(),
	            	descricao: $("#descricao").val(),
					data: d.getTime(),
					hora: $("#horario").val(),					
	            	cep: $("#cep").val(),
	            	cidade:{ 
						id: parseInt($("#addcidade").val())
					},
	            	bairro: $("#bairro").val(),
	            	numero: $("#numero").val(),
	            	complemento: $("#complemento").val(),				
					rua: $("#rua").val(),
	            	modalidade: {
	            		id: parseInt($("#modalidade").val())
	            	},
	            };
            	var cfg = {
        			url: ONG.contextPath +"/rest/evento/",
        			data: dadosEvent,
        			success: function(msg){		
        				bootbox.alert(msg);
        				ONG.evento.searchAllEvent();
    					$('input').val('');
    					$('#modaladd').modal('toggle');
        			},
        			error: function(err){								
        				bootbox.alert("Erro ao realizar cadastro, entrar em contato com o Administrador se o problema persistir!");
        			}
        		};					
        		ONG.ajax.post(cfg);
            }else{
                bootbox.alert(exp);
            }
        }else{
            bootbox.alert("Caro usuário, gentileza verificar os seguintes campos: <br> " + msg);
        }
	}
	
	//  ====----------------- VALIDAÇÕES
	
	ONG.evento.validaVazio = function ( campo, valor ) {
		
        var msg = "";

        if(valor == null ||  valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
    ONG.evento.validaCampos = function(){

    	var exp = "";

        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }

    	return exp;
    };
    
    // ------------------------

    ONG.evento.editarEvent = function(){

    	var msg  = "";
    	
    	if($("#id").val() == ""){
    		msg += "Não é possível editar o Evento, gentileza entrar em contato com o administrador";
    	}
    	
		msg += ONG.evento.validaVazio("Nome: ", $("#nomeedit").val());
		msg += ONG.evento.validaVazio("Tipo de evento: ", $("#typeeventedit").val());
		msg += ONG.evento.validaVazio("Cep: ", $("#cepedit").val());
		msg += ONG.evento.validaVazio("Bairro: ", $("#bairroedit").val());
		msg += ONG.evento.validaVazio("Data: ", $("#dataedit").val());
//		msg += ONG.evento.validaVazio("Horario: ", $("#horarioedit").val());
		msg += ONG.evento.validaVazio("Estado: ", $("#estadoedit").val());
		msg += ONG.evento.validaVazio("Cidade: ", $("#cidadeedit").val());
		msg += ONG.evento.validaVazio("Modalidade: ", $("#modalidadeedit").val());
		msg += ONG.evento.validaVazio("Rua: ", $("#ruaedit").val());
		msg += ONG.evento.validaVazio("Numero: ", $("#numeroedit").val());
		msg += ONG.evento.validaVazio("Complemento: ", $("#complementoedit").val());
		msg += ONG.evento.validaVazio("Descrição: ", $("#descricaoedit").val());

		
		var date = $("#dataedit").val();
		var d = new Date(date.split("-").join("/"));
		
    	if(msg == ""){

	    	var dadosEvEdit= {		 
	    		id: $("#id").val(),
    			nome: $("#nomeedit").val(),
				tipo: $("#typeeventedit").val(),
				descricao: $("#descricaoedit").val(),
				data: d.getTime(),
				hora: $("#horarioedit").val(),					
            	cep: $("#cepedit").val(),
            	cidade:{ 
					id: parseInt($("#cidadeedit").val())
				},
            	bairro: $("#bairroedit").val(),
            	numero: $("#numeroedit").val(),
            	complemento: $("#complementoedit").val(),				
				rua: $("#ruaedit").val(),
            	modalidade: {
            		id: parseInt($("#modalidadeedit").val())
	            	},				
	    	}
	    	$.ajax({
			
				type: 'PUT',
				url:ONG.contextPath + "/rest/evento/",
				data: JSON.stringify(dadosEvEdit),
				
				dataType:'text',
				contentType:'application/json',
				
				success:function(msg) {	
					bootbox.alert(msg);	
					ONG.evento.searchAllEvent();
					$('input').val('');
					$('#modaledit').modal('toggle');
				},
				error: function(err) {	
					bootbox.alert( err.responseText); 
				}
			});
		   
	    }else{
	    	bootbox.alert(msg);
	    }
    };
    
    ONG.evento.confExcluir = function(id){
		bootbox.confirm("Deseja Excluir?", function(confirmed) {
			if(confirmed) {
		           var cfg = {
							url: ONG.contextPath + "/rest/evento/id/" + id,
							success : function(msg) {
								  console.log(msg);
								  ONG.evento.searchAllEvent();
							},
							error : function(err) {
								  console.log('err' ,err);
								  bootbox.alert(err.responseText);
							} 
						};
						ONG.ajax.delet(cfg);
			}
		}); 
	};

    ONG.evento.buscaEstado = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/nome/*",
			success: function(listEstado){		
				ONG.evento.montaSelectEstado(listEstado);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    ONG.evento.buscaCidade = function(id) {
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade) {
				ONG.evento.montaSelectCidade(listaCidade);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    
    ONG.evento.montaSelectEstado = function(listEstado) {
    	var option = '';
    	$('#addestado').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#addestado'));
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				option = $( "<option></option>" ).appendTo($('#addestado'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}
			var items = document.querySelector('#addestado');
			items.addEventListener('change', function(){
				var valor =	this.value // o valo
				ONG.evento.buscaCidade( valor );
			});
		}
    }

    ONG.evento.montaSelectCidade = function( listaCidade ) {
    	var option = '';
    	$('#addcidade').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#addcidade'));
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				option = $( "<option></option>" ).appendTo( $( '#addcidade' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }
    
    ONG.evento.buscamodalidade = function(){
    	
    	var cfg = {							 
    			url: ONG.contextPath +  "/rest/modalidade/nome/*",
    			success: function(modalidade) {
    				if(modalidade == ""){
    					bootbox.alert("Não foi possivel buscar modalidade" + "<br>"+ "Motivo não temos nenhuma modalidade cadastrada!"+ "<br>"+  "Gentileza cadastre alguma modalidade.")
    				}else{
        				ONG.evento.montaModalidade(modalidade);
    				}
    			},
    			error: function(err) {							
    				bootbox.alert("Erro ao Buscar Modalidade, entrar em contato com o Administrador se o problema persistir! " + err);
    			}
    		};					
    		ONG.ajax.get(cfg);
    }
    ONG.evento.montaModalidade = function(listModalidade){
    	var option = '';
    	$('#modalidade').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#modalidade'));    	if(listModalidade != undefined && listModalidade.length > 0 && listModalidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listModalidade.length; i++){
				option = $( "<option></option>" ).appendTo( $( '#modalidade' ) );
				option.attr( "value", listModalidade[i].id );
				option.html( listModalidade[i].nome );
			}
		}    	
    }
    // EDITAR CIDADE E ESTADO
    ONG.evento.buscaEstadoedit = function(){
    	var cfg = {							
    		url: ONG.contextPath + "/rest/estado/nome/*",
			success: function(listEstado){													
				ONG.evento.montaSelectEstadoedit(listEstado);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    ONG.evento.buscaCidadeedit = function(id, callback) {
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade) {	
				ONG.evento.montaSelectCidadeedit(listaCidade);
				if(callback != undefined)
					callback();
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.evento.montaSelectEstadoedit = function(listEstado) {
    	var option = '';
    	$('#estadoedit').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#estadoedit'));
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				option = $( "<option></option>" ).appendTo($('#estadoedit'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}
			var items = document.querySelector('#estadoedit');
			items.addEventListener('change', function() {
				var valor =	this.value // o valo
				ONG.evento.buscaCidadeedit(valor,undefined);
			});
		}
    }

    ONG.evento.montaSelectCidadeedit = function( listaCidade ) {
    	var option = '';
    	$('#cidadeedit').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#cidadeedit'));    	
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				var option = $( "<option></option>" ).appendTo( $( '#cidadeedit' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }
    ONG.evento.buscamodalidadeedit = function(){
    	
    	var cfg = {							 
    			url: ONG.contextPath +  "/rest/modalidade/nome/*",
    			success: function(modalidade) {
    				ONG.evento.montaModalidadeEdit(modalidade);
    			},
    			error: function(err) {							
    				bootbox.alert("Erro ao Buscar Modalidade, entrar em contato com o Administrador se o problema persistir! " + err);
    			}
    		};					
    		ONG.ajax.get(cfg);
    }
    ONG.evento.montaModalidadeEdit = function(listModalidade){
    	var option = '';
    	$('#modalidadeedit').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#modalidadeedit'));       	
		if(listModalidade != undefined && listModalidade.length > 0 && listModalidade[0].id != undefined) {
			for(var i = 0; i < listModalidade.length; i++){
				option = $( "<option></option>" ).appendTo( $( '#modalidadeedit' ) );
				option.attr( "value", listModalidade[i].id );
				option.html( listModalidade[i].nome );
			}
		}    	
    };
    
    ONG.evento.buscID = function( id ){
    	$.ajax({
			  
			url: ONG.contextPath + "/rest/evento/id/" + id,				  
			success:function(dados){
		    	ONG.evento.buscaCidadeedit(dados.cidade.estado.id, function(){
		    		$("#id").val(dados.id);
		    		$("#nomeedit").val(dados.nome);
		    		$("#typeeventedit").val(dados.tipo);
		    		$("#cepedit").val(dados.cep);
		    		$("#dataedit").val(dados.data);
		    		$("#modalidadeedit").val(dados.modalidade.id);
		    		$("#horarioedit").val(dados.hora);
		    		$("#estadoedit").val(dados.cidade.estado.id);
		    		$("#cidadeedit").val(dados.cidade.id);
		    		$("#bairroedit").val(dados.bairro);
		    		$("#ruaedit").val(dados.rua);
		    		$("#numeroedit").val(dados.numero);
		    		$("#complementoedit").val(dados.complemento);
		    		$("#descricaoedit").val(dados.descricao);
		    	});			
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };
    
    ONG.evento.modaladd = function(){    	
    	ONG.evento.buscaEstado();
		ONG.evento.buscamodalidade();
    };
    
    ONG.evento.modaledit = function(idEvento){
    	ONG.evento.buscaEstadoedit();
		ONG.evento.buscamodalidadeedit();
    	ONG.evento.buscID(idEvento);
    };
});

