ONG.pessoaJuridica = new Object();

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
	ONG.pessoaJuridica.busca = function(){
		
	    var busca=$("#conspj").val();	  	
	    ONG.pessoaJuridica.buscapesJuridica(undefined,busca);
	}		
	
	ONG.pessoaJuridica.buscapesJuridica = function(listPesj, busca){
		var html = "<table id='tabela' class='tablesorter table table-responsive custom-table-margin-b'>";
		html += 
			"<thead class='table table-striped '>" +
				"<tr>" +
					"<th> Razão Social </th> " +
					"<th> Cnpj </th>" + 
					"<th> E-mail </th>" +
					"<th> Telefone contato </th>" +
					"<th> Cep </th>" +
					/*"<th> Estado </th>" +
					"<th> Cidade </th>" +*/
					"<th> Rua </th>" +
					"<th> Complemento </th>" +
					"<th> Número </th>" +
					"<th> Status </th>" +					
					"<th style='width: 15%;'> Ações</th>" +
				"</tr>" +
			"</thead>";					
		html += "<tbody>";
		    if(listPesj != undefined && listPesj.length > 0 && listPesj[0].id != undefined){
			  	for(var i = 0; i < listPesj.length; i++){
					html += "<tr>";					
					html += "<td>" + listPesj[i].nome + "</td>";
					html += "<td>" + listPesj[i].cnpj + "</td>";
					html += "<td>" + listPesj[i].email + "</td>";
					
					if(listPesj[i].foneFixo != null && listPesj[i].foneMovel != null){
						html += "<td><p class='small maskFone'>"+	 
									listPesj[i].foneFixo + "</p><p class='small maskFone'>" + 
									listPesj[i].foneMovel +										
								"</p></td>";
					}else if(listPesj[i].foneFixo != null && listPesj[i].foneMovel == null){
						html += "<td><p class='maskFone'>"+
									listPesj[i].foneFixo+
								"</p></td>"
					}else if( listPesj[i].foneMovel != null && listPesj[i].foneFixo == null){
						html += "<td><p class='maskFone'>"+
									listPesj[i].foneMovel+
								"</p></td>"
					}
					
					html += "<td>" + listPesj[i].cep + "</td>";
					/*html += "<td>" + listPesj[i].estado + "</td>";
					html += "<td>" + listPesj[i].cidade + "</td>";*/
					html += "<td>" + listPesj[i].rua + "</td>";
					html += "<td>" + listPesj[i].complemento + "</td>";
					html += "<td>" + listPesj[i].numero + "</td>";
					if (listPesj[i].status == 1) {
						html += "<td>" + "Ativo" + "</td>";
					}else if (listPesj[i].status == 0) {
						html += "<td>" + "Inativo" + "</td>";
					}
					html += "<td>"+
								"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.pessoaJuridica.modaledit("+listPesj[i].id+")'>Editar</button>"+ " " + " " +
								"<button type='button'class='btn btn-trash' onclick='ONG.pessoaJuridica.confExcluir("+listPesj[i].id+")'>Excluir</button>"+
							"</td>";						
					html += "</tr>";  
			    }
		    }else{
			    if(listPesj == undefined || (listPesj != undefined && listPesj.length > 0)){

					if(busca == ""){						
						busca = null;
					}
					var tipo = 2;
					ONG.pessoaRest.pesquisarTipo({
						data : tipo,
						success: function(listPesj,busca){													
							ONG.pessoaJuridica.buscapesJuridica(listPesj,busca);
						},
						error: function(err){							
							bootbox.alert("Erro ao Buscar Pessoa Juridica, entrar em contato com o Administrador se o problema persistir!");
						}
					});
				}else{					
					html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
				}
		    }
		html += "</tbody>";				    		    
		html +="</table>";
		$("#resupesjuridica").html(html);
		$('#tabela').tablesorter({
			headers: { 			// (começa do zero)
				8: {			// Desativa a ordenação para essa coluna 
					sorter: false 
				},
			},
		});
		mask();
	}
	
	ONG.pessoaJuridica.buscapesJuridica(undefined, "");

	ONG.pessoaJuridica.cadspesjuridica = function(){

		var msg  = "";
		msg += ONG.pessoaJuridica.validaVazio("Razao Social: ", $("#razaosocial").val());
		msg += ONG.pessoaJuridica.validaVazio("Cnpj: ", $("#cnpj").val());
		msg += ONG.pessoaJuridica.validaVazio("Email: ", $("#email").val());
		msg += ONG.pessoaJuridica.validaVazio("Telefone Fixo: ", $("#telfixo").val());
		msg += ONG.pessoaJuridica.validaVazio("Estado: ", $("#estado").val());
		msg += ONG.pessoaJuridica.validaVazio("Cidade: ", $("#cidade").val());
		msg += ONG.pessoaJuridica.validaVazio("Bairro: ", $("#bairro").val());
		msg += ONG.pessoaJuridica.validaVazio("Rua: ", $("#rua").val());
		msg += ONG.pessoaJuridica.validaVazio("Complemento: ", $("#complemento").val());
		msg += ONG.pessoaJuridica.validaVazio("Numero: ", $("#numero").val());

		if(msg == ""){
			var exp = ONG.pessoaJuridica.validaCampos();
            if(exp==""){

            	var dadosPJ = {
            	
	            	nome: $("#razaosocial").val(),
					tipo: 2,
					status: 1,
					cnpj: $("#cnpj").val(),
					email: $("#email").val(),
	            	dt_nasc: $("#datanascimento").val(),
	            	foneFixo: $("#telfixo").val(),
	            	foneMovel: $("#telmovel").val(),
					cidade:{ 
						id: parseInt($("#cidade").val())
					},
					bairro: $("#bairro").val(),
					rua: $("#rua").val(),
	            	complemento: $("#complemento").val(),
	            	numero: $("#numero").val(),
	            	cep: $("#cep").val() 
	            };
            	console.log(dadosPJ);
				ONG.pessoaRest.inserir({
					data : dadosPJ,
        			success: function(msg){		
        				bootbox.alert(msg);
        				ONG.pessoaJuridica.busca();
    					$('input').val('');
    					$('#modaladd').modal('toggle');
        			},
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
	
	ONG.pessoaJuridica.validaVazio = function ( campo, valor ) {
		
        var msg = "";

        if(valor == null ||  valor.trim() == ""){
            msg += "- " + campo + " Está Vazio. </br>";
        }
        return msg;
    };
    ONG.pessoaJuridica.validaCampos = function(){

    	var exp = "";

    	if($("#email").val().indexOf("@") == -1 || //valida se existe o @
            $("#email").val().indexOf(".") == -1 || //valida se existe o .
            $("#email").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#email").val().lastIndexOf(".") + 1 == email.length || //valida se tem texto depois do ponto
            ($("#email").val().indexOf("@") + 1 == $("#email").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp+="E-mail invalido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("email").focus();
        }
        if(!$("#cnpj").val().match(/^\d{14,15}$/)){
        	exp+="CNPJ invalido ! </br> " + "</br>";
        }
        if(!$("#cep").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
        if(!$("#telfixo").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo invalido ! </br> " + "</br>";
        }
    	return exp;
    };
    ONG.pessoaJuridica.validaCamposedit = function(){

    	var exp = "";

    	if($("#emailedit").val().indexOf("@") == -1 || //valida se existe o @
            $("#emailedit").val().indexOf(".") == -1 || //valida se existe o .
            $("#emailedit").val().indexOf("@") == 0 || //valida se tem texto antes do @
            $("#emailedit").val().lastIndexOf(".") + 1 == emailedit.length || //valida se tem texto depois do ponto
            ($("#emailedit").val().indexOf("@") + 1 == $("#emailedit").val().indexOf("."))){ //valida se tem texto entre o @ e o .{
                
            exp+="E-mail invalido" +"</br>"
            + "ex: teste_@teste.com.br"
            document.getElementById("emailedit").focus();
        }
        if(!$("#cnpjedit").val().match(/^\d{14,15}$/)){
        	exp+="CNPJ invalido ! </br> " + "</br>";
        }
        if(!$("#cepedit").val().match(/^\d{8,9}$/)){
        	exp+="Cep invalido ! </br> " + "</br>";
        }
        if(!$("#telfixoedit").val().match(/^\d{10,13}$/)){    
            exp+="Telefone Fixo invalido ! </br> " + "</br>";
        }
    	return exp;
    };
    // ------------------------

    ONG.pessoaJuridica.buscID = function( id ){
		ONG.pessoaRest.pesquisarId({
			data : id,
			success:function(dados){
				ONG.pessoaJuridica.buscaCidadeedit(dados.cidade.estado.id, function(){
					debugger;
					$("#id").val(dados.id);
		    		$("#razaosocialedit").val(dados.nome);
		    		$("#cnpjedit").val(dados.cnpj);
		    		$("#emailedit").val(dados.email);
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

    ONG.pessoaJuridica.editarPJ = function(){
    	var msg  = "";
    	if($("#id").val() == ""){
    		msg += " Impossivel editar pessoa Juridica, gentileza entrar em contato com o administrador, motivo sem campo id";
    	}
    	
		msg += ONG.pessoaJuridica.validaVazio("Razao Social: ", $("#razaosocialedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Cnpj: ", $("#cnpjedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Email: ", $("#emailedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Telefone Fixo: ", $("#telfixoedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Estado: ", $("#estadoedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Cidade: ", $("#cidadeedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Bairro: ", $("#bairroedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Rua: ", $("#ruaedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Complemento: ", $("#complementoedit").val());
		msg += ONG.pessoaJuridica.validaVazio("Numero: ", $("#numeroedit").val());

    	if(msg == ""){
    		var exp = ONG.pessoaJuridica.validaCamposedit();
    		if(exp == ""){
		    	var dadosPJ= {
		    		id: $("#id").val(),
		    		nome: $("#razaosocialedit").val(),
		    		tipo: 2,
		    		status: 1,
		    		cnpj: $("#cnpjedit").val(),
		    		email: $("#emailedit").val(),
		    		nascimento: $("#datanascimentoedit").val(),
		    		foneFixo: $("#telfixoedit").val(),
		    		foneMovel: $("#telmoveledit").val(),
		    		bairro: $("#bairroedit").val(),
		    		rua: $("#ruaedit").val(),
		    		complemento: $("#complementoedit").val(),
		    		numero: $("#numeroedit").val(),
		    		cep: $("#cepedit").val(),
					cidade : { 
						id: parseInt($("#cidadeedit").val())
					}					
		    	};
		    	
				ONG.pessoaRest.editar({
					data : dadosPJ,
					success:function(msg) {	
        				bootbox.alert(msg);
        				ONG.pessoaJuridica.busca();
    					$('input').val('');
    					$('#modaledit').modal('toggle');
					},
					error: function(err) {	
						bootbox.alert("Erro ao Editar PJ"+err.responseText); 
					}
				});
		    }else{
		    	bootbox.alert(exp);
		    }
	    }else{
	    	bootbox.alert(msg);
	    }
    };
    
    ONG.pessoaJuridica.confExcluir = function(id){
		bootbox.confirm("Deseja Excluir?", function(confirmed) {
			if(confirmed) {
				ONG.pessoaRest.excluir({
					data : id,
					success : function(msg) {
						  console.log(msg);
						  ONG.pessoaJuridica.busca();
					},
					error : function(err) {
						  console.log('err' ,err);
						  bootbox.alert(err.responseText);
					} 
				});
			}
		}); 
	};

    ONG.pessoaJuridica.buscaEstado = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/nome/*",
			success: function(listEstado){													
				ONG.pessoaJuridica.montaSelectEstado(listEstado);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    };
    ONG.pessoaJuridica.buscaCidade = function(id) {
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade) {		
				ONG.pessoaJuridica.montaSelectCidade(listaCidade);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    };
    ONG.pessoaJuridica.montaSelectEstado = function(listEstado) {
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
				ONG.pessoaJuridica.buscaCidade( valor );
			});
		}
    };
    ONG.pessoaJuridica.montaSelectCidade = function( listaCidade ) {
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
    };
    // EDITAR CIDADE E ESTADO
    ONG.pessoaJuridica.buscaEstadoedit = function(){
    	var cfg = {							
			url: ONG.contextPath + "/rest/estado/nome/*",
			success: function(listEstado){													
				ONG.pessoaJuridica.montaSelectEstadoedit(listEstado);
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Estado, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    };
    ONG.pessoaJuridica.buscaCidadeedit = function(id, callback) {
    	var cfg = {							 
			url: ONG.contextPath +  "/rest/cidade/estado/" + id,
			success: function(listaCidade) {		
				ONG.pessoaJuridica.montaSelectCidadeedit(listaCidade);
				if(callback != undefined)
					callback();
			},
			error: function(err) {							
				bootbox.alert("Erro ao Buscar Cidade, entrar em contato com o Administrador se o problema persistir! " + err);
			}
		};					
		ONG.ajax.get(cfg);
    };
    ONG.pessoaJuridica.montaSelectEstadoedit = function(listEstado) {
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
				ONG.pessoaJuridica.buscaCidadeedit( valor );
			});
		}
    };
    ONG.pessoaJuridica.montaSelectCidadeedit = function( listaCidade ) {
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
    
    
    
    ONG.pessoaJuridica.modaladd = function(){    	
    	ONG.pessoaJuridica.buscaEstado();
    };
    
    ONG.pessoaJuridica.modaledit = function(idPess){
		ONG.pessoaJuridica.buscaEstadoedit();
		ONG.pessoaJuridica.buscID(idPess);
    };
});

