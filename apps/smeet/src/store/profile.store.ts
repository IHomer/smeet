import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProfileStore = defineStore('profile', () => {
  const name = ref('');

  function register(value: string) {
    name.value = value;
  }

  return { name, register };
});
