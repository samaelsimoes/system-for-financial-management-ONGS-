package br.com.cepe.entity.pojo.modalidade;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;

import org.codehaus.jackson.annotate.JsonBackReference;

import br.com.cepe.entity.pojo.centroCusto.CentroCusto;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Modalidade {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int tipo;
	private String nome;
	private String descricao;
	private String restricoes;
	private String observacoes;
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonBackReference
	private CentroCusto centroCusto; 

	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTipo() {
		return tipo;
	}
	public void setTipo(int tipo) {
		this.tipo = tipo;
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
	public String getRestricoes() {
		return restricoes;
	}
	public void setRestricoes(String restricoes) {
		this.restricoes = restricoes;
	}
	public String getObservacoes() {
		return observacoes;
	}
	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
	public CentroCusto getCentroCusto() {
		return centroCusto;
	}
	public void setCentroCusto(CentroCusto centroCusto) {
		this.centroCusto = centroCusto;
	}
	@Override
	public String toString() {
		return "Modalidade [id=" + id + ", tipo=" + tipo + ", nome=" + nome + ", descricao=" + descricao
				+ ", restricoes=" + restricoes + ", observacoes=" + observacoes + "]";
	}
	
	
}
