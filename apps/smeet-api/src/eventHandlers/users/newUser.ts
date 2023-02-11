import type { EventBridgeHandler } from 'aws-lambda';

import type { User } from '@smeet/shared/graphql';

export const handler: EventBridgeHandler<'NewUser', User, void> = async (
  event
) => {
  console.log(event);
};
