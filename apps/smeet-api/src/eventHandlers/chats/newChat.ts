import type { EventBridgeHandler } from 'aws-lambda';

import type { Chat, MutationNewChatArgs } from '@smeet/shared/graphql';
import { ApolloService } from '../../services/ApolloService';
import gql from 'graphql-tag';

export const handler: EventBridgeHandler<'NewChat', Chat, void> = async (
  event
) => {
  const apollo = ApolloService.getInstance();

  console.log('event', event);

  const result = await apollo.mutate<unknown, MutationNewChatArgs>({
    mutation: gql`
      mutation NewChatEvent($input: ChatEvent!) {
        newChat(input: $input) {
          id
          bot
          message
          user
          updatedAt
        }
      }
    `,
    variables: {
      input: event.detail,
    },
  });

  console.log('Ran mutate', result);
};
