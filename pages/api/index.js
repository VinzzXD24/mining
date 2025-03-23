export default function handler(req, res) {
  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simulasi Blockchain</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; margin: 50px; }
            button { margin: 10px; padding: 10px; cursor: pointer; }
            pre { background: #f4f4f4; padding: 10px; text-align: left; overflow-x: auto; }
        </style>
    </head>
    <body>
        <h1>Simulasi Blockchain</h1>
        <button onclick="mineBlock()">Mine Block</button>
        <button onclick="getChain()">Lihat Chain</button>
        <h2>Status</h2>
        <pre id="status">Klik tombol untuk memulai</pre>

        <script>
            function updateStatus(data) {
                document.getElementById("status").textContent = JSON.stringify(data, null, 2);
            }

            function mineBlock() {
                fetch("/api/mine")
                    .then(res => res.json())
                    .then(updateStatus)
                    .catch(err => updateStatus({ error: err.message }));
            }

            function getChain() {
                fetch("/api/chain")
                    .then(res => res.json())
                    .then(updateStatus)
                    .catch(err => updateStatus({ error: err.message }));
            }
        </script>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
