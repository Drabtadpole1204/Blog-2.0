//dados de exemplo
const dados = [
    {
        title: "Sansolote (Treetale)",
        content: "From the Treetale AU, one of my first AUs.",
        imagem: "PNG/Sansolote no Photopea v1.png",
        botao: "./Html/Treetale.html"
    },
    {
        title: "Glitch Sans (Sans Battles!)",
        content: "You have a big Skill issue, kid, learn how to play!",
        imagem:"PNG/Imagem.png",
        botao: "./Html/SansBattles!.html"
    },
    {
        title: "Glass Sans (Sans Battles!)",
        content: "Glass Sans.",
        imagem: "PNG/Glass Sans.png",
        botao: "./Html/Glass.html"
    },
    {
        title: "Glitch Papyrus (No AU)",
        content: "Papyrus with abilities similar to Error Sans, but not belonging to the same AU.",
        imagem: "PNG/Glitch Papyrus.png",
        botao: "./Html/ErrorPapyrus.html"
    },
    {
        title: "Eletric!Sans (Eletrictale)",
        content: "An experiment with some rather...SHOCKING consequences.",
        imagem: "PNG/Eletrictale!Sans.png",
        botao: "./Html/Eletric!Tale.html"
    },
    {
        title: "Teacher!Sans (Sansverse) (Subject!Tale)",
        content: "Sans as a Math Teacher.",
        imagem: "PNG/Teacher Sans.png",
        botao: "./Html/Subject!Tale.html"
    },
    {
        title: "Creatorverse Nightmare (CV!Nightmare) (Creatorverse)",
        content: "CV!Nightmare, son of CV!Nim, Guardian of emotions, feelings, and the Tree of Feelings, twin brother of CV!Dream.",
        imagem: "PNG/CV!Nightmare.png",
        botao: "./Html/CV!Nightmare.html"
    },
    {
        title: "Creatorverse Dream (CV!Dream) (Creatorverse)",
        content: "CV!Dream, son of CV!Nim, Guardian of emotions, feelings, and the Tree of Feelings, twin brother of CV!Nightmare.",
        imagem: "PNG/CV!Dream.png",
        botao: "./Html/CV!Dream.html"
    },

    {
        title: "Murderverse (???)",
        content: "...........HATE.........HATE, HATE.......",
        imagem: "PNG/Murderverse (1).png",
        botao: "./Html/Murderverse.html"
    },
    {
        title: "Asriel Dreemurr (Dusttale: Hyperdeath)",
        content: "Dusttale....what if....?",
        imagem: "PNG/DTH Asriel.png",
        botao: "./Html/DusttaleHyperdeath.html"
    },

    {
        title: "Sans (Undertale:Breaking Point)",
        content: "Pacience has a limit...",
        imagem: "PNG/Sans.png",
        botao: "./Html/UndertaleBreakingPoint.html"
    },
    {
        title: "Bacon & Sammy",
        content: "Two Friends Who Have Found Inner Peace.",
        imagem: "PNG/Capturas.png",
        botao: "./Html/InnerPeace.html"
    },
    {
        title: "∞/0",
        content: "The Personification of Everything and Nothing.",
        imagem: "PNG/Captura 3.png",
        botao: "./Html/∞0.Html"
    },
    {
        title: "Geo (Creatorverse)",
        content: "A Mysterious Being Created By Pixels.",
        imagem: "PNG/Captura 4.png",
        botao: "./Html/CV.html"
    },
    {
        title: "Fright",
        content: "An Outsider.",
        imagem: "PNG/Captura 5.png",
        botao: "./Html/Fright.html"
    },
    {
        title: "Lex (Lextale)",
        content: "The One Who Aims To Be The Biggest Royal Guard, And Hero Of His World.",
        imagem: "./PNG/Captura 6.png",
        botao: "./Html/Lextale.html"
    },

    {
        title: "Monkey (Creatorverse)",
        content: "Because Why Not?.",
        imagem: "PNG/Monke.png",
        botao: "./Html/Monkey.html"
    },
    {
        title: "Bakon (BloodBlox)",
        content: "Who Will Stop The Craftian At All Costs.",
        imagem: "PNG/Captura 7.png",
        botao: "./Html/BloodBlox.html"
    },
        {
        title: "Omega Matrix!Sans",
        content: "The Chosen One.",
        imagem: "PNG/Omega Matrix! Sans.png",
        botao: "./Html/Omega.html"
    },
    {
        title: "Paradigm (Professional!Tale)",
        content: "One of Voidheim's greatest creations.",
        imagem: "PNG/Paradigm.png",
        botao: "./Html/Professional!Tale.html"
    },
    {   
        title: "Ungodly Dust Sans (Test Ops/Creatorverse)",
        content: "A character from Test Ops and Creatorverse.",
        imagem: "PNG/Ungodly Dust Sans.PNG",
        botao: "./Html/Ungodly.html"
    },
    {   
        title: "Ultra Killer Sans (Test Ops/Creatorverse)",
        content: "A character from Test Ops and Creatorverse.",
        imagem: "PNG/Ultra Killer Sans.PNG",
        botao: "./Html/Ultra.html"
    } ,   
    {   
        title: "Final DT Sans (Test Ops)",
        content: "A character from Test Ops.",
        imagem: "PNG/Final DT Sans.PNG",
        botao: "./Html/FinalDT.html"
    },
    {   
        title: "Outer Limbo Sans (Test Ops/Creatorverse)",
        content: "A character from Test Ops and Creatorverse.",
        imagem: "PNG/Outerlimbo Sans.PNG",
        botao: "./Html/OuterLimbo.html"
    },
    {   
        title: "DT Papyrus (Test Ops/DT!Belief)",
        content: "A character from Test Ops and DT!Belief.",
        imagem: "PNG/DT Belief Paps.PNG",
        botao: "./Html/DT.html"
    },


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
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const toggle = document.querySelector('.menu-toggle');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});

// --- path-fix helper: tries to repair broken src/href by consulting assets-manifest.json ---
(function(){
    function normalizeKey(p){
        // remove protocol/domain
        p = p.replace(/^https?:\/\/.+?\//,'');
        p = p.replace(/^\.\/?/,'');
        // lowercase and remove diacritics
        p = p.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
        // replace backslashes
        p = p.replace(/\\/g,'/');
        // replace non-alphanum except ./-_ with '-'
        p = p.replace(/[^a-z0-9.\/_-]+/g,'-');
        // collapse multiple '-'
        p = p.replace(/-+/g,'-');
        // remove leading/trailing '-'
        p = p.replace(/^[-]+|[-]+$/g,'');
        return p;
    }

    async function fixPaths(){
        let resp;
        try{ resp = await fetch('/assets-manifest.json'); }catch(e){ return; }
        if(!resp.ok) return;
        const manifest = await resp.json();

        const attrs = [{sel:'img',attr:'src'},{sel:'audio',attr:'src'},{sel:'source',attr:'src'},{sel:'a',attr:'href'}];
        for(const {sel,attr} of attrs){
            document.querySelectorAll(sel).forEach(async el => {
                const val = el.getAttribute(attr);
                if(!val) return;
                if(/^https?:|^data:/.test(val)) return; // external or data
                try{
                    const r = await fetch(val, {method:'HEAD'});
                    if(r.ok) return; // path valid
                }catch(e){/*ignore*/}

                // try manifest lookup
                const key = normalizeKey(val);
                if(manifest[key]){
                    el.setAttribute(attr, manifest[key]);
                } else {
                    // try adding folder prefixes png/ muscias/
                    const key2 = normalizeKey('png/'+val.split('/').pop());
                    const key3 = normalizeKey('musicas/'+val.split('/').pop());
                    if(manifest[key2]) el.setAttribute(attr, manifest[key2]);
                    else if(manifest[key3]) el.setAttribute(attr, manifest[key3]);
                }
            });
        }
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixPaths);
    else fixPaths();
})();

// --- autoplay helper: try to start audio, show fallback button if browser blocks autoplay ---
(function(){
    function playAll(){
        const audios = Array.from(document.querySelectorAll('audio'));
        if(!audios.length) return Promise.resolve();
        return Promise.all(audios.map(a => {
            try{ a.load(); } catch(e){}
            return a.play();
        }));
    }

    function showPlayButton(){
        if(document.getElementById('play-music-fallback')) return;
        const btn = document.createElement('button');
        btn.id = 'play-music-fallback';
        btn.textContent = '▶ Play music';
        Object.assign(btn.style,{
            position:'fixed',
            right:'12px',
            bottom:'12px',
            zIndex:9999,
            padding:'8px 12px',
            background:'#222',
            color:'#fff',
            border:'none',
            borderRadius:'6px',
            cursor:'pointer',
            fontSize:'14px',
            opacity:'0.95'
        });
        btn.addEventListener('click', ()=>{
            playAll().then(()=>{ btn.remove(); localStorage.setItem('musicEnabled','1'); })
                     .catch(()=>{ /* still blocked */ });
        });
        document.body.appendChild(btn);
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        const audios = document.querySelectorAll('audio');
        if(!audios.length) return;
        if(localStorage.getItem('musicEnabled')){
            playAll().catch(()=> showPlayButton());
            return;
        }
        playAll().catch(()=> showPlayButton());
        const onFirstGesture = ()=>{
            playAll().then(()=>{ document.removeEventListener('click', onFirstGesture); const btn=document.getElementById('play-music-fallback'); if(btn) btn.remove(); localStorage.setItem('musicEnabled','1'); }).catch(()=>{});
        };
        document.addEventListener('click', onFirstGesture, {once:true});
    });
})();

console.log();