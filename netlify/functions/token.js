 const https = require('https');
const crypto = require('crypto');

exports.handler = async (event) => {
  const { request_token } = event.queryStringParameters || {};
  const API_KEY = 'emlejwo63jey9jve';
  const API_SECRET = 'c9zkqwgdclmqpwy1whlefvq3mr4c6g97';

  if (!request_token) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No request_token' }) };
  }

  const checksum = crypto.createHash('sha256')
    .update(API_KEY + request_token + API_SECRET)
    .digest('hex');

  const postData = `api_key=${API_KEY}&request_token=${request_token}&checksum=${checksum}`;

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.kite.trade',
      path: '/session/token',
      method: 'POST',
      headers: {
        'X-Kite-Version': '3',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: data
        });
      });
    });
    req.on('error', (e) => resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) }));
    req.write(postData);
    req.end();
  });
};
