import { Plugin } from "vite";
import esbuildTransform from "../esbuild/esbuildTransform";
import m2hByVite from "./m2hByVite";
import { firstCharUpperCase, switchTagName } from "./util";

const VitePluginMarkdown = (): Plugin => {
  return {
    name: "vite-plugin-markdown",
    async transform(code, id) {
      if (id.endsWith(".md")) {
        const { html, dynamicComponents } = await m2hByVite(code, id);

        let _code = `
          import React from 'react';
          ${Object.entries(dynamicComponents)
            .map(([name, path]) => {
              return `import ${firstCharUpperCase(name)} from '${path}'`;
            })
            .join(";\n")}

          export default function(){
            return <>
              ${html}
            </>
          }
        `;

        _code = switchTagName(Object.keys(dynamicComponents), _code);

        const esbuildRes = await esbuildTransform(_code);

        return {
          code: esbuildRes.code,
        };
      }
    },
  };
};

export default VitePluginMarkdown;
