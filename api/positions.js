export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { token, api_key } = req.query;
  if (!token || !api_key) {
    res.status(400).json({ status: 'error', message: 'Missing token or api_key' });
    return;
  }

  try {
    const response = await fetch('https://api.kite.trade/portfolio/positions', {
      headers: {
        'X-Kite-Version': '3',
        'Authorization': `token ${api_key}:${token}`
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
}
