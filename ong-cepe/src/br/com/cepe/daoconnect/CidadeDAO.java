package br.com.cepe.daoconnect;

import br.com.cepe.entity.pojo.endereco.Cidade;

public class CidadeDAO extends OperationsDAO<Cidade>{

	public CidadeDAO() {
		super();
	}
	
	public CidadeDAO(int num) {
		this.num = num;
	}
	
	public CidadeDAO(Cidade cidade){
		this.entity = cidade;
	}
}
