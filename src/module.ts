import {
  addComponentsDir,
  createResolver,
  defineNuxtModule,
  installModule,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "vue3-better-pick",
    configKey: "Vue3BetterPick",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);

    await installModule("@nuxtjs/tailwindcss", {
      configPath: resolver.resolve("../tailwind.config"),
    });
    await installModule("nuxt-icon");

    nuxt.options.modules.push("@nuxtjs/tailwindcss", "nuxt-icon");

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    await addComponentsDir({
      path: resolver.resolve("./runtime/components"), // path of components
      pathPrefix: false, // Prefix component name by its path.
      prefix: "", // Prefix all matched components.
      global: true, // Registers components to be globally available.
    });
  },
});
