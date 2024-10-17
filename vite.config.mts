import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import builtins from 'builtin-modules';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: 'src/main.ts',
      fileName: 'main',
      formats: ['cjs'],
    },
    minify: false,
    rollupOptions: {
      output: {
        dir: 'dist',
      },
      external: [
        'obsidian',
        'electron',
        '@codemirror/autocomplete',
        '@codemirror/collab',
        '@codemirror/commands',
        '@codemirror/language',
        '@codemirror/lint',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/view',
        '@lezer/common',
        '@lezer/highlight',
        '@lezer/lr',
        ...builtins,
      ],
    },
  },
});
