import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    build: {
        target: "esnext",
        outDir: "dist"
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
            '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
            "icons": path.resolve(__dirname, "node_modules/vue-material-design-icons")
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/styles/theme.scss";`,
                quietDeps: true, // limits deprecation warnings
            },
        },
    },
});
