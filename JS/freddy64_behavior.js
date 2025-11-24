// freddy64_behavior.js
// Minimal behavior: tab switching for this wiki and a small portrait bounce on focus
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        // Tab switching (simple)
        const tabs = document.querySelectorAll('.wiki-tabs [role="tab"]');
        const panels = document.querySelectorAll('.wiki-content [role="tabpanel"]');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tabs.forEach(t => t.setAttribute('aria-selected','false'));
                panels.forEach(p => p.hidden = true);

                tab.classList.add('active');
                tab.setAttribute('aria-selected','true');
                const id = tab.getAttribute('aria-controls');
                const panel = document.getElementById(id);
                if (panel) panel.hidden = false;
            });
        });

        // Small bounce when clicking image (64 game feel)
        const img = document.getElementById('ff-portrait');
        if (img){
            img.style.transition = 'transform 220ms cubic-bezier(.2,.8,.2,1)';
            img.addEventListener('click', () => {
                img.style.transform = 'translateY(-8px) scale(1.02)';
                setTimeout(()=> img.style.transform = '', 220);
            });
        }
    });
})();
