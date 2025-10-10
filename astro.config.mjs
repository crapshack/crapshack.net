// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const SITE_URL = process.env.SITE_URL || 'https://crapshack.net';

export default defineConfig({
	site: SITE_URL,
	server: {
		host: true,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
