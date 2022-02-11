package Contas;
import Clientes.ICliente;

public interface IConta extends ICliente{
	void sacar(double valor);
	void depositar(double valor);
	void transferir(double valor, Conta contaDestino);
	void imprimirExtrato(ICliente nome, IConta conta);
	
	
}
