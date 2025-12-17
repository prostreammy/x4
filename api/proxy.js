export default async function handler(req, res) {
    const targetUrl = "https://load.perfecttv.net/mpd/bola1/manifest.mpd?username=vip_r92bmh1k&password=yb3IpqrB&channel=bola1hd";

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
                'Cache-Control': 'no-cache'
            }
        });

        let data = await response.text();

        // Ensure the manifest is treated as a LIVE stream
        // (Type="dynamic" is the DASH standard for Live)
        if (!data.includes('type="dynamic"')) {
            data = data.replace('type="static"', 'type="dynamic"');
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/dash+xml');
        // FORCE NO CACHE - Manifests update every few seconds!
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Proxy Error");
    }
}
