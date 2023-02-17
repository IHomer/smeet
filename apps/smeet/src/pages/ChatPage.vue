<template>
  <div class="flex flex-col max-h-screen overflow-hidden">
    <div class="flex-1 overflow-scroll" id="chats">
      <ChatMessage v-for="chat in chats" :key="chat.id" :chat="chat" />
    </div>
    <div class="flex-initial h-16 p-2 border-t border-gray-500 flex gap-2">
      <div class="flex-1">
        <SmeetInput name="mesasge" v-model="message" :disabled="loading" />
      </div>
      <SmeetButton :disabled="!canSendChat">
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </SmeetButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue';
import ChatMessage from '../components/ChatMessage.vue';
import SmeetButton from '../components/SmeetButton.vue';
import SmeetInput from '../components/SmeetInput.vue';
import { useListChats } from '../queries/chat/listChats';

const message = ref('');
const loading = ref(false);

const canSendChat = computed(() => message.value !== '');

const { chats } = useListChats();
watch(chats, () => {
  const chatsEl = document.getElementById('chats');
  if (chatsEl) {
    chatsEl.scrollTop = chatsEl.scrollHeight;
  }
});
</script>
