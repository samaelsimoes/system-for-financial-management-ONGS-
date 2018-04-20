package br.com.cepe.factory.hql;

import java.util.List;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;

public class HqlFactoryList<T> extends HqlFactory{
private List<T> list;

	public HqlFactoryList() throws GlobalException {
		
	}

	public HqlFactoryList(List<T> list) throws GlobalException {
		this.list = list;
	}
	
	

	public String setQuery(){
		if(this.operacao.equals(HOperator.BETWEEN))
			return " BETWEEN "+list.get(0).toString()+" AND "+list.get(1).toString();
		else return null;
	}
}
