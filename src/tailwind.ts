import { addTemplate, createResolver, installModule, useNuxt } from "@nuxt/kit";
import { defu } from "defu";
import { join } from "pathe";

export default async function installTailwind(
  nuxt = useNuxt(),
  resolve = createResolver(import.meta.url).resolve
) {
  const runtimeDir = resolve("./runtime");

  // 1. register hook
  // @ts-ignore
  nuxt.hook("tailwindcss:config", function (tailwindConfig) {
    tailwindConfig.theme = tailwindConfig.theme || {};
    tailwindConfig.theme.extend = tailwindConfig.theme.extend || {};
    tailwindConfig.theme.extend.colors =
      tailwindConfig.theme.extend.colors || {};
  });

  // 2. add config template
  const configTemplate = addTemplate({
    filename: "datepicker-tailwind.config.cjs",
    write: true,
    getContents: ({ nuxt }) => `
      module.exports = {
        content: [
            ${JSON.stringify(
              resolve(runtimeDir, "components/**/*.{vue,js,ts,jsx,tsx,mjs}")
            )},
            ${JSON.stringify(
              resolve(runtimeDir, "utils/**/*.{vue,js,ts,jsx,tsx,mjs}")
            )},
            ${JSON.stringify(
              resolve(runtimeDir, "types/**/*.{vue,js,ts,jsx,tsx,mjs}")
            )},
        ]
      }
    `,
  });

  // 3. install module
  await installModule(
    "@nuxtjs/tailwindcss",
    defu(
      {
        exposeConfig: true,
        config: { darkMode: "class" },
        configPath: [
          configTemplate.dst,
          join(nuxt.options.rootDir, "tailwind.config"),
        ],
      },
      nuxt.options.tailwindcss
    )
  );
}
