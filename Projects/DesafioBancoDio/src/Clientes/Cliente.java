package Clientes;

import Banco.Agencia;
import Banco.Leitura;
import Contas.Conta;

import java.util.Scanner;

public class Cliente extends Conta{
    protected String nome;
    protected String endereco;
    protected static Agencia agencia;
    protected static Conta conta;
    protected int idCliente;

    private static int SEQUENCIAL = -1;

    public Cliente() {

        this.idCliente = SEQUENCIAL++;

    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public static String getAgencia() {
        return agencia.toString();
    }

    public int getIdCliente() {
        return idCliente;
    }

    public static void cadastrarCliente(Cliente novoCliente, ListaClientes lista) {
        Scanner leitor = new Scanner(System.in);

        System.out.println("Digite o Nome do Cliente:");
        novoCliente.setNome(leitor.nextLine());
        System.out.println("Digite o Endereço do Cliente:");
        novoCliente.setEndereco(leitor.nextLine());

        novoCliente.agencia = new Agencia();
        novoCliente.conta = new Conta();
        novoCliente.conta.CriaIdentificador();
        lista.setClientes(novoCliente, lista);
        System.out.println("Cliente cadastrado com sucesso!");

        int j = imprimeCliente(lista.listaDeClientes.get(novoCliente.idCliente - 1));


    }

    public static int imprimeCliente(Cliente novo){
        System.out.println("Anote as informações sobre sua conta, \npois você irá precisar caso queira atualizar seus dados.");
        System.out.println("ID de Cliente: " + novo.idCliente);
        System.out.println("Nome de Cliente: " + novo.nome);
        System.out.println("Endereço de Cliente: " + novo.endereco);
        System.out.println("Nome do Banco: " + Cliente.agencia.getAgencia());
        System.out.println("Conta Tipo: " + Cliente.contaCorrente.getCC());
        System.out.println("Conta Tipo: " + Cliente.contaPoupanca.getCP() + "\n\n");
        return 1;
    }

    public static void atualizarCliente(int id, ListaClientes lista, int opt) {

        Leitura novoLeitor = new Leitura();

        for (int i = 0; i < lista.listaDeClientes.size(); i++) {
            if (lista.listaDeClientes.get(i).idCliente == id) {
                if(opt == 1){
                    System.out.println("Digite o novo nome \n");
                    novoLeitor.verificaEntrada("String", novoLeitor, lista);
                    lista.listaDeClientes.get(i).setNome(novoLeitor.getLeitorString());
                }else if(opt == 2){
                    System.out.println("Digite o novo Endereço \n");
                    novoLeitor.verificaEntrada("String", novoLeitor, lista);
                    lista.listaDeClientes.get(i).setEndereco(novoLeitor.getLeitorString());
                }



            }
        }
    }
}
