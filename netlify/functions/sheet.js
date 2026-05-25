const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzuj1S9rLJhmO0ee7Ot7jEEp6dd0hyFfTsMnX2oBeCAGoVB-cr0dgyj7EEXQfcmRSlT/exec';

exports.handler = async function(event) {
  const params = event.queryStringParameters || {};
  const qs = new URLSearchParams(params).toString();
  const url = APPS_SCRIPT_URL + '?' + qs;

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ result: 'error', error: err.message })
    };
  }
};
