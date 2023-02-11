import { User } from '@smeet/shared/graphql';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
  }),
  actions: {
    register(value: User) {
      this.id = value.id;
      this.name = value.name;
    }
  },
  persist: {
    enabled: true,
  },
});
