import type { IAppwriteInstance } from "./appwrite";

declare module "#app" {
  interface NuxtApp {
    $appwrite: IAppwriteInstance;
  }
}

export {};
