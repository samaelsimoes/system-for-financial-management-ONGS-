package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.PessoaDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;

public class PessoaService  implements Service<Pessoa>{	

	protected Pessoa pessoa;
	protected String valorStr;
	protected int num;
	
	public PessoaService() {
	}

	public PessoaService(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public PessoaService(String valorStr) {
		this.valorStr = valorStr;
	}

	public PessoaService(int num) {
		this.num = num;
	}

	public void adicionar()  throws GlobalException {
		new PessoaDAO(this.pessoa).persist();
	}

	public void adicionarLista (List<Pessoa> pessoas) throws GlobalException {
		for (Pessoa pessoa : pessoas) {
			pessoa.setCidade(new CidadeService(pessoa.getCidade()).pesquisaId());
			this.pessoa = pessoa;
			adicionar();
		}
	}
	
	public Pessoa pesquisaId()  throws GlobalException {
		return new PessoaDAO(this.num).findId();
	}
	
	public List<Pessoa> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
		return (List<Pessoa>) new PessoaDAO().findGeneric(campo, operacao, valor);
	}

	public List<Pessoa> pesquisaTipoIgual() throws GlobalException {
		String tipo = Integer.toString(this.num);
		return (List<Pessoa>) new PessoaDAO().findGeneric("tipo", HOperator.EQUALS, tipo);
	}

	public List<Pessoa> pesquisaNomeContem() throws GlobalException {
		return (List<Pessoa>) new PessoaDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
	}

	public void excluir()  throws GlobalException {
		Pessoa pessoa = new PessoaDAO(this.num).findId();
			if(pessoa != null ){
			pessoa.setStatus(0);
			new PessoaDAO(pessoa).update();
		}
	}

	public void alterar()  throws GlobalException{		
			new PessoaDAO(this.pessoa).update();		
	}

	@Override
	public List<Pessoa> pesquisaGeneric(String campo, HOperator operacao, int num) throws GlobalException {
		return null;
	}
}
