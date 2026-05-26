const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzx77DkKODnERInhhlqdl5uZ8NjssM0PDVhnSrqd43v4TRu09eH7vs-58D8ANT8XESz/exec';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const params = new URLSearchParams(url.search);
  const targetUrl = APPS_SCRIPT_URL + '?' + params.toString();

  try {
    const response = await fetch(targetUrl, { redirect: 'follow' });
    const text = await response.text();
    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ result: 'error', error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
