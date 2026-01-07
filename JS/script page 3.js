//dados de exemplo para Page 3
const dados = [
    {
        title: "Why",
        content: "Why was the first concept of Sonic the Hedgehog... (short intro)",
        imagem: "PNG/Why.png",
        botao: "./Html/Why.html"
    },
    {
        title: "Rachet T.Deer",
        content: "Eggman's forgotten Deer Robot.",
        imagem: "PNG/Rachet.PNG",
        botao: "./Html/Rachet.html"
    },
    {
        title: "Hamlet T.Knight",
        content: "A legendary knight.",
        imagem: "PNG/Hamlet T.Knight.PNG",
        botao: "./Html/Hamlet.html"
    },
    {
        title: "Hank T.Rabbit",
        content: "One of Eggman's robots.",
        imagem: "PNG/Hank.PNG",
        botao: "./Html/Hank.html"
    },
        {
        title: "Tony",
        content: "A Liquid Life Form.",
        imagem: "PNG/Tony.PNG",
        botao: "./Html/Tony.html"
    },
];

function loadNews() {
    try {
        const container = document.getElementById('news-container');
        if(!container) return;
        container.innerHTML = '';
        dados.forEach(noticia => {
            const card = document.createElement('div');
            card.classList.add('news-item');
            const imgClass = '';
            card.innerHTML = `
                <img src="${noticia.imagem}" alt="${noticia.title}" class="${imgClass}">
                <h2>${noticia.title}</h2>
                <p>${noticia.content}</p>
                <a href="${noticia.botao}">Leia mais</a>
            `;
            container.appendChild(card);
        });
    } catch(e){
        console.error('Error rendering news (page3):', e);
    }
}

// run on DOM ready
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadNews);
else loadNews();

// responsive menu interactivity (if present)
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const toggle = document.querySelector('.menu-toggle');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});

// path-fix helper same as other scripts
(function(){
    function normalizeKey(p){
        p = p.replace(/^https?:\/\/.+?\//,'');
        p = p.replace(/^\.\/?/,'');
        p = p.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
        p = p.replace(/\\/g,'/');
        p = p.replace(/[^a-z0-9.\/_-]+/g,'-');
        p = p.replace(/-+/g,'-');
        p = p.replace(/^-+|-+$/g,'');
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
                if(/^https?:|^data:/.test(val)) return;
                try{ const r = await fetch(val, {method:'HEAD'}); if(r.ok) return; }catch(e){}
                const key = normalizeKey(val);
                if(manifest[key]) el.setAttribute(attr, manifest[key]);
                else {
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