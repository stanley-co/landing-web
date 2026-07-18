import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const config: ReturnType<typeof defineConfig> = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };

  // Prerender при production build: боты получают готовый HTML (опционально, нужны зависимости)
  if (mode === 'production') {
    try {
      const vitePrerender = require('vite-plugin-prerender');
      const staticDir = path.join(__dirname, 'dist');
      config.plugins = (config.plugins || []).concat([
        vitePrerender({
          staticDir,
          routes: ['/', '/equipment', '/information', '/about', '/contacts', '/privacy-policy'],
          renderer: new (vitePrerender.PuppeteerRenderer || require('@prerenderer/renderer-puppeteer'))({
            renderAfterTime: 2500,
            headless: true,
          }),
        }),
      ]);
    } catch {
      // vite-plugin-prerender не установлен — сборка без prerender
    }
  }

  return config;
});
