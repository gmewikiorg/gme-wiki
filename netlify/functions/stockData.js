const fetch = require('node-fetch'); // required for Node versions <18

exports.handler = async function(event, context) {
  const symbol = event.queryStringParameters.symbol;

  if (!symbol) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing stock symbol' }),
    };
  }

  const apiKey = process.env.ALPHA_VANTAGE;

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
