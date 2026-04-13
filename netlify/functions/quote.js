const https = require('https');

exports.handler = async (event) => {
  const { symbols, token, api_key } = event.queryStringParameters || {};
  if (!token || !symbols) return { statusCode: 400, body: JSON.stringify({ error: 'Missing params' }) };

  const symbolList = symbols.split(',').map(s => `i=${encodeURIComponent(s.trim())}`).join('&');

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.kite.trade',
      path: `/quote?${symbolList}`,
      method: 'GET',
      headers: { 'X-Kite-Version': '3', 'Authorization': `token ${api_key}:${token}` }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: data
      }));
    });
    req.on('error', e => resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) }));
    req.end();
  });
};
