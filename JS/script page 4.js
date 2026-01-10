// dados de exemplo (page 2) - filename without spaces
console.log('script-page-2.js loaded');
const dados = [
    {
        title: "Daniel (Piggy Distortion)",
        content: "A half-brown, half-golden dog with powers.",
        imagem: "PNG/Daniel.PNG",
        botao: "./Html/PiggyDistortionDaniel.html"
    },
    {
        title: "Brandon (Piggy Distortion)",
        content: "Brandon, the strongest infected.",
        imagem: "PNG/Brandon.png",
        botao: "./Html/PiggyDistortionBrandon.html"
    },
   {
        title: "Scott (Piggy: Distortion)",
        content: "One Of The Detectives In L.P.D. and Bryan's Twin Brother.",
        imagem: "PNG/Scott.png",
        botao: "./Html/Skele.html"
    },
    {
        title: "Bryan (Piggy: Distortion)",
        content: "A Multi-Trillionaire Skeleton and Scott's Twin Brother.",
        imagem: "PNG/Bryan.png",
        botao: "./Html/Skele2.html"
    },
    {
        title: "Doctor  Billy (Piggy: Distortion)",
        content: "A Scientist Who Worked With Mr.P and Badgy. Now Stuck In This Mess.",
        imagem: "PNG/Doctor Billy.png",
        botao: "./Html/Doc.html"
    },
];

function loadNews() {
    try {
        const container = document.getElementById('news-container');
        if(!container) return;
        container.innerHTML = '';

        let added = 0;
        dados.forEach(noticia => {
            const card = document.createElement('div');
            card.classList.add('news-item');
            let imgClass = '';
            if (noticia.imagem) {
                const lower = noticia.imagem.toLowerCase();
                if (lower.endsWith('colored brandon v1.png') || lower.endsWith('why v1.png')) {
                    imgClass = 'large-news-img';
                }
            }
            card.innerHTML = `
                <img src="${noticia.imagem}" alt="${noticia.title}" class="${imgClass}">
                <h2>${noticia.title}</h2>
                <p>${noticia.content}</p>
                <a href="${noticia.botao}">Leia mais</a>
            `;
            container.appendChild(card);
            added++;
        });
        // ensure container has some visible height and report progress
        if(added === 0) console.warn('No cards were added on page2.');
        else console.log(`Added ${added} cards to page2.`);
        if(!container.style.minHeight) container.style.minHeight = '200px';
    } catch(e){
        console.error('Error rendering news (page2):', e);
    }
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadNews);
else loadNews();

// responsive menu
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const toggle = document.querySelector('.menu-toggle');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});

// path fixer (same as others)
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