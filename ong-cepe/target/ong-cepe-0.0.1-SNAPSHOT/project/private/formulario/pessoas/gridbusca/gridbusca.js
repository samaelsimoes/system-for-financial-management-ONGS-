ONG.pessoa = new Object();
$(document).ready(function(){
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	ONG.pessoaJuridica.busca();
	    }
	});
	mask = function() {
	    $(".maskFone").text(function(i, text) {
	        text = text.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
	        return text;
	    });
	};
	
	ONG.pessoa.gridbusca = function(){
	    var busca = $("#consutodos").val();	  	
	    ONG.pessoa.buscaTodos(undefined,busca);
	};
	ONG.pessoa.buscaTodos = function(listallpes, busca){
		var html = "<table id='tabela' class='tablesorter table table-responsive custom-table-margin-b'>";		
		html += 
			"<thead class='table table-striped '>" +
				"<tr>" +	
					"<th> Nome / Razão social </th>" + 
					"<th style='width: 13%;'> Cpf / CNPJ </th>" +
					"<th> Tipo </th> " +
					"<th> Telefone contato </th>" +
					"<th style='width: 15%;'> Email </th>" +
					"<th style='width: 10%;'> Cidade </th>" +
					"<th> Status </th>" +
					"<th> Ações</th>" +
				"</tr>" +
			"</thead>" +					
			"<tbody>";
		    if(listallpes != undefined && listallpes.length > 0 && listallpes[0].id != undefined){
			  	for(var i = 0; i < listallpes.length; i++){
					html += "<tr>";					
						html += "<td>" + listallpes[i].nome + "</td>";
				
						if (listallpes[i].tipo == 2) {
							html += "<td>" + listallpes[i].cnpj + "</td>";
						}else if (listallpes[i].tipo  == 1){
							html += "<td>" + listallpes[i].cpf + "</td>";
						}
						
						if (listallpes[i].tipo == 1) {
							html += "<td>" + "PF" + "</td>";
						}else if (listallpes[i].tipo == 2) {
							html += "<td>" + "PJ" + "</td>";
						}					
						
						if(listallpes[i].foneFixo != null && listallpes[i].foneMovel != null){
							html += "<td><p class='small maskFone'>"+	 
										listallpes[i].foneFixo + "</p><p class='small maskFone'>" + 
										listallpes[i].foneMovel +										
									"</p></td>";
						}else if(listallpes[i].foneFixo != null && listallpes[i].foneMovel == null){
							html += "<td><p class='maskFone'>"+
										listallpes[i].foneFixo+
									"</p></td>"
						}else if( listallpes[i].foneMovel != null && listallpes[i].foneFixo == null){
							html += "<td><p class='maskFone'>"+
										listallpes[i].foneMovel+
									"</p></td>"
						}
						html += "<td>" + listallpes[i].email + "</td>";
						html += "<td>" + listallpes[i].cidade.nome+" - "+ listallpes[i].cidade.estado.uf + "</td>";
						
						if (listallpes[i].status == 1) {
							html += "<td>" + "Ativo" + "</td>";
						}else if (listallpes[i].status == 0) {
							html += "<td>" + "Inativo" + "</td>";
						}
						if ( listallpes[i].tipo == 1) {
							html += "<td>"+
								"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaleditPF' data-whatever='@getbootstrap' onclick='ONG.pessoa.modaleditPF("+listallpes[i].id+")'>Editar</button>"+ " " + " " +
								"<button type='button'class='btn btn-trash' onclick='ONG.pessoa.confExcluir("+listallpes[i].id+")'>Excluir</button>"+
								"</td>";
						}else if (listallpes[i].tipo == 2){
							html += "<td>"+
								"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaleditPJ' data-whatever='@getbootstrap' onclick='ONG.pessoa.modaleditPJ("+listallpes[i].id+")'>Editar</button>"+ " " + " " +
								"<button type='button'class='btn btn-trash' onclick='ONG.pessoa.confExcluir("+listallpes[i].id+")'>Excluir</button>"+
							"</td>";
						}						
					html += "</tr>";  
			    }
		    }else{
			    if(listallpes == undefined || (listallpes != undefined && listallpes.length > 0)){

					if(busca == "" || busca == undefined){						
						busca = "*";
					}
					ONG.pessoaRest.pesquisarNome({
						data : busca,
						success: function(listallpes,busca){													
							ONG.pessoa.buscaTodos(listallpes,busca);
						},
						error: function(err){							
							bootbox.alert(err.responseText);
						} 
					});
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		    }
		html += "</tbody>";		
		html +="</table>";
		$("#resupsall").html(html);
		$('#tabela').tablesorter({
			headers: { 			// (começa do zero)
				7: {			// Desativa a ordenação para essa coluna 
					sorter: false 
				},
			},
		});
		mask();
	}
	ONG.pessoa.buscaTodos (undefined, "");
	
	ONG.pessoa.confExcluir = function(id){
		bootbox.confirm("Deseja Excluir?", function(confirmed) {
			if(confirmed) {
				ONG.pessoaRest.excluir({
					data : id,
					success : function(msg) {
						  console.log(msg);
						  ONG.pessoa.gridbusca();
					},
					error : function(err) {
						  console.log('err' ,err);
						  bootbox.alert(err.responseText);
					} 
				});
			}
		}); 
	};


	ONG.pessoa.buscIDPF = function( id ){
		ONG.pessoaRest.pesquisarId({
			data : id,
			success:function(dados){
				ONG.pessoa.buscaCidadeEdit1(dados.cidade.estado.id, function(){					
					$("#id1").val(dados.id);
		    		$("#nomeedit1").val(dados.nome);
		    		$("#rgedit1").val(dados.rg);
		    		$("#cpfedit1").val("0"+dados.cpf);
		    		$("#emailedit1").val(dados.email);
		    		$("#datanascimentoeditar1").val(dados.nascimento.substring(0,10).split("/").reverse().join("-"));
		    		$("#telfixoedit1").val(dados.foneFixo);
		    		$("#telmoveledit1").val(dados.foneMovel);
		    		$("#bairroedit1").val(dados.bairro);
		    		$("#ruaedit1").val(dados.rua);
					$("#complementoedit1").val(dados.complemento);
					$("#numeroedit1").val(dados.numero);
					$("#cepedit1").val(dados.cep);
					$("#estadoedit1").val(dados.cidade.estado.id);
					$("#cidadeedit1").val(dados.cidade.id);
				});	
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário"+err.responseText);
			}
		});
    };
    
    ONG.pessoa.buscIDPJ = function( id ){
		ONG.pessoaRest.pesquisarId({
			data : id,
			success:function(dados){
				ONG.pessoa.buscaCidadeEdit2(dados.cidade.estado.id, function(){					
					$("#id2").val(dados.id);
		    		$("#razaosocialedit2").val(dados.nome);
		    		$("#cnpjedit2").val(dados.cnpj);
		    		$("#emailedit2").val(dados.email);
		    		$("#telfixoedit2").val(dados.foneFixo);
		    		$("#telmoveledit2").val(dados.foneMovel);
		    		$("#bairroedit2").val(dados.bairro);
		    		$("#ruaedit2").val(dados.rua);
					$("#complementoedit2").val(dados.complemento);
					$("#numeroedit2").val(dados.numero);
					$("#cepedit2").val(dados.cep);
					$("#estadoedit2").val(dados.cidade.estado.id);
					$("#cidadeedit2").val(dados.cidade.id);
				});	

			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário"+err.responseText);
			}
		});
    };
    
    ONG.pessoa.buscaEstadoEdit2 = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/nome/*",
			success: function(listEstado2){													
				ONG.pessoa.montaSelectEstadoEdit2(listEstado2);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! "+err.responseText);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.buscaCidadeEdit2 = function(id2, callback){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id2,
			success: function(listaCidade2){		
				ONG.pessoa.montaSelectCidadeEdit2(listaCidade2);
				if(callback != undefined)
					callback();
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.montaSelectEstadoEdit2 = function(listEstado2) {
    	var option = '';
    	$('#estadoedit2').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#estadoedit2'));       	    	
    	if(listEstado2 != undefined && listEstado2.length > 0 && listEstado2[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado2.length; i++) {
				option = $( "<option></option>" ).appendTo($('#estadoedit2'));
				option.attr( "value", listEstado2[i].id );
				option.html( listEstado2[i].nome );
			}

			var itemsedit2 = document.querySelector('#estadoedit2');
			itemsedit2.addEventListener('change', function(){
				var valor2 =	this.value // o valo
				ONG.pessoa.buscaCidadeEdit2( valor2 );
			});
		}
    }

    ONG.pessoa.montaSelectCidadeEdit2 = function( listaCidade2 ) {
    	var option2 = '';
    	$('#cidadeedit2').find('option').remove();
		option2 = $( "<option value=''>Selecione</option>" ).appendTo($('#cidadeedit2'));       	    	    	
    	if(listaCidade2 != undefined && listaCidade2.length > 0 && listaCidade2[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade2.length; i++){
				option2 = $( "<option></option>" ).appendTo( $( '#cidadeedit2' ) );
				option2.attr( "value", listaCidade2[i].id );
				option2.html( listaCidade2[i].nome );
			}
		}
    }
    
    ONG.pessoa.buscaEstadoEdit1 = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/nome/*",
			success: function(listEstado1){													
				ONG.pessoa.montaSelectEstadoEdit1(listEstado1);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.buscaCidadeEdit1 = function(id1, callback){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id1,
			success: function(listaCidade1){		
				ONG.pessoa.montaSelectCidadeEdit1(listaCidade1);
				if(callback != undefined)
					callback();
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoa.montaSelectEstadoEdit1 = function(listEstado1) {
    	var option1 = '';
    	$('#estadoedit1').find('option').remove();
		option1 = $( "<option value=''>Selecione</option>" ).appendTo($('#estadoedit1'));       	    	    	
    	if(listEstado1 != undefined && listEstado1.length > 0 && listEstado1[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado1.length; i++) {
				option1 = $( "<option></option>" ).appendTo($('#estadoedit1'));
				option1.attr( "value", listEstado1[i].id );
				option1.html( listEstado1[i].nome );
			}

			var itemsedit1 = document.querySelector('#estadoedit1');
			itemsedit1.addEventListener('change', function(){
				var valor1 =	this.value // o valo
				ONG.pessoa.buscaCidadeEdit1(valor1);
			});
		}
    }

    ONG.pessoa.montaSelectCidadeEdit1 = function( listaCidade1 ) {
    	var option1 = '';
    	$('#cidadeedit1').find('option').remove();
		option1 = $( "<option value=''>Selecione</option>" ).appendTo($('#cidadeedit1'));
    	if(listaCidade1 != undefined && listaCidade1.length > 0 && listaCidade1[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade1.length; i++){
				option1 = $( "<option></option>" ).appendTo( $( '#cidadeedit1' ) );
				option1.attr( "value", listaCidade1[i].id );
				option1.html( listaCidade1[i].nome );
			}
		}
    }
    
    /*edita pf*/
    
    ONG.pessoa.editarPF = function() {
    	var msg  = "";
    	
		msg += ONG.pessoa.validaVazio("Nome ", $("#nomeedit1").val());
		msg += ONG.pessoa.validaVazio("CPF: ", $("#cpfedit1").val());
		msg += ONG.pessoa.validaVazio("RG: ", $("#rgedit1").val());
		msg += ONG.pessoa.validaVazio("Email: ", $("#emailedit1").val());
		msg += ONG.pessoa.validaVazio("Telefone Fixo: ", $("#telfixoedit1").val());
		msg += ONG.pessoa.validaVazio("Estado: ", $("#estadoedit1").val());
		msg += ONG.pessoa.validaVazio("Cidade: ", $("#cidadeedit1").val());
		msg += ONG.pessoa.validaVazio("Bairro: ", $("#bairroedit1").val());
		msg += ONG.pessoa.validaVazio("Rua: ", $("#ruaedit1").val());
		msg += ONG.pessoa.validaVazio("Complemento: ", $("#complementoedit1").val());
		msg += ONG.pessoa.validaVazio("Numero: ", $("#numeroedit1").val());

    	if(msg == ""){
    		var exp = ONG.pessoa.validaCampos1();    		
    		if(exp == ""){
    			var date = $("#datanascimentoeditar1").val();
    			var d = new Date(date.split("-").join("/"));
    			
		    	var dadosPF = {
		            
		    		id: $("#id1").val(),
		    		nome: $("#nomeedit1").val(),
		    		tipo: 1,
		    		status: 1,
		    		cpf: $("#cpfedit1").val(),
		    		rg: $("#rgedit1").val(),
		    		email: $("#emailedit1").val(),
		    		bairro: $("#bairroedit1").val(),
		    		nascimento: d.getTime(),
		    		foneFixo: $("#telfixoedit1").val(),
		    		foneMovel: $("#telmoveledit1").val(),
		    		rua: $("#ruaedit1").val(),
		    		complemento: $("#complementoedit1").val(),
		    		numero: $("#numeroedit1").val(),
		    		cep: $("#cepedit1").val(),		    		
					cidade: { 
						id: parseInt($("#cidadeedit1").val())
					}	
		    	}
		    	console.log(dadosPF)
				ONG.pessoaRest.editar({
					data : dadosPF,
					success:function(msg){	
        				bootbox.alert(msg);
        				ONG.pessoa.gridbusca();
    					$('input').val('');
    					$('#modaleditPF').modal('toggle');				
					},
					error: function(err){	
						bootbox.alert( err.responseText); 
					}
				});
		    }else{
		    	bootbox.alert(exp);
		    }
	    }else{
	    	bootbox.alert(msg);
	    }
    };
    
    ONG.pessoa.editarPJ = function(){

    	var msg  = "";
    	
    	if($("#id2").val() == ""){
    		msg += " Impossivel editar pessoa Juridica, gentileza entrar em contato com o administrador, motivo sem campo id";
    	}
    	
		msg += ONG.pessoa.validaVazio("Razao Social: ", $("#razaosocialedit2").val());
		msg += ONG.pessoa.validaVazio("Cnpj: ", $("#cnpjedit2").val());
		msg += ONG.pessoa.validaVazio("Email: ", $("#emailedit2").val());
		msg += ONG.pessoa.validaVazio("Telefone Fixo: ", $("#telfixoedit2").val());
		msg += ONG.pessoa.validaVazio("Estado: ", $("#estadoedit2").val());
		msg += ONG.pessoa.validaVazio("Cidade: ", $("#cidadeedit2").val());
		msg += ONG.pessoa.validaVazio("Bairro: ", $("#bairroedit2").val());
		msg += ONG.pessoa.validaVazio("Rua: ", $("#ruaedit2").val());
		msg += ONG.pessoa.validaVazio("Complemento: ", $("#complementoedit2").val());
		msg += ONG.pessoa.validaVazio("Numero: ", $("#numeroedit2").val());

    	if(msg == ""){
    		var exp = ONG.pessoa.validaCampos2();
    		
    		if(exp == ""){
		    	var dadosPJ= {
		    		id: $("#id2").val(),
		    		nome: $("#razaosocialedit2").val(),
		    		tipo: 2,
		    		status: 1,
		    		cnpj: $("#cnpjedit2").val(),
		    		email: $("#emailedit2").val(),
		    		nascimento: $("#datanascimentoedit2").val(),
		    		foneFixo: $("#telfixoedit2").val(),
		    		foneMovel: $("#telmoveledit2").val(),
		    		rua: $("#ruaedit2").val(),
		    		complemento: $("#complementoedit2").val(),
		    		numero: $("#numeroedit2").val(),
		    		cep: $("#cepedit2").val(),
					cidade : { 
						id: parseInt($("#cidadeedit2").val())
					}					
		    	}
		    	
				ONG.pessoaRest.editar({
					data : dadosPJ,
					success:function(msg) {	
        				bootbox.alert(msg);
        				ONG.pessoa.gridbusca();
    					$('input').val('');
    					$('#modaleditPJ').modal('toggle');	
					},
					error: function(err) {	
						bootbox.alert( err.responseText); 
					}
				});
		    }else{
		    	bootbox.alert(exp);
		    }
	    }else{
	    	bootbox.alert(msg);
	    }
    };
    
    //  ====----------------- VALIDAÇÕES PF

    ONG.pessoa.validaCampos1 = function(){
    	var exp = "";
    	if($("#emailedit1").val().indexOf("@") == -1 || //valida se existe o @
            $("#emailedit1").val().indexOf(".") == -1 || //valida se existe o .
            $("#emailedit1").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#emailedit1").val().lastIndexOf(".") + 1 == emailedit1.length || //valida se tem texto depois do ponto
            ($("#emailedit1").val().indexOf("@") + 1 == $("#emailedit1").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp+="E-mail inválido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("emailedit1").focus();
        }
        if(!$("#cpfedit1").val().match(/^\d{11,12}$/)){
        	exp+="cpf inválido ! </br> " + "</br>";
        }
        if(!$("#rgedit1").val().match(/^\d{5,13}$/)){
        	exp+="rg inválido ! </br> " + "</br>";
        }
        if(!$("#cepedit1").val().match(/^\d{8,9}$/)){
        	exp+="Cep inválido ! </br> " + "</br>";
        }
        if(!$("#telfixoedit1").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo inválido ! </br> " + "</br>";
        }
    	return exp;
    };
    	
	ONG.pessoa.validaVazio = function ( campo, valor ) {
        var msg = "";
        if(valor == null ||  valor.trim() == ""){
            msg += "-" + campo + " Está Vazio. </br>";
        }
        return msg;
    };

    ONG.pessoa.validaCampos2= function(){
    	var exp = "";

    	if($("#emailedit2").val().indexOf("@") == -1 || //valida se existe o @
            $("#emailedit2").val().indexOf(".") == -1 || //valida se existe o .
            $("#emailedit2").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#emailedit2").val().lastIndexOf(".") + 1 == emailedit2.length || //valida se tem texto depois do ponto
            ($("#emailedit2").val().indexOf("@") + 1 == $("#emailedit2").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp+="E-mail inválido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("emailedit").focus();
        }
        if(!$("#cnpjedit2").val().match(/^\d{14,15}$/)){
        	exp+="CNPJ inválido ! </br> " + "</br>";
        }
        if(!$("#cepedit2").val().match(/^\d{8,9}$/)){
        	exp+="Cep inválido ! </br> " + "</br>";
        }
        if(!$("#telfixoedit2").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo inválido ! </br> " + "</br>";
        }
    	return exp;
    };
    
    ONG.pessoa.modaleditPF = function(idPf){
		ONG.pessoa.buscaEstadoEdit1();
		ONG.pessoa.buscIDPF(idPf);
    };    
    
    ONG.pessoa.modaleditPJ = function(idPj){
		ONG.pessoa.buscaEstadoEdit2();
		ONG.pessoa.buscIDPJ(idPj);
    };
});

