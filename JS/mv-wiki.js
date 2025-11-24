// Tab switching for Murderverse wiki (unique file name)
// File: JS/mv-wiki.js
(function(){
    const btnStory = document.getElementById('mv-tab-btn-story');
    const btnAbilities = document.getElementById('mv-tab-btn-abilities');
    const btnAU = document.getElementById('mv-tab-btn-au');
    const tabs = [btnStory, btnAbilities, btnAU];

    function showTab(button){
        // deactivate all
        tabs.forEach(b => {
            if(!b) return;
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            const panel = document.getElementById(b.getAttribute('aria-controls'));
            if(panel) panel.hidden = true;
        });

        // activate chosen
        if(!button) return;
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if(panel) panel.hidden = false;
        const firstHeading = panel && panel.querySelector('h3');
        if(firstHeading) firstHeading.focus();
    }

    // attach handlers
    tabs.forEach(b => {
        if(!b) return;
        b.addEventListener('click', ()=> showTab(b));
        b.addEventListener('keydown', (e)=>{
            if(e.key === 'ArrowRight'){
                const idx = tabs.indexOf(b);
                const next = tabs[(idx+1)%tabs.length];
                next && next.focus();
            } else if(e.key === 'ArrowLeft'){
                const idx = tabs.indexOf(b);
                const prev = tabs[(idx-1+tabs.length)%tabs.length];
                prev && prev.focus();
            }
        });
    });

    // initial state
    document.addEventListener('DOMContentLoaded', ()=>{
        const active = document.querySelector('.wiki-tabs button[aria-selected="true"]') || btnStory;
        active && showTab(active);
        document.querySelectorAll('.wiki-content h3').forEach(h=> h.setAttribute('tabindex','-1'));
    });
})();
