import { defineNuxtPlugin } from "#app";
import { Account, Client, Databases, Storage } from "appwrite";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  if (!config.public.appwriteEndpoint || !config.public.appwriteProjectId) {
    console.error("Appwrite configuration is missing in runtimeConfig.");
    return;
  }

  const client = new Client()
    .setEndpoint(config.public.appwriteEndpoint)
    .setProject(config.public.appwriteProjectId);

  const account = new Account(client);
  const storage = new Storage(client);
  const DB = new Databases(client);
  const DB_ID = config.public.dbId;
  const DB_STORAGE = config.public.dbStorage;

  nuxtApp.provide("appwrite", { account, storage, DB, DB_ID, DB_STORAGE });
});
