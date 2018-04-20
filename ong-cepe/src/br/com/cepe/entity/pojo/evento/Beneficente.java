package br.com.cepe.entity.pojo.evento;

import javax.persistence.Entity;

@Entity
public class Beneficente extends Evento{

	
	protected long arrecadacao;

	public long getArrecadacao() {
		return arrecadacao;
	}

	public void setArrecadacao(long arrecadacao) {
		this.arrecadacao = arrecadacao;
	}
	
	
}
