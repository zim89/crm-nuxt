import type { AppwriteInstance } from "./appwrite";

declare module "#app" {
  interface NuxtApp {
    $appwrite: AppwriteInstance;
  }
}

export {};
