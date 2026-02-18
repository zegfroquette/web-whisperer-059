const BookNow = () => {
  return (
    <iframe
      srcDoc={`
        <!doctype html>
        <html>
          <head>
            <link href="https://cleancloudapp.com/webapp/public/webapp/cleancloud.css" rel="stylesheet" />
            <script src="https://cleancloudapp.com/webapp/public/webapp/cleancloud.js"></script>
            <style>
              html, body {
                margin: 0;
                padding: 0;
              }
              #myStoreContainer {
                width: 100%;
              }
            </style>
          </head>
          <body>
            <div id="myStoreContainer"></div>
            <script>
              window.onload = function() {
                CleanCloudWebApp("#myStoreContainer", 27111, {
                  width: "auto",
                  height: "auto"
                });
              }
            </script>
          </body>
        </html>
      `}
      style={{
        width: "100%",
        height: "2000px",
        border: "none",
      }}
    />
  );
};

export default BookNow;
