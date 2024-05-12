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
        filename: 'nuxtui-tailwind.config.cjs',
        write: true,
        getContents: ({ nuxt }) => `
        const { defaultExtractor: createDefaultExtractor } = require('tailwindcss/lib/lib/defaultExtractor.js')
        const defaultExtractor = createDefaultExtractor({ tailwindConfig: { separator: ':' } })
            
          module.exports = {
            content: {
              files: [
                ${JSON.stringify(resolve(runtimeDir, 'components/**/*.{vue,mjs,ts}'))},
                ${JSON.stringify(resolve(runtimeDir, 'utils/**/*.{mjs,js,ts}'))},
                ${JSON.stringify(resolve(runtimeDir, 'types/**/*.{mjs,js,ts}'))}
              ],
              transform: {
                vue: (content) => {
                  return content.replaceAll(/(?:\\r\\n|\\r|\\n)/g, ' ')
                }
              },
              extract: {
                vue: (content) => {
                  return [
                    ...defaultExtractor(content),
                  ]
                }
              }
            },
          }
        `
    })

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
