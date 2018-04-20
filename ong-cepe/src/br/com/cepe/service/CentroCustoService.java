/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.service;

import java.util.ArrayList;
import java.util.List;

import br.com.cepe.daoconnect.CentroCustoDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.centroCusto.CentroCusto;
import br.com.cepe.entity.pojo.modalidade.Modalidade;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;

public class CentroCustoService  implements Service<CentroCusto>{	
	
	protected CentroCusto centroCusto;
	protected List<CentroCusto> centrosCusto = null;
	protected String valorStr;
	protected int num;
	protected List<Modalidade> modalidades;
	
	
	public CentroCustoService() {
	}

	public CentroCustoService(CentroCusto centroCusto) {
		this.centroCusto = centroCusto;
	}

	public CentroCustoService(String valorStr) {
		this.valorStr = valorStr;
	}

	public CentroCustoService(int num) {
		this.num = num;
	}
	
	public void adicionar()  throws GlobalException {
		if(this.centroCusto.getModalidades() != null && !this.centroCusto.getModalidades().isEmpty()){
			List<Modalidade> listaModalidades = new ArrayList<Modalidade>();
			for(Modalidade modalidade: this.centroCusto.getModalidades()){
				modalidade = new ModalidadeService(modalidade).pesquisaId();			
				if(modalidade != null)	
					listaModalidades.add(modalidade);
			}		
			this.centroCusto.setModalidades(listaModalidades);
		}
		new CentroCustoDAO(this.centroCusto).persist();
	}

	public void adicionarLista (List<CentroCusto> centroCustoLista) throws GlobalException {
		for (CentroCusto centroCusto : centroCustoLista) {
			this.centroCusto = centroCusto;
			adicionar();
		}
	}

	public CentroCusto pesquisaId()  throws GlobalException {
		this.centroCusto = new CentroCustoDAO(this.num).findId(); 
		return this.centroCusto;
	}
	
	public List<CentroCusto> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
		this.centrosCusto = new CentroCustoDAO().findGeneric(campo, operacao, valor);		
		return this.centrosCusto;
	}

	public List<CentroCusto> pesquisaNomeContem() throws GlobalException {
		this.centrosCusto = new CentroCustoDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
		return this.centrosCusto;
	}

	public void excluir()  throws GlobalException {
		new CentroCustoDAO(this.num).delete();
	}

	public void alterar()  throws GlobalException{
		new CentroCustoDAO(this.centroCusto).update();
	}

	public List<CentroCusto> pesquisaTipoIgual() throws GlobalException {
		return null;
	}

	public List<CentroCusto> pesquisaGeneric(String campo, HOperator operacao,int num) throws GlobalException {
		return null;
	}
	

}
