// Carousel for Undertale Breaking Point portrait
// switches between two images every 10s with a fade
(function(){
    const imgs = [
        "../PNG/Captura 6.png",
        "../PNG/Timeskip Lex.png",
        "../PNG/Lex2.png"


    ];

    function startCarousel(){
        const imgEl = document.getElementById('LT-portrait');
        if(!imgEl) return;
        let idx = imgs.indexOf(imgEl.src.split('/').pop()) >= 0 ? imgs.indexOf(imgEl.src) : 0;
        // Normalize idx by filename match
        const currentFile = imgEl.src.split('/').pop();
        const found = imgs.findIndex(p => p.split('/').pop() === currentFile);
        idx = found >= 0 ? found : 0;

        imgEl.style.transition = 'opacity 600ms ease';
        imgEl.style.opacity = '1';

        setInterval(()=>{
            idx = (idx + 1) % imgs.length;
            imgEl.style.opacity = '0';
            setTimeout(()=>{
                imgEl.src = imgs[idx];
                // force reflow
                void imgEl.offsetWidth;
                imgEl.style.opacity = '1';
            }, 650);
        }, 10000);
    }

    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', startCarousel);
    } else {
        startCarousel();
    }
})();