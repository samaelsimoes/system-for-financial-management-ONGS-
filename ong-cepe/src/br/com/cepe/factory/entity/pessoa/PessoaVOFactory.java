/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.entity.pessoa;

import br.com.cepe.entity.pojo.pessoa.Atleta;
import br.com.cepe.entity.pojo.pessoa.Beneficiario;
import br.com.cepe.entity.pojo.pessoa.DoadorPf;
import br.com.cepe.entity.pojo.pessoa.DoadorPj;
import br.com.cepe.entity.pojo.pessoa.Patrocinador;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.entity.pojo.pessoa.PessoaFisica;
import br.com.cepe.entity.pojo.pessoa.PessoaJuridica;

public class PessoaVOFactory {
	
	Pessoa pessoa = new Pessoa();
	
	public PessoaVOFactory(Pessoa pessoa){
		
		pessoa = new PessoaFactory(pessoa).getPessoa();
		this.pessoa.setId(pessoa.getId());
		this.pessoa.setStatus(pessoa.getStatus());
		this.pessoa.setNome(pessoa.getNome());
		this.pessoa.setBairro(pessoa.getBairro());
		this.pessoa.setCep(pessoa.getCep());
		this.pessoa.setCidade(pessoa.getCidade());
		this.pessoa.setRua(pessoa.getRua());
		this.pessoa.setNumero(pessoa.getNumero());
		this.pessoa.setFoneFixo(pessoa.getFoneFixo());
		this.pessoa.setFoneMovel(pessoa.getFoneMovel());
		
		
		if(pessoa instanceof PessoaFisica)
			setAtributosPF();
		else if(pessoa instanceof PessoaJuridica)
			setAtributosPJ();
			else if(pessoa instanceof DoadorPf)
				setAtributosDoadorPF();
				else if(pessoa instanceof DoadorPj)
					setAtributosDoadorPJ();
					else if(pessoa instanceof Atleta)
						setAtributosAtleta();
						else if(pessoa instanceof Patrocinador)
							setAtributosPatrocinador();
							else if(pessoa instanceof Beneficiario)
								setAtributosBeneficiario();
		
	}
	
	private void setAtributosPF(){
		
		
	}
	private void setAtributosPJ(){
		
	}
	private void setAtributosDoadorPF(){
		
	}
	private void setAtributosDoadorPJ(){
		
	}
	private void setAtributosAtleta(){
		
	}
	private void setAtributosPatrocinador(){
		
	}
	private void setAtributosBeneficiario(){
		
	}
	
	
	public Pessoa getVO(){
		return this.pessoa;
	}

}
