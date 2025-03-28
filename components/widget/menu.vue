<script setup lang="ts">
import { menuItems } from "./data";
</script>

<template>
  <div>
    <NuxtLink
      v-for="item in menuItems"
      :key="item.name"
      :to="item.url"
      class="flex items-center py-1 px-3 rounded-lg w-full hover:bg-gray-700 hover:shadow transition-all mb-2.5 gap-2"
    >
      <Icon v-if="!item.isUnderConstruction" :name="item.icon" />
      <NuxtImg v-else src="/under-construction.png" class="size-4" />
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>
