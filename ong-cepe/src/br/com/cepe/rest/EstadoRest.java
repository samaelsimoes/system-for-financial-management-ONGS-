package br.com.cepe.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.cepe.entity.pojo.endereco.Estado;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.EstadoService;

@Path("/estado")
public class EstadoRest extends ObjMapper {
	
	
	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarNome(@PathParam("nome") String nome)
			throws GlobalException {
		try {
			List<Estado> estados = new EstadoService(nome).pesquisaNomeContem();
			String resp = getJson(estados);
			return Response.ok(resp, MediaType.APPLICATION_JSON).build();

		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome");
		}
	}

	@GET
	@Path("/id/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarId(@PathParam("id") int id) throws GlobalException {
		String resp = null;
		try {
			Estado estado = new EstadoService(id).pesquisaId();
			if (estado != null)
				resp = getJson(estado);
			else
				throw new GlobalException("Erro ao buscar estado por Id! ");

			return Response.ok(resp, MediaType.APPLICATION_JSON).build();

		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	
	

}
