import { ref, Ref, watch } from 'vue';
import { useQuery, useSubscription } from '@vue/apollo-composable';
import { ReactiveFunction } from '@vue/apollo-composable/dist/util/ReactiveFunction';
import { Message } from '@smeet/shared/graphql';
import gql from 'graphql-tag';

export const useListMessages = (
  options: ReactiveFunction<{ enabled?: boolean }> = () => ({})
): {
  messages: Ref<Message[]>;
  loading: Ref<boolean>;
} => {
  const { enabled = true } = options();

  const messages = ref<Message[]>([]);

  const { result, loading } = useQuery<{
    listMessages: Message[];
  }>(
    gql`
      query {
        listMessages {
          id
          bot
          message
          user
          updatedAt
        }
      }
    `,
    {},
    () => ({
      enabled: enabled,
    })
  );

  watch(loading, (value) => {
    if (!value) {
      messages.value = result.value?.listMessages || [];
    }
  });

  const { result: subResult } = useSubscription<{ onNewMessage: Message }>(
    gql`
      subscription {
        onNewMessage {
          id
          bot
          message
          user
          updatedAt
        }
      }
    `
  );

  watch(subResult, (data) => {
    console.log('data', data);
    if (!data?.onNewMessage) {
      return;
    }
    messages.value = [...messages.value, data?.onNewMessage];
  });

  return {
    messages,
    loading,
  };
};
