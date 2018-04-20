package br.com.cepe.factory.entity.fluxoCaixa;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import br.com.cepe.entity.pojo.caixa.Operacao;
import br.com.cepe.exception.GlobalException;
import br.com.cepe.factory.util.ObjMapper;

public class OperacaoFactory extends ObjMapper {
	private List<Operacao> operacoes = new ArrayList<Operacao>();

	public OperacaoFactory(String operacaoStr) throws GlobalException {

		try {
			Operacao obj = getObject().readValue(operacaoStr, Operacao.class);

			if(obj != null){
				
				this.operacoes.add(obj);
			}else{
				throw new GlobalException("Erro de factory na classe Operação");
			}
		} catch (IOException e) {
			e.printStackTrace();
			throw new GlobalException("Erro de factory na classe Operação");
		}
	}
	
	public List<Operacao> getLista() {
		return operacoes;
	}

	public void setOperacaos(List<Operacao> operacao) {
		this.operacoes = operacao;
	}

	public Operacao getOperacao() {
		return operacoes.get(0);
	}
		

}