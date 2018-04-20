package br.com.cepe.factory.entity.pessoa;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.codehaus.jackson.node.ObjectNode;
import br.com.cepe.entity.pojo.pessoa.Atleta;
import br.com.cepe.entity.pojo.pessoa.Beneficiario;
import br.com.cepe.entity.pojo.pessoa.DoadorPf;
import br.com.cepe.entity.pojo.pessoa.DoadorPj;
import br.com.cepe.entity.pojo.pessoa.Patrocinador;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.entity.pojo.pessoa.PessoaFisica;
import br.com.cepe.entity.pojo.pessoa.PessoaJuridica;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;

public class PessoaFactory extends ObjMapper {
	private List<Pessoa> pessoas = new ArrayList<Pessoa>();
	private Class<?> pessoaClasse;
	private ObjectNode objNode;
	
	static final HashMap<Integer, Class<?>> PESSOA_CLASSES =  new HashMap<Integer, Class<?>>();
	static{
		PESSOA_CLASSES.put(0, null);
		PESSOA_CLASSES.put(1, PessoaFisica.class);
		PESSOA_CLASSES.put(2, PessoaJuridica.class);
		PESSOA_CLASSES.put(3, DoadorPf.class);
		PESSOA_CLASSES.put(4, DoadorPj.class);
		PESSOA_CLASSES.put(5, Patrocinador.class);
		PESSOA_CLASSES.put(6, Beneficiario.class);
		PESSOA_CLASSES.put(7, Atleta.class);
	}
	

	public PessoaFactory(String pessoaStr) throws GlobalException {

		int tipo = 0;
		try {
			
			objNode = getObject().readValue(pessoaStr, ObjectNode.class);
			if (objNode != null)
				tipo = objNode.get("tipo").asInt();
			else
				throw new GlobalException(
						"Falha ao receber o atributo tipo de Pessoa");
			if (tipo != 0) {
				
				this.pessoaClasse = PESSOA_CLASSES.get(tipo);

				if (this.pessoaClasse != null) {
					Pessoa obj = (Pessoa) getObject().readValue(pessoaStr,
							this.pessoaClasse);
					this.pessoas.add(obj);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			throw new GlobalException("Erro de factory na classe Pessoa");
		}
	}
	
	public PessoaFactory(Object obj){
		if(obj instanceof PessoaFisica)
			this.pessoas.add((PessoaFisica) obj);
		else if(obj instanceof PessoaJuridica)
			this.pessoas.add((PessoaJuridica) obj);
		else if(obj instanceof DoadorPf)
			this.pessoas.add((DoadorPf) obj);
		else if(obj instanceof Patrocinador)
			this.pessoas.add((Patrocinador) obj);
		else if(obj instanceof Beneficiario)
			this.pessoas.add((Beneficiario) obj);
		else if(obj instanceof Atleta)
			this.pessoas.add((Atleta) obj);
		else
			this.pessoas.add(null);
	}
	
	public PessoaFactory(int tipo){
		this.pessoaClasse = PESSOA_CLASSES.get(tipo);
	}
	
	public List<Pessoa> getLista() {
		return pessoas;
	}

	public void setPessoas(List<Pessoa> pessoas) {
		this.pessoas = pessoas;
	}

	public Pessoa getPessoa() {
		return pessoas.get(0);
	}
	
	
	public Class<?> getClasse(){
		return this.pessoaClasse;
	}
}