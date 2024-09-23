import path from "path";
import switchCode from "./switchCode";
import fs from "fs";

const SrcCode2ValueCode = (id: string) => {
  return switchCode({
    handleCode(index, node) {
      if (node.tagName == "code" && node.properties.src && node.properties.src.startsWith(".")) {
        const { src, ...otherProperties } = node.properties;
        const compoPath = path.resolve(path.dirname(id), src);

        if (!fs.existsSync(compoPath)) return null;

        const _value = fs.readFileSync(compoPath, "utf-8");

        return {
          tagName: "code",
          properties: { _value, ...otherProperties },
        };
      }

      return null;
    },
  });
};

export default SrcCode2ValueCode;
