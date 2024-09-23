import switchCode from "./switchCode";
import grayMatter from "gray-matter";

const handleFrontMatterData = (data: Record<string, string | number | boolean>) => {
  return Object.entries(data).reduce((res, [key, value]) => {
    let _value = value;
    if (typeof _value === "boolean") {
      _value = Boolean(_value) + "";
    }
    res[key] = _value;
    return res;
  }, {} as Record<string, number | string>);
};

const Block2Code = () => {
  return switchCode({
    handleCode(index, node) {
      if (node.children.length > 0) {
        const { content, data } = grayMatter(node.children[0].value);
        const _data = handleFrontMatterData(data);
        return {
          tagName: "code",
          properties: {
            _value: content,
            ..._data,
          },
          children: [],
        };
      }
      return null;
    },
  });
};

export default Block2Code;
