// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sedaryildirim.github.io/grindfather-coffee-dark-mode',
  base: '/grindfather-coffee-dark-mode',
  integrations: [sitemap()],
});
