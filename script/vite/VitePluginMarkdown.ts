import { Plugin } from "vite";
import markdown2html from "../markdown/markdown2html";
import esbuildTransform from "../esbuild/esbuildTransform";
import path from "path";
import fs from "fs";
import { TempPath } from "../config";
const firstCharUpperCase = (str: string) => {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
};

const handleTagName = (tagName: string) => {
  return tagName.toLowerCase();
};

const switchTagName = (tagNames: string[], code: string) => {
  code = code.replace(
    new RegExp(`${tagNames.map((item) => item.toLowerCase()).join("|")}`, "g"),
    (match: string) => {
      return firstCharUpperCase(match);
    }
  );

  return code;
};

const VitePluginMarkdown = (): Plugin => {
  return {
    name: "vite-plugin-markdown",
    async transform(code, id) {
      if (id.endsWith(".md")) {
        const dynamicComponents: Record<string, string> = {
          showcode: "@src/components/ShowCode",
        };

        const htmlFile = await markdown2html(code, {
          codeBlock: {
            handleCode(index, node) {
              if (node.children.length > 0) {
                const mdName = path.basename(id);
                const filename = handleTagName(
                  `${mdName.replace(".md", "")}_demo_${index}`
                );
                const filePath = path.resolve(
                  TempPath,
                  "./" + filename + ".tsx"
                );
                fs.writeFileSync(filePath, node.children[0].value, "utf-8");
                dynamicComponents[filename] = filePath;

                return {
                  tagName: filename,
                  children: [],
                };
              }
              return null;
            },
          },
          codeTag: {
            handleCode(index, node) {
              if (
                node.tagName == "code" &&
                node.properties.src &&
                node.properties.src.startsWith(".")
              ) {
                console.log(node);
                const mdName = path.basename(id);
                const filename = handleTagName(
                  `${mdName.replace(".md", "")}_demo_tag_${index}`
                );
                const compoPath = path.resolve(
                  path.dirname(id),
                  node.properties.src
                );

                if (!fs.existsSync(compoPath)) return null;

                dynamicComponents[filename] = compoPath;

                return {
                  tagName: filename,
                };
              }
              return null;
            },
          },
        });

        let _code = `
          import React from 'react';
          ${Object.entries(dynamicComponents)
            .map(([name, path]) => {
              return `import ${firstCharUpperCase(name)} from '${path}'`;
            })
            .join(";\n")}

          export default function(){
            return <>
              ${htmlFile.value}
            </>
          }
        `;

        _code = switchTagName(Object.keys(dynamicComponents), _code);

        console.log("_code: ", _code);

        const esbuildRes = await esbuildTransform(_code);

        return {
          code: esbuildRes.code,
        };
      }
    },
  };
};

export default VitePluginMarkdown;
