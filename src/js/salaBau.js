document.addEventListener('DOMContentLoaded', () => {

    // 1. LUZ E BAÚ (Mantido igual, está perfeito)
    setTimeout(() => {
        const overlay = document.querySelector('.overlay-transicao');
        if (overlay) overlay.classList.remove('ativa');
    }, 100);

    const bau = document.getElementById('imagem-bau');
    let bauAberto = false;

    if (bau) {
        bau.addEventListener('click', () => {
            if (!bauAberto) {
                bau.classList.add('bau-aberto');
                bau.src = 'src/imagens/bau_aberto.png';
                document.getElementById('grupo-maos').classList.add('escondido');
                document.getElementById('grupo-itens').classList.remove('escondido');
                bauAberto = true;
            }
        });
    }

    // ==========================================
    // 2. SISTEMA DE POP-UP CENTRALIZADO
    // ==========================================
    const overlayPopup = document.getElementById('overlay-popup');
    const btnFechar = document.getElementById('btn-fechar');
    const setaEsquerda = document.getElementById('seta-esquerda');
    const setaDireita = document.getElementById('seta-direita');

    let itemAtivo = ''; // Saberemos se é 'papel', 'mp3', 'filme' ou 'simples'
    let indexAtual = 0; // Usado para página do papel, faixa do mp3 ou filme

    // ==========================================
    // DADOS COM SUPORTE A PARÁGRAFOS (Use tags <p>)
    // ==========================================
    const textosDoPapel = [
        `
        <p><strong>Página 1:</strong> O diário foi encontrado aberto sobre a mesa de madeira empoeirada.</p>
        <p>As páginas iniciais relatam eventos estranhos acontecendo na mansão durante a madrugada. Ninguém parecia saber a origem dos barulhos.</p>
        <p>Se o texto continuar crescendo e ultrapassar o limite visual da folha, a barra de rolagem lateral vai aparecer automaticamente para o jogador poder ler tudo!</p>
        `,
        `
        <p><strong>Página 2:</strong> "Encontrei a chave dourada escondida atrás do quadro antigo."</p>
        <p>Continue investigando os outros cômodos com cuidado.</p>
        `,
        `
        <p><strong>Página 3:</strong> Fim do documento.</p>
        `
    ];

    const playlistMp3 = [
        {
            url: "https://youtu.be/hAxAFDbwxX4?si=-QT5KAcPx06CEuDd",
            info: `
            <p><strong>“Quarto de Despejo” — LEALL</strong></p>
            <p>Em Quarto de Despejo, o exílio se manifesta intensamente como exclusão social e territorial. O próprio título sugere que certos grupos são tratados como se devessem ser separados da sociedade.</p>
            <p>LEALL diz na música: <br>“Cem por cento fora do cartão postal”</p>
            <p>O “cartão postal” simboliza a cidade apresentada como bela e desejável, ao passo que as favelas são deixadas de fora dessa representação. Isso se aproxima do exílio por injustiça, pois não se trata apenas de alguém optar por viver isolado: a pessoa é marginalizada devido a desigualdades sociais, racismo e violência.</p>
            <p>A música reforça essa divisão ao afirmar: <br>“Favelas cariocas são um quarto de despejo”</p>
            <p>Desse modo, o “exílio” pode ser interpretado como a expulsão simbólica da população pobre e negra do espaço urbano desvalorizado. O indivíduo permanece fisicamente na cidade, mas é tratado como se não pertencesse a ela — uma forma de exílio em sua própria terra.</p>
          `
        },
        {
            url: "https://youtu.be/UtA8J7B22rU?si=ZI-0f6kDpBAvFIU_",
            info: `
            <p><strong>“Lamento Sertanejo” — Gilberto Gil e Dominguinhos</strong></p>
            <p>Nesta canção, o exílio assume um caráter mais pessoal e subjetivo. O sertanejo se encontra deslocado ao precisar estar na cidade, pois sua origem e estilo de vida fazem com que ele seja visto como alguém que não se adapta àquele ambiente.</p>
            <p>O verso: <br>“Ficar na cidade sem viver contrariado” <br> expressa esse sentimento de não pertencimento. A cidade se torna um lugar onde ele é um forasteiro.</p>
            <p>A imagem mais poderosa para relacionar com o exílio é: <br>“Sou como rês desgarrada”</p>
            <p>A “rês desgarrada” é o animal que se afastou do seu rebanho. Isso cria a imagem de alguém arrancado ou separado de seu local de origem, que passa a vaguear sem encontrar um lugar.</p>
            <p>Neste caso, o exílio não é uma exclusão explícita. É um exílio causado por circunstâncias sociais e econômicas: o indivíduo é forçado a deixar seu espaço de origem e, ao chegar à cidade, continua a não se sentir completamente parte dela.</p>
          `
        }
    ];

    // ==========================================
    // DADOS DOS FILMES — todos relacionados a diferentes formas de exílio.
    // Pode adicionar mais itens aqui, as setas se ajustam sozinhas.
    // ==========================================
    const filmesArray = [
        {
            titulo: "Perdido em Marte",
            tagline: "O exílio físico: sozinho, longe de qualquer civilização.",
            imagem: "src/imagens/marte_matt.png",
            descricao: "Um astronauta é dado como morto e abandonado em Marte após um acidente. Isolado de toda a humanidade, sem contato ou apoio imediato, ele vive o exílio em sua forma mais literal e extrema: o isolamento total imposto pelo acaso, tendo a razão e a ciência como únicas ferramentas de sobrevivência."
        },
        {
            titulo: "Coringa",
            tagline: "O exílio dentro da própria cidade.",
            imagem: "src/imagens/coringa.png",
            descricao: "Arthur Fleck vive em Gotham, mas é tratado como estranho nela: ridicularizado pela pobreza, pela condição mental e pela ausência de rede de apoio. Seu exílio não é geográfico, mas social — a exclusão gradual de alguém que nunca foi verdadeiramente incluído, até que a ruptura com a sociedade se torna total."
        },
        {
            titulo: "O Último Azul",
            tagline: "O exílio decretado pelo Estado.",
            imagem: "src/imagens/ultimo_azul.png",
            descricao: "Em um Brasil distópico, Tereza, de 77 anos, recebe uma notificação oficial: idosos devem ser enviados a uma colônia distante para abrir espaço aos mais jovens no mercado de trabalho. É o exílio institucionalizado, imposto por decreto contra quem é visto como um peso para a produtividade — e a resistência de quem se recusa a aceitar essa expulsão em silêncio."
        },
        {
            titulo: "Gachiakuta",
            tagline: "O exílio como punição para os marginalizados.",
            imagem: "src/imagens/images.png",
            descricao: "Rudo vive à margem em uma cidade flutuante, onde os ricos despejam seu lixo em um abismo abaixo. Acusado injustamente de um crime, ele é condenado ao exílio nesse mesmo abismo, junto ao lixo da sociedade. A série liga diretamente pobreza, injustiça e expulsão física, mostrando o exílio como ferramenta de controle de classe."
        }
    ];

    // Função que reseta e esconde TODOS os conteúdos do pop-up
    function esconderTudo() {
        document.getElementById('conteudo-simples').classList.add('escondido');
        document.getElementById('conteudo-papeis').classList.add('escondido');
        document.getElementById('conteudo-mp3').classList.add('escondido');
        document.getElementById('conteudo-filme').classList.add('escondido');
        setaEsquerda.classList.add('escondido');
        setaDireita.classList.add('escondido');

        // Pausa o vídeo se estiver tocando
        document.getElementById('video-yt').src = "";
    }

    // Controle visual das setas
    function atualizarSetas(tamanhoArray) {
        setaEsquerda.classList.remove('escondido');
        setaDireita.classList.remove('escondido');

        setaEsquerda.style.opacity = indexAtual === 0 ? '0.2' : '1';
        setaEsquerda.style.pointerEvents = indexAtual === 0 ? 'none' : 'auto';

        setaDireita.style.opacity = indexAtual === tamanhoArray - 1 ? '0.2' : '1';
        setaDireita.style.pointerEvents = indexAtual === tamanhoArray - 1 ? 'none' : 'auto';
    }

    // Funções de Renderização Específicas
    function renderizarPapel() {
        document.getElementById('texto-papel').innerHTML = textosDoPapel[indexAtual];
        atualizarSetas(textosDoPapel.length);
    }

    function extrairIdYoutube(url) {
        let id = "";
        if (url.includes("youtu.be/")) {
            id = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("watch?v=")) {
            id = url.split("watch?v=")[1].split("&")[0];
        }
        return id;
    }

    // Função de renderização atualizada
    function renderizarMp3() {
        const urlAtual = playlistMp3[indexAtual].url;
        const idVideo = extrairIdYoutube(urlAtual); // Extrai o ID automaticamente da URL

        document.getElementById('video-yt').src = `https://www.youtube.com/embed/${idVideo}?rel=0`;
        document.getElementById('texto-mp3').innerHTML = playlistMp3[indexAtual].info;
        atualizarSetas(playlistMp3.length);
    }

    // Renderização do filme atual
    function renderizarFilme() {
        const filmeAtual = filmesArray[indexAtual];
        document.getElementById('titulo-filme').textContent = filmeAtual.titulo;
        document.getElementById('tagline-filme').textContent = filmeAtual.tagline;
        document.getElementById('descricao-filme').textContent = filmeAtual.descricao;

        const imgPersonagem = document.getElementById('imagem-filme');
        imgPersonagem.src = filmeAtual.imagem;
        imgPersonagem.alt = filmeAtual.titulo;

        atualizarSetas(filmesArray.length);
    }

    // ==========================================
    // 3. CLIQUE NOS ITENS
    // ==========================================
    const todosOsItens = document.querySelectorAll('.item');
    todosOsItens.forEach(item => {
        item.addEventListener('click', (evento) => {
            esconderTudo(); // Limpa a tela antes de abrir o novo item
            indexAtual = 0; // Reseta a paginação

            if (evento.target.classList.contains('item-papeis')) {
                itemAtivo = 'papel';
                document.getElementById('conteudo-papeis').classList.remove('escondido');
                renderizarPapel();

            } else if (evento.target.classList.contains('item-mp3')) {
                itemAtivo = 'mp3';
                document.getElementById('conteudo-mp3').classList.remove('escondido');
                renderizarMp3();

            } else if (evento.target.classList.contains('item-cam')) {
                // A câmera abre a lista de filmes/séries/animes
                itemAtivo = 'filme';
                document.getElementById('conteudo-filme').classList.remove('escondido');
                renderizarFilme();

            } else {
                // Para PSP e Livros (Apenas mostram a imagem)
                itemAtivo = 'simples';
                document.getElementById('conteudo-simples').classList.remove('escondido');
                document.getElementById('imagem-popup-simples').src = evento.target.src;
            }

            overlayPopup.classList.remove('escondido');
        });
    });

    // ==========================================
    // 4. CLIQUE NAS SETAS (Avançar / Voltar)
    // ==========================================
    if (setaDireita) {
        setaDireita.addEventListener('click', () => {
            if (itemAtivo === 'papel' && indexAtual < textosDoPapel.length - 1) {
                indexAtual++;
                renderizarPapel();
            } else if (itemAtivo === 'mp3' && indexAtual < playlistMp3.length - 1) {
                indexAtual++;
                renderizarMp3();
            } else if (itemAtivo === 'filme' && indexAtual < filmesArray.length - 1) {
                indexAtual++;
                renderizarFilme();
            }
        });
    }

    if (setaEsquerda) {
        setaEsquerda.addEventListener('click', () => {
            if (itemAtivo === 'papel' && indexAtual > 0) {
                indexAtual--;
                renderizarPapel();
            } else if (itemAtivo === 'mp3' && indexAtual > 0) {
                indexAtual--;
                renderizarMp3();
            } else if (itemAtivo === 'filme' && indexAtual > 0) {
                indexAtual--;
                renderizarFilme();
            }
        });
    }

    // ==========================================
    // 5. FECHAR POP-UP
    // ==========================================
    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            overlayPopup.classList.add('escondido');
            setTimeout(esconderTudo, 300); // Limpa o conteúdo só depois que a animação de fechar acabar
        });
    }
});