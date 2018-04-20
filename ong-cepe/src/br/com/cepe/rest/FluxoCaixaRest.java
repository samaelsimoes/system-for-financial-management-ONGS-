package br.com.cepe.rest;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.com.cepe.datatype.DataFmt;
import br.com.cepe.entity.pojo.caixa.Operacao;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.date.DateFactory;
import br.com.cepe.factory.entity.fluxoCaixa.OperacaoFactory;
import br.com.cepe.factory.util.ObjMapper;
import br.com.cepe.service.FluxoCaixaService;

@Path("/operacao")
public class FluxoCaixaRest extends ObjMapper {

	public FluxoCaixaRest() {
	}

	@POST
	@Consumes("application/*")
	public Response adicionar(String operacaoStr) throws GlobalException {
		try {
			Operacao operacao = new OperacaoFactory(operacaoStr).getOperacao();
					
			if(operacao != null)
				new FluxoCaixaService(operacao).adicionar();
			else
				throw new GlobalException("Erro ao executar operação, entre em contato com um adminsitratdor ");
			return this.buildResponse("Cadastro concluido com sucesso.");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/nome/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarClassificacao(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Operacao> operacoes = new FluxoCaixaService(nome).pesquisaClassificacaoContem();
			String resp = getJson(operacoes);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome!");
		}
	}

	@GET
	@Path("/pessoa/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarPessoaNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Operacao> operacoes = new FluxoCaixaService(nome).pesquisaPessoaContem();
			String resp = getJson(operacoes);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}
	
	
	@GET
	@Path("/evento/{nome}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarEventoNome(@PathParam("nome") String nome) throws GlobalException {
		try {
			
			List<Operacao> operacoes = new FluxoCaixaService(nome).pesquisaEventoContem();
			String resp = getJson(operacoes);
			return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
 			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}
	
	
	@GET
	@Path("/periodo/{dataInicio}/{dataFim}/{centroCusto}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response pesquisarPeriodo(@PathParam("dataInicio") long dataInicioParam, 
			@PathParam("dataFim") long dataFimParam, @PathParam("centroCusto") int centroCusto ) throws GlobalException {
		
		try {
			if(dataInicioParam!= 0 && dataFimParam != 0){
				DateFactory dateFactory = new DateFactory();
							
				DateFormat formata = new SimpleDateFormat(dateFactory.getFmt(DataFmt.DT_HR_EUA));
				String dataInicio = formata.format(dataInicioParam);
				String dataFim= formata.format(dataFimParam);
				List<String> operacoes = new ArrayList<String>();
				operacoes.add(dataInicio);
				operacoes.add(dataFim);
				List<Operacao> result = new FluxoCaixaService().pesquisaPeriodo(operacoes, centroCusto);
				String resp = getJson(result);
				return Response.ok(resp ,MediaType.APPLICATION_JSON).build();
			}
			
			return null;
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por nome! ");
		}
	}
	
	

	@GET
	@Path("/centroCusto/{centroCusto}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarCentroCusto(@PathParam("centroCusto") int centroCusto) throws GlobalException {
		try {
			List<Operacao> operacoes = new FluxoCaixaService(centroCusto).pesquisaCentroCustoIgual();
			String resp = getJson(operacoes);
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a consulta por tipo");
		}
	}
	
	@GET
	@Path("/tipo/{tipo}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response pesquisarTipo(@PathParam("tipo") int tipo) throws GlobalException {
		try {
			List<Operacao> operacoes = new FluxoCaixaService(tipo).pesquisaTipoIgual();
			String resp = getJson(operacoes);
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
			Operacao operacao = new FluxoCaixaService(id).pesquisaId();
			if(operacao != null)
				resp = getJson(operacao);
			else
				throw new GlobalException("Erro ao buscar operação por Id! ");
			
			return Response.ok( resp ,MediaType.APPLICATION_JSON).build();
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@PUT
	@Consumes("application/*")
	public Response alterar(String operacaoStr) throws GlobalException { 
		try {
			Operacao operacao = new OperacaoFactory(operacaoStr).getOperacao();
			if(operacao != null)
				new FluxoCaixaService(operacao).alterar();
			else
				throw new GlobalException("Valor nulo enviado ao servidor! ");
			
			return this.buildResponse("Operação editada com sucesso.");
			
		} catch (Throwable e) {
			e.printStackTrace();
			return this.buildErrorResponse("Erro ao fazer a alteração da operação");
		}
	}

}