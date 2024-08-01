let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let imagem = document.querySelector('img').src='./img/paul_frente.png';
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    trocaImagem();
}

exibirMensagemInicial();

function trocaImagem(chute) {
    if (chute === undefined || chute === '') {
        document.querySelector('img').src = './img/paul_frente.png';
    } else if (chute == numeroSecreto) {
        document.querySelector('img').src = './img/paul_win.png';
    } else {
        document.querySelector('img').src = './img/paul_loser.png';
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        trocaImagem(chute);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        exibirTextoNaTela('h1', 'Você Errou! Mas tente novamente...');
        trocaImagem(chute);
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Dica: O número secreto é menor!');
        } else {
            exibirTextoNaTela('p', 'Dica: O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}