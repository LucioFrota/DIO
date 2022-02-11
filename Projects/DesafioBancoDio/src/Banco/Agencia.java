package Banco;


public class Agencia {

private String nome;
private int agencia;

private static final String NOME_PADRAO = "Banco DIO";



public Agencia() {
	super();
	this.nome = NOME_PADRAO;
	this.agencia = 1010;
}

	public String getNome() {
		return nome;
	}
public int getAgencia() {
	return this.agencia;

}
	public Agencia setAgencia(Agencia novaAgencia) {
		return novaAgencia;
	}

	@Override
	public String toString() {
		return "AGÊNCIA\n" +
				"nome = " + nome +
				". \nagencia=" + agencia +
				'.';
	}
}
