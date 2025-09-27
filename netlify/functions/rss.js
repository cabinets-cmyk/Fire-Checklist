// netlify/functions/rss.js
exports.handler = async () => {
  const target = 'https://api.emergency.wa.gov.au/v1/rss/incidents';
  try {
    const resp = await fetch(target);
    const body = await resp.text();

    return {
      statusCode: resp.status,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=30'
      },
      body
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: 'Proxy fetch failed'
    };
  }
};
