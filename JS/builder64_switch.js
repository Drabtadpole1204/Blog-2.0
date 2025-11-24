// builder64_switch.js
// Switches #b64-portrait between Builder64.png and Hammer.png every 9 seconds with a fade
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const img = document.getElementById('b64-portrait');
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

        // Start after 9s, then every 9s
        setTimeout(function(){ doSwap(); setInterval(doSwap, 9000); }, 9000);
    });
})();
