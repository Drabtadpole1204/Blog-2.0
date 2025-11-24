// glass_effects.js
// Adds a periodic sheen effect to the Glass wiki portrait to simulate light passing over glass
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const wrap = document.querySelector('.image-wrap');
        if (!wrap) return;

        // create sheen element if not present
        if (!wrap.querySelector('.sheen')){
            const s = document.createElement('div');
            s.className = 'sheen';
            wrap.appendChild(s);
        }

        function triggerSheen(){
            wrap.classList.add('show-sheen');
            // remove class after animation duration
            setTimeout(() => wrap.classList.remove('show-sheen'), 1100);
        }

        // initial small delay, then repeat every 7s
        setTimeout(function(){ triggerSheen(); setInterval(triggerSheen, 7000); }, 1000);
    });
})();
