export default function handler(req, res) {
  // 1. Get the invite code from the URL
  const { inviteCode } = req.query;
  
  // 2. Set the response as HTML
  res.setHeader('Content-Type', 'text/html');

  // 3. Return the HTML page
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Redirecting...</title>
        <script>
            window.onload = function() {
                var code = "${inviteCode || ''}"; 
                
                if (code) {
                    // Try to open App (Deep Link)
                    window.location.href = "https://smsindia.cfd/invite?inviteCode=" + code;

                    // Fallback to Main Site to download
                    setTimeout(function() {
                        window.location.href = "https://smsindia.cfd/?ref=" + code;
                    }, 2000);
                } else {
                    // No code? Go home
                    window.location.href = "https://smsindia.cfd/";
                }
            };
        </script>
        <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #fff; }
            .loader { text-align: center; }
        </style>
    </head>
    <body>
        <div class="loader">
            <h2>Opening SMS India...</h2>
            <p>Please wait...</p>
        </div>
    </body>
    </html>
  `);
}
