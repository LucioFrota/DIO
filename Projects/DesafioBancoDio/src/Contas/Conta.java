package Contas;

import Banco.Leitura;
import Clientes.Cliente;
import Clientes.ListaClientes;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;


public class Conta {
    private static int SEQUENCIAL = 100;
    private static double saldoInicio = 100;

    protected int numero;
    protected double saldo;

    protected static ContaCorrente contaCorrente = new ContaCorrente();
    protected static ContaPoupanca contaPoupanca = new ContaPoupanca();


    public Conta() {
        super();
        this.numero = SEQUENCIAL++;
        this.saldo = saldoInicio;

    }

    public void CriaIdentificador() {
        Conta.contaCorrente.identificadorCC = "CC" + this.numero;
        Conta.contaPoupanca.identificadorCP = "CP" + this.numero;
    }


    public void sacar(double valor) {

        this.saldo -= valor;
    }


    public void executaOperacao(int id, Leitura novoLeitor, ListaClientes lista, int opcao) {
        int novoId = id;

        Operacao oper = new Operacao();

        oper.selecionaMensagens(id, novoLeitor, lista, opcao, oper);

        int index = 0;
        String nome = "";
        double saldoRestante = 0;
        for (int i = 0; i < lista.listaDeClientes.size(); i++) {
            if (lista.listaDeClientes.get(i).getIdCliente() == novoId) {
                index = i;
                if (novoLeitor.getLeitorInt() == 1) {
                    nome = "Conta Corrente";
                    if(opcao == 1) {
                        lista.listaDeClientes.get(i).contaCorrente.sacar(novoLeitor.getLeitorDouble());
                        saldoRestante = (lista.listaDeClientes.get(index).contaCorrente.getSaldo());
                    }else if(opcao == 2){
                        lista.listaDeClientes.get(i).contaCorrente.depositar(novoLeitor.getLeitorDouble());
                        saldoRestante = (lista.listaDeClientes.get(index).contaCorrente.getSaldo());
                    }else if(opcao == 3){
                        System.out.println("Informe o numero da conta de destino");
                        novoLeitor.verificaEntrada("Int", novoLeitor, lista);
                        lista.listaDeClientes.get(i).contaCorrente.transferir(novoLeitor.getLeitorDouble(), novoLeitor.getLeitorInt(), lista);
                        saldoRestante = (lista.listaDeClientes.get(index).contaCorrente.getSaldo());
                    }


                } else if (novoLeitor.getLeitorInt() == 2) {

                    nome = "Conta Poupança";
                    if(opcao == 1) {
                        lista.listaDeClientes.get(i).contaPoupanca.sacar(novoLeitor.getLeitorDouble());
                        saldoRestante = (lista.listaDeClientes.get(index).contaPoupanca.getSaldo());
                    }else if(opcao == 2){
                        lista.listaDeClientes.get(i).contaPoupanca.depositar(novoLeitor.getLeitorDouble());
                        saldoRestante = (lista.listaDeClientes.get(index).contaPoupanca.getSaldo());
                    }else if(opcao == 3){
                        System.out.println("Informe o numero da conta de destino");
                        novoLeitor.verificaEntrada("Int", novoLeitor, lista);
                        lista.listaDeClientes.get(i).contaPoupanca.transferir(novoLeitor.getLeitorDouble(), novoLeitor.getLeitorInt(), lista);
                        saldoRestante = (lista.listaDeClientes.get(index).contaPoupanca.getSaldo());
                    }

                }
            }



        }
        oper.sucesso(oper, opcao, novoLeitor, lista, index, nome, saldoRestante);

    }




    public String formataValor(double valor) {
        String novoValor;
        DecimalFormat frmt = new DecimalFormat("#,##0.00", new DecimalFormatSymbols(new Locale("pt", "BR")));
        novoValor = frmt.format(valor);
        return novoValor;
    }

    public void depositar(double valor) {
        this.saldo += valor;

    }


    public void transferir(double valor, int contaDestino, ListaClientes lista) {
        this.sacar(valor);
        for (int i = 0; i < lista.listaDeClientes.size(); i++) {
            if (lista.listaDeClientes.get(i).numero == contaDestino) {
                lista.listaDeClientes.get(i).depositar(valor);
            }

        }

    }



    public String getCC() {
        return "Conta Corrente: " + contaCorrente.identificadorCC;
    }

    public String getCP() {

        return "Conta Poupança: " + contaPoupanca.identificadorCP;
    }

    public double getSaldo() {
        return saldo;
    }
/*
    public void imprimirExtrato(int leitorInt, Leitura novoLeitor, ListaClientes lista, int opt) {

    }*/

    @Override
    public String toString() {
        return "CONTA \n" +
                "Numero = " + numero +
                ". \nSaldo = R$ " + formataValor(saldo) +
                '.' +
                "\n---------------------------------------"+
                "\nDigite ENTER para continuar: ";


    }
}
