ONG.pessoaFisica = new Object();

$(document).ready(function(){
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	ONG.pessoaFisica.consultapesf();
	    }
	});
	mask = function() {
	    $(".maskFone").text(function(i, text) {
	        text = text.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
	        return text;
	    });
	};
	ONG.pessoaFisica.consultapesf=function(){
	    var busca=$("#conspf").val();	  	
	    ONG.pessoaFisica.buscapefisica(undefined,busca);
	}		
	
	ONG.pessoaFisica.buscapefisica = function(listPesF, busca){
		var html = "<table id='tabela' class='tablesorter table table-responsive custom-table-margin-b'>";
		html += 
			"<thead class='table table-striped'>" +
				"<tr>" +	
					"<th> Nome </th> " +
					"<th> CPF </th>" + 
					"<th> RG </th>" + 
					"<th> E-mail </th>" +
					"<th> Telefone contato </th>" +
					"<th> Rua </th>" +
					"<th> Número </th>" +
					"<th> Status </th>" +					
					"<th style='width: 15%;'> Ações</th>" +
				"</tr>" +
			"</thead>";	
		html += "<tbody>";
		    if(listPesF != undefined && listPesF.length > 0 && listPesF[0].id != undefined){	
		    	
		    	
		    	
			  	for(var i = 0; i < listPesF.length; i++){
			  		
					html += "<tr>";		
					html += "<td>" + listPesF[i].nome + "</td>";
					html += "<td>" + listPesF[i].cpf + "</td>";
					html += "<td>" + listPesF[i].rg + "</td>";
				    html += "<td>" + listPesF[i].email + "</td>";
				    
					if(listPesF[i].foneFixo != null && listPesF[i].foneMovel != null){
						html += "<td><p class='small maskFone'>"+	 
									listPesF[i].foneFixo + "</p><p class='small maskFone'>" + 
									listPesF[i].foneMovel +										
								"</p></td>";
					}else if(listPesF[i].foneFixo != null && listPesF[i].foneMovel == null){
						html += "<td><p class='maskFone'>"+
									listPesF[i].foneFixo+
								"</p></td>"
					}else if( listPesF[i].foneMovel != null && listPesF[i].foneFixo == null){
						html += "<td><p class='maskFone'>"+
									listPesF[i].foneMovel+
								"</p></td>"
					}

					html += "<td>" + listPesF[i].rua + "</td>";
					html += "<td>" + listPesF[i].numero + "</td>";
					
					if ( listPesF[i].status == 1 ) {
						html += "<td>" + "Ativo" + "</td>";
					}else if ( listPesF[i].status == 0 ) {
						html += "<td>" + "Inativo" + "</td>";
					}
					html += "<td>"+
							"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.pessoaFisica.modaledit("+listPesF[i].id+")'>Editar</button>"+ " " + " " +
							"<button type='button'class='btn btn-trash' onclick='ONG.pessoaFisica.confExcluir("+listPesF[i].id+")'>Excluir</button>"+
						"</td>";						
					html += "</tr>";  

			    }
		    }else{
			    if(listPesF == undefined || (listPesF != undefined && listPesF.length > 0)){

					if(busca == ""){						
						busca = null;
					}

					var tipo = 1;
					ONG.pessoaRest.pesquisarTipo({
						data : tipo,
						success: function(listPesF,busca){													
							ONG.pessoaFisica.buscapefisica(listPesF,busca);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar Pessoa Fisica, entrar em contato com o Administrador se o problema persistir!");
						}
					});
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		    }
		html += "</tbody>";				    
		html +="</table>";
		$("#resupsfisica").html(html);
		$('#tabela').tablesorter({
			headers: { 			// (começa do zero)
				8: {			// Desativa a ordenação para essa coluna 
					sorter: false 
				},
			},
		});
		mask();
	}
	
	ONG.pessoaFisica.buscapefisica(undefined, "");

	ONG.pessoaFisica.cadpesFisica = function(){

		var msg  = "";
		msg += ONG.pessoaFisica.validaVazio("Nome: ", $("#nome").val());
		msg += ONG.pessoaFisica.validaVazio("CPF: ", $("#cpf").val());
		msg += ONG.pessoaFisica.validaVazio("RG: ", $("#rg").val());
		msg += ONG.pessoaFisica.validaVazio("Email: ", $("#email").val());
		msg += ONG.pessoaFisica.validaVazio("Telefone Fixo: ", $("#telfixo").val());
		msg += ONG.pessoaFisica.validaVazio("Estado: ", $("#estado").val());
		msg += ONG.pessoaFisica.validaVazio("Cidade: ", $("#cidade").val());
		msg += ONG.pessoaFisica.validaVazio("Bairro: ", $("#bairro").val());
		msg += ONG.pessoaFisica.validaVazio("Rua: ", $("#rua").val());
		msg += ONG.pessoaFisica.validaVazio("Complemento: ", $("#complemento").val());
		msg += ONG.pessoaFisica.validaVazio("Numero: ", $("#numero").val());

		if(msg == ""){
			var exp = ONG.pessoaFisica.validaCampos();
            if(exp==""){

            	var date = $("#datanascimento").val();
				var d = new Date(date.split("-").join("/"));
				
            	var dadosPF = {
            	
	            	nome: $("#nome").val(),
					tipo: 1,
					status: 1,
					cpf: $("#cpf").val(),
					rg: $("#rg").val(),
					email: $("#email").val(),
					bairro: $("#bairro").val(),
	            	nascimento: d.getTime(),

	            	foneFixo: $("#telfixo").val(),
	            	foneMovel: $("#telmovel").val(),

					cidade:{ 
						id: parseInt($("#cidade").val())
					},

					rua: $("#rua").val(),
	            	complemento: $("#complemento").val(),
	            	numero: $("#numero").val(),
	            	cep: $("#cep").val() 
	            };
            	console.log(dadosPF);
				ONG.pessoaRest.inserir({
					data : dadosPF,
        			success: function(msg){		
        				bootbox.alert(msg);
        				ONG.pessoaFisica.consultapesf();
    					$('input').val('');
    					$('#modaladd').modal('toggle');        			},
        			error: function(err){								
        				bootbox.alert("Erro ao realizar cadastro, entrar em contato com o Administrador se o problema persistir!");
        			}
				});
            }else{
                bootbox.alert(exp);
            }
        }else{
            bootbox.alert("Caro usuário, gentileza verificar os seguintes campos: <br> " + msg);
        }
	}
	
	//  ====----------------- VALIDAÇÕES
	
	ONG.pessoaFisica.validaVazio = function ( campo, valor ) {
        var msg = "";
        if(valor == null ||  valor.trim() == ""){
            msg += "-" + campo + " Está Vazio. </br>";
        }
        return msg;
    };

    ONG.pessoaFisica.validaCampos = function(){
    	var exp = "";
    	if($("#email").val().indexOf("@") == -1 || //valida se existe o @
            $("#email").val().indexOf(".") == -1 || //valida se existe o .
            $("#email").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#email").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
            ($("#email").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp+="E-mail inválido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("email").focus();
        }
        if(!$("#cpf").val().match(/^\d{11,12}$/)){
        	exp+="cpf inválido ! </br> " + "</br>";
        }
        if(!$("#rg").val().match(/^\d{5,13}$/)){
        	exp+="rg inválido ! </br> " + "</br>";
        }
        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep inválido ! </br> " + "</br>";
        }
        if(!$("#telfixo").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo inválido ! </br> " + "</br>";
        }
    	return exp;
    };
    ONG.pessoaFisica.validaCamposEdit = function(){
    	var exp = "";
    	if($("#emailedit").val().indexOf("@") == -1 || //valida se existe o @
            $("#emailedit").val().indexOf(".") == -1 || //valida se existe o .
            $("#emailedit").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#emailedit").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
            ($("#emailedit").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp += "E-mail inválido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("emailedit").focus();
        }
        if(!$("#cpfedit").val().match(/^\d{11,12}$/)){
        	exp += "cpf inválido ! </br> " + "</br>";
        }
        if(!$("#rgedit").val().match(/^\d{5,13}$/)){
        	exp += "rg inválido ! </br> " + "</br>";
        }
        if(!$("#cepedit").val().match(/^\d{8,9}$/)){
        	exp += "Cep inválido ! </br> " + "</br>";
        }
        if(!$("#telfixoedit").val().match(/^\d{10,13}$/)){    
            exp += "Telefone Fixo inválido ! </br> " + "</br>";
        }
    	return exp;
    };
    // ------------------------

    ONG.pessoaFisica.buscID = function( id ){
		ONG.pessoaRest.pesquisarId({
			data : id,
			success:function(dados){
				ONG.pessoaFisica.buscaCidadeEdit(dados.cidade.estado.id, function(){					
					$("#id").val(dados.id);
		    		$("#nomeedit").val(dados.nome);
		    		$("#rgedit").val(dados.rg);
		    		$("#cpfedit").val("0"+dados.cpf);
		    		$("#emailedit").val(dados.email);
		    		$("#datanascimentoeditar").val(dados.nascimento.substring(0,10).split("/").reverse().join("-"));
		    		$("#telfixoedit").val(dados.foneFixo);
		    		$("#telmoveledit").val(dados.foneMovel);
		    		$("#bairroedit").val(dados.bairro);
		    		$("#ruaedit").val(dados.rua);
					$("#complementoedit").val(dados.complemento);
					$("#numeroedit").val(dados.numero);
					$("#cepedit").val(dados.cep);
					$("#estadoedit").val(dados.cidade.estado.id);
					$("#cidadeedit").val(dados.cidade.id);
				});	
			},			
			error: function(err){				
				bootbox.alert("Ocorreu erro ao chamar os dados do evento para o Formulário ");
			}
		});
    };

    ONG.pessoaFisica.editarPF = function() {
    	var msg  = "";
    	if($("#id").val() == ""){
    		msg += " Entrar em contato com o administrador, falha ao editar pessoas, campo id vindo vazio";
    	}
		msg += ONG.pessoaFisica.validaVazio("Nome ", $("#nomeedit").val());
		msg += ONG.pessoaFisica.validaVazio("CPF: ", $("#cpfedit").val());
		msg += ONG.pessoaFisica.validaVazio("RG: ", $("#rgedit").val());
		msg += ONG.pessoaFisica.validaVazio("Email: ", $("#emailedit").val());
		msg += ONG.pessoaFisica.validaVazio("Telefone Fixo: ", $("#telfixoedit").val());
		msg += ONG.pessoaFisica.validaVazio("Estado: ", $("#estadoedit").val());
		msg += ONG.pessoaFisica.validaVazio("Cidade: ", $("#cidadeedit").val());
		msg += ONG.pessoaFisica.validaVazio("Bairro: ", $("#bairroedit").val());
		msg += ONG.pessoaFisica.validaVazio("Rua: ", $("#ruaedit").val());
		msg += ONG.pessoaFisica.validaVazio("Complemento: ", $("#complementoedit").val());
		msg += ONG.pessoaFisica.validaVazio("Numero: ", $("#numeroedit").val());

    	if(msg == ""){
    		var exp = ONG.pessoaFisica.validaCamposEdit();    		
    		if(exp == ""){
            	var date = $("#datanascimentoeditar").val();
				var d = new Date(date.split("/").reverse().join("-"));
		    	var dadosPF = {
		            
		    		id: $("#id").val(),
		    		nome: $("#nomeedit").val(),
		    		tipo: 1,
		    		status: 1,
		    		cpf: $("#cpfedit").val(),
		    		rg: $("#rgedit").val(),
		    		email: $("#emailedit").val(),
		    		bairro: $("#bairroedit").val(),
		    		nascimento: d.getTime(),
		    		foneFixo: $("#telfixoedit").val(),
		    		foneMovel: $("#telmoveledit").val(),
		    		rua: $("#ruaedit").val(),
		    		complemento: $("#complementoedit").val(),
		    		numero: $("#numeroedit").val(),
		    		cep: $("#cepedit").val(),		    		
					cidade: { 
						id: $("#cidadeedit").val() 
					}	
		    	}
				ONG.pessoaRest.editar({
					data : dadosPF,
					success:function(data){	
        				bootbox.alert(msg);
        				ONG.pessoaFisica.consultapesf();
    					$('input').val('');
    					$('#modaledit').modal('toggle');  
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
    ONG.pessoaFisica.confExcluir = function(id){
		bootbox.confirm("Deseja Excluir?", function(confirmed) {
			if(confirmed) {
				ONG.pessoaRest.excluir({
					data : id,
					success : function(msg) {
						  console.log(msg);
						  ONG.pessoaFisica.consultapesf();
					},
					error : function(err) {
						  console.log('err' ,err);
						  bootbox.alert(err.responseText);
					} 
				});
			}
		}); 
	};

    ONG.pessoaFisica.buscaEstado = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/nome/*",
			success: function(listEstado){													
				ONG.pessoaFisica.montaSelectEstado(listEstado);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }
    ONG.pessoaFisica.buscaCidade = function(id){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade){		
				ONG.pessoaFisica.montaSelectCidade(listaCidade);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoaFisica.montaSelectEstado = function(listEstado) {
    	var option = '';
    	$('#estado').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#estado'));    	
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				option = $( "<option></option>" ).appendTo($('#estado'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}
			var items = document.querySelector('#estado');
			items.addEventListener('change', function(){
				var valor =	this.value // o valo
				ONG.pessoaFisica.buscaCidade( valor );
			});
		}
    }
    ONG.pessoaFisica.montaSelectCidade = function( listaCidade ) {
    	var option = '';
    	$('#cidade').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#cidade'));    	
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				option = $( "<option></option>" ).appendTo( $( '#cidade' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    }

    // EDITAR

    ONG.pessoaFisica.buscaEstadoEdit = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/nome/*",
			success: function(listEstado){													
				ONG.pessoaFisica.montaSelectEstadoEdit(listEstado);
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoaFisica.buscaCidadeEdit = function(id, callback){
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade){		
				ONG.pessoaFisica.montaSelectCidadeEdit(listaCidade);
				if(callback != undefined)
					callback();
			},
			error: function(err){							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    }

    ONG.pessoaFisica.montaSelectEstadoEdit = function(listEstado) {
    	var option = '';
    	$('#estadoedit').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#estadoedit'));    	
    	if(listEstado != undefined && listEstado.length > 0 && listEstado[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listEstado.length; i++) {
				option = $( "<option></option>" ).appendTo($('#estadoedit'));
				option.attr( "value", listEstado[i].id );
				option.html( listEstado[i].nome );
			}

			var itemsedit = document.querySelector('#estadoedit');
			itemsedit.addEventListener('change', function(){
				var valor =	this.value // o valo
				ONG.pessoaFisica.buscaCidadeEdit( valor );
			});
		}
    };

    ONG.pessoaFisica.montaSelectCidadeEdit = function( listaCidade ) {
    	var option = '';
    	$('#cidadeedit').find('option').remove();
		option = $( "<option value=''>Selecione</option>" ).appendTo($('#cidadeedit'));    	
    	if(listaCidade != undefined && listaCidade.length > 0 && listaCidade[0].id != undefined) { // montando meus estados
			for(var i = 0; i < listaCidade.length; i++){
				option = $( "<option></option>" ).appendTo( $( '#cidadeedit' ) );
				option.attr( "value", listaCidade[i].id );
				option.html( listaCidade[i].nome );
			}
		}
    };
    
    
    ONG.pessoaFisica.modaladd = function(){    	
    	ONG.pessoaFisica.buscaEstado();
    };
    
    ONG.pessoaFisica.modaledit = function(idPess){
		ONG.pessoaFisica.buscaEstadoEdit();
		ONG.pessoaFisica.buscID(idPess);
    };
});