// sansbattle_switch.js
// Toggles the image with id 'glitch-portrait' between its src and data-alt-src every 5 seconds
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const img = document.getElementById('glitch-portrait');
        if (!img) return;

        const orig = img.getAttribute('src');
        const alt = img.dataset.altSrc;
        if (!alt) return;

        let showingOrig = true;

        function swap(){
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
                }, 700);
            };
        }

        // Start after 5s, then every 5s
        setTimeout(function(){ swap(); setInterval(swap, 5000); }, 5000);
    });
})();
