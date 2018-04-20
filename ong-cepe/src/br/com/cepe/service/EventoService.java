package br.com.cepe.service;

import java.util.ArrayList;
import java.util.List;

import br.com.cepe.daoconnect.CidadeDAO;
import br.com.cepe.daoconnect.EventoDAO;
import br.com.cepe.daoconnect.FluxoCaixaDAO;
import br.com.cepe.daoconnect.ModalidadeDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.caixa.Operacao;
import br.com.cepe.entity.pojo.endereco.Cidade;
import br.com.cepe.entity.pojo.evento.Evento;
import br.com.cepe.entity.pojo.modalidade.Modalidade;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;

public class EventoService  implements Service<Evento>{	

	protected Evento evento;
	protected String valorStr;
	protected int num;
	
	public EventoService() {
	}

	public EventoService(Evento evento) {
		this.evento = evento;
	}
	

	public EventoService(String valorStr) {
		this.valorStr = valorStr;
	}

	public EventoService(int num) {
		this.num = num;
	}

	public void adicionar()  throws GlobalException {
		
		if(this.evento != null & this.evento.getCidade().getId() != 0){
			List<Cidade> cidades = new CidadeDAO().findGenericInt("id", HOperator.EQUALS, this.evento.getCidade().getId());
			if(cidades != null & cidades.get(0) != null)
				this.evento.setCidade(cidades.get(0));
		}else{
			throw new GlobalException("Erro ao adicionar evento, nenhum endereço vínculado");
		}		
		
		if(this.evento != null & this.evento.getModalidade().getId() != 0){
			List<Modalidade> modalidades = new ModalidadeDAO().findGenericInt("id", HOperator.EQUALS, this.evento.getModalidade().getId());
			if(modalidades != null & modalidades.get(0) != null)
				this.evento.setModalidade(modalidades.get(0));
		}else{
			throw new GlobalException("Erro ao adicionar evento, nenhuma modalidade vínculada");
		}		
		
		new EventoDAO(this.evento).persist();
	}

	public void adicionarLista (List<Evento> eventos) throws GlobalException {
		for (Evento evento : eventos) {
			evento.setCidade(new CidadeService(evento.getCidade()).pesquisaId());
			this.evento = evento;
			adicionar();
		}
	}
	
	public Evento pesquisaId()  throws GlobalException {
		return new EventoDAO(this.num).findId();
	}
	
	public List<Evento> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
		return (List<Evento>) new EventoDAO().findGeneric(campo, operacao, valor);
	}

	public List<Evento> pesquisaTipoIgual() throws GlobalException {
		String tipo = Integer.toString(this.num);
		return (List<Evento>) new EventoDAO().findGeneric("tipo", HOperator.EQUALS, tipo);
	}
	
	public List<Evento> pesquisaModalidade() throws GlobalException {
		Integer id = this.num;
		return (List<Evento>) new EventoDAO().findGenericInt("modalidade_id", HOperator.EQUALS, id);
	}
	

	public List<Evento> pesquisaNomeContem() throws GlobalException {
		return (List<Evento>) new EventoDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
	}
	
	public List<Evento> pesquisaCidadeContem() throws GlobalException {
		List<Evento> eventosBusca = null;
		List<Evento> eventos = null;
		List<Cidade> cidades = new CidadeDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);

		for (Cidade cidade : cidades) {
			if (cidade != null && cidade.getId() !=0)
			 eventosBusca = new EventoDAO().findGenericInt("cidade_id", HOperator.CONTAINS, cidade.getId());

			if (!eventosBusca.isEmpty() || eventosBusca != null) {
				if(eventos == null)
				 eventos = new ArrayList<Evento>();
				
				for (Evento evento : eventosBusca) {
					if (evento != null)
						eventos.add(evento);
				}
			}

		}
		if (eventos.isEmpty() || eventos == null)
			throw new GlobalException("Não existem eventos para esta cidade");

		return eventos;
	}
	
	public List<Evento> pesquisaDataContem()throws GlobalException{
		return (List<Evento>) new EventoDAO().findGeneric("data", HOperator.CONTAINS, valorStr);
	}
	
	public void alterar()  throws GlobalException{		
		new EventoDAO(this.evento).update();		
	}

	@Override
	public List<Evento> pesquisaGeneric(String campo, HOperator operacao,
			int num) throws GlobalException {
		return null;
	}
	

	public void excluir()  throws GlobalException {
		
		List<Operacao> operacoes = new FluxoCaixaDAO().findGenericInt("evento_id", HOperator.EQUALS, this.num);
		if(operacoes.isEmpty())
			new EventoDAO(this.num).delete();
		else
			throw new GlobalException("Não foi possível excluir o evento, existem operações financeiras vinculadas");
		
	}


}
