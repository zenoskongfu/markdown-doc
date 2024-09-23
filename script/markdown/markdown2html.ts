import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import switchCode, { SwitchCodeOptionsType } from "./plugin/switchCode";
import Block2Code from "./plugin/Block2Code";
import SrcCode2ValueCode from "./plugin/SrcCode2ValueCode";

const markdown2html = (
  id: string,
  code: string,
  options: {
    codeTag?: SwitchCodeOptionsType;
  }
) => {
  let tempProcess = remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(Block2Code())
    .use(SrcCode2ValueCode(id));

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
