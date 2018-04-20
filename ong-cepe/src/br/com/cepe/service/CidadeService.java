package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.CidadeDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.endereco.Cidade;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;


public class CidadeService implements Service<Cidade>{	

		protected Cidade cidade;
		protected String valorStr;
		protected int num;
		
		public CidadeService() {
		}

		public CidadeService(Cidade cidade) {
			this.cidade = cidade;
		}

		public CidadeService(String valorStr) {
			this.valorStr = valorStr;
		}

		public CidadeService(int num) {
			this.num = num;
		}
		
		public Cidade pesquisaId() throws GlobalException {
			return (Cidade) new CidadeDAO(this.num).findId();
		}

		public List<Cidade> pesquisaNomeIgual() throws GlobalException {
			String nome = Integer.toString(this.num);
			return (List<Cidade>) new CidadeDAO().findGeneric("nome", HOperator.EQUALS, nome);
		}

		public List<Cidade> pesquisaNomeContem() throws GlobalException {
			return (List<Cidade>) new CidadeDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
		}

		public List<Cidade> pesquisaCidade() throws GlobalException {
			String nome = Integer.toString(this.num);
			return (List<Cidade>) new CidadeDAO().findGeneric("id", HOperator.EQUALS, nome);
		}

		public List<Cidade> pesquisaGeneric(String campo, HOperator operacao, String valor) throws GlobalException {
			 return (List<Cidade>) new CidadeDAO().findGeneric(campo, operacao, valor);
		}

		
		public List<Cidade> pesquisaGeneric(String campo, HOperator operacao, int num) throws GlobalException {
			 return (List<Cidade>) new CidadeDAO().findGenericInt(campo, operacao, num);
		}

		
		public List<Cidade> pesquisaTipoIgual() throws GlobalException {
			return (List<Cidade>) new CidadeDAO().findGenericInt("tipo", HOperator.EQUALS, this.num);
		}


		public void adicionar() throws GlobalException {
		}
		
		public void adicionarLista(List<Cidade> objects) throws GlobalException {
		}
		
		public void alterar() throws GlobalException {
		}

		public void excluir() throws GlobalException {
		}
}
