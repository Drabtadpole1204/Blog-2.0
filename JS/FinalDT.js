// Carousel for Undertale Breaking Point portrait
// switches between two images every 10s with a fade
(function(){
    const imgs = [
        "../PNG/Final DT Sans.PNG",
        "../PNG/Final DT Sans Phase 2.PNG",


    ];

    function startCarousel(){
        const imgEl = document.getElementById('d-portrait');
        if(!imgEl) return;
        let idx = imgs.indexOf(imgEl.src.split('/').pop()) >= 0 ? imgs.indexOf(imgEl.src) : 0;
        // Normalize idx by filename match
        const currentFile = imgEl.src.split('/').pop();
        const found = imgs.findIndex(p => p.split('/').pop() === currentFile);
        idx = found >= 0 ? found : 0;

        imgEl.style.transition = 'opacity 300ms ease';
        imgEl.style.opacity = '1';

        setInterval(()=>{
            const nextIdx = (idx + 1) % imgs.length;
            imgEl.style.opacity = '0';

            // preload the next image and only swap if it loads; if it fails, fall back to the first image
            const pre = new Image();
            pre.src = imgs[nextIdx];
            pre.onload = ()=>{
                setTimeout(()=>{
                    idx = nextIdx;
                    imgEl.src = imgs[idx];
                    void imgEl.offsetWidth;
                }, 150);
                setTimeout(()=>{ imgEl.style.opacity = '1'; }, 150);
            };
            pre.onerror = ()=>{
                // fallback to first available image instead of showing broken image alt text
                setTimeout(()=>{
                    idx = 0;
                    imgEl.src = imgs[idx];
                    void imgEl.offsetWidth;
                    imgEl.style.opacity = '1';
                }, 150);
            };
        }, 10000);
    }

    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', startCarousel);
    } else {
        startCarousel();
    }
})();