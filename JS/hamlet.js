// Carousel for Teacher!Sans images on Subject!Tale.html
// switches between normal and Math Time images every 10s with a fade
(function(){
    const imgs = [
        "../PNG/Hamlet T.Knight.PNG",
        "../PNG/Hamlet (Broken Mask).PNG",
        "../PNG/Hamlet (Unbeatable Knight5).PNG",
        "../PNG/Hamlet (Unbeatable Knight).PNG",
    ];

    function startCarousel(){
        const imgEl = document.getElementById('H-portrait');
        if(!imgEl) return;
        // determine starting index based on filename
        const currentFile = (imgEl.getAttribute('src') || '').split('/').pop();
        let idx = imgs.findIndex(p => p.split('/').pop() === currentFile);
        if(idx < 0) idx = 0;
        // ensure initial style
        imgEl.style.transition = 'opacity 600ms ease';
        imgEl.style.opacity = '1';

        setInterval(()=>{
            idx = (idx + 1) % imgs.length;
            // fade out
            imgEl.style.opacity = '0';
            setTimeout(()=>{
                const nextSrc = imgs[idx];
                const prevSrc = imgEl.src;

                function onLoad(){
                    imgEl.removeEventListener('load', onLoad);
                    imgEl.removeEventListener('error', onError);
                    // only fade in after the new image successfully loads
                    imgEl.style.opacity = '1';
                }

                function onError(){
                    imgEl.removeEventListener('load', onLoad);
                    imgEl.removeEventListener('error', onError);
                    console.warn('Hamlet image failed to load:', nextSrc);
                    // revert to previous image (do NOT replace with a fallback)
                    imgEl.src = prevSrc;
                    imgEl.style.opacity = '1';
                }

                imgEl.addEventListener('load', onLoad, {once:true});
                imgEl.addEventListener('error', onError, {once:true});

                // attempt to load the next image; if it fails, onError will revert
                imgEl.src = nextSrc;
                // don't force fade-in here; wait for onLoad
            }, 650);
        }, 10000);
    }

    // start when DOM is ready
    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', startCarousel);
    } else {
        startCarousel();
    }
})();