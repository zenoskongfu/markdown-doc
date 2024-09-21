import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VitePluginMarkdown from "./script/vite/VitePluginMarkdown";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginMarkdown()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
});
