/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.daoconnect;

import java.lang.reflect.ParameterizedType;

import javax.persistence.EntityManager;

import br.com.cepe.configuration.HConnect;
import br.com.cepe.dao.GenericEntityDAO;

public abstract class ConnectionDAO<T> extends HConnect implements GenericEntityDAO{
	protected EntityManager em;
	
	public ConnectionDAO(){
		em = getEntityManager();
	}
	
	public String getEntityName(){
		return getSuperClass().getSimpleName();
	}
	

	public Class<T> getEmClass(){
		Class<T> classe = getSuperClass();
		return classe;
	}
	
	public Class<T> getSuperClass(){
		ParameterizedType superclass = (ParameterizedType)getClass().getGenericSuperclass();
		@SuppressWarnings("unchecked")
		Class<T> classe = (Class<T>)superclass.getActualTypeArguments()[0];
		return classe;
	}

}
