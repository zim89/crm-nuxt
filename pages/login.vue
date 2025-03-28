<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { useNuxtApp } from "#app";

useSeoMeta({
  title: "Login | CRM System",
});

const { $appwrite } = useNuxtApp();
const email = ref("user@gmail.com");
const password = ref("12345678");
const name = ref("user");

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  isLoadingStore.set(true);

  await $appwrite.account.createEmailPasswordSession(
    email.value,
    password.value
  );

  const response = await $appwrite.account.get();

  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status,
    });
  }

  email.value = "user@gmail.com";
  password.value = "12345678";
  name.value = "user";

  await router.push("/");
  isLoadingStore.set(false);
};

const register = async () => {
  await $appwrite.account.create(
    uuid(),
    email.value,
    password.value,
    name.value
  );
  await login();
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="rounded bg-sidebar w-72 p-5">
      <PageHeader title="Auth" />

      <form>
        <UiInput
          v-model="email"
          placeholder="Email"
          type="email"
          class="mb-3"
        />
        <UiInput
          v-model="password"
          placeholder="Password"
          type="password"
          class="mb-3"
        />
        <UiInput v-model="name" placeholder="Name" type="text" class="mb-3" />

        <div class="flex items-center justify-center gap-5">
          <UiButton type="button" variant="secondary" @click="login"
            >Login</UiButton
          >
          <UiButton type="button" variant="secondary" @click="register"
            >Register</UiButton
          >
        </div>
      </form>
    </div>
  </div>
</template>
