export default async function handler(req, res) {
    const targetUrl = "https://load.perfecttv.net/mpd/bola1/manifest.mpd?username=vip_r92bmh1k&password=yb3IpqrB&channel=bola1hd";
    // This is the base path where the actual video segments (.m4s) live
    const baseVideoUrl = "https://load.perfecttv.net/mpd/bola1/";

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            }
        });

        let data = await response.text();

        // FIX: Inject the BaseURL into the MPD XML so the player knows 
        // to fetch segments from the original server, not from your Vercel /api/
        const baseUrlTag = `<BaseURL>${baseVideoUrl}</BaseURL>`;
        if (!data.includes('<BaseURL>')) {
            data = data.replace('<Period', `${baseUrlTag}<Period`);
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/dash+xml');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Error fetching manifest");
    }
}
