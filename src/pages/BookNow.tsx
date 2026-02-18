import { useEffect, useRef } from "react";

const BookNow = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.js";
    script.type = "text/javascript";
    script.onload = () => {
      const win = window as unknown as Record<string, (...args: unknown[]) => void>;
      if (typeof win["CleanCloudWebApp"] === "function") {
        win["CleanCloudWebApp"]("#myStoreContainer", 27111, {
          width: "auto",
          height: "auto",
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div
      id="myStoreContainer"
      style={{
        width: "100%",
        display: "block",
      }}
    />
  );
};

export default BookNow;
