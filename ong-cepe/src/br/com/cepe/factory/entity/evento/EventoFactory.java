package br.com.cepe.factory.entity.evento;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.codehaus.jackson.node.ObjectNode;

import br.com.cepe.entity.pojo.evento.Beneficente;
import br.com.cepe.entity.pojo.evento.Competicao;
import br.com.cepe.entity.pojo.evento.Evento;
import br.com.cepe.entity.pojo.evento.Sessao;
import br.com.cepe.entity.pojo.evento.Viagem;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;

public class EventoFactory extends ObjMapper {
	private List<Evento> eventos = new ArrayList<Evento>();
	private Class<?> eventoClasse;
	private ObjectNode objNode;
	
	static final HashMap<Integer, Class<?>> EVENTO_CLASSES =  new HashMap<Integer, Class<?>>();
	static{
		EVENTO_CLASSES.put(0, null);
		EVENTO_CLASSES.put(1, Beneficente.class);
		EVENTO_CLASSES.put(2, Sessao.class);
		EVENTO_CLASSES.put(3, Viagem.class);
		EVENTO_CLASSES.put(4, Competicao.class);
	}

	public EventoFactory(String eventoStr) throws GlobalException {

		int tipo = 0;
		try {
			
			objNode = getObject().readValue(eventoStr, ObjectNode.class);
			if (objNode != null)
				tipo = objNode.get("tipo").asInt();
			else
				throw new GlobalException(
						"Falha ao receber o atributo tipo de Evento");
			if (tipo != 0) {
				
				this.eventoClasse = EVENTO_CLASSES.get(tipo);

				if (this.eventoClasse != null) {
					Evento obj = (Evento) getObject().readValue(eventoStr,
							this.eventoClasse);
					this.eventos.add(obj);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			throw new GlobalException("Erro de factory na classe Evento");
		}
	}
	
	public EventoFactory(Object obj){
		if(obj instanceof Beneficente)
			this.eventos.add((Beneficente) obj);
		else if(obj instanceof Sessao)
			this.eventos.add((Sessao) obj);
		else if(obj instanceof Viagem)
			this.eventos.add((Viagem) obj);
		else
			this.eventos.add(null);
	}
	
	public EventoFactory(int tipo){
		this.eventoClasse = EVENTO_CLASSES.get(tipo);
	}
	
	public List<Evento> getLista() {
		return eventos;
	}

	public void setEventos(List<Evento> eventos) {
		this.eventos = eventos;
	}

	public Evento getEvento() {
		return eventos.get(0);
	}
	
	
	public Class<?> getClasse(){
		return this.eventoClasse;
	}
}