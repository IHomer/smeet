import { AppSyncResolverHandler } from 'aws-lambda';
import { Message, MessageInput } from '@smeet/shared/graphql';
import { EventBridgeService } from '../../services';
import { MessageDataService } from '../../services/MessageDataService';

export const handler: AppSyncResolverHandler<
  { message: MessageInput },
  Message
> = async ({ arguments: { message } }) => {
  const createdMesage = await MessageDataService.create(message);

  await EventBridgeService.putEvents({
    source: 'messages',
    detailType: 'NewMessage',
    detail: createdMesage,
  });

  return createdMesage;
};
