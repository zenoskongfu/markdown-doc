import { visit } from "unist-util-visit";

export type ElementType = {
  tagName: string;
  properties: Record<string, string>;
  children?: (ElementType & { value: string })[];
};

export type SwitchCodeOptionsType = Partial<ElementType> & {
  handleCode?: (index: number, node: ElementType & { children: ElementType[] }) => Partial<ElementType> | null;
};

const switchCode = (options: SwitchCodeOptionsType) => {
  let index = 0;
  return () => {
    const {
      tagName = "code",
      properties = {},
      children = [],
      handleCode = () => ({ tagName: "code", properties: {} }),
    } = options;

    return (tree: import("unist").Node) => {
      visit(tree, "element", (node: any) => {
        // if (node.tagName == "code") {
        const res = handleCode(index, node);
        if (!res) return;
        index++;
        const assignedOptions = {
          tagName,
          properties,
          children,
          ...(res || {}),
        };

        node.tagName = assignedOptions.tagName;

        node.properties = {
          ...node.properties,
          ...assignedOptions.properties,
        };

        node.children = assignedOptions.children || [];
        // }
      });
    };
  };
};

export default switchCode;
