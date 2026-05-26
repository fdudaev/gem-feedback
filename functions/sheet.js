const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzx77DkKODnERInhhlqdl5uZ8NjssM0PDVhnSrqd43v4TRu09eH7vs-58D8ANT8XESz/exec';

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = APPS_SCRIPT_URL + '?' + url.searchParams.toString();

  try {
    const resp = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'Cloudflare-Pages-Proxy' }
    });
    const text = await resp.text();
    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
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
