import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		minify: 'esbuild',
		rollupOptions: {
			// https://rollupjs.org/configuration-options/
		},
	},
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('./src', import.meta.url)), // Alias for src folder
		},
	},
	plugins: [vue()],
});
