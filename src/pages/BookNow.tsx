import { useEffect, useRef } from 'react';

const BookNow = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.js';
    script.type = 'text/javascript';
    script.onload = () => {
      const win = window as unknown as Record<string, (...args: unknown[]) => void>;
      if (typeof win['CleanCloudWebApp'] === 'function') {
        win['CleanCloudWebApp']('#myStoreContainer', 27111, {
          width: 'auto',
          height: '100%',
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div
      id="myStoreContainer"
      style={{
        width: '100%',
        height: 'auto',
        minHeight: '1600px',
        overflow: 'visible',
        display: 'block',
      }}
    />
  );
};

export default BookNow;
