//dados de exemplo para Page 3
const dados = [
                      {
        title: "Niles The Bathog",
        content: "An hybrid between a Bat and a Hedgehog.",
        imagem: "PNG/Niles.PNG",
        botao: "./Html/Niles.html"
    },
                      {
        title: "Alpha",
        content: "Embodiement of the Beginning, the Past, the Alpha.",
        imagem: "PNG/Alpha.PNG",
        botao: "./Html/Alpha.html"
    },
                  {
        title: "Beta",
        content: "Embodiement of the Middle, the Current, the Present, the Beta.",
        imagem: "PNG/Beta.PNG",
        botao: "./Html/Beta.html"
    },
                  {
        title: "Omega",
        content: "Embodiement of the End, the Future, the Omega.",
        imagem: "PNG/Omega.PNG",
        botao: "./Html/OM.html"
    },
    {
        title: "Why",
        content: "Why was the first concept of Sonic the Hedgehog... (short intro)",
        imagem: "PNG/Why.png",
        botao: "./Html/Why.html"
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
    {
        title: "Alex The Deer",
        content: "A Deer who aims to be a Sannin when he grows up.",
        imagem: "PNG/Alex T.Deer.PNG",
        botao: "./Html/Alex.html"
    },
    {
        title: "Rachet T.Deer",
        content: "Eggman's forgotten Deer Robot.",
        imagem: "PNG/Rachet.PNG",
        botao: "./Html/Rachet.html"
    },
    {
        title: "Rachet 2.0",
        content: "Rachet after being upgraded by Tails.",
        imagem: "PNG/Rachet 2.0.PNG",
        botao: "./Html/Rachet 2.0.html"
    },
                  {
        title: "Rachet EX",
        content: "Rachet's version of NEO Metal Sonic.",
        imagem: "PNG/Rachet EX.PNG",
        botao: "./Html/Rachet EX.html"
    },
                  {
        title: "Rachet NEO",
        content: "Rachet's version of Metal Overlord.",
        imagem: "PNG/Rachet NEO.PNG",
        botao: "./Html/Rachet NEO.html"
    },
                  {
        title: "Roy",
        content: "A child Demi-god.",
        imagem: "PNG/Roy.PNG",
        botao: "./Html/Roy.html"
    },
                  {
        title: "Rocket",
        content: "An hybrid.",
        imagem: "PNG/Rocket T. Chark.PNG",
        botao: "./Html/Rocket.html"
    },
                      {
        title: "Raku",
        content: "A person who is like a Knight, but in the modern days.",
        imagem: "PNG/Raku The Knight.PNG",
        botao: "./Html/Raku.html"
    },
                      {
        title: "B.U.T.T.E.R.F.L.Y.",
        content: "The Ultimate Robot.",
        imagem: "PNG/B.U.T.T.E.R.F.L.Y.PNG",
        botao: "./Html/BUTTERFLY.html"
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