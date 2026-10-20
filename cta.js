document.addEventListener("DOMContentLoaded", function () {
  const ctaContainer = document.getElementById("reusable-cta");
  if (!ctaContainer) return;

  ctaContainer.innerHTML = `
    <!-- A stylized divider followed by the CTA -->
    <div
      class="divider-wrapper"
      style="
        text-align: center;
        margin: 1.25rem auto;
        max-width: 260px;
      "
    >
      <svg
        width="100%"
        height="20"
        viewBox="0 0 300 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="opacity: 0.7"
      >
        <path
          d="M0 12H120M180 12H300"
          stroke="#e0a96d"
          stroke-width="1.5"
          stroke-dasharray="4 4"
        />
        <circle cx="150" cy="12" r="5" fill="#e0a96d" />
        <circle
          cx="135"
          cy="12"
          r="3"
          fill="#e0a96d"
          opacity="0.6"
        />
        <circle
          cx="165"
          cy="12"
          r="3"
          fill="#e0a96d"
          opacity="0.6"
        />
      </svg>
    </div>

    <div class="call-to-action">
      <p>
        <strong>Which part speaks to you the most?</strong> Tell me below in the comments section. Share your story, your journey, and your self-love practices. Let's create a community of support and encouragement for one another.
      </p>
    </div>
  `;
});
