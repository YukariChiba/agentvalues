// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
  ],

  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=0",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "AgentValues",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon/favicon.ico" },
        {
          rel: "apple-touch-icon",
          href: "/favicon/apple-touch-icon.png",
          sizes: "180x180",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
      ],
    },
  },
  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },

  css: [],

  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: false,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },

      // /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
      // disableVuetifyStyles: true,
      styles: {
        configFile: "assets/settings.scss",
      },
    },
  },
});
