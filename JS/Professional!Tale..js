// treetale_switch.js
// Switches #sansolotl-portrait between its src and data-alt-src every 10 seconds with a fade
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const img = document.getElementById('sansolotl-portrait');
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

        // Start after 10s, then every 10s
        setTimeout(function(){ doSwap(); setInterval(doSwap, 10000); }, 10000);
    });
})();
// treetale_switch.js
// Switches the Sansolotl portrait between the current image and an alternate image every 5 seconds
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const img = document.getElementById('sansolotl-portrait');
        if (!img) return;

        const origSrc = img.getAttribute('src');
        const altSrc = img.dataset.altSrc;
        if (!altSrc) return;

        let showingOrig = true;

        function doSwap(){
            const nextSrc = showingOrig ? altSrc : origSrc;
            // Preload next image
            const pre = new Image();
            pre.src = nextSrc;
            pre.onload = function(){
                // Fade out, then swap on transition end
                img.classList.add('fade-out');
                const onEnd = function(){
                    img.removeEventListener('transitionend', onEnd);
                    img.src = nextSrc;
                    // Force reflow then fade in
                    void img.offsetWidth;
                    img.classList.remove('fade-out');
                    showingOrig = !showingOrig;
                };
                img.addEventListener('transitionend', onEnd);
                // Fallback in case transitionend doesn't fire
                setTimeout(function(){
                    if (img.classList.contains('fade-out')){
                        img.removeEventListener('transitionend', onEnd);
                        img.src = nextSrc;
                        img.classList.remove('fade-out');
                        showingOrig = !showingOrig;
                    }
                }, 900);
            };
        }

        // Start after 5s, then every 5s
        setTimeout(function(){
            doSwap();
            setInterval(doSwap, 5000);
        }, 5000);
    });
})();
