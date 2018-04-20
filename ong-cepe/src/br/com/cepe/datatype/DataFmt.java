/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.datatype;

public enum DataFmt implements DataType{
	DT_BR(0), DT_EUA(1), DT_HR_BR(2), DT_HR_EUA(3), HR_MM(4), HR_MM_SS(5);
	public int index;

	DataFmt(int index){
		this.index = index;
	}
	
	public int getIndex(){
		return this.index;
	}

}
