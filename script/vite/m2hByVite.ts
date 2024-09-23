import fs from "fs";
import path from "path";
import { TempPath } from "../config";
import markdown2html from "../markdown/markdown2html";
import { ElementType } from "../markdown/plugin/switchCode";
import { handleTagName } from "./util";

type handleCodeParamsType = {
  id: string;
  index: number;
  node: ElementType & {
    children: ElementType[];
  };
  dynamicComponents: Record<string, string>;
};

const handleValueCode = (data: handleCodeParamsType) => {
  const { id, index, node, dynamicComponents } = data;
  const { isRender = "true", _value, ...other } = node.properties;
  const mdName = path.basename(id).replace(".md", "");

  let tagName = handleTagName(`${mdName}_demo_${index}`);
  const properties = { ...other } as Record<string, string>;

  if (isRender == "true") {
    const filePath = path.resolve(TempPath, "./" + tagName + ".tsx");
    fs.writeFileSync(filePath, _value, "utf-8");
    dynamicComponents[tagName] = filePath;
  } else {
    tagName = "showcode";
    properties.code = _value.replace('"', "'");
  }
  return {
    tagName,
    properties,
  };
};

const m2hByVite = async (code: string, id: string) => {
  const dynamicComponents: Record<string, string> = {
    showcode: "@src/components/ShowCode",
  };

  const htmlFile = await markdown2html(id, code, {
    codeTag: {
      handleCode(index, node) {
        if (node.tagName === "code" && !node.properties.src && node.properties._value) {
          return handleValueCode({
            id,
            index,
            node,
            dynamicComponents,
          });
        }
        return null;
      },
    },
  });

  return {
    html: htmlFile.value,
    dynamicComponents,
  };
};

export default m2hByVite;
