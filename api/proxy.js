export default async function handler(req, res) {
    const targetUrl = "https://load.perfecttv.net/mpd/bola1/manifest.mpd?username=vip_r92bmh1k&password=yb3IpqrB&channel=bola1hd";

    try {
        const response = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0...' }
        });

        const data = await response.text();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/dash+xml');
        // Tell Vercel and Browser NOT to cache this manifest
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Proxy Error");
    }
}
