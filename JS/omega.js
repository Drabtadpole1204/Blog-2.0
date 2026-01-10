// Carousel for Undertale Breaking Point portrait
// switches between two images every 10s with a fade
(function(){
    const imgs = [
        "../PNG/Omega Matrix! Sans.png",
        "../PNG/Omega Matrix V2.png",
        "../PNG/Omega Matrix!Sans T.E.X.T.U.R.E.png",
        "../PNG/Matrix of Infinity.png",
        "../PNG/Omega Matrix E.V.O.L.U.T.I.O.N (1).png",
        "../PNG/Binary Scythe.png",

    ];

    function startCarousel(){
        const imgEl = document.getElementById('ubp-portrait');
        if(!imgEl) return;
        // find index by filename match (robust to absolute/relative src differences)
        const currentFile = imgEl.getAttribute('src').split('/').pop();
        let idx = imgs.findIndex(p => p.split('/').pop() === currentFile);
        if(idx === -1) idx = 0;

        imgEl.style.transition = 'opacity 600ms ease';
        imgEl.style.opacity = '1';

        function showIndex(i){
            const nextSrc = imgs[i];
            const pre = new Image();
            pre.src = nextSrc;
            pre.onload = function(){
                imgEl.style.opacity = '0';
                setTimeout(()=>{
                    imgEl.src = nextSrc;
                    // force reflow
                    void imgEl.offsetWidth;
                    imgEl.style.opacity = '1';
                }, 650);
            };
            pre.onerror = function(){
                console.warn('omega.js: failed to preload', nextSrc);
                // skip to next frame on error
                idx = (i + 1) % imgs.length;
            };
        }

        setInterval(()=>{
            idx = (idx + 1) % imgs.length;
            showIndex(idx);
        }, 10000);
    }

    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', startCarousel);
    } else {
        startCarousel();
    }
})();
