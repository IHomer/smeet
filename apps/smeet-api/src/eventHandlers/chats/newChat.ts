import type { EventBridgeHandler } from 'aws-lambda';

import type { Chat } from '@smeet/shared/graphql';
import { ApolloService } from '../../services/ApolloService';
import gql from 'graphql-tag';

export const handler: EventBridgeHandler<'NewChat', Chat, void> = async (
  event
) => {
  const apollo = await ApolloService.getInstance();

  await apollo.mutate({
    mutation: gql`
      mutation PushAddCardStatusEvent($input: ChatEvent!) {
        newChat(input: $input)
      }
    `,
    variables: {
      input: event.detail,
    },
  });
};
