

// Robust tab switching for wiki pages
// Finds each .wiki-tabs group and wires up its own buttons/panels so pages can use different ids
// File: JS/wiki.js
(function(){
    function setupTablist(tablist){
        const buttons = Array.from(tablist.querySelectorAll('button[role="tab"]'));
        if(buttons.length === 0) return;

        function show(button){
            buttons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
                const panelId = b.getAttribute('aria-controls');
                if(panelId){
                    const panel = document.getElementById(panelId);
                    if(panel) panel.hidden = true;
                }
            });

            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            const panelId = button.getAttribute('aria-controls');
            if(panelId){
                const panel = document.getElementById(panelId);
                if(panel) panel.hidden = false;
                const firstHeading = panel && panel.querySelector('h3');
                if(firstHeading) firstHeading.focus();
            }
        }

        buttons.forEach((b, idx) => {
            b.addEventListener('click', () => show(b));
            b.addEventListener('keydown', (e) => {
                if(e.key === 'ArrowRight'){
                    const next = buttons[(idx+1) % buttons.length];
                    next && next.focus();
                } else if(e.key === 'ArrowLeft'){
                    const prev = buttons[(idx-1+buttons.length) % buttons.length];
                    prev && prev.focus();
                }
            });
        });

        // initial activation
        const active = tablist.querySelector('button[aria-selected="true"]') || buttons[0];
        active && show(active);
    }

    function init(){
        document.querySelectorAll('.wiki-tabs').forEach(setupTablist);
        // make article headings focusable for accessibility
        document.querySelectorAll('.wiki-content h3').forEach(h=> h.setAttribute('tabindex','-1'));
    }

    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// small path-fix for wiki pages too (uses same manifest)
(function(){
    function normalizeKey(p){
        p = p.replace(/^https?:\/\/.+?\//,'');
        p = p.replace(/^\.\/?/,'');
        p = p.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
        p = p.replace(/\\/g,'/');
        p = p.replace(/[^a-z0-9.\/_-]+/g,'-');
        p = p.replace(/-+/g,'-');
        p = p.replace(/^[-]+|[-]+$/g,'');
        return p;
    }

    async function fixPaths(){
        let resp;
        try{ resp = await fetch('/assets-manifest.json'); }catch(e){ return; }
        if(!resp.ok) return;
        const manifest = await resp.json();
        const nodes = Array.from(document.querySelectorAll('img, source, audio, a'));
        for(const el of nodes){
            const attrs = ['src','href'];
            for(const attr of attrs){
                const val = el.getAttribute && el.getAttribute(attr);
                if(!val) continue;
                if(/^https?:|^data:/.test(val)) continue;
                try{ const r = await fetch(val,{method:'HEAD'}); if(r.ok) continue; }catch(e){}
                const key = normalizeKey(val);
                if(manifest[key]) el.setAttribute(attr, manifest[key]);
                else {
                    const guess = normalizeKey('png/'+val.split('/').pop());
                    const guess2 = normalizeKey('musicas/'+val.split('/').pop());
                    if(manifest[guess]) el.setAttribute(attr, manifest[guess]);
                    else if(manifest[guess2]) el.setAttribute(attr, manifest[guess2]);
                }
            }
        }
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixPaths);
    else fixPaths();
})();

