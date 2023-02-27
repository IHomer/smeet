<template>
  <div class="flex flex-col max-h-screen overflow-hidden">
    <div class="flex-1 overflow-scroll" id="messages">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
    <div class="flex-initial h-16 p-2 border-t border-gray-500 flex gap-2">
      <div class="flex-1">
        <SmeetInput
          name="message"
          v-model="message"
          :disabled="isLoadingCreate"
        />
      </div>
      <SmeetButton
        :disabled="!canSendMessage || isLoadingCreate"
        @click="doSendMessage"
      >
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
import { useCreateMessage } from '../queries/message/createMessage';
import { useListMessages } from '../queries/message/listMessages';
import { useUserStore } from '../store/user.store';

const message = ref('');

const { name } = useUserStore();
const { mutate, loading: isLoadingCreate } = useCreateMessage();
const { messages, loading: isLoadingList } = useListMessages();

const canSendMessage = computed(() => message.value !== '');

watch(messages, () => {
  const messagesEl = document.getElementById('messages');
  if (messagesEl) {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
});

function doSendMessage() {
  if (canSendMessage.value) {
    mutate({ message: { user: name, message: message.value, bot: false } });
    message.value = '';
  }
}
</script>
