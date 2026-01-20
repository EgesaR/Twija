// vite.config.ts
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  ssr: {
    // This tells Vite: "Don't treat these as external Node modules,
    // bundle them so my code can safely reference them."
    noExternal: ['gsap', '@gsap/react'],
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
