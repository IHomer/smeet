<template>
  <div class="flex flex-col gap-2 text-left">
    <label v-if="label" class="font-bold"
      >{{ label }} <span class="text-red-300" v-if="error"> ({{ error }})</span>
    </label>
    <input
      class="px-3 py-2 border rounded border-gray-300 bg-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      ref="inputRef"
      v-model="value"
      :title="label"
      :name="name"
      :type="type"
      :disabled="disabled"
      :autofocus="autofocus"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps([
  'modelValue',
  'label',
  'name',
  'type',
  'error',
  'disabled',
  'autofocus'
]);
const emit = defineEmits(['update:modelValue']);

const inputRef = ref<HTMLInputElement>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});

const focus = () => {
  inputRef.value?.focus();
}

defineExpose({ focus });
</script>
