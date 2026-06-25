// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Note: <ClientRouter /> (View Transitions) will be wired into BaseLayout in Phase 4.

export default defineConfig({
  site: 'https://www.mykhanwrites.com',

  // Static output is Astro's default — emits to dist/
  // output: 'static' is implicit

  // Clean URLs: /about/ served from dist/about/index.html
  // trailingSlash:'always' keeps canonicals, sitemap, and Apache consistent
  trailingSlash: 'always',

  build: {
    // Emit each page as a directory index (dist/about/index.html)
    // so Apache serves clean URLs without .html extensions
    format: 'directory',
  },

  integrations: [
    sitemap({
      // Exclude /letters/ — reserved/noindex route, not intended for crawlers.
      // /screen/ is already absent while gated (not emitted as a static route).
      filter: (page) => !page.includes('/letters/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
