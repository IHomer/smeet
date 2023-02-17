<template>
  <button
    class="px-3 py-2 rounded transition-colors duration-150"
    :class="{
      'cursor-not-allowed bg-gray-300 text-gray-500': disabled,
      'cursor-pointer bg-green-600 text-white hover:bg-green-800': !disabled,
    }"
    :disabled="disabled"
    :type="type || 'button'"
    @click="onClick"
  >
    <slot></slot>
    <font-awesome-icon v-if="loading" icon="spinner" spin class="ml-2" />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps(['type', 'disabled', 'loading']);
const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>
