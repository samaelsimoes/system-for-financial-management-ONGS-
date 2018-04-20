ONG.usuario = new Object();
$(document).ready(function(){

	ONG.usuario.btnCancelar = function() {
		$(location).attr('href', ONG.contextPath+'/project/private/usuarios.html');
		return false;
	};
	$('#valorPesquisa').keypress(function(e) {
	    if(e.which == 13) 
	        ONG.usuario.pesquisar();
	});

	ONG.usuario.pesquisar = function() {
		var valorPesquisa = $("#valorPesquisa").val();
		ONG.usuario.exibirLista(undefined, valorPesquisa);
	};
	ONG.usuario.exibirLista = function(lista, valorPesquisa){
		var html = "<table id='tabela'  class='tablesorter table table-responsive custom-table-margin-b' >";
		html +=
					"<thead table table-striped>" +
						"<tr>" +
							"<th>Nome</th>" +
							"<th>Email</th>" +
							"<th>Tipo</th>" +
							"<th>Login</th>" +
							"<th>Status</th>" +
							"<th class='actions col-md-2'>Ações</th>" +
						"</tr>" +
					"</thead>";
		html +=		"<tbody>";
		if(lista != undefined && lista.length > 0 && lista[0].id != undefined){
			for(var i=0; i<lista.length; i++){
				html += "<tr>"+
				"<td>"+lista[i].nome+"</td>"+
				"<td>"+lista[i].email+"</td>";
				if(lista[i].tipo == 1){
					html += "<td>"+"Administrador"+"</td>";
				}
				if(lista[i].tipo == 3){
					html += "<td>"+"Financeiro"+"</td>";
				}
				if(lista[i].tipo == 2){
					html += "<td>"+"Professor"+"</td>";
				}
				html +="<td>"+lista[i].usuario+"</td>";	
				if(lista[i].status == 0){
					html += "<td><p>"+"<strong>Inativo</strong>"+"</p></td>";
				}
				if(lista[i].status == 1){
					html += "<td>"+"Ativo"+"</td>";
				}				
				html +="<td class='actions  text-center'>"+
				"<button type='button' class='btn btn-pencil' data-toggle='modal' data-target='#modaledit' data-whatever='@getbootstrap' onclick='ONG.usuario.carregarUsuario("+lista[i].id+")'>Editar</button>"+ " " + " " +
				"<button type='button' class='btn btn-trash' onclick='ONG.usuario.excluir("+ lista[i].id+ ")'>Excluir</button>"+
				"</td>"+
				"</tr>";
			}
		} else {
			if(lista == undefined || (lista != undefined && lista.length > 0)){
				if(valorPesquisa == ""){ valorPesquisa = "*"; }

				ONG.usuarioRest.pesquisarNome({
					data : valorPesquisa,
					success : function(lista) {
						ONG.usuario.exibirLista(lista);
					},
					error : function(err) {	console.log('err lista' ,err); } 
				});
			} else {
				html += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
			}
		}
		html += "</tbody>";
		html +="</table>";
		$("#exibiList").html(html);
		$('#tabela').tablesorter({
			headers: { 			// (começa do zero)
				5: {			// Desativa a ordenação para essa coluna 
					sorter: false 
				},
			},
		});
		//$('#tabela').tablesorter();
	};
	ONG.usuario.exibirLista(undefined, "");

	ONG.usuario.cadastrar = function(){
		var senha = btoa($("#senha").val());

		var newCad = {
				nome: $("#nome").val(),
				email:$("#email").val(),
				usuario:$("#login").val(),
				tipo:$("#tipo").val(),
				status: 1,
				senha:senha,
		};
		if (ONG.usuario.validar(newCad)) {
			
			ONG.usuarioRest.inserir({
				data : newCad,
				success : function(msg) {
//					bootbox.alert(msg, function(){ 
						bootbox.alert(msg);
						ONG.usuario.pesquisar();
						$('input').val('');
						$('#modaladd').modal('toggle');
//						$(location).attr('href', ONG.contextPath+'/project/private/usuarios.html'); 
//					});
				},
				error : function(err) {
					console.log('err' ,err);
					bootbox.alert("Erro ao cadastrar: <br/>"	+ err.responseText);
				} 
			});
		}// IF
	};// CADASTRAR

	ONG.usuario.excluir = function(id){
		bootbox.confirm("Deseja Excluir?", function(confirmed) {
			if(confirmed) {
				
				ONG.usuarioRest.excluir({
					data : id,
					success : function(msg) {
						  console.log(msg);
						  ONG.usuario.pesquisar();
					},
					error : function(err) {
						  console.log('err' ,err);
						  bootbox.alert(err.responseText);
					} 
				});
			}
		}); 
	};
	
	ONG.usuario.carregarUsuario = function(id){
		ONG.usuarioRest.pesquisarId({
			data : id,
			success : function(usuarioEdit) {
				$("#idEdit").val(usuarioEdit.id);
				$("#nomeEdit").val(usuarioEdit.nome);
				$("#emailEdit").val(usuarioEdit.email);
				$("#tipoEdit").val(usuarioEdit.tipo);
				$("#loginEdit").val(usuarioEdit.usuario);
			},
			error : function(err) {
				bootbox.alert("Erro ao exibir a edição: " + err.responseText);
			} 
		});
	};
	
	ONG.usuario.editar = function(){
		var senha = btoa($("#senhaEdit").val());
		
		var EditCad = {
				id: $("#idEdit").val(),
				nome: $("#nomeEdit").val(),
				email:$("#emailEdit").val(),
				usuario:$("#loginEdit").val(),
				tipo:$("#tipoEdit").val(),
				senha:senha,
                status:1
		};
		console.log('editar cadastro',EditCad);
		if (ONG.usuario.validarEdit(EditCad)) {
			ONG.usuarioRest.editar({
				data : EditCad,
				success : function(msg) {
					bootbox.alert(msg, function(){ 
						ONG.usuario.pesquisar();
						$('input').val('');
						$('#modaledit').modal('toggle');
					});				
				},
				error : function(err) {
					console.log('err' ,err);
					bootbox.alert("Erro ao editar: "	+ err.responseText);
				} 
			});
		}// IF		
	};

	ONG.usuario.validar = function(usuario) {

		var senhaConf = btoa($("#senhaConf").val());
		
		var aux = "";

		if (usuario.nome == "") {
			aux += "Nome é Obrigatório <br/>";
		}if (usuario.email == "") {
			aux += "Email é Obrigatório <br/>";
		}if (usuario.tipo == "" ) {
			aux += "Tipo é Obrigatório <br/>";
		}if (usuario.usuario == "" ) {
			aux += "Login é Obrigatório <br/>";
		}if (usuario.senha ==""){
			aux += "Senha é Obrigatório <br/>";
		}if (usuario.senha != senhaConf ) {
				aux += "Senhas inválidas <br/>";
				$("#senha").val("");
				$("#senhaConf").val("");
		}
		
		
		if (aux != "") {
			bootbox.alert(aux)
			return false;
		}
		return true;
	};
	ONG.usuario.validarEdit = function(usuario) {

		var senhaConf = btoa($("#senhaConfEdit").val());
		var aux = "";

		if (usuario.nome == "") {
			aux += "Nome é Obrigatório <br/>";
		}if (usuario.email == "") {
			aux += "Email é Obrigatório <br/>";
		}if (usuario.tipo == "" ) {
			aux += "Tipo é Obrigatório <br/>";
		}if (usuario.usuario == "" ) {
			aux += "Login é Obrigatório <br/>";
		}if (usuario.senha ==""){
			aux += "Senha é Obrigatório <br/>";
		}if (usuario.senha != senhaConf ) {
				aux += "Senhas inválidas <br/>";
				$("#senhaEdit").val("");
				$("#senhaConfEdit").val("");
		}
		
		
		if (aux != "") {
			bootbox.alert(aux)
			return false;
		}
		return true;
	};
});
