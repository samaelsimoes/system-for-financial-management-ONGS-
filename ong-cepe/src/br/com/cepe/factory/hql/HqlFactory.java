/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.hql;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;

public class HqlFactory{
protected  String select;
protected HOperator operacao;
protected String valor;
protected String entity;
protected String query= null;


	public HqlFactory()	throws GlobalException {
	}
	
	public String getSelect(String entity, String campo){
		this.entity = entity;
		String select = "SELECT e FROM "+entity+" e WHERE "+campo+" ";
		this.select = select;
		return select;
	}
	
	public String getQuery(String select, HOperator operacao, String valor) throws GlobalException{
		this.select = select;
		this.operacao = operacao;
		this.valor = valor;
		String query = null;
		
		if (!select.equals(null) && operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=this.select+getOperation();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	public String getQuery(HOperator operacao, String valor) throws GlobalException{
		this.operacao = operacao;
		this.valor = valor;
		String query = null;
		
		if (!select.equals(null) && operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=this.select+getOperation();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	public String getAnd(String campo, HOperator hOperator, Integer val) throws GlobalException{
		if(!campo.equals(null) && !campo.equals("") && hOperator != null &&  !val.equals(null))
			return " AND "+valor;		
		else return null;
	};
	
	public String getAnd(String campo, HOperator hOperator, String val) throws GlobalException{
		
		if(!campo.equals(null) && !campo.equals("") && hOperator != null &&  !val.equals(null)){
			this.operacao= hOperator;
			return " AND "+campo+" "+getOperation()+" "+valor;		
		}
		else return null;
	};
	
	public String getRawOperationQuery(HOperator operacao, int num) throws GlobalException{
		this.operacao = operacao;
		String query = null;
		if(num != 0)
			this.valor = Integer.toString(num);		
		
		if (operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=getOperation();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	public String getRawOperationQuery(HOperator operacao, String valor) throws GlobalException{
		this.operacao = operacao;
		String query = null;
		if(!valor.equals(null) && !valor.equals(""))
			this.valor = valor;		
		if (operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=getOperation();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	

	public String getRawQuery(HOperator operacao, String valor) throws GlobalException{
		this.operacao = operacao;
		String query = null;
		this.valor = valor;
		
		if (!select.equals(null) && operacao != null && !valor.equals(null) && !valor.equals("*"))
			query=getOperation();		
		else if (valor.equals("*"))
			query= "SELECT e FROM "+entity+" e ";
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	

	
	
	public String getQuery(String select, HOperator operacao, int num) throws GlobalException{
		this.select = select;
		this.operacao = operacao;
		String query = null;
		if(num != 0)
			this.valor = Integer.toString(num);
		
		if (!select.equals(null) && operacao != null && valor != null)
			query=select+getOperation();		
		else
			throw new GlobalException(" Não é possível montar a query com campos vazios!");
		
		return query;
	}
	
	
	private String getOperation() throws GlobalException{
		String iniPercent = "'%";
		String fimPercent = "%'";
		
		if(this.operacao.equals(HOperator.EQUALS))
			return " = '"+this.valor+"'";		
		else if(this.operacao.equals(HOperator.DIFFERENT))
			return " != '"+this.valor+"'";
		else if(this.operacao.equals(HOperator.CONTAINS))
			return " LIKE "+iniPercent+this.valor+fimPercent+"";		
		else if(this.operacao.equals(HOperator.INITS_WITH))
			return " LIKE "+this.valor+fimPercent+"";		
		else if(this.operacao.equals(HOperator.TERMINATES_WITH))
			return " LIKE "+iniPercent+this.valor+"";	
		else if(this.operacao.equals(HOperator.MINOR))
			return " < "+this.valor+"";	
		else if(this.operacao.equals(HOperator.MAJOR))
			return " > "+this.valor+"";
		return null;
	}
	
	

}
