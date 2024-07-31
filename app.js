let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    document.querySelector('img').src='./img/paul_frente.png';
}

exibirMensagemInicial();

function trocaImagem(acertou) {
    if (acertou) {
        document.querySelector('img').src='./img/paul_win.png';
    } else {
        document.querySelector('img').src='./img/paul_loser.png';
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        trocaImagem(true);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        exibirTextoNaTela('h1', 'Você Errou! Mas tente novamente...');
        trocaImagem(false);
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
    return parseInt(Math.random() * 10 +1);
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