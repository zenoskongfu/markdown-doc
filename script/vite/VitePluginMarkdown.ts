import { Plugin } from "vite";
import markdown2html from "../markdown/markdown2html";
import esbuildTransform from "../esbuild/esbuildTransform";

const VitePluginMarkdown = (): Plugin => {
	return {
		name: "vite-plugin-markdown",
		async transform(code, id) {
			if (id.endsWith(".md")) {
				const htmlFile = await markdown2html(code);

				const _code = `
          import React from 'react';

          export default function(){
            return <>
              ${htmlFile.value}
            </>
          }
        `;

				const esbuildRes = await esbuildTransform(_code);

				return {
					code: esbuildRes.code,
				};
			}
		},
	};
};

export default VitePluginMarkdown;
