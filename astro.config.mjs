import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://b2b-astro-sanity-demo.vercel.app",
  integrations: [sitemap()],
  adapter: vercel(),
});
