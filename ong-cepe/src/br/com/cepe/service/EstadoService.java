package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.EstadoDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.endereco.Estado;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;


public class EstadoService implements Service<Estado>{	

		protected Estado estado;
		protected String valorStr;
		protected int num;
		
		public EstadoService() {
		}

		public EstadoService(Estado estado) {
			this.estado = estado;
		}

		public EstadoService(String valorStr) {
			this.valorStr = valorStr;
		}

		public EstadoService(int num) {
			this.num = num;
		}
		
		public Estado pesquisaId() throws GlobalException {
			return new EstadoDAO(this.num).findId();
		}

		public List<Estado> pesquisaNomeIgual() throws GlobalException {
			String nome = Integer.toString(this.num);
			return (List<Estado>) new EstadoDAO().findGeneric("nome", HOperator.EQUALS, nome);
		}

		public List<Estado> pesquisaNomeContem() throws GlobalException {
			return (List<Estado>) new EstadoDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
		}

		public List<Estado> pesquisaEstado() throws GlobalException {
			String nome = Integer.toString(this.num);
			return (List<Estado>) new EstadoDAO().findGeneric("id", HOperator.EQUALS, nome);
		}

		public List<Estado> pesquisaGeneric(String campo, HOperator operacao, String valor) throws GlobalException {
			 return (List<Estado>) new EstadoDAO().findGeneric(campo, operacao, valor);
		}

		
		public List<Estado> pesquisaGeneric(String campo, HOperator operacao, int num) throws GlobalException {
			 return (List<Estado>) new EstadoDAO().findGenericInt(campo, operacao, num);
		}

		
		public List<Estado> pesquisaTipoIgual() throws GlobalException {
			return (List<Estado>) new EstadoDAO().findGenericInt("tipo", HOperator.EQUALS, this.num);
		}


		public void adicionar() throws GlobalException {
		}
		
		public void adicionarLista(List<Estado> objects) throws GlobalException {
		}
		
		public void alterar() throws GlobalException {
		}

		public void excluir() throws GlobalException {
		}
}
