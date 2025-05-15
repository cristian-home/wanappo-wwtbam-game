import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { compression } from 'vite-plugin-compression2'
import Icons from 'unplugin-icons/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/wanappo-wwtbam-game/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    nightwatchPlugin(),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', '**/*.{png,jpg,webp,svg,mp3}'],
      workbox: {
        // Use NetworkFirst for API routes to always fetch fresh data when online
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
            },
          },
          {
            // Cache static assets with Cache First strategy
            urlPattern: /\.(?:js|css|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // Cache images with Cache First and expiration
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // Cache audio files
            urlPattern: /\.(?:mp3|wav|ogg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // This must be the last pattern, as a fallback for unmatched URLs
            urlPattern: /.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'fallback',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 12, // 12 hours
              },
            },
          },
        ],
        // Clean up outdated caches
        cleanupOutdatedCaches: true,
      },
      // Force cache invalidation on new deployments
      selfDestroying: false,
      // Add a timestamp for versioning
      filename: `sw-${new Date().getTime()}.js`,
      manifest: {
        name: 'Who Wants to Be a Millionaire Game',
        short_name: 'WWTBAM Game',
        description: 'A trivia game based on Who Wants to Be a Millionaire',
        theme_color: '#6b21a8', // Purple color to match the theme
        background_color: '#581c87',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '48x48',
            type: 'image/x-icon',
          },
          // Add more icon sizes if available
        ],
      },
    }),
    compression({ algorithm: 'deflate' }),
    compression({ algorithm: 'gzip' }),
    compression({
      algorithm: 'brotliCompress',
      deleteOriginalAssets: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
