import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: '',
  }),
  actions: {
    register(value: string) {
      this.name = value;
    },
    logout() {
      this.name = '';
    },
  },
  persist: {
    enabled: true,
  },
});
