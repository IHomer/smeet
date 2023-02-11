<template>
  <div class="container mx-auto text-center flex flex-col gap-8 mt-8">
    <h1 class="text-3xl">
      Welcome to SmeetChat, to start chatting please register!
    </h1>

    <!-- <form @submit="onSubmit" class="flex flex-col gap-4">
      <input name="email" v-model="email" />
      <span>{{ errors }}</span>

      <SmeetInput v-model="email" label="e-mail" name="email" />

      <SmeetButton type="submit">Register</SmeetButton>
    </form> -->

    <form @submit="onSubmit" class="flex flex-col gap-4">
      <SmeetInput
        name="name"
        v-model="name"
        label="Username"
        :error="errors.name"
        :disabled="loading"
      />

      <SmeetButton
        type="submit"
        :disabled="!meta.valid || loading"
        :loading="loading"
      >
        Submit
      </SmeetButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import SmeetButton from '../components/SmeetButton.vue';
import SmeetInput from '../components/SmeetInput.vue';
import { useUserStore } from '../store/user.store';
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import z from 'zod';
import { useCreateUser } from '../queries/user/createUser';

const { register } = useUserStore();
const { mutate, loading } = useCreateUser();

const formSchema = z.object({
  name: z.string().min(3, { message: 'Too short' }),
});
const validationSchema = toFormValidator(formSchema);

const { handleSubmit, errors, meta } = useForm({
  validationSchema,
});
const { value: name } = useField('name');
const onSubmit = handleSubmit(async (values) => {
  const result = await mutate(values);

  if (result?.data?.createUser) {
    register(result?.data?.createUser);
  }
});
</script>
