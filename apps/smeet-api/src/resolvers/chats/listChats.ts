import { AppSyncResolverHandler } from 'aws-lambda';
import { Chat } from '@smeet/shared/graphql';

export const handler: AppSyncResolverHandler<unknown, Chat[]> = async () => {
  // TODO: Use DynamoDB to get the chats
  return [
    {
      pk: 'TIME#2023-01-01T00:00:00.000Z#UID#1',
      sk: 'CHAT',
      uid: '1',
      message: 'Hello',
      user: '1',
    },
  ];
};
