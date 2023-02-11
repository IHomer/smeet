<template>
  Welcome {{ name }}

  <div class="mt-4">
    {{ chats }}
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useListChats } from '../queries/chat/listChats';
import { useUserStore } from '../store/user.store';

const { chats } = useListChats();

const profileStore = useUserStore();
const { name } = storeToRefs(profileStore);
</script>
