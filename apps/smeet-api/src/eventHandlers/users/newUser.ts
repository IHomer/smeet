import type { EventBridgeHandler } from 'aws-lambda';

import type { User } from '@smeet/shared/graphql';
import { ChatDataService } from '../../services/ChatDataService';
import { EventBridgeService } from '../../services';

export const handler: EventBridgeHandler<'NewUser', User, void> = async (
  event
) => {
  const chat = await ChatDataService.create({
    message: `${event.detail.name} joined the chat!`,
    bot: true,
    user: 'joinbot',
  });

  await EventBridgeService.putEvents({
    source: 'chats',
    detailType: 'NewChat',
    detail: chat,
  });
};
