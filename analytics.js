// ==========================================
// 1. GOOGLE ANALYTICS (GA4) & DATA LAYER INIT
// ==========================================
const gaId = "G-7QB3ER6V6L";

window.dataLayer = window.dataLayer || [];

window.gtag =
  window.gtag ||
  function () {
    window.dataLayer.push(arguments);
  };

window.gtag("js", new Date());
window.gtag("config", gaId);

const gaScript = document.createElement("script");
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
(document.head || document.documentElement).appendChild(gaScript);
