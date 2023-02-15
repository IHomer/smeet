import { computed, ComputedRef, Ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { ReactiveFunction } from '@vue/apollo-composable/dist/util/ReactiveFunction';
import { Chat } from '@smeet/shared/graphql';
import gql from 'graphql-tag';

export const useListChats = (
  options: ReactiveFunction<{ enabled?: boolean }> = () => ({})
): {
  chats: ComputedRef<Chat[] | undefined>;
  loading: Ref<boolean>;
} => {
  const { enabled = true } = options();

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
        }
      }
    `,
    {},
    () => ({
      enabled: enabled,
    })
  );

  const chats = computed(() => result.value?.listChats || []);

  return {
    chats,
    loading,
  };
};
