import { visit } from "unist-util-visit";
const wrapperCodeBlock = () => {
  return (tree: import("unist").Node) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName == "code" && node.children.length > 0) {
        const codeChildren = node.children[0];
        node.tagName = "showcode";
        node.properties = { code: codeChildren.value };
        node.children = [];
      }
    });
  };
};

export default wrapperCodeBlock;
