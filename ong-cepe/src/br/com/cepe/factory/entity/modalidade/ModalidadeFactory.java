package br.com.cepe.factory.entity.modalidade;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.codehaus.jackson.node.ObjectNode;

import br.com.cepe.entity.pojo.modalidade.Atletismo;
import br.com.cepe.entity.pojo.modalidade.AtletismoArrem;
import br.com.cepe.entity.pojo.modalidade.AtletismoArremDardo;
import br.com.cepe.entity.pojo.modalidade.AtletismoArremPeso;
import br.com.cepe.entity.pojo.modalidade.AtletismoSalto;
import br.com.cepe.entity.pojo.modalidade.AtletismoSaltoAltura;
import br.com.cepe.entity.pojo.modalidade.AtletismoVelReveza;
import br.com.cepe.entity.pojo.modalidade.AtletismoVelocidade;
import br.com.cepe.entity.pojo.modalidade.Modalidade;
import br.com.cepe.entity.pojo.modalidade.NadoDistancia;
import br.com.cepe.entity.pojo.modalidade.NadoSincronizado;
import br.com.cepe.entity.pojo.modalidade.QuadraBasquete;
import br.com.cepe.entity.pojo.modalidade.QuadraBocha;
import br.com.cepe.entity.pojo.modalidade.QuadraFutebol;
import br.com.cepe.entity.pojo.modalidade.QuadraTenis;
import br.com.cepe.entity.pojo.modalidade.QuadraTenisMesa;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;

public class ModalidadeFactory extends ObjMapper {
	private List<Modalidade> modalidades = new ArrayList<Modalidade>();
	private Class<?> modalidadeClasse;
	private ObjectNode objNode;
	
	static final HashMap<Integer, Class<?>> MODALIDADE_CLASSES =  new HashMap<Integer, Class<?>>();
	static{
		MODALIDADE_CLASSES.put(0, null);
		MODALIDADE_CLASSES.put(1,  Atletismo.class);
		MODALIDADE_CLASSES.put(2,  AtletismoArrem.class);
		MODALIDADE_CLASSES.put(3,  AtletismoArremDardo.class);
		MODALIDADE_CLASSES.put(4,  AtletismoArremPeso.class);
		MODALIDADE_CLASSES.put(5,  AtletismoSalto.class);
		MODALIDADE_CLASSES.put(6,  AtletismoSaltoAltura.class);
		MODALIDADE_CLASSES.put(7,  AtletismoVelocidade.class);
		MODALIDADE_CLASSES.put(8,  AtletismoVelReveza.class);
		MODALIDADE_CLASSES.put(9,  NadoDistancia.class);
		MODALIDADE_CLASSES.put(10, NadoSincronizado.class);
		MODALIDADE_CLASSES.put(11, QuadraBasquete.class);
		MODALIDADE_CLASSES.put(12, QuadraBocha.class);
		MODALIDADE_CLASSES.put(13, QuadraFutebol.class);
		MODALIDADE_CLASSES.put(14, QuadraTenis.class);
		MODALIDADE_CLASSES.put(15, QuadraTenisMesa.class);
	}
	

	public ModalidadeFactory(String modalidadeStr) throws GlobalException {

		int tipo = 0;
		try {
			
			objNode = getObject().readValue(modalidadeStr, ObjectNode.class);
			if (objNode != null)
				tipo = objNode.get("tipo").asInt();
			else
				throw new GlobalException(
						"Falha ao receber o atributo tipo de Modalidade");

			if (tipo != 0) {
				
				this.modalidadeClasse = MODALIDADE_CLASSES.get(tipo);

				if (this.modalidadeClasse != null) {
					Modalidade obj = (Modalidade) getObject().readValue(modalidadeStr,
							this.modalidadeClasse);
					this.modalidades.add(obj);
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
			throw new GlobalException("Erro de factory na classe Modalidade");
		}
	}
	

	public ModalidadeFactory(int tipo){
		this.modalidadeClasse = MODALIDADE_CLASSES.get(tipo);
	}
	
	public List<Modalidade> getLista() {
		return modalidades;
	}

	public void setModalidades(List<Modalidade> modalidades) {
		this.modalidades = modalidades;
	}

	public Modalidade getModalidade() {
		return modalidades.get(0);
	}
	
	public Class<?> getClasse(){
		return this.modalidadeClasse;
	}
	

}