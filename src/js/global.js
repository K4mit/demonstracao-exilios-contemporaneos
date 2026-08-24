// Executa o efeito em qualquer elemento que tenha a classe 'efeito-digitacao'
function iniciarEfeitoDigitacao() {
  const elementos = document.querySelectorAll('.efeito-digitacao');

  elementos.forEach((elemento) => {
    const texto = elemento.getAttribute('data-texto');
    if (!texto) return;

    let i = 0;
    elemento.textContent = ''; // Limpa o texto inicial

    function digitar() {
      if (i < texto.length) {
        elemento.textContent += texto.charAt(i);
        i++;
        setTimeout(digitar, 100); // Velocidade da digitação
      }
    }

    digitar();
  });
}

// Inicia a digitação ao carregar a página
document.addEventListener('DOMContentLoaded', iniciarEfeitoDigitacao);