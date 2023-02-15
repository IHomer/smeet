import { AppSyncResolverHandler } from 'aws-lambda';
import { Chat } from '@smeet/shared/graphql';
import { ChatDataService } from '../../services/ChatDataService';

export const handler: AppSyncResolverHandler<unknown, Chat[]> = async () => {
  const chats = await ChatDataService.list();
  return chats;
};
