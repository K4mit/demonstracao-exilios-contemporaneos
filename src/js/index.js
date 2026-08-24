document.addEventListener('DOMContentLoaded', () => {
  const linkFundo = document.querySelector('.link-fundo');
  const overlay = document.querySelector('.overlay-transicao');

  if (linkFundo && overlay) {
    linkFundo.addEventListener('click', (event) => {
      event.preventDefault();
      const destino = linkFundo.getAttribute('href');

      overlay.classList.add('ativa');

      setTimeout(() => {
        window.location.href = destino;
      }, 800);
    });
  }
});