package br.com.cepe.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.LoginService;

@Path("/login")
public class LoginRest extends ObjMapper{

	public LoginRest() {
	}
	

	@GET
	@Path("/{usuario}/{senha}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response pesquisarNome(@PathParam("usuario") String usuarioParam, @PathParam("senha") String senhaParam) throws GlobalException {
		Usuario usuario;
		
		try {
		if(!usuarioParam.equals(null) && !senhaParam.equals(null)){
				List<String> login = new ArrayList<String>();
				login.add(usuarioParam);
				login.add(senhaParam);	
			usuario = new Usuario();
			usuario = new LoginService(login).validaUsuarioSenha();
			String resp = getJson(usuario);
			if(resp != null)
				return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			else
				throw new GlobalException("Usuário ou senha incorreto!");
		}else{
			throw new GlobalException("Erro ao fazer login, contate o administrador.");
		}
			
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
}
