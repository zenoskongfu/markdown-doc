import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import switchCode, { SwitchCodeOptionsType } from "./plugin/switchCode";

const markdown2html = (
  code: string,
  options: {
    codeBlock?: SwitchCodeOptionsType;
    codeTag?: SwitchCodeOptionsType;
  }
) => {
  let tempProcess = remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw);

  Object.entries(options).forEach(([key, value]) => {
    value && (tempProcess = tempProcess.use(switchCode(value)));
  });

  return tempProcess
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(code);
};

export default markdown2html;
