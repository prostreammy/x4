export default async function handler(req, res) {
    const targetUrl = "https://load.perfecttv.net/mpd/bola1/manifest.mpd?username=vip_r92bmh1k&password=yb3IpqrB&channel=bola1hd";
    const baseVideoUrl = "https://load.perfecttv.net/mpd/bola1/";

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            }
        });

        let data = await response.text();

        // 1. Inject BaseURL so segments load from the source server
        const baseUrlTag = `<BaseURL>${baseVideoUrl}</BaseURL>`;
        if (!data.includes('<BaseURL>')) {
            data = data.replace('<Period', `${baseUrlTag}<Period`);
        }

        // 2. Set Headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Content-Type', 'application/dash+xml');
        
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Proxy Error");
    }
}
