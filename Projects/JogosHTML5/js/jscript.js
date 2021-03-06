

function start() { // Inicio da função start()

   //Principais vari�veis do jogo

    var jogo = {};
    var energiaAtual = 100;
    var velocidade = 5;
    var fimdejogo = false;
    var podeAtirar = true;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var posicaoY = parseInt(Math.random() * 334);
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }
    
    $("#inicio").hide();
    $("#capa").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'><div id='energiaCor'></div></div>");
    
    /* Variáveis para sons*/
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");
    //Musica em loop
    musica.addEventListener("ended", function () { musica.currentTime = 0; musica.play(); }, false);
    musica.play();


    //Verifica se o usuário pressionou alguma tecla	
    jogo.pressionou = [];

    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });


    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });
    //Game Loop

    jogo.timer = setInterval(loop, 30);

    function loop() {

        movefundo();
        movefundoCeu();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
        placar();
        energia();


    } // Fim da função loop()


    function movefundo() {

        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1);

    } // fim da função movefundo()

    function movefundoCeu() {

        esquerda = parseFloat($("#fundoCeu").css("background-position"));
        $("#fundoCeu").css("background-position", esquerda - 0.5);

    } // fim da função movefundoCeu()


    function movejogador() {

        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);

            if (topo <= 0) {

                $("#jogador").css("top", topo + 10);
            }

        }

        if (jogo.pressionou[TECLA.S]) {

            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);
            if (topo >= 434) {
                $("#jogador").css("top", topo - 10);

            }
        }

        if (jogo.pressionou[TECLA.D]) {
            disparo();

        }

    } // fim da função movejogador()
    
    function moveinimigo1() {
        
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= 0) {
 
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left", 694);
                $("#inimigo1").css("top", posicaoY);

        }
    } //Fim da função moveinimigo1()

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);

        if (posicaoX <= 0) {

            $("#inimigo2").css("left", 775);

        }
    } // Fim da função moveinimigo2()

    function moveamigo() {

        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 906) {

            $("#amigo").css("left", 0);

        }

    } // fim da função moveamigo()

    function disparo() {

        if (podeAtirar == true) {
            somDisparo.play();
            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);

        } //Fecha podeAtirar

        function executaDisparo() {

            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if (posicaoX > 900) {

                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;

            }
        } // Fecha executaDisparo()
    } // Fecha disparo()

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

        // jogador com o inimigo1
        if (colisao1.length > 0) {
            somExplosao.play();
            energiaAtual = energiaAtual - 5;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
        // jogador com o inimigo2 
        if (colisao2.length > 0) {
            somExplosao.play();
            energiaAtual = energiaAtual - 5;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();

            reposicionaInimigo2();

        }
        // Disparo com o inimigo1

        if (colisao3.length > 0) {
            somExplosao.play();
            velocidade = velocidade + 0.3;
            pontos = pontos + 100;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }

        // Disparo com o inimigo2

        if (colisao4.length > 0) {
            somExplosao.play();
            pontos = pontos + 50;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);

            reposicionaInimigo2();

        }

        // jogador com o amigo

        if (colisao5.length > 0) {
            somResgate.play();
            salvos++;
            reposicionaAmigo();
            $("#amigo").remove();
        }

        //Inimigo2 com o amigo

        if (colisao6.length > 0) {
            perdidos++;
            energiaAtual = energiaAtual - 5;
            somPerdido.play();
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX, amigoY);
            $("#amigo").remove();

            reposicionaAmigo();

        }


    } //Fim da função colisao()

    
    function explosao1(inimigo1X, inimigo1Y) {
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {

            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;

        }

    } // Fim da função explosao1()

    //Explosão2

    function explosao2(inimigo2X, inimigo2Y) {

        $("#fundoGame").append("<div id='explosao2'></div>");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {

            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;

        }


    } // Fim da função explosao2()

    //Explosão3

    function explosao3(amigoX, amigoY) {
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div>");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);
        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;

        }

    } // Fim da função explosao3


    //Reposiciona Inimigo2

    function reposicionaInimigo2() {

        var tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {

                $("#fundoGame").append("<div id=inimigo2></div>");

            }

        }
    }

    //Reposiciona Amigo

    function reposicionaAmigo() {

        var tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimdejogo == false) {

                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

            }

        }

    } // Fim da função reposicionaAmigo()

    function placar() {

        $("#placar").html("<div class='placar1'><h2>Pontos: " + pontos + "</h2></div>" + "<div class='placar2'><h2>Salvos: " + salvos + "</h2></div>" + "<div class='placar3'><h2>Perdidos: " + perdidos + "</h2></div>");

    } //fim da função placar()

    function energia() {

        $("#energiaCor").css("width", energiaAtual + "%");
        
        if (energiaAtual > 65) {

            $("#energiaCor").css("background-color", "greenyellow");
        }else if (energiaAtual < 66 && energiaAtual > 35) {

            $("#energiaCor").css("background-color", "orange");
        }else if (energiaAtual < 36 && energiaAtual > 0) {

            $("#energiaCor").css("background-color", "red");
        }else {

            //Game Over
            gameOver();
        }

    } // Fim da função energia()

    //função GAME OVER
    function gameOver() {
        fimdejogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
        $("#energia").remove();
        $("#capa").css("display", "block");

        $("#capa").append("<div id='fim'></div>");

        $("#fim").html("<h1> Game Over </h1><p>Você marcou: " + pontos + " pontos</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
    } // Fim da função gameOver();

} // Fim da função start


//Reinicia o Jogo

function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();
    start();

} //Fim da função reiniciaJogo