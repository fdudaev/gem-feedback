const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzx77DkKODnERInhhlqdl5uZ8NjssM0PDVhnSrqd43v4TRu09eH7vs-58D8ANT8XESz/exec';

exports.handler = async (event) => {
  const params = new URLSearchParams(event.queryStringParameters || {}).toString();
  const url = `${APPS_SCRIPT_URL}?${params}`;
  try {
    const r = await fetch(url, { redirect: 'follow' });
    const body = await r.text();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ result: 'error', error: e.message })
    };
  }
};
