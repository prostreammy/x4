export default async function handler(req, res) {
    // The original stream URL
    const targetUrl = "https://load.perfecttv.net/mpd/bola1/manifest.mpd?username=vip_r92bmh1k&password=yb3IpqrB&channel=bola1hd";

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            }
        });

        const data = await response.text();

        // Set CORS headers so your HTML can read the response
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', 'application/dash+xml');

        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch manifest" });
    }
}
