import { useEffect } from "react";

const BookNow = () => {
  useEffect(() => {
    const scriptId = "cleancloud-script";

    // Prevent double loading
    if (document.getElementById(scriptId)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.js";
    script.onload = () => {
      if (window.CleanCloudWebApp) {
        window.CleanCloudWebApp("#myStoreContainer", 27111, {
          width: "auto",
          height: "auto",
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return <div id="myStoreContainer" style={{ width: "100%" }} />;
};

export default BookNow;
