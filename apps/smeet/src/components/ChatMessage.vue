<template>
  <div class="p-2 border-b border-gray-700 flex gap-4">
    <div class="flex-initial flex flex-col justify-center">
      <div
        class="w-8 h-8 rounded text-center flex flex-col justify-center"
        :style="{ backgroundColor: userBgColor, color: userIconColor }"
      >
        <font-awesome-icon :icon="['fas', 'robot']" v-if="message.bot" />
        <font-awesome-icon :icon="['fas', 'user']" v-else />
      </div>
    </div>
    <div class="flex-1 flex flex-col justify-center">
      <div class="flex flex-col gap-1">
        <div class="flex">
          <div class="font-bold">
            {{ message.user }}
          </div>
          <div class="ml-auto mr-2">
            {{ date }}
          </div>
        </div>
        <div>
          {{ message.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Message } from '@smeet/shared/graphql';
import { computed } from 'vue';
import { stringToColor } from '../utils/colors';
import Color from 'color';
import dayjs from 'dayjs';

const props = withDefaults(
  defineProps<{
    message: Message;
  }>(),
  {}
);

const date = computed(() => dayjs(props.message.updatedAt).format('DD/MM HH:mm'));
const userBgColor = computed(() => stringToColor(props.message.user));
const userIconColor = computed(() =>
  Color(userBgColor.value).isDark() ? '#fff' : '#000'
);
</script>
