package br.com.cepe.interfaces;

import java.util.List;

import br.com.cepe.datatype.HOperator;
import br.com.cepe.exception.GlobalException;

public interface Service<T> {
	
	public void adicionar() throws GlobalException;
	public void adicionarLista(List<T> objects) throws GlobalException;
	public T pesquisaId() throws GlobalException;
	public List<T> pesquisaGeneric(String campo, HOperator operacao, String valor) throws GlobalException;
	public List<T> pesquisaGeneric(String campo, HOperator operacao, int num) throws GlobalException;
	public List<T> pesquisaTipoIgual() throws GlobalException;
	public List<T> pesquisaNomeContem() throws GlobalException;
	public void alterar() throws GlobalException;
	public void excluir() throws GlobalException;
}
