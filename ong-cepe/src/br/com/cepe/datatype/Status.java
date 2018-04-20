package br.com.cepe.datatype;

public enum Status implements DataType{
	INATIVO(0), ATIVO(1);

	public int index;
	Status(int index){
		this.index = index;
	}

	public int getIndex() {
		return this.index;
	}
}
