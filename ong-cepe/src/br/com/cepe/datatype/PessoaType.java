package br.com.cepe.datatype;

public enum PessoaType implements DataType{
	NULO(0), PF(1), PJ(2), DOADOR_PF(3), DOADOR_PJ(4), PATROCIN(5), BENEFIC(6), ATLETA(7);
	
	public int index;
	PessoaType(int index){
		this.index = index;
	}
	@Override
	public int getIndex() {

		return this.index;
	}
}