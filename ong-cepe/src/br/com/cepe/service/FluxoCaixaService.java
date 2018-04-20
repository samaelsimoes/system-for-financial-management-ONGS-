package br.com.cepe.service;

import java.util.ArrayList;
import java.util.List;

import br.com.cepe.daoconnect.EventoDAO;
import br.com.cepe.daoconnect.FluxoCaixaDAO;
import br.com.cepe.daoconnect.PessoaDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.caixa.Operacao;
import br.com.cepe.entity.pojo.evento.Evento;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.hql.HqlFactoryList;
import br.com.cepe.interfaces.Service;

public class FluxoCaixaService implements Service<Operacao> {

	protected Operacao operacao;
	protected List<Operacao> operacoes;
	protected String valorStr;
	protected int num;

	public FluxoCaixaService() {
	}

	public FluxoCaixaService(Operacao operacao) {
		this.operacao = operacao;
	}

	public FluxoCaixaService(String valorStr) {
		this.valorStr = valorStr;
	}

	public FluxoCaixaService(int num) {
		this.num = num;
	}

	public void adicionar() throws GlobalException {

		float valor = 0;
		
		if (this.operacao != null) {
			new FluxoCaixaDAO(this.operacao).persist();
			
			if (this.operacao.getTipo() == 2) {

				Operacao op = new Operacao();
				op.setCentroCusto(this.operacao.getCentroCustoDestino());
				op.setEvento(this.operacao.getEvento());
				op.setPessoa(this.operacao.getPessoa());
				op.setUsuario(this.operacao.getUsuario());
				op.setTipo(0);
				op.setClassificacao(this.operacao.getClassificacao());
				op.setData(this.operacao.getData());
				op.setDescricao(this.operacao.getDescricao());
				valor = this.operacao.getValor();
				op.setValor(valor);
				new FluxoCaixaDAO(op).persist();			
			}
		} else if (this.operacao.getTipo() > 2) {
			throw new GlobalException("Tipo de operação inválido");
		}
		
		
		
	}

	public void adicionarLista(List<Operacao> operacoes) throws GlobalException {
		for (Operacao operacao : operacoes) {
			this.operacao = operacao;
			adicionar();
		}
	}

	public Operacao pesquisaId() throws GlobalException {
		this.operacao = new FluxoCaixaDAO(this.num).findId();
		return this.operacao;
	}

	public List<Operacao> pesquisaGeneric(String campo, HOperator operacao,
			String valor) throws GlobalException {
		this.operacoes = new FluxoCaixaDAO()
				.findGeneric(campo, operacao, valor);
		return this.operacoes;
	}

	public List<Operacao> pesquisaGeneric(String campo, HOperator operacao,
			int num) throws GlobalException {
		this.operacoes = new FluxoCaixaDAO().findGenericInt(campo, operacao,
				num);
		return this.operacoes;
	}

	public List<Operacao> pesquisaPeriodo(List<String> periodos, int num)
			throws GlobalException {
		HqlFactoryList<Operacao> hqlFactoryList = new HqlFactoryList<Operacao>();
		FluxoCaixaDAO fluxoCaixaDAO = new FluxoCaixaDAO(hqlFactoryList);
		fluxoCaixaDAO.setFindParams("centroCusto_id", HOperator.EQUALS, num);
		fluxoCaixaDAO.setFindParams("data", HOperator.BETWEEN, periodos);
		fluxoCaixaDAO.setAnd();
		this.operacoes = fluxoCaixaDAO.findGenericBetween();
		return this.operacoes;
	}

	public List<Operacao> pesquisaTipoIgual() throws GlobalException {
		String tipo = Integer.toString(this.num);
		this.operacoes = new FluxoCaixaDAO().findGeneric("tipo",
				HOperator.EQUALS, tipo);
		return this.operacoes;
	}

	public List<Operacao> pesquisaCentroCustoIgual() throws GlobalException {
		String tipo = Integer.toString(this.num);
		this.operacoes = new FluxoCaixaDAO().findGeneric("centroCusto_id",
				HOperator.EQUALS, tipo);
		return this.operacoes;
	}

	public List<Operacao> pesquisaNomeContem() throws GlobalException {
		this.operacoes = new FluxoCaixaDAO().findGeneric("nome",
				HOperator.CONTAINS, this.valorStr);
		return this.operacoes;
	}

	public List<Operacao> pesquisaClassificacaoContem() throws GlobalException {
		this.operacoes = new FluxoCaixaDAO().findGeneric("classificacao",
				HOperator.CONTAINS, this.valorStr);
		return this.operacoes;
	}

	public List<Operacao> pesquisaPessoaContem() throws GlobalException {
		List<Pessoa> pessoas = new PessoaDAO().findGeneric("nome",
				HOperator.CONTAINS, this.valorStr);
		if (pessoas != null && !pessoas.isEmpty()) {
			this.operacoes = new ArrayList<Operacao>();
			for (Pessoa pessoa : pessoas) {
				List<Operacao> operacoesGen = new FluxoCaixaDAO()
						.findGenericInt("pessoa_id", HOperator.EQUALS,
								pessoa.getId());
				if (operacoesGen != null && !operacoesGen.isEmpty()) {
					for (Operacao operacao : operacoesGen) {
						this.operacao = operacao;
						// montaOperacao();
						this.operacoes.add(this.operacao);
					}
				}
			}

		}
		return this.operacoes;
	}

	public List<Operacao> pesquisaEventoContem() throws GlobalException {
		List<Evento> eventos = new EventoDAO().findGeneric("nome",
				HOperator.CONTAINS, this.valorStr);
		if (eventos != null && !eventos.isEmpty()) {
			this.operacoes = new ArrayList<Operacao>();
			for (Evento evento : eventos) {
				List<Operacao> operacoesGen = new FluxoCaixaDAO()
						.findGenericInt("evento_id", HOperator.EQUALS,
								evento.getId());
				if (operacoesGen != null && !operacoesGen.isEmpty()) {
					for (Operacao operacao : operacoesGen) {
						this.operacoes.add(operacao);
					}
				}
			}

		}
		return this.operacoes;
	}

	public void excluir() throws GlobalException {
		new FluxoCaixaDAO(this.num).delete();
	}

	public void alterar() throws GlobalException {
		new FluxoCaixaDAO(this.operacao).update();
	}

}
