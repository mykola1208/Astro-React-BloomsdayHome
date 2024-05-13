import { defineConfig } from "astro/config";
import clerk from "astro-clerk-auth";
import node from "@astrojs/node";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    clerk({
      afterSignInUrl: "/progress-tracker",
      afterSignUpUrl: "/progress-tracker",
    }),
    react(),
    tailwind(),
    icon(),
  ],
});
