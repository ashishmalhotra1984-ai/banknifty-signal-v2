export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { symbols, token, api_key } = req.query;
  if (!symbols || !token) {
    res.status(400).json({ status: 'error', message: 'Missing symbols or token' });
    return;
  }

  try {
    const url = `https://api.kite.trade/quote?i=${symbols.split(',').map(s => encodeURIComponent(s)).join('&i=')}`;
    const response = await fetch(url, {
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
