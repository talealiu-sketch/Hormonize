const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages, model, max_tokens } = JSON.parse(event.body);
    
    const client = new Anthropic({
      apiKey: process.env.REACT_APP_ANTHROPIC_KEY,
    });

    const response = await client.messages.create({
      model: model || 'claude-sonnet-4-6',
      max_tokens: max_tokens || 4000,
      messages: messages,
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

