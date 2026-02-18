import { useEffect, useRef } from "react";

const BookNow = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "cleancloud-script";
    const linkId = "cleancloud-link";

    // Create the container imperatively — React never owns its children
    const container = document.createElement("div");
    container.id = "myStoreContainer";
    container.style.width = "100%";
    container.style.minHeight = "700px";

    if (wrapperRef.current) {
      wrapperRef.current.appendChild(container);
    }

    const initApp = () => {
      if ((window as any).CleanCloudWebApp) {
        (window as any).CleanCloudWebApp("#myStoreContainer", 27111, {
          width: "auto",
          height: 700,
          welcomeMessage: true,
        });
      }
    };

    // Load CSS if not already present
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.css";
      document.head.appendChild(link);
    }

    // Load JS or init immediately if already loaded
    if (document.getElementById(scriptId)) {
      initApp();
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.js";
      script.onload = initApp;
      document.body.appendChild(script);
    }

    return () => {
      // Only remove the imperatively-created container — React never touched it
      if (wrapperRef.current && container.parentNode === wrapperRef.current) {
        wrapperRef.current.removeChild(container);
      }
    };
  }, []);

  // Render an empty wrapper — React sees no children to reconcile
  return <div ref={wrapperRef} style={{ width: "100%" }} />;
};

export default BookNow;
