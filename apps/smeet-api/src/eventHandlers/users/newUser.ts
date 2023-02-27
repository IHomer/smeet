import type { EventBridgeHandler } from 'aws-lambda';

import type { User } from '@smeet/shared/graphql';
import { MessageDataService } from '../../services/MessageDataService';
import { EventBridgeService } from '../../services';

export const handler: EventBridgeHandler<'NewUser', User, void> = async (
  event
) => {
  const message = await MessageDataService.create({
    message: `${event.detail.name} joined the chat!`,
    bot: true,
    user: 'joinbot',
  });

  await EventBridgeService.putEvents({
    source: 'messages',
    detailType: 'NewMessage',
    detail: message,
  });
};
