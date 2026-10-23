import { defineConfig } from 'vite'

// A plain static site: one HTML page, one stylesheet, one script, one image.
// Vite is here only for the dev server and for hashing assets at build time.
export default defineConfig({
  build: { target: 'es2019' },
})
