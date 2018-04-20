package br.com.cepe.daoconnect;

import br.com.cepe.entity.pojo.centroCusto.CentroCusto;

public class CentroCustoDAO extends OperationsDAO<CentroCusto>{

	public CentroCustoDAO() {
		super();
	}
	
	public CentroCustoDAO(int num) {
		this.num = num;
	}
	
	public CentroCustoDAO(CentroCusto centroCusto){
		this.entity = centroCusto;
	}
}
