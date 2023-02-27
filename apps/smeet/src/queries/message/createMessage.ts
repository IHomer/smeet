import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';
import { Message } from '@smeet/shared/graphql';

export const useCreateMessage = () => {
  return useMutation<{ createMessage: Message }>(
    gql`
      mutation ($message: MessageInput!) {
        createMessage(message: $message) {
          id
        }
      }
    `
  );
};
