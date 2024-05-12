import {
  addComponentsDir,
  createResolver,
  defineNuxtModule,
  installModule,
} from "@nuxt/kit";

export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "vue3-better-pick",
    configKey: "Vue3BetterPick",
  },
  defaults: {},
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.css.push(resolver.resolve("./output.css"));

    nuxt.options.modules.push(
      "@nuxtjs/tailwindcss",
      "nuxt-icon",
    );

    await installModule("nuxt-icon");
    await installModule("@nuxtjs/tailwindcss", {
      configPath: resolver.resolve("./runtime/tailwind.config.js"),
    });
    await addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      pathPrefix: false,
      prefix: "",
      global: true,
    });
  },
});
