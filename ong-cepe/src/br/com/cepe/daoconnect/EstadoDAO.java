/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.daoconnect;

import br.com.cepe.entity.pojo.endereco.Estado;

public class EstadoDAO extends OperationsDAO<Estado>{

	public EstadoDAO() {
		super();
	}
	
	public EstadoDAO(int num) {
		this.num = num;
	}
	
	public EstadoDAO(Estado estado){
		this.entity = estado;
	}
	
}
