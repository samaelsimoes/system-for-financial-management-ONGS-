package br.com.cepe.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.usuario.UsuarioFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.security.Criptografia;
import br.com.cepe.service.UsuarioService;

@Path("/usuario")
public class UsuarioRest extends ObjMapper{

	public UsuarioRest() {
	}
	
	@POST
	@Consumes("application/*")
	public Response adicionar(String usuarioStr) throws GlobalException {
		try {
			
			Usuario usuario = new UsuarioFactory(usuarioStr).getUsuario();
			
			Criptografia bases = new Criptografia();

			String base64 = usuario.getSenha();
			String desconvertido = bases.decode64(base64);
			String hashd5 = Criptografia.criptografar(desconvertido);
			
			usuario.setSenha(hashd5);
			if(usuario != null)
				new UsuarioService(usuario).adicionar();
			
			
			return this.buildResponse("Cadastrado com sucesso.");
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Usuario> usuarios = new UsuarioService(nome).pesquisaNomeContem();
			String resp = getJson(usuarios);
			if(resp != null)
				return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			else
				throw new GlobalException("Erro ao fazer a consulta por nome");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/tipo/{tipo}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("tipo") String tipo) throws GlobalException {
		try {
			List<Usuario> usuarios = new UsuarioService(tipo).pesquisaTipoIgual();
			String resp = getJson(usuarios);
			if(resp != null)
				return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			else
				throw new GlobalException("Erro ao fazer a consulta por tipo");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	
	@GET
	@Path("/id/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("id") int id) throws GlobalException {
		try {
			Usuario usuario = new UsuarioService(id).pesquisaId();
			String resp = getJson(usuario);
			if(resp != null)
				return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			else
				throw new GlobalException("Erro ao fazer a consulta por id");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@PUT
	@Consumes("application/*")
	public Response alterar(String usuarioStr) throws GlobalException { 
		try {
			Usuario usuario = new UsuarioFactory(usuarioStr).getUsuario();
			new UsuarioService(usuario).alterar();

			return this.buildResponse("Editado com sucesso.");
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a alteração do usuário");
		}
	}

	@DELETE
	@Path("{id}")
	@Consumes("application/*")
	public Response excluir(@PathParam("id") int id) throws Exception {
		try{
		new UsuarioService(id).excluir();
//		return Response.ok().build();
		return this.buildResponse("Excluído com sucesso.");

		}catch(Throwable e){
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao deletar usuário");
		}
	}
	
	

}
