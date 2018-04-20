package br.com.cepe.daoconnect;

import br.com.cepe.entity.pojo.evento.Evento;

public class EventoDAO extends OperationsDAO<Evento>{

	public EventoDAO() {
		super();
	}
	
	public EventoDAO(int num) {
		this.num = num;
	}
	
	public EventoDAO(Evento evento){
		this.entity = evento;
	}
}
