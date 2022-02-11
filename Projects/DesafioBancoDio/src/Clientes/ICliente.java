package Clientes;

import java.util.ArrayList;

public interface ICliente {
	void cadastrarCliente(String nome, String endereço);
	void atualizarCliente(ArrayList<ListaClientes> lista, int id, String itemNome, String itemEnd);

	static void criarCliente() {

	}


}
