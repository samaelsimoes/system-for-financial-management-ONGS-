/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.daoconnect;

import br.com.cepe.entity.pojo.modalidade.Modalidade;

public class ModalidadeDAO extends OperationsDAO<Modalidade>{

	public ModalidadeDAO() {
		super();
	}
	
	public ModalidadeDAO(int num) {
		this.num = num;
	}
	
	public ModalidadeDAO(Modalidade modalidade){
		this.entity = modalidade;
	}
	
}
