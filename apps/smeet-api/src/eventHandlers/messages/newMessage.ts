import type { EventBridgeHandler } from 'aws-lambda';

import type { Message, MutationNewMessageArgs } from '@smeet/shared/graphql';
import { ApolloService } from '../../services/ApolloService';
import gql from 'graphql-tag';

export const handler: EventBridgeHandler<'NewMessage', Message, void> = async (
  event
) => {
  const apollo = ApolloService.getInstance();

  console.log('event', event);

  const result = await apollo.mutate<unknown, MutationNewMessageArgs>({
    mutation: gql`
      mutation NewMessageEvent($input: MessageEvent!) {
        newMessage(input: $input) {
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
