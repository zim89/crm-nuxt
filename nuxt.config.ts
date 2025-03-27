export default defineNuxtConfig({
  runtimeConfig: {
    // apiUrl: process.env.NUXT_API_URL, // Доступно только на сервере
    public: {
      appwriteProjectId: process.env.NUXT_APPWRITE_PROJECT_ID || "",
      appwriteEndpoint: process.env.NUXT_APPWRITE_ENDPOINT || "",
      dbId: process.env.NUXT_DB_ID || "",
      dbStorage: process.env.NUXT_DB_STORAGE || "",
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300],
          },
        },
      },
    ],
    "@pinia/nuxt",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
  ],
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
