//dados de exemplo
const dados = [
    {
        title: "Sansolote (Treetale)",
        content: "From the Treetale AU, one of my first AUs.",
        imagem: "../PNG/Sansolote no Photopea v1.png",
        botao: "Treetale.html"
    },
    {
        title: "Glitch Sans (Sans Battles!)",
        content: "You have a big Skill issue, kid, learn how to play!",
        imagem:"../PNG/Imagem.png",
        botao: "SansBattles!.html"
    },
    {
        title: "Glass Sans (Sans Battles!)",
        content: "Glass Sans.",
        imagem: "../PNG/Glass Sans.png",
        botao: "Glass.html"
    },
    {
        title: "Glitch Papyrus (No AU)",
        content: "Papyrus with abilities similar to Error Sans, but not belonging to the same AU.",
        imagem: "../PNG/Glitch Papyrus.png",
        botao: "ErrorPapyrus.html"
    },
    {
        title: "Eletric!Sans (Eletrictale)",
        content: "An experiment with some rather...SHOCKING consequences.",
        imagem: "../PNG/Eletrictale!Sans.png",
        botao: "Eletric!Tale.html"
    },
    {
        title: "Teacher!Sans (Sansverse) (Subject!Tale)",
        content: "Sans as a Math Teacher.",
        imagem: "../PNG/Teacher Sans.png",
        botao: "Subject!Tale.html"
    },
    {
        title: "Creatorverse Nightmare (CV!Nightmare) (Creatorverse)",
        content: "CV!Nightmare, son of CV!Nim, Guardian of emotions, feelings, and the Tree of Feelings, twin brother of CV!Dream.",
        imagem: "../PNG/CV!Nightmare.png",
        botao: "CV!Nightmare.html"
    },
    {
        title: "Creatorverse Dream (CV!Dream) (Creatorverse)",
        content: "CV!Dream, son of CV!Nim, Guardian of emotions, feelings, and the Tree of Feelings, twin brother of CV!Nightmare.",
        imagem: "../PNG/CV!Dream.png",
        botao: "CV!Dream.html"
    },

    {
        title: "Murderverse (???)",
        content: "...........HATE.........HATE, HATE.......",
        imagem: "../PNG/Murderverse (1).png",
        botao: "Murderverse.html"
    },
    {
        title: "Asriel Dreemurr (Dusttale: Hyperdeath)",
        content: "Dusttale....what if....?",
        imagem: "../PNG/Dusttale_Hyperdeath Asriel.png",
        botao: "DusttaleHyperdeath.html"
    },
    {
        title: "Freddy 64 (Freddy and Friends)",
        content: "A '64-style Freddy, he has all the Freddys as his brothers, and he has his own gang. He also has a twin brother just like him, named Alfred.",
        imagem: "../PNG/64.png",
        botao: "FreddyAndFriends.html"
    },
    {
        title: "Builder64",
        content: "Builder64, a unique character.",
        imagem: "../PNG/Builder64.png",
        botao: "Builder64.html"
    },
    {
        title: "Daniel (Piggy Distortion)",
        content: "A half-brown, half-golden dog with powers.",
        imagem: "../PNG/RobloxDaniel.png",
        botao: "PiggyDistortionDaniel.html"
    },
    {
        title: "Brandon (Piggy Distortion)",
        content: "Brandon, the strongest infected.",
        imagem: "../PNG/Brandon.png",
        botao: "PiggyDistortionBrandon.html"
    },
    {
        title: "Why",
        content: "The First, before any concept of Sonic, the Hedgehog.",
        imagem: "../PNG/Why.png",
        botao: "Why.html"
    },
    {
        title: "SMX",
        content: "Made in Memory/Tribute of SMG4.Thank you for everything.",
        imagem: "../PNG/SMX.png",
        botao: "SMX.html"
    },
    {
        title: "Sans (Undertale:Breaking Point)",
        content: "Pacience has a limit...",
        imagem: "../PNG/Sans.png",
        botao: "UndertaleBreakingPoint.html"
    }

];

const container = document.getElementById('news-container');

function loadNews() {
    container.innerHTML = ''; // Limpa o container antes de carregar as notícias
    
    //pega os dados que criamos ali em cima e usa o metodo forEach q significa "para cada", então para cada noticia cria um parametro chamado 'noticia'
    dados.forEach(noticia => {
        //cria uma variavel chamada card q cria um elemento 'div'
        const card = document.createElement('div');
        //add a classe news-item a essa div
        card.classList.add('news-item');
        // determine if this image needs a forced large display (some PNGs have extra whitespace/aspect)
        let imgClass = '';
        if (noticia.imagem) {
            const lower = noticia.imagem.toLowerCase();
            if (lower.endsWith('colored brandon v1.png') || lower.endsWith('why v1.png')) {
                imgClass = 'large-news-img';
            }
        }
        //inner HTML manda p html o conteudo da div
        //para CADA ums DOS CARDS PELO FOREACH
        card.innerHTML = `
            <img src="${noticia.imagem}" alt="${noticia.title}" class="${imgClass}">
            <h2>${noticia.title}</h2>
            <p>${noticia.content}</p>
            <a href="${noticia.botao}">Leia mais</a>
        `;
        container.appendChild(card); //adiciona o card ao container
    });
}

//executa a função ao carregar à pagina
document.addEventListener('DOMContentLoaded', loadNews);

//exemplo de interatividade menu responsivo
const nav = document.getElementById('main-nav');
const toggle = document.getElementsByClassName('menu-toggle')

toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});