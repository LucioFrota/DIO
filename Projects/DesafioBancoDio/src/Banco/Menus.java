package Banco;

import java.util.ArrayList;


public class Menus{
	String nome;
	ArrayList<String> menu;
	TipoMenu opcao;

	public Menus(TipoMenu opcao) {
		super();

		if (opcao == TipoMenu.PRINCIPAL) {
			this.nome = "Menu Principal";
			this.menu = new ArrayList<>();
			menu.add("1 - Entrar");
			menu.add("2 - Sair");

		} else if (opcao == TipoMenu.CADASTRO) {
			this.nome = "Menu Cadastro";
			this.menu = new ArrayList<>();
			menu.add("1 - Cadastrar Cliente");
			menu.add("2 - Gerenciar");
			menu.add("3 - Sair");

		} else if (opcao == TipoMenu.CONTA) {
			this.nome = "Menu Conta";
			this.menu = new ArrayList<>();
			menu.add("1 - Sacar");
			menu.add("2 - Depositar");
			menu.add("3 - Transferir");
			menu.add("4 - Extrato");
			menu.add("5 - Gerenciar");
			menu.add("6 - Sair");

		} else if (opcao == TipoMenu.ATUALIZAR) {
			this.nome = "Menu Atualizar";
			this.menu = new ArrayList<>();
			menu.add("1 - Atualizar Nome");
			menu.add("2 - Atualizar Endereço");
			menu.add("3 - Menu Cadastro");
			menu.add("4 - Sair");

		}else if(opcao == TipoMenu.CLIENTE) {
			this.nome = "Menu Cliente";
			this.menu = new ArrayList<>();
			menu.add("1 - Gerenciar Contas");
			menu.add("2 - Listar Clientes");
			menu.add("3 - Atualizar Dados Cadastrais");
			menu.add("4 - Menu Cadastro");
			menu.add("5 - Sair");
		}else if(opcao == TipoMenu.SAIR) {
			this.nome = "Programa Finalizado";
			this.menu = new ArrayList<>();
			menu.add("Obrigado por Utilizar Nosso Sistema.");

;
		}
		}

	public int size() {
		return menu.size();
	}
	

}
