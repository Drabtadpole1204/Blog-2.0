// pagination-next.js
// Sets the "Next" pagination anchor to the logical next page and wraps back to the first.
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const pagination = document.querySelector('.pagination');
        if(!pagination) return;

        const pageLinks = Array.from(pagination.querySelectorAll('a')).filter(a => /^\s*\d+\s*$/.test(a.textContent));
        if(pageLinks.length === 0) return;

        const hrefs = pageLinks.map(a => a.getAttribute('href'));
        const resolvedPaths = hrefs.map(h => new URL(h, document.baseURI).pathname);

        const allAnchors = Array.from(pagination.querySelectorAll('a'));
        const nextBtn = allAnchors.find(a => a.getAttribute('aria-label') === 'Next' || ['›','>','→'].includes(a.textContent.trim()));
        if(!nextBtn) return;

        // Normalize current path to a form comparable with resolvedPaths
        let currentPath = location.pathname;
        if (currentPath.endsWith('/')) currentPath = currentPath + 'index.html';

        let idx = resolvedPaths.findIndex(p => p === currentPath || p === currentPath.replace(/^\//,''));
        if(idx === -1){
            const currentFile = currentPath.split('/').pop();
            idx = resolvedPaths.findIndex(p => p.split('/').pop() === currentFile);
        }

        const nextIndex = (idx === -1 ? 0 : (idx + 1) % hrefs.length);
        nextBtn.setAttribute('href', hrefs[nextIndex]);
    });
})();