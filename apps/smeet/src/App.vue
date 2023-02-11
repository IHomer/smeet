<template>
  <RegisterPage v-if="name === ''" />
  <ChatPage v-else />
</template>

<script lang="ts" setup>
import { useUserStore } from './store/user.store';
import RegisterPage from './pages/RegisterPage.vue';
import ChatPage from './pages/ChatPage.vue';
import { storeToRefs } from 'pinia';

const { name } = storeToRefs(useUserStore());
</script>
