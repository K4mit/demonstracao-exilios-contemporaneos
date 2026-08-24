document.addEventListener('DOMContentLoaded', () => {
  const porta = document.getElementById('imagem-porta');
  const textoPorta = document.getElementById('texto-porta');
  const overlay = document.querySelector('.overlay-transicao');
  
  let portaAberta = false;
  let digitando = false; // Trava para evitar bugs se a pessoa clicar loucamente

  // Função local para digitar o texto sob demanda
  function digitarTexto(elemento, mensagem, velocidade = 100) {
    elemento.textContent = ''; // Limpa o texto
    let i = 0;
    digitando = true;

    function digitar() {
      if (i < mensagem.length) {
        elemento.textContent += mensagem.charAt(i);
        i++;
        setTimeout(digitar, velocidade);
      } else {
        digitando = false; // Libera o clique após terminar de digitar
      }
    }
    digitar();
  }

  // 1. Inicia a frase da porta fechada assim que a página carregar
  digitarTexto(textoPorta, textoPorta.getAttribute('data-texto'));

  // 2. Lógica do clique na porta
  porta.addEventListener('click', () => {
    // Se a animação do texto ainda estiver rolando, ignora o clique
    if (digitando) return; 

    if (!portaAberta) {
      // ESTADO 1: ABRIR A PORTA
      porta.src = 'src/imagens/porta_aberta_img.png';
      porta.alt = 'Porta Aberta';
      
      // Muda a frase e re-inicia a animação de digitar
      textoPorta.setAttribute('data-texto', 'Saia.');
      digitarTexto(textoPorta, 'Saia.');
      
      portaAberta = true; // Marca que a porta agora está aberta
      
    } else {
      // ESTADO 2: AVANÇAR PARA A PRÓXIMA PÁGINA
      if (overlay) {
        overlay.classList.add('ativa'); // Aciona a tela preta (apaga a luz)
      }

      // Redireciona para salaBau.html após a tela escurecer (800ms)
      setTimeout(() => {
        window.location.href = 'salaBau.html';
      }, 800);
    }
  });
});