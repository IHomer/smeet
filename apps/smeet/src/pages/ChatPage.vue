<template>Welcome {{ name }}</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useProfileStore } from '../store/profile.store';

const { name } = storeToRefs(useProfileStore());
</script>
