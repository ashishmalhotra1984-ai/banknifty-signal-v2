export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { token, api_key } = req.query;
  if (!token) { res.status(400).json({ status: 'error', message: 'No token' }); return; }
  try {
    // BankNifty instrument token = 260105
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 5); // go back 5 days to handle weekends/holidays
    const fromStr = from.toISOString().slice(0,10);
    const toStr = to.toISOString().slice(0,10);
    const url = `https://api.kite.trade/instruments/historical/260105/day?from=${fromStr}&to=${toStr}`;
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
