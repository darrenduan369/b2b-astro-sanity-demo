import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://brighttech-demo.example.com',
  integrations: [sitemap()],
});