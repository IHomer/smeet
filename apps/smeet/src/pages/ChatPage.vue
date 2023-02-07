<template>
  Welcome {{ name }}

  <SmeetButton @click="onLogout">Logout</SmeetButton>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import SmeetButton from '../components/SmeetButton.vue';
import { useProfileStore } from '../store/profile.store';

const profileStore = useProfileStore();
const { name } = storeToRefs(profileStore);

function onLogout() {
  profileStore.logout();
}
</script>
