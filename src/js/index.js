/*BLOCO JS DA PRIMEIRA PÁGINA*/

const textoElemento = document.getElementById('texto-maquina');
const mensagem = "Toque para se Virar";
let indice = 0;

function digitar() {
  if (indice < mensagem.length) {
    textoElemento.textContent += mensagem.charAt(indice);
    indice++;
    setTimeout(digitar, 100); /* Velocidade em milissegundos por letra */
  }
}

// Inicia a animação assim que a página carregar
window.onload = digitar;