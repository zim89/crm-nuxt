<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "Page Header",
  },
});
</script>

<template>
  <h1 class="font-bold text-2xl mb-10">{{ props.title }}</h1>
</template>
