// freddy64_switch.js
// Cycle through multiple frames listed in data-frames on #ff-portrait every 10 seconds with fade
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const img = document.getElementById('ff-portrait');
        if (!img) return;

        const framesData = img.dataset.frames;
        if (!framesData) return;
        let frames = framesData.split('|').map(s => s.trim()).filter(Boolean);
        if (frames.length === 0) return;

        // If a requested frame filename is missing on disk, it will simply fail to preload.
        // You can replace missing names by editing the data-frames attribute in the HTML.

        // Find starting index from current src
        let index = frames.findIndex(f => f.replace(/\\/g,'/') === img.getAttribute('src').replace(/\\/g,'/'));
        if (index === -1) index = 0;

        // Preload images
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
            pre.onerror = function(){
                console.warn('Failed to preload frame:', nextSrc);
            };
        }

        function advance(){
            index = (index + 1) % frames.length;
            swapTo(index);
        }

        // Start after 10s, then every 10s
        setTimeout(function(){ advance(); setInterval(advance, 10000); }, 10000);
    });
})();
