import path from "path";
import switchCode from "./switchCode";
import fs from "fs";
import { firstCharUpperCase } from "../../vite/util";

const handleCodeProperties = (properties: Record<string, string>) => {
  return Object.entries(properties).reduce((res, [key, value]) => {
    key = key
      .split("-")
      .map((item, index) => (index !== 0 ? firstCharUpperCase(item) : item))
      .join("");
    console.log("key", key);
    res[key] = value;
    return res;
  }, {} as Record<string, string>);
};

const SrcCode2ValueCode = (id: string) => {
  return switchCode({
    handleCode(index, parentNode) {
      if (parentNode.tagName == "p" && parentNode.children.length > 0) {
        const node = parentNode.children[0];
        if (node.tagName == "code" && node.properties.src && node.properties.src.startsWith(".")) {
          const { src, ...otherProperties } = node.properties;
          const compoPath = path.resolve(path.dirname(id), src);

          if (!fs.existsSync(compoPath)) return null;

          const _value = fs.readFileSync(compoPath, "utf-8");

          return {
            tagName: "code",
            properties: { _value, ...handleCodeProperties(otherProperties) },
          };
        }
      }

      return null;
    },
  });
};

export default SrcCode2ValueCode;
