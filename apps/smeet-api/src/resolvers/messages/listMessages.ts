import { AppSyncResolverHandler } from 'aws-lambda';
import { Message } from '@smeet/shared/graphql';
import { MessageDataService } from '../../services/MessageDataService';

export const handler: AppSyncResolverHandler<unknown, Message[]> = async () => {
  const messages = await (
    await MessageDataService.list()
  ).sort((a, b) =>
    a.updatedAt < b.updatedAt ? -1 : a.updatedAt > b.updatedAt ? 1 : 0
  );
  return messages;
};
