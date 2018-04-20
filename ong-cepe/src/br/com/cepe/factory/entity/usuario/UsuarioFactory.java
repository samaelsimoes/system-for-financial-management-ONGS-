package br.com.cepe.factory.entity.usuario;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.codehaus.jackson.node.ObjectNode;

import br.com.cepe.entity.pojo.usuario.Administrador;
import br.com.cepe.entity.pojo.usuario.FinanceiroAdministrador;
import br.com.cepe.entity.pojo.usuario.FinanceiroUsuario;
import br.com.cepe.entity.pojo.usuario.Professor;
import br.com.cepe.entity.pojo.usuario.Usuario;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;

public class UsuarioFactory extends ObjMapper{
	private List<Usuario> usuarios = new ArrayList<Usuario>();
	private Class<?> usuarioClasse;
	private ObjectNode objNode;
	
	static final HashMap<Integer, Class<?>> USUARIO_CLASSES =  new HashMap<Integer, Class<?>>();
	static{
		USUARIO_CLASSES.put(0, null);
		USUARIO_CLASSES.put(1, Administrador.class);
		USUARIO_CLASSES.put(2, Professor.class);
		USUARIO_CLASSES.put(3, FinanceiroAdministrador.class);
		USUARIO_CLASSES.put(4, FinanceiroUsuario.class);
	}
	

	public UsuarioFactory(String usuarioStr) throws GlobalException {

		int tipo = 0;
		try {
			
			objNode = getObject().readValue(usuarioStr, ObjectNode.class);
			if (objNode != null)
				tipo = objNode.get("tipo").asInt();
			else
				throw new GlobalException(
						"Falha ao receber o atributo tipo de Usuario");

			if (tipo != 0) {
				
				this.usuarioClasse = USUARIO_CLASSES.get(tipo);

				if (this.usuarioClasse != null) {
					Usuario obj = (Usuario) getObject().readValue(usuarioStr,
							this.usuarioClasse);
					this.usuarios.add(obj);
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
			throw new GlobalException("Erro de factory na classe Usuario");
		}
	}
	

	public UsuarioFactory(int tipo){
		this.usuarioClasse = USUARIO_CLASSES.get(tipo);
	}
	
	public List<Usuario> getLista() {
		return usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public Usuario getUsuario() {
		return usuarios.get(0);
	}
	
	
	public Class<?> getClasse(){
		return this.usuarioClasse;
	}
	


}
