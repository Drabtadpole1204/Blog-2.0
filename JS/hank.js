// Carousel for Teacher!Sans images on Subject!Tale.html
// switches between normal and Math Time images every 10s with a fade
(function(){
    const imgs = [
        "../PNG/Hank.PNG",
        "../PNG/Hank (Damaged).PNG",
        "../PNG/Hank (Very Damaged).PNG"
    ];

    function startCarousel(){
        const imgEl = document.getElementById('R-portrait');
        if(!imgEl) return;
        let idx = imgs.indexOf(imgEl.src.split('/').pop()) >= 0 ? imgs.indexOf(imgEl.src) : 0;
        // ensure initial style
        imgEl.style.transition = 'opacity 600ms ease';
        imgEl.style.opacity = '1';

        setInterval(()=>{
            idx = (idx + 1) % imgs.length;
            // fade out
            imgEl.style.opacity = '0';
            setTimeout(()=>{
                imgEl.src = imgs[idx];
                // force image reflow before fade in
                void imgEl.offsetWidth;
                imgEl.style.opacity = '1';
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