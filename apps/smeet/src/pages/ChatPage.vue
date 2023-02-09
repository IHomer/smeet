<template>
  Welcome {{ name }}

  {{ chats }}

  <SmeetButton @click="onLogout">Logout</SmeetButton>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import SmeetButton from '../components/SmeetButton.vue';
import { useListChats } from '../queries/chat/listChats';
import { useProfileStore } from '../store/profile.store';

const { chats } = useListChats();

const profileStore = useProfileStore();
const { name } = storeToRefs(profileStore);

function onLogout() {
  profileStore.logout();
}
</script>
