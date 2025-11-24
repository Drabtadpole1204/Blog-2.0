

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

