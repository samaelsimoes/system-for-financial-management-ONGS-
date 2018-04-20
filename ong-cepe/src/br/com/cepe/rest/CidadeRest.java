package br.com.cepe.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.endereco.Cidade;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.CidadeService;

@Path("/cidade")
public class CidadeRest extends ObjMapper {

	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("nome") int nome)
			throws GlobalException {
		try {
			List<Cidade> cidades = new CidadeService(nome).pesquisaNomeContem();
			String resp = getJson(cidades);
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
			Cidade cidade = new CidadeService(id).pesquisaId();
			if (cidade != null)
				resp = getJson(cidade);
			else
				throw new GlobalException("Erro ao buscar cidade por Id! ");

			return Response.ok(resp, MediaType.APPLICATION_JSON).build();

		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/estado/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarPorEstado(@PathParam("id") int id)
			throws GlobalException {
		String resp = null;
		try {
			String idStr = Integer.toString(id);
			List<Cidade> cidades = new CidadeService(id).pesquisaGeneric(
					"estado", HOperator.EQUALS, idStr);
			if (cidades != null)
				resp = getJson(cidades);
			else
				throw new GlobalException("Erro ao buscar cidade por Id! ");

			return Response.ok(resp, MediaType.APPLICATION_JSON).build();

		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
}