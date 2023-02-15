import { computed, ComputedRef, reactive, ref, Ref, watch } from 'vue';
import { useQuery, useSubscription } from '@vue/apollo-composable';
import { ReactiveFunction } from '@vue/apollo-composable/dist/util/ReactiveFunction';
import { Chat } from '@smeet/shared/graphql';
import gql from 'graphql-tag';

export const useListChats = (
  options: ReactiveFunction<{ enabled?: boolean }> = () => ({})
): {
  chats: Ref<Chat[]>;
  loading: Ref<boolean>;
} => {
  const { enabled = true } = options();

  const chats = ref<Chat[]>([]);

  const { result, loading } = useQuery<{
    listChats: Chat[];
  }>(
    gql`
      query {
        listChats {
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
      chats.value =
        result.value?.listChats || [];
    }
  });

  const { result: subResult } = useSubscription<{ onNewChat: Chat }>(
    gql`
      subscription {
        onNewChat {
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
    if (!data?.onNewChat) {
      return;
    }
    chats.value = [...chats.value, data?.onNewChat];
  });

  return {
    chats,
    loading,
  };
};
