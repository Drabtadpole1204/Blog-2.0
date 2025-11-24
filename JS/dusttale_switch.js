// dusttale_switch.js
// Cycles the Dusttale portrait through three images every 9 seconds
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const img = document.getElementById('dh-portrait');
        if (!img) return;

        const framesData = img.dataset.frames;
        if (!framesData) return;
        const frames = framesData.split('|').map(s => s.trim()).filter(Boolean);
        if (frames.length < 2) return;

        // determine starting index based on current src
        let index = frames.findIndex(f => f.replace(/\\/g,'/') === img.getAttribute('src').replace(/\\/g,'/'));
        if (index === -1) index = 0;

        // preload images
        frames.forEach(f => { const p = new Image(); p.src = f; });

        function swapTo(nextIndex){
            const nextSrc = frames[nextIndex];
            const pre = new Image();
            pre.src = nextSrc;
            pre.onload = function(){
                img.classList.add('fade-out');
                const onEnd = function(){
                    img.removeEventListener('transitionend', onEnd);
                    img.src = nextSrc;
                    void img.offsetWidth; // reflow
                    img.classList.remove('fade-out');
                };
                img.addEventListener('transitionend', onEnd);
                // fallback in case transitionend doesn't fire
                setTimeout(function(){
                    if (img.classList.contains('fade-out')){
                        img.removeEventListener('transitionend', onEnd);
                        img.src = nextSrc;
                        img.classList.remove('fade-out');
                    }
                }, 900);
            };
        }

        function advance(){
            index = (index + 1) % frames.length;
            swapTo(index);
        }

        // Start after 9s, then every 9s
        setTimeout(function(){ advance(); setInterval(advance, 9000); }, 9000);
    });
})();
