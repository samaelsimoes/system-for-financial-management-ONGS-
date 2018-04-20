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

import br.com.cepe.entity.pojo.evento.Evento;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.entity.evento.EventoFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.EventoService;

@Path("/evento")
public class EventoRest extends ObjMapper {

	public EventoRest() {
	}

	@POST
	@Consumes("application/*")
	public Response adicionar(String eventoStr) throws GlobalException {
		try {
			Evento evento = new EventoFactory(eventoStr).getEvento();
					
			if(evento != null)
				new EventoService(evento).adicionar();
			else
				throw new GlobalException("Falha ao adicionar evento! ");
			
			return this.buildResponse("Cadastro concluido com sucesso.");
			
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
			List<Evento> eventos = new EventoService(nome).pesquisaNomeContem();
			String resp = getJson(eventos);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}
	
	@GET
	@Path("/data/{data}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarData(@PathParam("data") String data) throws GlobalException {
		try {
			List<Evento> eventos = new EventoService(data).pesquisaDataContem();
			String resp = getJson(eventos);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por data! ");
		}
	}

	@GET
	@Path("/cidade/{cidade}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarCidade(@PathParam("cidade") String cidade) throws GlobalException {
		try {
			List<Evento> eventos = new EventoService(cidade).pesquisaCidadeContem();
			String resp = getJson(eventos);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}
	
	@GET
	@Path("/tipo/{tipo}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("tipo") int tipo) throws GlobalException {
		try {
			List<Evento> eventos = new EventoService(tipo).pesquisaTipoIgual();
			String resp = getJson(eventos);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por tipo");
		}
	}
	
	@GET
	@Path("/id/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarId(@PathParam("id") int id) throws GlobalException {
		String resp = null;
		try {
			Evento evento = new EventoService(id).pesquisaId();
			if(evento != null)
				resp = getJson(evento);
			else
				throw new GlobalException("Erro ao buscar evento por Id! ");
			
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/modalidade/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarModalidadeId(@PathParam("id") int id) throws GlobalException {
		String resp = null;
		try {
			Evento evento = new EventoService(id).pesquisaId();
			if(evento != null)
				resp = getJson(evento);
			else
				throw new GlobalException("Erro ao buscar evento por Id! ");
			
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@PUT
	@Consumes("application/*")
	public Response alterar(String eventoStr) throws GlobalException { 
		try {
			
			Evento evento = new EventoFactory(eventoStr).getEvento();
			if(evento != null)
				new EventoService(evento).alterar();
			else
				throw new GlobalException("Valor nulo enviado ao servidor! ");
			return this.buildResponse("Evento editada com sucesso.");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a alteração do usuário");
		}
	}

	@DELETE
	@Path("/id/{id}")
	public Response excluir(@PathParam("id") int id) throws Exception {
		try{
			new EventoService(id).excluir();
			return this.buildResponse("Excluido com sucesso.");
		}catch(Throwable e){
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao deletar usuário");
		}
	}
}