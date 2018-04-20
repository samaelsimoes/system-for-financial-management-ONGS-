package br.com.cepe.service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import br.com.cepe.daoconnect.UsuarioDAO;
import br.com.cepe.datatype.HOperator;
import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.interfaces.Service;
import br.com.cepe.security.Criptografia;

public class UsuarioService implements Service<Usuario>{

	
	protected Usuario usuario;
	protected List<Usuario> usuarios;
	protected String valorStr;
	protected int num;
	
	public UsuarioService() {
	}

	public UsuarioService(Usuario usuario) {
		this.usuario = usuario;
	}

	public UsuarioService(String valorStr) {
		this.valorStr = valorStr;
	}

	public UsuarioService(int num) {
		this.num = num;
	}

	public void setSenha(){
		if(!this.usuario.getSenha().equals(null) && !this.usuario.getSenha().equals(""))
			 this.usuario.setSenha("*****");
			else 
			 this.usuario.setSenha("");
	} 
	
	public void setSenhas(){
	 for(Usuario usuario: this.usuarios){
		if(!usuario.getSenha().equals(null) && !usuario.getSenha().equals(""))
			 usuario.setSenha("*****");
			else 
			 usuario.setSenha("");
		}
	} 
	
	public void adicionar()  throws GlobalException {
		new UsuarioDAO(this.usuario).persist();
	}

	public void adicionarLista (List<Usuario> usuarios) throws GlobalException {
		for (Usuario usuario : usuarios) {
			this.usuario = usuario;
			adicionar();
		}
	}
	
	public Usuario pesquisaId()  throws GlobalException {
		this.usuario = new UsuarioDAO(this.num).findId();
		setSenha();
		return this.usuario;
	}
	
	public List<Usuario> pesquisaGeneric (String campo, HOperator operacao, String valor) throws GlobalException {
		this.usuarios = (List<Usuario>) new UsuarioDAO().findGeneric(campo, operacao, valor);
		setSenhas();
		return this.usuarios;
	}
	
	public List<Usuario> pesquisaGeneric(String campo, HOperator operacao,
			int num) throws GlobalException {
		this.usuarios = (List<Usuario>) new UsuarioDAO().findGenericInt(campo, operacao, num);
		setSenhas();
		return this.usuarios;
	}


	public List<Usuario> pesquisaTipoIgual() throws GlobalException {
		this.usuarios = (List<Usuario>) new UsuarioDAO().findGeneric("tipo", HOperator.EQUALS, this.valorStr);
		setSenhas();
		return this.usuarios;
	}

	public List<Usuario> pesquisaNomeContem() throws GlobalException {
		this.usuarios = (List<Usuario>) new UsuarioDAO().findGeneric("nome", HOperator.CONTAINS, this.valorStr);
		setSenhas();
		return this.usuarios;
	}
	
	public List<Usuario> pesquisaUsuarioIgual() throws GlobalException {
		this.usuarios = (List<Usuario>) new UsuarioDAO().findGeneric("usuario", HOperator.EQUALS, this.valorStr);
		setSenhas();
		return this.usuarios;
	}	
	
	public void excluir()  throws GlobalException {
		Usuario usuario = new UsuarioDAO(this.num).findId();
		if(usuario != null ){
			usuario.setStatus(0);
			new UsuarioDAO(usuario).update(); 
		}
	}

	public void alterar()  throws GlobalException{
		Criptografia bases = new Criptografia();
		String base64 = null;
		String desconvertido = null;
		String hashd5 = null;
		try {
			if(!this.usuario.getSenha().equals(null) && !this.usuario.getSenha().equals("")){
				base64=usuario.getSenha();
				if(base64.equals(null) && !base64.equals(""));
					desconvertido = bases.decode64(base64);		
				if(desconvertido.equals(null) && !desconvertido.equals(""));
					hashd5 = Criptografia.criptografar(desconvertido);
				usuario.setSenha(hashd5);
			}else{
				throw new GlobalException("Erro ao alterar usuário");
			}
			
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		new UsuarioDAO(this.usuario).update();
	}

	

	
}
