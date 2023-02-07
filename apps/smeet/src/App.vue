<template>
  <RegisterPage v-if="name === ''" />
  <ChatPage v-else />
</template>


<script lang="ts" setup>
import { useProfileStore } from './store/profile.store';
import RegisterPage from './pages/RegisterPage.vue'
import ChatPage from './pages/ChatPage.vue'
import { storeToRefs } from 'pinia';



const {name} = storeToRefs(useProfileStore());
</script>
