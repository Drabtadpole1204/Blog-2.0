// glass_switch.js
// Switches #glass-portrait between its src and data-alt-src every 5 seconds with a fade
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const img = document.getElementById('glass-portrait');
        if (!img) return;

        const orig = img.getAttribute('src');
        const alt = img.dataset.altSrc;
        if (!alt) return;

        let showingOrig = true;

        function doSwap(){
            const next = showingOrig ? alt : orig;
            const pre = new Image();
            pre.src = next;
            pre.onload = function(){
                img.classList.add('fade-out');
                const onEnd = function(){
                    img.removeEventListener('transitionend', onEnd);
                    img.src = next;
                    void img.offsetWidth;
                    img.classList.remove('fade-out');
                    showingOrig = !showingOrig;
                };
                img.addEventListener('transitionend', onEnd);
                // fallback
                setTimeout(function(){
                    if (img.classList.contains('fade-out')){
                        img.removeEventListener('transitionend', onEnd);
                        img.src = next;
                        img.classList.remove('fade-out');
                        showingOrig = !showingOrig;
                    }
                }, 900);
            };
        }

        // Start after 5s, then every 5s
        setTimeout(function(){ doSwap(); setInterval(doSwap, 5000); }, 5000);
    });
})();
