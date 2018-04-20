package br.com.cepe.factory.util;

import java.io.StringWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;

import br.com.cepe.datatype.DataFmt;
import br.com.cepe.factory.date.DateFactory;

public class ObjMapper{
protected ObjectMapper objMapper;
protected DateFactory dateFactory;

static{
	
}
	public ObjMapper(){
		objMapper = new ObjectMapper();
		dateFactory = new DateFactory();
	}
	
		
	public ObjectMapper getObject(){		
		DateFormat fmt = dateFactory.getPattern(DataFmt.DT_HR_BR);
		this.objMapper.setDateFormat(fmt);
		return this.objMapper;				
	}
	
	public String getJson(Object obj) throws Exception{
		StringWriter jsonObj = new StringWriter();
		try{
			
			DateFormat fmt = new SimpleDateFormat(dateFactory.getFmt(DataFmt.DT_HR_BR));
			/*fmt.setTimeZone(TimeZone.getTimeZone("America/Sao_Paulo"));*/
			objMapper.setDateFormat(fmt);
			objMapper.writeValue(jsonObj, obj);
			return jsonObj.toString();
			
		}catch(Exception e){
			e.printStackTrace();
			throw new Exception("Falha ao fazer a converção do objeto para Json");
		}
		
	}
	
	public Response buildResponse(Object objeto){
		
	StringWriter fw = new StringWriter();
	
	try {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.writeValue(fw, objeto);
		return Response.ok(fw.toString()).build();
	} catch (Exception e) {
		e.printStackTrace();
		return buildErrorResponse(e.getMessage());
	}
}

	public Response buildErrorResponse(String message) {
		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
				.entity(message)
				.type(MediaType.TEXT_PLAIN)
				.build();
}
	
}
