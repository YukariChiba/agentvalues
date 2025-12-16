import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  // your Vuetify options here
  theme: {
    defaultTheme: "agentvalues",
    themes: {
      agentvalues: {
        dark: true,
        colors: {
          primary: "#9C27B0",
          secondary: "#00BCD4",
        },
      },
    },
  },
});
