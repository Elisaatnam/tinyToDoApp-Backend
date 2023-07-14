import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	//ab zeile 8 alles neu dazu
	server: {
		//port nach unserem geschmack aendern
		port: 3001,
		proxy: {
			//⬇️ schluesslewort
			"/api": {
				target: "http://localhost:9898/",
				changeOrigin: true,
			},
		},
	},
});
