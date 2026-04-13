export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { request_token } = req.query;
  if (!request_token) {
    res.status(400).json({ status: 'error', message: 'No request_token' });
    return;
  }
  try {
    const crypto = await import('crypto');
    const apiKey    = '6rsvfsxez9gb3rw3';
    const apiSecret = 'k3ok1mxxost84amx6bbhv0h1g9ou40c1';
    const checksum = crypto.createHash('sha256')
      .update(apiKey + request_token + apiSecret)
      .digest('hex');
    const response = await fetch('https://api.kite.trade/session/token', {
      method: 'POST',
      headers: {
        'X-Kite-Version': '3',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `api_key=${apiKey}&request_token=${request_token}&checksum=${checksum}`
    });
    const data = await response.json();
    if (data.status === 'success') {
      res.status(200).json({ status: 'success', access_token: data.data.access_token });
    } else {
      res.status(400).json({ status: 'error', message: data.message });
    }
  } catch(e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
}
