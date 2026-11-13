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

// ==========================================
// PWA META TAGS & SERVICE WORKER REGISTRATION
// ==========================================
(function () {
  const head = document.head || document.documentElement;
  const pwaMetas = [
    { name: "theme-color", content: "#000000" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
  ];

  pwaMetas.forEach((metaInfo) => {
    if (!document.querySelector(`meta[name="${metaInfo.name}"]`)) {
      const meta = document.createElement("meta");
      meta.name = metaInfo.name;
      meta.content = metaInfo.content;
      head.appendChild(meta);
    }
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js");
    });
  }
})();
