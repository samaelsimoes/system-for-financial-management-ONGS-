/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.service;

import java.util.List;

import br.com.cepe.daoconnect.CentroCustoDAO;
import br.com.cepe.daoconnect.ModalidadeDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.centroCusto.CentroCusto;
import br.com.cepe.entity.pojo.modalidade.Modalidade;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;

public class ModalidadeService  implements Service<Modalidade>{	


	protected Modalidade modalidade;
	protected String valorStr;
	protected int num;
	
	
	public ModalidadeService() {
	}

	public ModalidadeService(Modalidade modalidade) {
		this.modalidade = modalidade;
	}

	public ModalidadeService(String valorStr) {
		this.valorStr = valorStr;
	}

	public ModalidadeService(int num) {
		this.num = num;
	}

	public void adicionar()  throws GlobalException {
		List<CentroCusto> centrosCusto = null;
		if(this.modalidade.getCentroCusto() != null && this.modalidade.getCentroCusto().getId() != 0)
		 centrosCusto = new CentroCustoDAO().findGenericInt("id", HOperator.EQUALS, this.modalidade.getCentroCusto().getId());

		if(centrosCusto != null && !centrosCusto.isEmpty()){	
			this.modalidade.setCentroCusto(centrosCusto.get(0));
			new ModalidadeDAO(this.modalidade).persist();
		}else{
			throw new GlobalException("A modalidade deve estar vinculada a um centro de custo");
		}
	}

	public void adicionarLista (List<Modalidade> modalidades) throws GlobalException {
		for (Modalidade modalidade : modalidades) {
			this.modalidade = modalidade;
			adicionar();
		}
	}
	
	public Modalidade pesquisaId()  throws GlobalException {
		return new ModalidadeDAO(this.num).findId();
	}
	
	public List<Modalidade> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
		return (List<Modalidade>) new ModalidadeDAO().findGeneric(campo, operacao, valor);
	}

	public List<Modalidade> pesquisaTipoIgual() throws GlobalException {
		String tipo = Integer.toString(this.num);
		return (List<Modalidade>) new ModalidadeDAO().findGeneric("tipo", HOperator.EQUALS, tipo);
	}

	public List<Modalidade> pesquisaNomeContem() throws GlobalException {
		return (List<Modalidade>) new ModalidadeDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
	}

	public void excluir()  throws GlobalException {
		new ModalidadeDAO(this.num).delete();
	}

	public void alterar()  throws GlobalException{
		new ModalidadeDAO(this.modalidade).update();
	}

	public List<Modalidade> pesquisaGeneric(String campo, HOperator operacao,
			int num) throws GlobalException {
		return null;
	}



}
