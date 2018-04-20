package br.com.cepe.entity.pojo.centroCusto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import br.com.cepe.entity.pojo.modalidade.Modalidade;

@Entity
public class CentroCusto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String descricao;
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "centroCusto", cascade = CascadeType.REMOVE)
	private List<Modalidade> modalidades;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<Modalidade> getModalidades() {
		return modalidades;
	}
	
	public void setModalidades(List<Modalidade> modalidades) {
		if(this.modalidades == null)
			this.modalidades = new ArrayList<Modalidade>();
		
		for(Modalidade modalidade : modalidades){
			this.modalidades.add(modalidade);
		}
	}
	
	public void addModalidade(Modalidade modalidade){
		if(modalidades == null){
			modalidades = new ArrayList<Modalidade>();
			setModalidades(modalidades);
		}
	
		if(modalidade != null)
			this.modalidades.add(modalidade);
	}

}
