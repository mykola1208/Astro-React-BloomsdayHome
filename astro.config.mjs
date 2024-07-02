import { defineConfig } from "astro/config";
import storyblok from '@storyblok/astro'
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
      signInUrl: "/sign-in",
      signUpUrl: "/sign-up",
      afterSignInUrl: "/progress-tracker",
      afterSignUpUrl: "/describe-yourself",
    }),
    storyblok({
      accessToken: "eyrZ2yAu9JxAKOAr8yRoEwtt",
      bridge: true,
      apiOptions: {
        region: 'us',
      },
    }),
    react(),
    tailwind(),
    icon({
      iconDir: "public/icons",
    }),
  ],
  redirects: {
    "/progress-tracker": "/progress-tracker/get-prepared",
    "/": "/progress-tracker/get-prepared",
  },
});
