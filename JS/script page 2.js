//dados de exemplo
const dados = [
    {
        title: "Freddy 64 (Freddy and Friends)",
        content: "A '64-style Freddy, he has all the Freddys as his brothers, and he has his own gang. He also has a twin brother just like him, named Alfred.",
        imagem: "PNG/64.png",
        botao: "./Html/FreddyAndFriends.html"
    },
    {
        title: "Dr.Fade (Anomaly & Phobia Facility)",
        content: "The One Who Always Has a Contengency Plan.",
        imagem: "PNG/Captura 2.png",
        botao: "./Html/A&PF.html"
    },

    {
        title: "Ralph (Redcliff)",
        content: "Redcliff General.",
        imagem: "PNG/Ralph.png",
        botao: "./Html/Redcliff.html"
    },


];

function loadNews() {
    try {
        const container = document.getElementById('news-container');
        if(!container) return;
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
    } catch(e){
        console.error('Error rendering news:', e);
    }
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

console.log();