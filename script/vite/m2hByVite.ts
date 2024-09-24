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
  const { type = "both", _value, ...other } = node.properties;
  const mdName = path.basename(id).replace(".md", "");
  const fileName = handleTagName(`${mdName}_demo_${index}`);

  // initial value
  let tagName = fileName;
  const properties = { ...other } as Record<string, string>;
  let children = [];

  switch (type) {
    case "component":
      return handleCompoRender();
    case "code":
      return handleCodeRender();
    case "both":
    default:
      return handleBothRender();
  }

  function handleBothRender() {
    const filePath = path.resolve(TempPath, "./" + fileName + ".tsx");
    fs.writeFileSync(filePath, _value, "utf-8");
    dynamicComponents[fileName] = filePath;

    tagName = "component_and_code";
    dynamicComponents[tagName] = "@src/components/ComponentAndCode";
    properties.code = _value.replace(/"/g, "'");
    children = [
      {
        type: "element",
        tagName: fileName,
      },
    ];
    return {
      tagName,
      properties,
      children,
    };
  }

  function handleCompoRender() {
    const filePath = path.resolve(TempPath, "./" + fileName + ".tsx");
    fs.writeFileSync(filePath, _value, "utf-8");
    dynamicComponents[fileName] = filePath;

    return {
      tagName: fileName,
      properties,
    };
  }

  function handleCodeRender() {
    tagName = "showcode";
    properties.code = _value.replace(/"/g, "'");

    return {
      tagName,
      properties,
    };
  }
};

const m2hByVite = async (code: string, id: string) => {
  const dynamicComponents: Record<string, string> = {
    showcode: "@src/components/ShowCode",
  };

  const htmlFile = await markdown2html(id, code, {
    codeTag: {
      handleCode(index, node) {
        if (node.tagName === "code" && node.properties._value) {
          console.log("_value: ", node.properties._value);
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
