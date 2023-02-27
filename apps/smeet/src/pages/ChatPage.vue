<template>
  <div class="flex flex-col max-h-screen overflow-hidden">
    <div class="flex-1 overflow-scroll" ref="messageContainerRef">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
    <form class="flex-initial h-16 p-2 border-t border-gray-500 flex gap-2" @submit.prevent="onSubmit">
      <div class="flex-1">
        <SmeetInput
          ref="inputRef"
          name="message"
          autofocus
          v-model="message"
          :disabled="isLoadingCreate"
          :error="errors.message"
        />
      </div>
      <SmeetButton
        type="submit"
        :disabled="!meta.valid || isLoadingCreate"
      >
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </SmeetButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import z from 'zod';

import ChatMessage from '../components/ChatMessage.vue';
import SmeetButton from '../components/SmeetButton.vue';
import SmeetInput from '../components/SmeetInput.vue';
import { useCreateMessage } from '../queries/message/createMessage';
import { useListMessages } from '../queries/message/listMessages';
import { useUserStore } from '../store/user.store';

const { name } = useUserStore();
const { mutate, loading: isLoadingCreate } = useCreateMessage();
const { messages, loading: isLoadingList } = useListMessages();

const messageContainerRef = ref<HTMLDivElement>();
const inputRef = ref<typeof SmeetInput>();

const formSchema = z.object({
  message: z.string().min(3, { message: 'Too short' }),
});
const validationSchema = toFormValidator(formSchema);

const { handleSubmit, errors, meta } = useForm({
  validationSchema,
});
const { value: message } = useField('message');

const onSubmit = handleSubmit(async ({ message }, { resetForm }) => {
  await mutate({ message: { user: name, message: message, bot: false } });
  resetForm();
  inputRef.value?.focus();
});

watch(messages, () => {
  if (messageContainerRef.value) {
    messageContainerRef.value.scrollTop = messageContainerRef.value.scrollHeight;
  }
});
</script>
