import { useEffect, useRef } from "react";

const BookNow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLLinkElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Inject CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.css";
    document.head.appendChild(link);
    linkRef.current = link;

    // Inject JS
    const script = document.createElement("script");
    script.src = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.js";
    script.type = "text/javascript";
    script.onload = () => {
      const win = window as unknown as Record<string, (...args: unknown[]) => void>;
      if (typeof win["CleanCloudWebApp"] === "function" && containerRef.current) {
        win["CleanCloudWebApp"]("#myStoreContainer", 27111, {
          width: "auto",
          height: "auto",
        });
      }
    };
    document.head.appendChild(script);
    scriptRef.current = script;

    return () => {
      // Clean up injected elements from head
      if (linkRef.current && document.head.contains(linkRef.current)) {
        document.head.removeChild(linkRef.current);
      }
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
      // Clear the container so React doesn't conflict with CleanCloud's DOM
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="myStoreContainer"
      style={{ width: "100%", minHeight: "80vh", display: "block" }}
    />
  );
};

export default BookNow;
