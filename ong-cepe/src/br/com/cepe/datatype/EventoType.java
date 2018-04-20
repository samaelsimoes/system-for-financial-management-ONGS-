package br.com.cepe.datatype;

public enum EventoType {
	
NULO(0), SESSAO(1), BENEFICENTE(2), VIAGEM(3);
	
	public int index;
	EventoType(int index){
		this.index = index;
	}

	public int getIndex() {
		return this.index;
	}

}
