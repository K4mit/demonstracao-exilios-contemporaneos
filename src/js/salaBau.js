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

                const grupoItens = document.getElementById('grupo-itens');
                grupoItens.classList.remove('escondido');

                // Dispara a animação dos itens saindo de dentro do baú
                setTimeout(() => {
                    grupoItens.classList.add('animar-itens');
                }, 50);

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

    let itemAtivo = ''; // Saberemos se é 'papel', 'mp3', 'filme', 'jogo' ou 'simples'
    let indexAtual = 0; // Usado para página do papel, faixa do mp3, filme ou jogo

    // ==========================================
    // DADOS COM SUPORTE A PARÁGRAFOS (Use tags <p>)
    // ==========================================
    const textosDoPapel = [
        `
        <p><strong>Sabiá:</strong> <br> <i>Chico Buarque</i> <br>Vou voltar <br>
Sei que ainda vou voltar <br>
Para o meu lugar <br>
Foi lá e é lá ainda lá <br>
Que eu hei de ouvir cantar <br>
Uma sabiá <br>
A minha sabiá <br>
​Vou voltar <br>
Sei que ainda vou voltar <br>
Vou deitar à sombra <br>
De uma palmeira <br>
Que já não há <br>
Colher a flor <br>
Que já não dá <br>
​E contra a minha vontade <br>
Mudar minha voz <br>
A minha sabiá <br>
Que canta melhor <br>
Que a sabiá de lá</p>
        `,
        `
        <p><strong>O que é exílio?</strong> <br>Exílio é conhecido popularmente como o afastamento forçado de uma pessoa de sua própria terra natal, mas o conceito foi ganhando outros significados ao longo do tempo, deixando de ser só um fato geográfico. <br>
Hoje, exílio também descreve o sentimento de não pertencer a um lugar, mesmo estando fisicamente nele. Existem várias formas diferentes atuais para descrevê-la. Algumas visíveis, outras implícitas no cotidiano.</p>
        `,
        `
        <p><strong>O exílio do cotidiano</strong> <br>"Tudo aqui é um exílio."
Essa frase mostra que o exílio não depende de fronteiras. Ele pode acontecer dentro de casa, de uma cidade ou de uma rotina, quando a pessoa e o lugar demarcam distinções. É um tipo de exílio silencioso, que se disfarça de normalidade e passa despercebido por quem está de fora.
Exemplo do cotidiano: um adolescente que muda de escola e sente que não faz parte de nenhum grupo.</p>
        `,
        `
        <p><strong>O exílio da língua</strong> <br>"Je ne parle bien."
Essa expressão retrata a dificuldade de se comunicar por completo com outro grupo sobre suas dificuldades. É um exílio de quem é julgado e excluído por não se expressar de um certo jeito, sendo intitulado como despertencido. No cotidiano, isso aparece quando uma pessoa que geralmente vem da periferia tem sua maneira de falar ditado como "errado" em ambientes formais. Esse tipo de exílio evidencia como a linguagem também pode ser um território e como ficar de fora dele é uma barreira.
</p>
        `,
        `
        <p><strong>O exílio da saudade</strong> <br>Inspirado em "Canção do Exílio", de Gonçalves Dias.
O poema mostra como a distância transforma a lembrança do lugar de origem, tornando-o quase perfeito na memória. Esse processo é natural: quem está longe tende a lembrar mais do que era bom e menos do que era difícil. É o exílio de quem carrega um lugar que talvez já não exista mais daquela forma porque o tempo muda tudo, inclusive o que ficou para trás. Voltar, muitas vezes, é confrontar essa diferença entre a lembrança idealizada e a realidade atual.</p>
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
            imagem: "src/imagens/gachiakuta.png",
            descricao: "O exílio assume uma dimensão social, espacial e sentimental. Após ser acusado injustamente de assassinato e jogado em meio ao Abismo, um lugar para onde são jogados tanto os lixos quanto aqueles considerados indesejáveis, o sentimento de não pertencimento se torna literal. o protagonista é expulso do mundo que, de certa forma, nunca o aceitou completamente. Assim, seu exílio não representa apenas a separação de sua casa, mas também um exílio sentimental: a sensação de estar afastado das pessoas e de uma sociedade à qual ele nunca conseguiu pertencer. Sua jornada no Abismo passa a representar não apenas uma luta por vingança, mas também uma busca por identidade, pertencimento e por um lugar onde aquilo que foi descartado possa finalmente ter valor."
        }
    ];

    // ==========================================
    // DADOS DOS JOGOS — todos relacionados a diferentes formas de exílio.
    // ==========================================
    const jogosArray = [
        {
            titulo: "Exílio de Si",
            tagline: "O exílio como fuga: atravessar a fronteira para sobreviver.",
            capa: "src/imagens/exilioSi.png",
            descricao: "O exílio assume uma dimensão psicológica e principalmente identitária. O jogo explora o afastamento do indivíduo de si mesmo, colocando o foco em conflitos internos, memórias e questões relacionadas a identidade pessoal. O jogo transforma esse distanciamento em uma jornada introspectiva, na qual o personagem se encontra isolado não necessariamente de um lugar ou de outras pessoas, mas daquilo que ele próprio é, tornando o “exílio de si” uma metáfora para a perda e a reconstrução da própria identidade, cultura e dignidade."
        },
        {
            titulo: "The Last of Us",
            tagline: "O exílio coletivo: zonas de quarentena e cidades em ruínas.",
            capa: "src/imagens/tlou.png",
            descricao: "Após o colapso da sociedade, sobreviventes são confinados em zonas de quarentena isoladas do resto do país. Joel e Ellie atravessam esse território fragmentado, onde comunidades inteiras vivem exiladas de qualquer vida anterior à pandemia, sobrevivendo cortadas do mundo que conheciam."
        },
        {
            titulo: "Silent Hill 2",
            tagline: "O exílio psicológico: preso dentro da própria culpa.",
            capa: "src/imagens/silentHill2.png",
            descricao: "O protagonista se vê preso numa versão distorcida da cidade, moldada por seus próprios traumas e culpas. Aqui o exílio não é geográfico nem social, mas interno: um isolamento mental do qual não há saída fácil, já que a prisão é a própria mente do personagem."
        },
        {
            titulo: "Death Stranding",
            tagline: "O exílio como consequência de uma catástrofe.",
            capa: "src/imagens/deathStranding.png",
            descricao: "Em um mundo fragmentado por uma catástrofe, sobreviventes vivem isolados em abrigos selados, incapazes de se conectar fisicamente uns aos outros. Sam Porter atravessa essa América em ruínas tentando reconectar pessoas exiladas em suas próprias bolhas de isolamento forçado."
        }
    ];

    // ==========================================
    // DADOS DAS NARRATIVAS (LIVRO) — todos relacionados a diferentes formas de exílio.
    // ==========================================
    const livrosArray = [
        {
            titulo: "Maria",
            autor: "Conceição Evaristo",
            foto: "src/imagens/conceicaoEvaristo.png",
            descricao: "No conto 'Maria', de Conceição Evaristo, o exílio aparece principalmente como uma forma de exclusão social e abandono. Maria é afastada da sociedade por sua condição de mulher negra e pobre, enfrentando preconceito e falta de oportunidades. Assim, o exílio não representa apenas estar longe de um lugar, mas também sentir-se deslocada e sem pertencimento dentro da própria sociedade"
        },
        {
            titulo: "Beijo na Face",
            autor: "Conceição Evaristo",
            foto: "src/imagens/conceicaoEvaristo2.png",
            descricao: "No conto “Beijo na Face”, de Conceição Evaristo, o exílio representa principalmente a sensação de estar presa e afastada de uma vida em que possa ser livre e feliz. A personagem Salinda vive um relacionamento marcado pelo controle e pela violência psicológica, sentindo-se isolada dentro da própria casa. Dessa forma, o exílio aparece como um afastamento emocional e social, causado pela falta de liberdade e pela opressão que ela enfrenta."
        },
        {
            titulo: "A Metamorfose",
            autor: "Franz Kafka",
            foto: "src/imagens/franzKafka.png",
            descricao: "Na novela “A Metamorfose”, de Franz Kafka, o exílio representa principalmente a rejeição e o descarte do indivíduo quando ele deixa de ser útil e produtivo. O personagem Gregor Samsa, após acordar transformado em um inseto, perde imediatamente sua capacidade de trabalhar e de sustentar a casa, passando a ser tratado como um fardo repugnante e sendo trancado pela própria família em seu quarto. Dessa forma, o exílio aparece como um isolamento cruel e utilitarista, causado pela quebra de seu papel de provedor e pela intolerância da família e da sociedade com aquele que não tem mais nada a oferecer materialmente."
        },
        {
            titulo: "O Alienista",
            autor: "Machado de Assis",
            foto: "src/imagens/machadoAssis.png",
            descricao: "No conto “O Alienista”, de Machado de Assis, o exílio representa principalmente a marginalização e o isolamento do indivíduo quando ele é percebido como diferente ou ameaçador pela sociedade. O personagem Dr. Simão Bacamarte, após ser julgado como louco e internado em um asilo, passa a ser tratado como um objeto de estudo e curiosidade, sendo privado de sua liberdade e dignidade. Dessa forma, o exílio aparece como uma forma de controle social e opressão psicológica, causada pela falta de compreensão e pela intolerância da sociedade com aquele que não se encaixa nos padrões estabelecidos."
        },
        {
            titulo: "Quarto de Despejo",
            autor: "Carolina de Jesus",
            foto: "src/imagens/carolinaJesus.png",
            descricao: "No diário “Quarto de Despejo”, de Carolina Maria de Jesus, o exílio representa principalmente a exclusão geográfica, social e econômica imposta à população negra e pobre urbana. A autora, uma catadora de recicláveis e mãe solo vivendo na favela do Canindé, em São Paulo, documenta sua luta diária contra a fome e a invisibilidade extrema. Dessa forma, o exílio aparece de maneira brutal e estrutural: a favela é retratada literalmente como o 'quarto de despejo' da metrópole — o lugar isolado para onde a sociedade elitizada empurra, esconde e abandona os indivíduos que ela marginaliza, negando-lhes o acesso ao desenvolvimento, ao pertencimento e à própria dignidade humana."
        }
    ];

    // Função que reseta e esconde TODOS os conteúdos do pop-up
    function esconderTudo() {
        document.getElementById('conteudo-papeis').classList.add('escondido');
        document.getElementById('conteudo-mp3').classList.add('escondido');
        document.getElementById('conteudo-filme').classList.add('escondido');
        document.getElementById('conteudo-jogo').classList.add('escondido');
        document.getElementById('conteudo-livro').classList.add('escondido');
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

    function renderizarMp3() {
        const urlAtual = playlistMp3[indexAtual].url;
        const idVideo = extrairIdYoutube(urlAtual);

        document.getElementById('video-yt').src = `https://www.youtube.com/embed/${idVideo}?rel=0`;
        document.getElementById('texto-mp3').innerHTML = playlistMp3[indexAtual].info;
        atualizarSetas(playlistMp3.length);
    }

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

    function renderizarLivro() {
        const livroAtual = livrosArray[indexAtual];
        document.getElementById('titulo-livro').textContent = livroAtual.titulo;
        document.getElementById('autor-livro').textContent = livroAtual.autor;
        document.getElementById('descricao-livro').textContent = livroAtual.descricao;

        const imgAutor = document.getElementById('foto-autor-livro');
        imgAutor.src = livroAtual.foto;
        imgAutor.alt = livroAtual.autor;

        atualizarSetas(livrosArray.length);
    }

    function renderizarJogo() {
        const jogoAtual = jogosArray[indexAtual];
        document.getElementById('titulo-jogo').textContent = jogoAtual.titulo;
        document.getElementById('tagline-jogo').textContent = jogoAtual.tagline;
        document.getElementById('descricao-jogo').textContent = jogoAtual.descricao;

        const imgCapa = document.getElementById('capa-jogo');
        imgCapa.src = jogoAtual.capa;
        imgCapa.alt = jogoAtual.titulo;

        atualizarSetas(jogosArray.length);
    }

    // ==========================================
    // 3. CLIQUE NOS ITENS
    // ==========================================
    const todosOsItens = document.querySelectorAll('.item');
    todosOsItens.forEach(item => {
        item.addEventListener('click', (evento) => {
            esconderTudo();
            indexAtual = 0;

            if (evento.target.classList.contains('item-papeis')) {
                itemAtivo = 'papel';
                document.getElementById('conteudo-papeis').classList.remove('escondido');
                renderizarPapel();

            } else if (evento.target.classList.contains('item-mp3')) {
                itemAtivo = 'mp3';
                document.getElementById('conteudo-mp3').classList.remove('escondido');
                renderizarMp3();

            } else if (evento.target.classList.contains('item-cam')) {
                itemAtivo = 'filme';
                document.getElementById('conteudo-filme').classList.remove('escondido');
                renderizarFilme();

            } else if (evento.target.classList.contains('item-psp')) {
                itemAtivo = 'jogo';
                document.getElementById('conteudo-jogo').classList.remove('escondido');
                renderizarJogo();

            } else if (evento.target.classList.contains('item-livro')) {
                itemAtivo = 'livro';
                document.getElementById('conteudo-livro').classList.remove('escondido');
                renderizarLivro();

            } else {
                console.warn('Item clicado sem classe de modo reconhecida:', evento.target);
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
            } else if (itemAtivo === 'jogo' && indexAtual < jogosArray.length - 1) {
                indexAtual++;
                renderizarJogo();
            } else if (itemAtivo === 'livro' && indexAtual < livrosArray.length - 1) {
                indexAtual++;
                renderizarLivro();
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
            } else if (itemAtivo === 'jogo' && indexAtual > 0) {
                indexAtual--;
                renderizarJogo();
            } else if (itemAtivo === 'livro' && indexAtual > 0) {
                indexAtual--;
                renderizarLivro();
            }
        });
    }

    // ==========================================
    // 5. FECHAR POP-UP
    // ==========================================
    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            overlayPopup.classList.add('escondido');
            setTimeout(esconderTudo, 300);
        });
    }
});
