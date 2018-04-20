package br.com.cepe.service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import br.com.cepe.daoconnect.UsuarioDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.hql.HqlFactoryList;
import br.com.cepe.security.Criptografia;

public class LoginService {
	private List<String> credenciais;

	public LoginService(List<String> credenciais) {
		this.credenciais = credenciais;

	}

	public Usuario validaUsuarioSenha() throws GlobalException {

		// TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
		try {
			List<Usuario> result = null;
			Usuario usuario = null;
			Criptografia bases = new Criptografia();
			String desconvertido = bases.decode64(credenciais.get(1));
			String hashd5 = Criptografia.criptografar(desconvertido);
			HqlFactoryList<Usuario> hqlFactoryList = new HqlFactoryList<Usuario>();
			UsuarioDAO usuarioDAO = new UsuarioDAO(hqlFactoryList);
			usuarioDAO.setFindParams("usuario", HOperator.EQUALS,
					credenciais.get(0));
			usuarioDAO.setFindParams("senha", HOperator.EQUALS, hashd5);
			usuarioDAO.setFindParams("status", HOperator.EQUALS, "1");
			usuarioDAO.setAnd();
			result = usuarioDAO.findGenericAND();
			if (result != null && !result.isEmpty())
				usuario = result.get(0);
			else
				return null;

			if (!usuario.getSenha().equals(null)
					&& !usuario.getSenha().equals(""))
				usuario.setSenha("*****");
			else
				usuario.setSenha("");

			return usuario;

		} catch (GlobalException | NoSuchAlgorithmException
				| UnsupportedEncodingException e) {
			e.printStackTrace();
			throw new GlobalException(e.getMessage());
		}

	}
}
