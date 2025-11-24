// piggy_wiki.js — replicates the Subject!Tale carousel fade-swap behavior
(function () {
    const IMG_ID = 'piggy-portrait';
    const INTERVAL = 10000; // 10s

    const img = document.getElementById(IMG_ID);
    if (!img) return;

    // two-frame swap using data-alt-src attribute
    const altAttr = 'data-alt-src';
    if (!img.hasAttribute(altAttr)) return;

    let isTransitioning = false;

    function swap() {
        if (isTransitioning) return;
        const alt = img.getAttribute(altAttr);
        if (!alt) return;

        isTransitioning = true;
        img.classList.add('faded');

        let handled = false;
        const onEnd = function () {
            if (handled) return;
            handled = true;
            img.removeEventListener('transitionend', onEnd);

            const current = img.getAttribute('src');
            img.setAttribute('src', alt);
            img.setAttribute(altAttr, current);
            // force a reflow then remove faded to fade-in
            void img.offsetWidth;
            img.classList.remove('faded');
            isTransitioning = false;
        };

        img.addEventListener('transitionend', onEnd);

        // fallback in case transitionend doesn't fire
        setTimeout(onEnd, 1200);
    }

    // start interval
    setInterval(swap, INTERVAL);
})();

// No additional visual glitch effects: intentionally omitted per user request.
