let isGTagInitialized = false; // Flag to prevent duplicate initialization

export const initializeGTag = () => {
  if (isGTagInitialized) return; // Exit if already initialized

  const gtagId = import.meta.env.VITE_GOOGLE_TAG_ID;

  if (!gtagId) {
    return;
  }

  // Inject the main gtag script
  const script1 = document.createElement("script");
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
  script1.async = true;
  document.head.prepend(script1);

  // Initialize the gtag script
  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gtagId}');
  `;
  document.head.prepend(script2);

  isGTagInitialized = true; // Mark as initialized
};
