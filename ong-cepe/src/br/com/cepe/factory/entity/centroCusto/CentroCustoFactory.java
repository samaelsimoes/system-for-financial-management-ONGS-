package br.com.cepe.factory.entity.centroCusto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import br.com.cepe.entity.pojo.centroCusto.CentroCusto;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;

public class CentroCustoFactory extends ObjMapper {
	private List<CentroCusto> centrosCusto = new ArrayList<CentroCusto>();

	public CentroCustoFactory(String centroCustoStr) throws GlobalException {

		try {
			CentroCusto obj = getObject().readValue(centroCustoStr, CentroCusto.class);
			if(obj != null)
				this.centrosCusto.add(obj);
			else
				throw new GlobalException("Erro de factory na classe Centro de custo");

		} catch (IOException e) {
			e.printStackTrace();
			throw new GlobalException("Erro de factory na classe Centro de custo");
		}
	}
	
	public List<CentroCusto> getLista() {
		return centrosCusto;
	}

	public void setCentroCustos(List<CentroCusto> centrosCusto) {
		this.centrosCusto = centrosCusto;
	}

	public CentroCusto getCentroCusto() {
		return centrosCusto.get(0);
	}
		

}