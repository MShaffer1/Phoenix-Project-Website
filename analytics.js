// ==========================================
// 1. GOOGLE ANALYTICS (GA4) & DATA LAYER INIT
// ==========================================
const gaId = 'G-7QB3ER6V6L';

// Initialize dataLayer and gtag on the window object
window.dataLayer = window.dataLayer || [];

window.gtag = window.gtag || function() {
  window.dataLayer.push(arguments);
};

// Default GA4 setup
window.gtag('js', new Date());
window.gtag('config', gaId);

// Inject GA4 script directly after Termly
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
(document.head || document.documentElement).appendChild(gaScript);

// ==========================================
// 2. DYNAMIC FOOTER LINKS & SOCIAL SHARE BUTTONS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    var footers = document.querySelectorAll('.site-footer, footer');
    var footer = footers.length > 0 ? footers[footers.length - 1] : null;
    
    if (footer) {
        var styleTag = document.createElement('style');
        styleTag.textContent = 
            '.footer-bottom-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-top: 15px; gap: 10px; width: 100%; box-sizing: border-box; padding-left: 0; }' +
            '.compliance-links { font-size: 0.85em; text-align: left; margin-left: 0; padding-left: 0; }' +
            '.compliance-links a, .compliance-links a:visited, .compliance-links a:link { color: #ffffff !important; text-decoration: underline !important; margin-right: 8px; cursor: pointer; }' +
            '.compliance-links a:hover { color: #e23b62 !important; }' +
            '.footer-social-inline { display: inline-flex; align-items: center; gap: 6px; }' +
            '.social-btn { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 50%; background-color: #222222; color: #ffffff !important; text-decoration: none !important; transition: background-color 0.2s ease, transform 0.2s ease; }' +
            '.social-btn:hover { background-color: #e23b62; transform: translateY(-2px); }' +
            '.social-btn svg { width: 12px; height: 12px; fill: currentColor; }';
        document.head.appendChild(styleTag);

        var pageUrl = encodeURIComponent(window.location.href);
        var pageTitle = encodeURIComponent(document.title);

        var bottomRow = document.createElement('div');
        bottomRow.className = 'footer-bottom-row';

        var complianceHTML = 
            '<div class="compliance-links">' +
                '<a href="/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a> | ' +
                '<a href="/cookiePolicy.html" target="_blank" rel="noopener noreferrer">Cookie Policy</a> | ' +
                '<a href="javascript:void(0)" id="termly-preferences-link" class="termly-display-preferences">Consent Preferences</a>' +
            '</div>';

        var socialHTML = 
            '<div class="footer-social-inline">' +
                '<a class="social-btn" href="https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle + '" target="_blank" rel="noopener noreferrer" title="Share on X">' +
                    '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
                '</a>' +
                '<a class="social-btn" href="https://www.facebook.com/sharer/sharer.php?u=' + pageUrl + '" target="_blank" rel="noopener noreferrer" title="Share on Facebook">' +
                    '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
                '</a>' +
                '<a class="social-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl + '" target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">' +
                    '<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>' +
                '</a>' +
                '<a class="social-btn" href="https://reddit.com/submit?url=' + pageUrl + '&title=' + pageTitle + '" target="_blank" rel="noopener noreferrer" title="Share on Reddit">' +
                    '<svg viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>' +
                '</a>' +
                '<a class="social-btn" href="https://api.whatsapp.com/send?text=' + pageTitle + '%20' + pageUrl + '" target="_blank" rel="noopener noreferrer" title="Share on WhatsApp">' +
                    '<svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>' +
                '</a>' +
                '<a class="social-btn" href="sms:?body=' + pageTitle + '%20' + pageUrl + '" title="Share via Text Message">' +
                    '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg>' +
                '</a>' +
                '<a class="social-btn" href="mailto:?subject=' + pageTitle + '&body=Check out this page: ' + pageUrl + '" title="Share via Email">' +
                    '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' +
                '</a>' +
                '<a class="social-btn" href="#" id="copy-share-link" title="Copy Link to Clipboard">' +
                '<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1 0 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>' +
                '</a>' +
            '</div>';

        bottomRow.innerHTML = complianceHTML + socialHTML;

        var container = footer.querySelector('.footer-container') || footer;
        container.appendChild(bottomRow);

        var preferencesBtn = document.getElementById('termly-preferences-link');
        if (preferencesBtn) {
            preferencesBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.Termly && typeof window.Termly.displayPreferences === 'function') {
                    window.Termly.displayPreferences();
                } else {
                    console.warn('Termly API unavailable.');
                }
            });
        }

        var copyBtn = document.getElementById('copy-share-link');
        if (copyBtn) {
            copyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href).then(function() {
                    alert('Link copied to clipboard!');
                });
            });
        }
    }
});