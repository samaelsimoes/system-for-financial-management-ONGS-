package br.com.cepe.daoconnect;

import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.factory.hql.HqlFactoryList;

public class UsuarioDAO extends OperationsDAO<Usuario> {
	public UsuarioDAO() {
		super();
	}

	public UsuarioDAO(int num) {
		super.num = num;
	}

	public UsuarioDAO(Usuario usuario) {
		super.entity = usuario;
	}
	
	public UsuarioDAO(HqlFactoryList<Usuario> hqlFactoryList) {
		this.hqlFactoryList = hqlFactoryList;
	}

}
