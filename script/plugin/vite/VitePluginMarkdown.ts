import { Plugin } from "vite";

const VitePluginMarkdown = (): Plugin => {
	return {
		name: "vite-plugin-markdown",
		transform(code, id) {
			if (id.endsWith(".md")) {
				return {
					code: "export default ()=>'I am a markdown doc.'",
				};
			}
		},
	};
};

export default VitePluginMarkdown;
