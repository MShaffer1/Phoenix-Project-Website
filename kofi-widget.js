document.addEventListener("DOMContentLoaded", function () {
    // 1. Load the official Ko-fi script dynamically
    const kofiScript = document.createElement('script');
    kofiScript.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
    
    kofiScript.onload = function () {
        if (typeof kofiwidget2 !== 'undefined') {
            // Initialize the Ko-fi button widget settings
            kofiwidget2.init('Support the Project with a Ko-fi', '#e9166a', 'L2J723MSF6');
            
            // Find your footer navigation container
            const footerNav = document.querySelector('.footer-nav');
            
            if (footerNav) {
                // Generate the button markup without triggering document.write
                const kofiHTML = kofiwidget2.getHTML();
                
                // Append it directly inside .footer-nav
                footerNav.insertAdjacentHTML('beforeend', kofiHTML);
            }
        }
    };
    
    document.body.appendChild(kofiScript);
});