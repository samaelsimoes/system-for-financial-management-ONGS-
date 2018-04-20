/**
 * @author  Eduardo Cristian Campigoto
 **/
package br.com.cepe.factory.date;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import br.com.cepe.datatype.DataFmt;

public class DateFactory {


	public Date getData(DataFmt fmt, Date data){
		String dataStr = null;
		SimpleDateFormat formato = null;
		Date formatada = null;
		try {
			if(fmt != null && data != null){
				dataStr = data.toString();
				formato = new SimpleDateFormat(getFmt(fmt));
				formato.setTimeZone(TimeZone.getTimeZone("America/Sao_Paulo"));
				formatada = formato.parse(dataStr);
			}
			
			return formatada;
			
		} catch (ParseException e) {			
			e.printStackTrace();			
		}
		return null;
		
	}
	
	public DateFormat getPattern(DataFmt fmt){
			if(fmt != null){
				DateFormat formatada = new SimpleDateFormat(getFmt(fmt));
				formatada.setTimeZone(TimeZone.getTimeZone("UTC"));
				return formatada;
			}
			return null;
	}
	
	public String getFmt(DataFmt dthrBr) {
		String[] fmts = { "dd/MM/yyyy", "yyyy-MM-dd", "dd/MM/yyyy HH:mm:ss", 
						"yyyy-MM-dd HH:mm:ss","HH:mm","HH:mm:ss" };
		return fmts[dthrBr.getIndex()];
	}
	

}
