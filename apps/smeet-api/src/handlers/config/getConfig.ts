import { Handler } from 'aws-lambda';

const { APP_SYNC_URL, APP_SYNC_API_KEY } = process.env;

export const handler: Handler = async (event, context, callback) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      appSyncUrl: APP_SYNC_URL,
      appSyncApiKey: APP_SYNC_API_KEY,
    }),
  };
};
