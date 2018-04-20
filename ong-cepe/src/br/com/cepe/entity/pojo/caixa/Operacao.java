package br.com.cepe.entity.pojo.caixa;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.com.cepe.entity.pojo.centroCusto.CentroCusto;
import br.com.cepe.entity.pojo.evento.Evento;
import br.com.cepe.entity.pojo.pessoa.Pessoa;
import br.com.cepe.entity.pojo.usuario.Usuario;

@Entity
public class Operacao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private Date data;
	@ManyToOne
	private Usuario usuario;
	private int tipo;
	private int classificacao;
	private float valor;	
	private String descricao;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	private CentroCusto centroCusto;
	@ManyToOne(fetch = FetchType.EAGER)
	private CentroCusto centroCustoDestino;
	@ManyToOne(fetch = FetchType.EAGER)
	private Pessoa pessoa;
	@ManyToOne(fetch = FetchType.EAGER)
	private Evento evento;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public int getTipo() {
		return tipo;
	}
	public void setTipo(int tipo) {
		this.tipo = tipo;
	}
	public int getClassificacao() {
		return classificacao;
	}
	public void setClassificacao(int classificacao) {
		this.classificacao = classificacao;
	}
	public float getValor() {
		return valor;
	}
	public void setValor(float valor) {
		this.valor = valor;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public CentroCusto getCentroCusto() {
		return centroCusto;
	}
	public void setCentroCusto(CentroCusto centroCusto) {
		this.centroCusto = centroCusto;
	}
	public CentroCusto getCentroCustoDestino() {
		return centroCustoDestino;
	}
	public void setCentroCustoDestino(CentroCusto centroCustoDestino) {
		this.centroCustoDestino = centroCustoDestino;
	}
	public Pessoa getPessoa() {
		return pessoa;
	}
	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}
	public Evento getEvento() {
		return evento;
	}
	public void setEvento(Evento evento) {
		this.evento = evento;
	}	

}
