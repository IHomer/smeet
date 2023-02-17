import { AppSyncResolverHandler } from 'aws-lambda';
import { Chat } from '@smeet/shared/graphql';
import { ChatDataService } from '../../services/ChatDataService';

export const handler: AppSyncResolverHandler<unknown, Chat[]> = async () => {
  const chats = await (
    await ChatDataService.list()
  ).sort((a, b) =>
    a.updatedAt < b.updatedAt ? -1 : a.updatedAt > b.updatedAt ? 1 : 0
  );
  return chats;
};
