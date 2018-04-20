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

import br.com.cepe.entity.pojo.centroCusto.CentroCusto;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.centroCusto.CentroCustoFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.CentroCustoService;

@Path("/centroCusto")
public class CentroCustoRest extends ObjMapper {

	public CentroCustoRest() {
	}

	@POST
	@Consumes("application/*")
	public Response adicionar(String centroCustoStr) throws GlobalException {
		try {
			CentroCusto centroCusto = new CentroCustoFactory(centroCustoStr).getCentroCusto();
					
			if(centroCusto != null)
				new CentroCustoService(centroCusto).adicionar();
			else
				throw new GlobalException("Valor nulo enviado ao servidor");
			
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
		String resp = null;
		try {
			
			List<CentroCusto> centroCustos = new CentroCustoService(nome).pesquisaNomeContem();
			resp = getJson(centroCustos);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por nome");
		}
	}
	
	@GET
	@Path("/tipo/{tipo}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("tipo") int tipo) throws GlobalException {
		try {
			List<CentroCusto> centroCustos = new CentroCustoService(tipo).pesquisaTipoIgual();
			String resp = getJson(centroCustos);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por tipo");
		}
	}
	
	@GET
	@Path("/id/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarId(@PathParam("id") int id) throws GlobalException {
		String resp = null;
		try {
			CentroCusto centroCusto = new CentroCustoService(id).pesquisaId();
			resp = getJson(centroCusto);
			if(resp != null)
				return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			else 
				throw new GlobalException("Erro ao consultar centro de custo por ID !");
			
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a consulta por ID");
		}
	}

	@PUT
	@Consumes("application/*")
	public Response alterar(String centroCustoStr) throws GlobalException { 
		try {
			System.out.println(centroCustoStr);
			CentroCusto centroCusto = new CentroCustoFactory(centroCustoStr).getCentroCusto(); 
			new CentroCustoService(centroCusto).alterar();
			
//			return Response.ok(centroCusto, "Centro de custo atualizado com sucesso!").build();
			return this.buildResponse("Centro de custo atualizado com sucesso!");
		} catch (Throwable e) {
			e.printStackTrace();
			throw new GlobalException("Erro ao fazer a alteração do centro de custo");
		}
	}

	@DELETE
	@Path("/id/{id}")
	public Response excluir(@PathParam("id") int id) throws Exception {
		try{
			new CentroCustoService(id).excluir();
			return this.buildResponse("Centro de custo excluído com sucesso.");
		
		}catch(Throwable e){
			e.printStackTrace();
			throw new Exception("Erro ao deletar centro de custo");
		}
	}

}