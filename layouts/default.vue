<script lang="ts" setup>
import { useNuxtApp } from "#app";

const { $appwrite } = useNuxtApp();

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const { account } = $appwrite;
    const user = await account.get();
    if (user) store.set(user);
  } catch (error) {
    console.log("[Error in default layout]", error);
    router.push("/login");
  } finally {
    isLoadingStore.set(false);
  }
});
</script>

<template>
  <WidgetLoader v-if="isLoadingStore.isLoading" />

  <section
    v-else
    :class="[
      store.isAuth
        ? 'grid grid-cols-[1fr_6fr]'
        : 'flex items-center justify-center',
      'min-h-screen',
    ]"
  >
    <WidgetSidebar v-if="store.isAuth" />
    <div class="p-14">
      <slot></slot>
    </div>
  </section>
</template>
