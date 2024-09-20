import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VitePluginMarkdown from "./script/vite/VitePluginMarkdown";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), VitePluginMarkdown()],
});
