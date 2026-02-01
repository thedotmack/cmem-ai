// Vercel Serverless Function - Price API with 60s cache
export const config = {
  runtime: 'edge',
};

const CMEM_TOKEN = '2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS';
const DEXSCREENER_URL = `https://api.dexscreener.com/latest/dex/tokens/${CMEM_TOKEN}`;

export default async function handler(request) {
  try {
    const res = await fetch(DEXSCREENER_URL, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    const data = await res.json();
    const pair = data.pairs?.[0];
    
    if (!pair) {
      return new Response(JSON.stringify({ error: 'No pair found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
        },
      });
    }

    const result = {
      price: pair.priceUsd,
      priceChange24h: pair.priceChange?.h24 || 0,
      volume24h: pair.volume?.h24 || 0,
      marketCap: pair.fdv || 0,
      liquidity: pair.liquidity?.usd || 0,
      lastUpdated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=10',
      },
    });
  }
}
